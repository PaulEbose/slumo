import { firestore, User } from 'firebase/app'
import React, { ChangeEvent, useContext, useState } from 'react'
import { useUser } from 'reactfire'
import { useFirestore } from 'reactfire/firebaseApp/sdk'
import { Button, Input, Segment, Modal, Icon } from 'semantic-ui-react'
import { ActiveChannelStateContext } from '../../contexts/ActiveChannel'
import { checkFields, displayErrorInput, checkImages } from '../../helpers/form'
import { FormError } from '../../types/Forms'

function MessageForm() {
  const user = useUser<User>()
  const activeChannel = useContext(ActiveChannelStateContext)
  const channelsCollection = useFirestore().collection('channels')
  const [errors, setErrors] = useState<FormError[]>([])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [filesToUpload, setFilesToUpload] = useState<File[]>([])

  const openModal = () => setIsModal(true)
  const closeModal = () => {
    setIsModal(false)
    setFilesToUpload([])
    setErrors([])
  }

  const handleChange = ({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => {
    id === 'message' && setMessage(value)
  }

  const sendMessage = async () => {
    const [isValid] = checkFields(message)
    if (!isValid) {
      return setErrors([{ message: 'Add a message' }])
    }

    setIsLoading(true)

    try {
      const messagesCollection = channelsCollection.doc(activeChannel?.id).collection('messages')
      const newMessage = messagesCollection.doc()
      await messagesCollection.add({
        id: newMessage.id,
        text: message,
        timestamp: new firestore.Timestamp(Date.now() / 1000, 2),
        user: {
          id: user.uid,
          name: user.displayName!,
          avatar: user.photoURL!,
        },
      })

      console.log('added')
    } catch (error) {
      setErrors([error])
      console.error(error)
    }

    setIsLoading(false)
    setMessage('')
  }

  const addFile = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (!files?.length) return

    setFilesToUpload(Array.from(files))
    setErrors([])
  }

  const sendFiles = () => {
    if (!filesToUpload.length) {
      return setErrors([{ message: 'file is empty' }])
    }

    const validFiles = checkImages(filesToUpload, ['image/jpeg', 'image/png'])
    if (!validFiles.length) {
      return setErrors([{ message: 'Only jpg and png image files are supported.' }])
    }

    validFiles.forEach((file) => {
      const metadata = { contentType: file.type }

      console.log({ metadata, file })
    })

    closeModal()
  }

  return (
    <>
      <Segment className="message-form ml-70">
        <Input
          fluid
          id="message"
          className={displayErrorInput(errors, 'message')}
          style={{ marginBottom: '1rem' }}
          label={<Button icon="add" />}
          labelPosition="left"
          placeholder="Write a message"
          aria-label="Write a message"
          onChange={handleChange}
          value={message}
        />

        <Button.Group icon widths="2">
          <Button
            color="orange"
            icon="edit"
            labelPosition="left"
            content="Add Reply"
            onClick={sendMessage}
            disabled={isLoading}
          />
          <Button color="teal" icon="cloud upload" labelPosition="right" content="Upload Media" onClick={openModal} />
        </Button.Group>
      </Segment>

      <Modal basic open={isModal} onClose={closeModal}>
        <Modal.Header>Select an Image File</Modal.Header>
        <Modal.Content>
          <Input
            fluid
            type="file"
            id="file"
            label="File types: jpg, png"
            className={displayErrorInput(errors, 'file')}
            onChange={addFile}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button inverted color="green" onClick={sendFiles}>
            <Icon name="checkmark" />
            Send
          </Button>
          <Button inverted color="red" onClick={closeModal}>
            <Icon name="remove" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default MessageForm

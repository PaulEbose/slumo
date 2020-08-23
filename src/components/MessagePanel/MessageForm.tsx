import firebase from 'firebase'
import { firestore, User } from 'firebase/app'
import React, { ChangeEvent, useContext, useState } from 'react'
import { useUser } from 'reactfire'
import { useFirestore, useStorage } from 'reactfire/firebaseApp/sdk'
import { Button, Icon, Input, Modal, Segment } from 'semantic-ui-react'
import { v4 as uuidv4 } from 'uuid'
import { ActiveChannelStateContext } from '../../contexts/ActiveChannel'
import { checkFields, checkImages, displayErrorInput } from '../../helpers/form'
import { FormError } from '../../types/Forms'
import { Message } from '../../types/Messages'

function MessageForm() {
  const user = useUser<User>()
  const activeChannel = useContext(ActiveChannelStateContext)
  const channelsCollection = useFirestore().collection('channels')
  const storage = useStorage()
  const [errors, setErrors] = useState<FormError[]>([])
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [filesToUpload, setFilesToUpload] = useState<File[]>([])
  const [uploadState, setUploadState] = useState('')
  const [percentUploaded, setPercentUploaded] = useState<number | null>(null)

  const openModal = () => setIsModal(true)
  const closeModal = () => {
    setIsModal(false)
    setFilesToUpload([])
    setErrors([])
  }

  const handleChange = ({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => {
    id === 'message' && setText(value)
  }

  const sendMessage = (fileUrl?: string) => {
    const messagesCollection = channelsCollection.doc(activeChannel?.id).collection('messages')
    const newMessageDoc = messagesCollection.doc()
    const messageContent: Message = {
      id: newMessageDoc.id,
      timestamp: new firestore.Timestamp(Date.now() / 1000, 2),
      user: {
        id: user.uid,
        name: user.displayName!,
        avatar: user.photoURL!,
      },
    }

    if (fileUrl) {
      messageContent.fileUrl = fileUrl
    } else {
      messageContent.text = text
    }

    return messagesCollection.add(messageContent)
  }

  const sendTextMessage = async () => {
    const [isValid] = checkFields(text)
    if (!isValid) {
      return setErrors([{ message: 'Add a message' }])
    }

    setIsLoading(true)

    try {
      await sendMessage()
    } catch (error) {
      setErrors([error])
      console.error(error)
    }

    setIsLoading(false)
    setText('')
  }

  const addFile = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (!files?.length) return
    setFilesToUpload(Array.from(files))
    setErrors([])
  }

  const uploadFile = (file: File) => {
    const metadata = { contentType: file.type }
    const fileExtension = file.name.match(/\.[a-zA-Z]+$/)
    const filePath = `chat/public/${uuidv4()}.${fileExtension}`
    const fileRef = storage.ref().child(filePath)
    const uploadTask = fileRef.put(file, metadata)

    const onProgress = (snap: firebase.storage.UploadTaskSnapshot) => {
      const percent = (snap.bytesTransferred / snap.totalBytes) * 100
      setPercentUploaded(percent)
    }

    return new Promise<string>((resolve, reject) =>
      uploadTask.on(
        'state_changed',
        onProgress,
        (error) => reject(error),
        () => resolve(uploadTask.snapshot.ref.getDownloadURL())
      )
    )
  }

  const sendFileMessage = async () => {
    if (!filesToUpload.length) {
      return setErrors([{ message: 'file is empty' }])
    }

    const validFiles = checkImages(filesToUpload, ['image/jpeg', 'image/png'])
    if (!validFiles.length) {
      return setErrors([{ message: 'Only jpg and png image files are supported.' }])
    }

    setIsLoading(true)

    try {
      const downloadUrl = await uploadFile(validFiles[0])
      await sendMessage(downloadUrl)
      setUploadState('done')
    } catch (error) {
      setUploadState('error')
      setErrors([error])
      console.error(error)
    }

    setIsLoading(false)
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
          value={text}
        />

        <Button.Group icon widths="2">
          <Button
            color="orange"
            icon="edit"
            labelPosition="left"
            content="Add Reply"
            onClick={sendTextMessage}
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
          <Button inverted color="green" loading={isLoading} onClick={sendFileMessage}>
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

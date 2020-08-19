import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react'
import { checkFields } from '../../helpers/formHelper'
import { useFirestore } from 'reactfire/firebaseApp/sdk'
import { useUser } from 'reactfire/auth'
import { User } from 'firebase'

function Channels() {
  const firestore = useFirestore()
  const user = useUser<User>()

  const [channelName, setChannelName] = useState('')
  const [channelDetails, setChannelDetails] = useState('')
  const [channels, setChannels] = useState([])
  const [isModal, setIsModal] = useState(false)

  const openModal = () => setIsModal(true)
  const closeModal = () => setIsModal(false)

  const handleChange = ({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => {
    id === 'channelName' && setChannelName(value)
    id === 'channelDetails' && setChannelDetails(value)
  }

  const handleSubmit = async (ev: FormEvent | MouseEvent) => {
    ev.preventDefault()

    const [isValid] = checkFields(channelName, channelDetails)

    if (!isValid) return

    try {
      await firestore.collection('channels').add({
        name: channelName,
        about: channelDetails,
        createdBy: {
          username: user.displayName,
          avatar: user.photoURL,
        },
      })

      setChannelName('')
      setChannelDetails('')
      closeModal()
    } catch (error) {
      console.error(error)
    }

    // TODO: show success/error in the UI
  }

  return (
    <>
      <Menu.Menu className="pb-8">
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{' '}
          ({channels.length}) <Icon name="add" className="cursor-pointer" onClick={openModal} />
        </Menu.Item>
      </Menu.Menu>

      <Modal basic open={isModal} onClose={closeModal}>
        <Modal.Header>Add a Channel</Modal.Header>

        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <Input fluid label="Name of Channel" id="channelName" onChange={handleChange} />
            </Form.Field>

            <Form.Field>
              <Input fluid label="About the Channel" id="channelDetails" onChange={handleChange} />
            </Form.Field>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button inverted color="green" onClick={handleSubmit}>
            <Icon name="checkmark" /> Add
          </Button>

          <Button inverted color="red" onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default Channels

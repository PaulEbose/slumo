import React, { ChangeEvent, FormEvent, useEffect, useState, useContext } from 'react'
import { User } from 'firebase'
import { useUser, useFirestore } from 'reactfire'

import { Button, Form, Icon, Input, Menu, Modal } from 'semantic-ui-react'
import { checkFields } from '../../helpers/form'
import { ActiveChannelDispatchContext, ActiveChannelStateContext } from '../../contexts/Channel'
import { ChannelsContext } from '../../contexts/Channels'

function Channels() {
  const channelsCollection = useFirestore().collection('channels')
  const user = useUser<User>()
  const activeChannel = useContext(ActiveChannelStateContext)
  const setActiveChannel = useContext(ActiveChannelDispatchContext)
  const channels = useContext(ChannelsContext)
  const [channelName, setChannelName] = useState('')
  const [channelDetails, setChannelDetails] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    if (!isFirstLoad && !channels.length) return

    const firstChannel = channels[0]
    setActiveChannel && setActiveChannel(firstChannel)
    setIsFirstLoad(false)
  }, [channels, isFirstLoad, setActiveChannel])

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

    if (!channelsCollection) return
    // TODO: show connection error in the UI

    try {
      const ch = channelsCollection.doc()
      await ch.update({
        id: ch.id,
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

        {!!channels.length &&
          channels.map((channel) => (
            <Menu.Item
              key={channel.id}
              name={channel.name}
              className="capitalize opacity-75"
              active={channel.id === activeChannel?.id}
              onClick={() => setActiveChannel && setActiveChannel(channel)}
            >
              # {channel.name}
            </Menu.Item>
          ))}
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

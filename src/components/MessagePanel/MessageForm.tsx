import { firestore, User } from 'firebase/app'
import React, { ChangeEvent, useContext, useState } from 'react'
import { useUser } from 'reactfire'
import { useFirestore } from 'reactfire/firebaseApp/sdk'
import { Button, Input, Segment } from 'semantic-ui-react'
import { ActiveChannelStateContext } from '../../contexts/ActiveChannel'
import { checkFields, displayErrorInput } from '../../helpers/form'
import { FormError } from '../../types/Forms'
import { Message } from '../../types/Messages'

function MessageForm() {
  const user = useUser<User>()
  const activeChannel = useContext(ActiveChannelStateContext)
  const channelsCollection = useFirestore().collection('channels')
  const [errors, setErrors] = useState<FormError[]>([])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = ({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => {
    id === 'message' && setMessage(value)
  }

  const sendMessage = async () => {
    const [isValid] = checkFields(message)
    if (!isValid) {
      return setErrors([{ message: 'Add a message' }])
    }

    setIsLoading(true)
    const newMessage: Message = {
      text: message,
      timestamp: new firestore.Timestamp(Date.now() / 1000, 2),
      user: {
        id: user.uid,
        name: user.displayName!,
        avatar: user.photoURL!,
      },
    }

    try {
      const messagesCollection = channelsCollection.doc(activeChannel?.id).collection('messages')
      await messagesCollection.add(newMessage)
      console.log('added')
    } catch (error) {
      setErrors([error])
      console.error(error)
    }

    setIsLoading(false)
    setMessage('')
  }

  return (
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
        <Button color="teal" icon="cloud upload" labelPosition="right" content="Upload Media" />
      </Button.Group>
    </Segment>
  )
}

export default MessageForm

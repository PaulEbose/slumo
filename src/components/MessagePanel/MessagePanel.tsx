import React from 'react'
import { Comment, Segment } from 'semantic-ui-react'
import MessageForm from './MessageForm'
import MessagesHeader from './MessagesHeader'

function MessagePanel() {
  return (
    <>
      <MessagesHeader />

      <Segment>
        <Comment.Group className="overflow-y-scroll h-75"></Comment.Group>
      </Segment>

      <MessageForm />
    </>
  )
}

export default MessagePanel

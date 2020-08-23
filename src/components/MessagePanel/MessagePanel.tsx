import { User } from 'firebase/app'
import React, { useContext, useEffect, useState } from 'react'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { Comment, Segment, Image } from 'semantic-ui-react'
import { ActiveChannelStateContext } from '../../contexts/ActiveChannel'
import { isOwnMessage, timeFromNow, isImage } from '../../helpers/message'
import { Message } from '../../types/Messages'
import MessageForm from './MessageForm'
import MessagesHeader from './MessagesHeader'

function MessagePanel() {
  const channelsCollection = useFirestore().collection('channels')
  const user = useUser<User>()
  const activeChannel = useContext(ActiveChannelStateContext)
  const [messagesCollection, setMessagesCollection] = useState(
    channelsCollection.doc('tempMsgCollection').collection('messages')
  )

  useEffect(() => {
    activeChannel && setMessagesCollection(channelsCollection.doc(activeChannel.id).collection('messages'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChannel])

  const messages = useFirestoreCollectionData<Message>(messagesCollection, { startWithValue: [] })

  return (
    <>
      <MessagesHeader />

      <Segment>
        <Comment.Group className="overflow-y-scroll h-75">
          {!!messages.length &&
            messages.map((message) => (
              <Comment key={message.id}>
                <Comment.Avatar src={message.user.avatar} className="message-avatar" />
                <Comment.Content className={isOwnMessage(message, user)}>
                  <Comment.Author as="a">{message.user.name}</Comment.Author>
                  <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
                  {isImage(message) ? (
                    <Image src={message.fileUrl} className="p-3" />
                  ) : (
                    <Comment.Text>{message.text}</Comment.Text>
                  )}
                </Comment.Content>
              </Comment>
            ))}
        </Comment.Group>
      </Segment>

      <MessageForm />
    </>
  )
}

export default MessagePanel

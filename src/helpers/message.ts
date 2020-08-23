import { Message } from '../types/Messages'
import { User, firestore } from 'firebase'
import moment from 'moment'

export const isOwnMessage = (message: Message, user: User) => (message.user.id === user.uid ? 'message-self' : '')

export const timeFromNow = (timestamp: firestore.Timestamp) => moment(timestamp.seconds * 1000).fromNow()

export const isImage = (message: Message) => !!message.fileUrl && !message.text

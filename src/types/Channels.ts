import { firestore } from 'firebase'
import { Dispatch, SetStateAction } from 'react'

export interface IChannel extends firestore.DocumentData {
  id: string
  name: string
  about: string
  createdBy: {
    username: string
    avatar: string
  }
}

export type ChannelContextType = [IChannel | null, Dispatch<SetStateAction<IChannel | null>> | null]

import { Dispatch, SetStateAction } from 'react'

export interface IChannel {
  id: string
  name: string
  about: string
  createdBy: {
    username: string
    avatar: string
  }
}

export type ActiveChannelDispatch = Dispatch<SetStateAction<IChannel | null>> | undefined

export type ActiveChannelState = IChannel | null

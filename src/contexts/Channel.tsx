import React, { createContext, PropsWithChildren, useState } from 'react'
import { IChannel, ChannelContextType } from '../types/Channels'

export const ChannelContext = createContext<ChannelContextType>([null, null])

export function ChannelProvider(props?: PropsWithChildren<{}>) {
  const channelState = useState<IChannel | null>(null)
  return <ChannelContext.Provider value={channelState} {...props} />
}

// rfce --- const [ channel, setChannel ] = useContext(ChannelContext)

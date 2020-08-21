import React, { createContext, PropsWithChildren, useState } from 'react'
import { ActiveChannelDispatch, ActiveChannelState } from '../types/Channels'

const ActiveChannelStateContext = createContext<ActiveChannelState>(null)
const ActiveChannelDispatchContext = createContext<ActiveChannelDispatch>(undefined)

function ChannelProvider(props?: PropsWithChildren<{}>) {
  const [activeChannel, setActiveChannel] = useState<ActiveChannelState>(undefined)

  return (
    <ActiveChannelStateContext.Provider value={activeChannel}>
      <ActiveChannelDispatchContext.Provider value={setActiveChannel}>
        {props?.children}
      </ActiveChannelDispatchContext.Provider>
    </ActiveChannelStateContext.Provider>
  )
}

export { ChannelProvider, ActiveChannelDispatchContext, ActiveChannelStateContext }

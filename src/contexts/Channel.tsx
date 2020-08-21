import React, { createContext, PropsWithChildren, useContext, useState } from 'react'
import { ActiveChannelDispatch, ActiveChannelState } from '../types/Channels'

const ActiveChannelStateContext = createContext<ActiveChannelState>(undefined)
const ActiveChannelDispatchContext = createContext<ActiveChannelDispatch>(undefined)

function ChannelProvider(props?: PropsWithChildren<{}>) {
  const [activeChannel, setActiveChannel] = useState<ActiveChannelState>(null)

  return (
    <ActiveChannelStateContext.Provider value={activeChannel}>
      <ActiveChannelDispatchContext.Provider value={setActiveChannel}>
        {props?.children}
      </ActiveChannelDispatchContext.Provider>
    </ActiveChannelStateContext.Provider>
  )
}

function useActiveChannelState() {
  const context = useContext(ActiveChannelStateContext)
  if (context === undefined) {
    throw new Error('useActiveChannelState must be used within a ChannelProvider')
  }
  return context
}

function useActiveChannelDispatch() {
  const context = useContext(ActiveChannelDispatchContext)
  if (context === undefined) {
    throw new Error('useActiveChannelDispatch must be used within a ChannelProvider')
  }
  return context
}

function useActiveChannel() {
  return [useActiveChannelState(), useActiveChannelDispatch()] as const
}

export { ChannelProvider, useActiveChannelDispatch, useActiveChannel, useActiveChannelState }

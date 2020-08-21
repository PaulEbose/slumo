import React, { createContext, PropsWithChildren } from 'react'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { IChannel } from '../types/Channels'

const ChannelsContext = createContext<IChannel[]>([])

function ChannelsProvider(props: PropsWithChildren<{}>) {
  const channelsCollection = useFirestore().collection('channels')
  const channels = useFirestoreCollectionData<IChannel>(channelsCollection, { startWithValue: [] })

  return <ChannelsContext.Provider value={channels}>{props.children}</ChannelsContext.Provider>
}

export { ChannelsProvider, ChannelsContext }

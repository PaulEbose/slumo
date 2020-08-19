import React, { useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { ChannelContext } from '../contexts/Channel'
import { IChannel } from '../types/Channels'

export const DisplayChannels = (channels: IChannel[]) => {
  const [c, setChannel] = useContext(ChannelContext)

  const changeChannel = (channel: IChannel) => {
    setChannel && setChannel(channel)
    console.log('channel changed', c)
  }

  return (
    !!channels.length &&
    channels.map((channel) => (
      <Menu.Item key={channel.id} name={channel.name} onClick={() => changeChannel(channel)} className="opacity-75">
        # {channel.name}
      </Menu.Item>
    ))
  )
}

import React from 'react'
import { Menu } from 'semantic-ui-react'
import { ActiveChannelDispatch, ActiveChannelState, IChannel } from '../types/Channels'

type ActiveChannel = readonly [ActiveChannelState, ActiveChannelDispatch]

export function DisplayChannels(activeChannel: ActiveChannel, channels: IChannel[]) {
  const [channelActive, setActiveChannel] = activeChannel

  const changeChannel = (channel: IChannel) => {
    setActiveChannel && setActiveChannel(channel)
  }

  return (
    !!channels.length &&
    channels.map((channel) => (
      <Menu.Item
        key={channel.id}
        name={channel.name}
        className="capitalize opacity-75"
        active={channel.id === channelActive?.id}
        onClick={() => changeChannel(channel)}
      >
        # {channel.name}
      </Menu.Item>
    ))
  )
}

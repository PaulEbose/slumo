import React, { useContext, Dispatch, SetStateAction } from 'react'
import { Menu } from 'semantic-ui-react'
import { ChannelContext } from '../contexts/Channel'
import { IChannel } from '../types/Channels'

type ActiveChannel = [string | null, Dispatch<SetStateAction<string | null>>]

export function DisplayChannels(activeChannelState: ActiveChannel, channels: IChannel[]) {
  const [c, setChannel] = useContext(ChannelContext)
  const [activeChannel, setActiveChannel] = activeChannelState

  const changeChannel = (channel: IChannel) => {
    setChannel!(channel)
    setActiveChannel(channel.id)
    console.log('channel changed', c)
  }

  return (
    !!channels.length &&
    channels.map((channel) => (
      <Menu.Item
        key={channel.id}
        name={channel.name}
        className="capitalize opacity-75"
        active={channel.id === activeChannel}
        onClick={() => changeChannel(channel)}
      >
        # {channel.name}
      </Menu.Item>
    ))
  )
}

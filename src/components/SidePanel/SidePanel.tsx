import React from 'react'
import { Menu } from 'semantic-ui-react'
import UserMenu from './UserMenu'
import Channels from './Channels'
import { ChannelProvider } from '../../contexts/Channel'

function SidePanel() {
  return (
    <Menu inverted vertical fixed="left" className="bg-main text-xl">
      <UserMenu />
      <ChannelProvider>
        <Channels />
      </ChannelProvider>
    </Menu>
  )
}

export default SidePanel

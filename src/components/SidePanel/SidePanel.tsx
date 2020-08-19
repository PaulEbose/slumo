import React from 'react'
import { Menu } from 'semantic-ui-react'
import UserMenu from './UserMenu'
import Channels from './Channels'

function SidePanel() {
  return (
    <Menu inverted vertical fixed="left" className="bg-main text-xl">
      <UserMenu />
      <Channels />
    </Menu>
  )
}

export default SidePanel

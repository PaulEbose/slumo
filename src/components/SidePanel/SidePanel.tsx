import React from 'react'
import { Menu } from 'semantic-ui-react'
import Channels from './Channels'
import UserMenu from './UserMenu'

function SidePanel() {
  return (
    <Menu inverted vertical fixed="left" className="bg-main">
      <UserMenu />
      <Channels />
    </Menu>
  )
}

export default SidePanel

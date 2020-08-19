import React from 'react'
import { Menu } from 'semantic-ui-react'
import UserMenu from './UserMenu'

function SidePanel() {
  return (
    <Menu inverted vertical fixed="left" className="bg-main text-xl">
      <UserMenu />
    </Menu>
  )
}

export default SidePanel

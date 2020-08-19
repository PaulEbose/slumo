import React from 'react'
import { Sidebar, Divider, Button, Menu } from 'semantic-ui-react'

function ColorPanel() {
  return (
    <Sidebar inverted vertical visible as={Menu} icon="labeled" width="very thin">
      <Divider />
      <Button icon="add" color="blue" size="small" />
    </Sidebar>
  )
}

export default ColorPanel

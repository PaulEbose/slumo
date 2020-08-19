import React from 'react'
import { useUser } from 'reactfire/auth'
import { Grid } from 'semantic-ui-react'
import { ColorPanel, MessagePanel, MetaPanel, SidePanel } from '../components'

function Dashboard() {
  const user = useUser()
  console.log({ user })

  return (
    <Grid columns="equal" className="bg-gray-300">
      <ColorPanel />
      <SidePanel />

      <Grid.Column className="ml-40">
        <MessagePanel />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  )
}

export default Dashboard

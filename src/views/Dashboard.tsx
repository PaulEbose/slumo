import React from 'react'
import { useUser } from 'reactfire/auth'
import { Grid } from 'semantic-ui-react'
import { ColorPanel, MessagePanel, MetaPanel, SidePanel } from '../components'
import { ChannelProvider } from '../contexts/Channel'

function Dashboard() {
  const user = useUser()
  console.log({ user })

  return (
    <ChannelProvider>
      <Grid columns="equal" className="bg-gray-100 min-h-screen">
        <ColorPanel />
        <SidePanel />

        <Grid.Column className="ml-70 mt-2">
          <MessagePanel />
        </Grid.Column>

        <Grid.Column width={4} className="mt-2">
          <MetaPanel />
        </Grid.Column>
      </Grid>
    </ChannelProvider>
  )
}

export default Dashboard

import React from 'react'
import { Menu, Grid, Header, Icon, Dropdown, DropdownItemProps } from 'semantic-ui-react'
import { useAuth } from 'reactfire/firebaseApp/sdk'

function SidePanel() {
  const auth = useAuth()

  const logUserOut = () => {
    auth.signOut().then(() => console.log('signed out'))
  }

  const dropdownOptions: DropdownItemProps[] = [
    {
      key: 'user',
      disabled: true,
      text: (
        <span>
          Signed in as <strong>User</strong>
        </span>
      ),
    },
    {
      key: 'avatar',
      text: <span>Change Avatar</span>,
    },
    {
      key: 'logout',
      text: <span onClick={logUserOut}>Logout</span>,
    },
  ]

  return (
    <Menu inverted vertical fixed="left" className="bg-main text-xl">
      <Grid className="bg-main">
        <Grid.Column>
          <Grid.Row className="p-5">
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>Slumo</Header.Content>
            </Header>
          </Grid.Row>

          <Header inverted as="h4" className="p-1">
            <Dropdown trigger={<span>User</span>} options={dropdownOptions} />
          </Header>
        </Grid.Column>
      </Grid>
    </Menu>
  )
}

export default SidePanel

import { User } from 'firebase/app'
import React from 'react'
import { useUser } from 'reactfire/auth'
import { useAuth } from 'reactfire/firebaseApp/sdk'
import { Dropdown, DropdownItemProps, Grid, Header, Icon, Image } from 'semantic-ui-react'

function UserMenu() {
  const auth = useAuth()
  const user = useUser<User>()

  const logUserOut = () => {
    auth.signOut().then(() => console.log('signed out'))
  }

  const dropdownOptions: DropdownItemProps[] = [
    {
      key: 'user',
      disabled: true,
      text: <strong>{user.email}</strong>,
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
    <Grid className="bg-main">
      <Grid.Column>
        <Grid.Row className="p-5">
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content className="text-3xl">Slumo</Header.Content>
          </Header>

          <Header inverted as="h4" className="p-1">
            <Dropdown
              trigger={
                <span className="text-sm">
                  <Image avatar spaced="right" src={user.photoURL} alt={user.displayName + `'s profile avatar`} />
                  {user.displayName}
                </span>
              }
              options={dropdownOptions}
            />
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  )
}

export default UserMenu

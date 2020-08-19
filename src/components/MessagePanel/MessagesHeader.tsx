import React, { useState, ChangeEvent } from 'react'
import { Header, Segment, Icon, Input } from 'semantic-ui-react'

function MessagesHeader() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = ({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => {
    id === 'searchTerm' && setSearchTerm(value)
  }

  return (
    <Segment clearing>
      <Header fluid floated="left" as="h2" style={{ marginBottom: 0 }}>
        <span>
          Channel
          <Icon name="star outline" color="black" />
        </span>
        <Header.Subheader>2 Users</Header.Subheader>
      </Header>

      <Header floated="right">
        <Input
          size="mini"
          id="searchTerm"
          icon="search"
          placeholder="Search Messages"
          ariaLabel="Search Messages"
          onChange={handleChange}
        />
      </Header>
    </Segment>
  )
}

export default MessagesHeader

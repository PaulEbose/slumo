import React from 'react'
import { Segment, Input, Button } from 'semantic-ui-react'

function MessageForm() {
  return (
    <Segment className="message-form ml-70">
      <Input
        fluid
        id="message"
        className="mb-3"
        label={<Button icon="add" />}
        labelPosition="left"
        placeholder="Write a message"
        aria-label="Write a message"
      />

      <Button.Group icon widths="2">
        <Button
          color="orange"
          icon="edit"
          labelPosition="left"
          content="Add Reply"
          onClick={() => console.log('clicked oh!')}
        />
        <Button color="teal" icon="cloud upload" labelPosition="right" content="Upload Media" />
      </Button.Group>
    </Segment>
  )
}

export default MessageForm

import React from 'react';
import io from 'socket.io-client'
import { Grid, Row, Col } from "react-flexbox-grid"
import EnterChat from './components/EnterChat/EnterChat'
import ChatBox from './components/ChatBox/ChatBox'

const socket = io()

const App = () => {
  const [user, setUser] = React.useState({ username: '', isLoggedIn: false })

  return (
    <Grid fluid>
      <Row>
        <Col xs={12}>
          {user.username.trim() !== '' && user.isLoggedIn ? <ChatBox user={user} /> : <EnterChat setUser={setUser} />}
        </Col>
      </Row>
    </Grid>
  )
}

export default App

export { socket }

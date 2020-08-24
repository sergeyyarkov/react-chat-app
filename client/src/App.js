import React from 'react';
import io from 'socket.io-client'
import { Grid, Row, Col } from "react-flexbox-grid"
import ChatBox from './components/ChatBox/ChatBox'

const socket = io('http://localhost:3001')

const App = () => {
  return (
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <ChatBox />
        </Col>
      </Row>
    </Grid>
  )
}

export default App

export { socket }

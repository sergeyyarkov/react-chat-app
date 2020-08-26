import React from 'react';
import { socket } from '../../App'
import Header from './Header/Header'
import ChatOnline from "./ChatOnline/ChatOnline";
import ChatContent from './ChatContent/ChatContent'
import ChatInput from "./ChatInput/ChatInput"
import './ChatBox.scss'

const ChatBox = ({ user }) => {
  const [online, setOnline] = React.useState(0)
  const [inputMessage, setInputMessage] = React.useState('')
  const [messages, setMessages] = React.useState([])

  const chatContentElement = React.useRef(null)
  const inputMessageElement = React.useRef(null)

  const sendMessage = e => {
    e.preventDefault()
    const message = e.target.elements.message
    const date = new Date()

    socket.emit('chat:message', { message: message.value, username: user.username, date: `${date.getHours()}:${(`0${date.getMinutes()}`).slice(-2)}` })
  }

  const scrollChatToBottom = (chatContentElement) => chatContentElement.current.scrollTop = chatContentElement.current.scrollHeight

  React.useEffect(() => {
    socket.on('chat:message', ({ message, username, date }) => {
      setMessages(messages => ([...messages, { message, username, date }]))
      scrollChatToBottom(chatContentElement)
      inputMessageElement.current.focus()
      setInputMessage('')
    })

    socket.on('user:connected', ({ username, online }) => {
      setOnline(online)
      setMessages(messages => ([...messages, { message: `${username} joined!`, username, date: null }]))
      scrollChatToBottom(chatContentElement)
    })

    socket.on('user:disConnected', ({ username, online }) => {
      setOnline(online)
      setMessages(messages => ([...messages, { message: `${username} left!`, username, date: null }]))
      scrollChatToBottom(chatContentElement)
    })
  }, [setMessages, setOnline]);

  return (
    <div className="chat">
      <Header />
      <ChatOnline online={online} />
      <ChatContent chatContentElement={chatContentElement} messages={messages} />
      <ChatInput
        inputMessageElement={inputMessageElement}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        sendMessage={sendMessage}
      />
    </div>
  )
}

export default ChatBox
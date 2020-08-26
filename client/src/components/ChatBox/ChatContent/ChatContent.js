import React from 'react'

const ChatContent = ({ chatContentElement, messages }) => {
  return (
    <div ref={chatContentElement} className="chat-content">
      {messages.map((client, i) => {
        return (
          <div key={i}>
            {client.date !== null ? <div className='message'>
              <div className="message-username">
                <p>
                  {client.username}
                  <span>{client.date}</span>
                </p>
              </div>
              <div className="message-text">
                {client.message}
              </div>
            </div> : <div className='info'>
              <span>{client.message}</span>
            </div>}
          </div>
        )
      })}
    </div>
  )
}

export default ChatContent
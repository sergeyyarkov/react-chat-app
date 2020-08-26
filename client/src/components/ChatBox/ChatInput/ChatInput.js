import React from "react"

const ChatInput = ({ setInputMessage, sendMessage, inputMessageElement, inputMessage }) => {

  const handleInputChange = e => {
    setInputMessage(e.target.value)
  }

  return (
    <div className="chat-input">
      <form onSubmit={sendMessage}>
        <input ref={inputMessageElement} onChange={(e) => handleInputChange(e)} value={inputMessage} required type="text" name='message' placeholder='Type your message...'/>
        <button>
          <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.5111 9.27032L3.34053 0.900689C2.49077 0.548052 1.53076 0.703179 0.835207 1.30533C0.139651 1.90757 -0.151267 2.8355 0.0760766 3.72696L1.87144 10.7676H10.6618C11.0663 10.7676 11.3942 11.0955 11.3942 11.5001C11.3942 11.9045 11.0663 12.2325 10.6618 12.2325H1.87144L0.0760766 19.2731C-0.151267 20.1646 0.139602 21.0925 0.835207 21.6947C1.53218 22.2981 2.49229 22.4513 3.34058 22.0994L23.5112 13.7298C24.4295 13.3487 25 12.4943 25 11.5001C25 10.5058 24.4295 9.65132 23.5111 9.27032Z" fill="#0070F3"/>
          </svg>
        </button>
      </form>
    </div>
  )
}

export default ChatInput
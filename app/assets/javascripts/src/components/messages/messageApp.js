import React from 'react'
// import Header from './components/messages/header'
// import UserList from './components/messages/userList'
import MessagesBox from './messagesBox'

class MessageApp extends React.Component {
  render() {
    return (
        <div className='app'>
          <MessagesBox />
        </div>
      )
  }
}

export default MessageApp

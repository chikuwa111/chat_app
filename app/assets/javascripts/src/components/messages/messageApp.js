import React from 'react'
// import Header from './components/messages/header'
import UserList from './userList'
import MessagesBox from './messagesBox'

class MessageApp extends React.Component {
  render() {
    return (
        <div className='app'>
          <UserList />
          <MessagesBox />
        </div>
      )
  }
}

export default MessageApp

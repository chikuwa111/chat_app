import React from 'react'
import Header from './components/messages/header'
// import UserList from './components/messages/userList'
import MessagesBox from './components/messages/messagesBox'

class App extends React.Component {
  render() {
    return (
        <div className='app'>
          <Header />
          <MessagesBox />
        </div>
      )
  }
}

export default App

import React from 'react'
import MessagesStore from '../../stores/messages'
import UserList from './userList'
import MessagesBox from './messagesBox'

class MessageApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    const openChatID = MessagesStore.getOpenChatUserID()
    return {
      openChatID,
      messages: MessagesStore.getChatByUserID(openChatID),
      friendDataList: MessagesStore.getFriendsData(),
    }
  }
  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  render() {
    const {openChatID, messages, friendDataList} = this.state
    return (
      <div className='app'>
        <UserList openChatID={ openChatID } friendDataList={ friendDataList }/>
        <MessagesBox openChatID={ openChatID } messages={ messages }/>
      </div>
    )
  }
}

export default MessageApp

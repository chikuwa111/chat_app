import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import UserList from './userList'
import MessagesBox from './messagesBox'

class MessageApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    MessagesAction.getMessageFromDB()
    MessagesAction.getFriendsDataFromDB()
    return this.getStateFromStore()
  }
  getStateFromStore() {
    const openChatID = MessagesStore.getOpenChatUserID()
    const messages = MessagesStore.getChatByUserID(openChatID)
    const friendDataList = MessagesStore.getFriendsData()
    return {
      openChatID,
      messages,
      friendDataList,
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
    return (
        <div className='app'>
          <UserList openChatID={ this.state.openChatID } friendDataList={ this.state.friendDataList }/>
          <MessagesBox openChatID={ this.state.openChatID } messages={ this.state.messages }/>
        </div>
      )
  }
}

export default MessageApp

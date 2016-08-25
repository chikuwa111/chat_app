import React from 'react'
import classNames from 'classnames'
import Utils from '../../lib/utils'
import DateUtils from '../../lib/dateutils'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    MessagesAction.getFriendFromDB()
    MessagesAction.getLastMessagesFromDB()
    return this.getStateFromStore()
  }
  getStateFromStore() {
    return {
      openChatID: MessagesStore.getOpenChatUserID(),
      friendList: MessagesStore.getFriends(),
      lastMessages: MessagesStore.getLastMessages(),
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
  changeOpenChat(id) {
    MessagesAction.changeOpenChat(id)
  }
  destroyFriendship(user_id) {
    if (confirm('Are you sure?')) {
      const actionPath = '/friendships/' + user_id
      Utils.delete(actionPath)
    }
  }
  render() {
    this.state.friendList.sort((a, b) => {
      if (this.state.lastMessages[a.id].timestamp > this.state.lastMessages[b.id].timestamp) {
        return -1
      }
      if (this.state.lastMessages[a.id].timestamp < this.state.lastMessages[b.id].timestamp) {
        return 1
      }
      return 0
    })
    // this.state.messageList.sort((a, b) => {
    //   if (a.lastMessage.timestamp > b.lastMessage.timestamp) {
    //     return -1
    //   }
    //   if (a.lastMessage.timestamp < b.lastMessage.timestamp) {
    //     return 1
    //   }
    //   return 0
    // })

    const friends = this.state.friendList.map(friend => {
      const date = DateUtils.getNiceDate(this.state.lastMessages[friend.id].timestamp)
      let statusIcon
      if (this.state.lastMessages[friend.id].to_user_id === friend.id) {
        statusIcon = (
          <i className='fa fa-reply user-list__item__icon' />
        )
      }
      // const date = Utils.getNiceDate(message.lastMessage.timestamp)
      //
      // var statusIcon
      // if (message.lastMessage.from !== message.user.id) {
      //   statusIcon = (
      //     <i className='fa fa-reply user-list__item__icon' />
      //   )
      // }
      // if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
      //   statusIcon = (
      //     <i className='fa fa-circle user-list__item__icon' />
      //   )
      // }
      //
      // var isNewMessage = false
      // if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
      //   isNewMessage = message.lastMessage.from !== UsersStore.user.id
      // }

      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        // 'user-list__item--new': isNewMessage,
        'user-list__item--active': MessagesStore.getOpenChatUserID() === friend.id,
      })
      //
      // return (
      //   <li
      //     onClick={ this.changeOpenChat.bind(this, message.user.id) }
      //     className={ itemClasses }
      //     key={ message.user.id }
      //   >
      //     <div className='user-list__item__picture'>
      //       <img src={ message.user.profilePicture } />
      //     </div>
      //     <div className='user-list__item__details'>
      //       <h4 className='user-list__item__name'>
      //         { message.user.name }
      //         <abbr className='user-list__item__timestamp'>
      //           { date }
      //         </abbr>
      //       </h4>
      //       <span className='user-list__item__message'>
      //         { statusIcon } { message.lastMessage.contents }
      //       </span>
      //     </div>
      //   </li>
      // )

      return (
        <li
          onClick={ this.changeOpenChat.bind(this, friend.id)}
          className={ itemClasses }
          key={ friend.id }
        >
          <div className='user-list__item__picture'>
            <img src={ friend.picture ? '/user_image/' + friend.picture : '/default_user_image/default.png'} />
          </div>
          <div className='user-list__item__details'>
            <h4 className='user-list__item__name'>
              { friend.name } |
              <span className='delete' onClick={ this.destroyFriendship.bind(this, friend.id) }> delete</span>
              <abbr className='user-list__item__timestamp'>
                { date }
              </abbr>
            </h4>
            <span className='user-list__item__message'>
              { statusIcon } { this.state.lastMessages[friend.id].contents }
            </span>
          </div>
        </li>
      )
    }, this)
    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          { friends }
        </ul>
      </div>
    )
  }
}

export default UserList

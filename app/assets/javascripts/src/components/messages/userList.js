import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import Utils from '../../lib/utils'
import MessagesStore from '../../stores/messages'
// import UsersStore from '../../stores/user'
import MessagesAction from '../../actions/messages'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    MessagesAction.getFriendFromDB()
    return this.getStateFromStore()
  }
  getStateFromStore() {
    const friends = MessagesStore.getFriends()
    const friendList = []
    _.each(friends, (friend) => {
      // const messagesLength = message.messages.length
      friendList.push(friend)
      // friendList.push({
      //   // lastMessage: message.messages[messagesLength - 1],
      //   // lastAccess: message.lastAccess,
      //   name: friend.name,
      //   id: friend.id,
      //   picture: friend.picture,
      // })
    })
    return {
      openChatID: MessagesStore.getOpenChatUserID(),
      friendList: friendList,
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
              </abbr>
            </h4>
            <span className='user-list__item__message'>
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

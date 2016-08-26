import React from 'react'
import classNames from 'classnames'
import Utils from '../../lib/utils'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    MessagesAction.getFriendsDataFromDB()
    return this.getStateFromStore()
  }
  getStateFromStore() {
    return {
      openChatID: MessagesStore.getOpenChatUserID(),
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
    const friendsData = this.state.friendDataList.map(friendData => {
      const date = friendData.last_action_timestamp
      let statusIcon
      if (friendData.last_action.contents !== undefined) {
        if (friendData.last_action.to_user_id === friendData.id) {
          statusIcon = (
            <i className='fa fa-reply user-list__item__icon' />
          )
        }
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
        'user-list__item--active': this.state.openChatID === friendData.id,
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
      //         { statusIcon } { this.state.lastActions[friend.id].contents }
      //       </span>
      //     </div>
      //   </li>
      // )

      return (
        <li
          onClick={ this.changeOpenChat.bind(this, friendData.id)}
          className={ itemClasses }
          key={ friendData.id }
        >
          <div className='user-list__item__picture'>
            <img src={ friendData.picture ? '/user_image/' + friendData.picture : '/default_user_image/default.png'} />
          </div>
          <div className='user-list__item__details'>
            <h4 className='user-list__item__name'>
              { friendData.name } |
              <span className='delete' onClick={ this.destroyFriendship.bind(this, friendData.id) }> delete</span>
              <abbr className='user-list__item__timestamp'>
                { date }
              </abbr>
            </h4>
            <span className='user-list__item__message'>
              { statusIcon } { friendData.last_action.contents }
            </span>
          </div>
        </li>
      )
    }, this)
    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          { friendsData }
        </ul>
      </div>
    )
  }
}

export default UserList

import React from 'react'
import classNames from 'classnames'
import MessagesAction from '../../actions/messages'
import Utils from '../../lib/utils'

class UserList extends React.Component {

  static get propTypes() {
    return {
      openChatID: React.PropTypes.number.isRequired,
      friendDataList: React.PropTypes.array.isRequired,
    }
  }
  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return {
      datetime: new Date(),
    }
  }
  changeOpenChat(id) {
    MessagesAction.changeOpenChat(id, this.state.datetime)
  }
  destroyFriendship(user_id, event) {
    if (confirm('Are you sure?')) {
      const actionPath = '/friendships/' + user_id
      Utils.delete(actionPath)
    }
    event.stopPropagation()
  }
  render() {
    const friendsData = this.props.friendDataList.map(friendData => {
      // 最初に変数の中身取り出したほうがすっきりする
      const {last_access, last_action, last_action_timestamp} = friendData
      // これは変数に入れる意味あるかな？？
      const date = last_action_timestamp
      let isNewMessage = false
      let statusIcon
      if (last_action.contents !== undefined) {
        if (last_action.to_user_id === friendData.id) {
          statusIcon = (
            <i className='fa fa-reply user-list__item__icon' />
          )
        } else if (!last_access || last_access < last_action.created_at) {
          statusIcon = (
            <i className='fa fa-circle user-list__item__icon' />
          )
          isNewMessage = true
        }
      }

      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        'user-list__item--new': isNewMessage,
        'user-list__item--active': this.props.openChatID === friendData.id,
      })

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

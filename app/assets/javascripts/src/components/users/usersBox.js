import React from 'react'
import UsersStore from '../../stores/users'
import UsersAction from '../../actions/users'
import Utils from '../../lib/utils'

class UsersBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    return {users: UsersStore.getShownUsers()}
  }
  componentDidMount() {
    UsersAction.getUserFromDB()
  }
  componentWillMount() {
    UsersStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    UsersStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  makeFriendsWith(id) {
    const params = {'to_user_id': id}
    Utils.post('/friendships', params)
  }
  render() {
    const users = this.state.users.map(user => {
      return (
        <li key={ user.id } className='user-box__item'>
          <div className='user-box__item__contents'>
            <span className='user-box__item__picture'>
              <img src={ user.picture ? '/user_image/' + user.picture : '/default_user_image/default.png' } />
            </span>
            <span className='user-box__item__name'>{ user.name }</span>
            <div className='user-box__item__button'>
              <a className='user-box__item__profile' href={`/users/${user.id}`} data-no-turbolink={true}>View Profile</a>
              <br/>
              <span className='user-box__item__chat' onClick={ this.makeFriendsWith.bind(this, user.id) }>Start Chat</span>
            </div>
          </div>
        </li>
      )
    })

    return (
      <div className='user-box'>
        <ul className='user-box__list'>
          { users }
        </ul>
      </div>
    )
  }
}

export default UsersBox

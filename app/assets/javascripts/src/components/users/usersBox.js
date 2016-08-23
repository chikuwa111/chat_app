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
          <div
            className='user-box__item__contents'
            onClick={ this.makeFriendsWith.bind(this, user.id) }
          >
            { user.name }
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

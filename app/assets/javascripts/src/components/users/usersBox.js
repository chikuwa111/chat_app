import React from 'react'
import UsersStore from '../../stores/users'
import UsersAction from '../../actions/users'

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
    var form = document.createElement('form')
    document.body.appendChild(form)
    var input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', 'to_user_id')
    input.setAttribute('value', id)
    form.appendChild(input)
    form.setAttribute('action', '/friendships')
    form.setAttribute('method', 'post')
    form.submit()
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

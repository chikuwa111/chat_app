import React from 'react'
import classNames from 'classNames'
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
    return {users: UsersStore.getAllUsers()}
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
  render() {
    const users = this.state.users.map((user, index) => {
      const userClasses = classNames({
        'user-box__item': true,
      })

      return (
        <li key={ index } className={ userClasses }>
          <div className='user-box__item__contents'>
          id: { user.id }, name: { user.name } <br/>
          email: { user.email }
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

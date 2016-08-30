import React from 'react'
import UsersStore from '../../stores/users'
import UsersBox from './usersBox'
import InputBox from './inputBox'

class UserApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    return {
      users: UsersStore.getShownUsers(),
    }
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
    return (
      <div>
        <InputBox />
        <UsersBox users={ this.state.users }/>
      </div>
    )
  }
}

export default UserApp

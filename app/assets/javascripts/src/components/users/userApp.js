import React from 'react'
import UsersBox from './usersBox'
import InputBox from './inputBox'

class UserApp extends React.Component {
  render() {
    return (
      <div>
        <InputBox />
        <UsersBox />
      </div>
    )
  }
}

export default UserApp

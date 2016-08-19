import React from 'react'
import UsersAction from '../../actions/users'

class InputBox extends React.Component {

  static get defaultProps() {
    return {
    }
  }

  static get propTypes() {
    return {
    }
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.updateValue = this.updateValue.bind(this)
  }
  get initialState() {
    return {
      value: '',
    }
  }
  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
    UsersAction.searchUser(e.target.value)
  }
  render() {
    return (
      <div className='input-box'>
        <input
          type='text'
          value={ this.state.value }
          onChange={ this.updateValue }
          className='input-box__input'
          autoFocus='true'
          placeholder='Type name to find..'
        />
      </div>
    )
  }
}

export default InputBox

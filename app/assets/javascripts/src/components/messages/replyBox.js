import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'

class ReplyBox extends React.Component {

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
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.updateValue = this.updateValue.bind(this)
  }
  get initialState() {
    return {
      value: '',
    }
  }
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      // MessagesAction.sendMessage(MessagesStore.getOpenChatUserID(), this.state.value)
      MessagesAction.sendMessageToDB(this.state.value, MessagesStore.getOpenChatUserID())
      this.setState({
        value: '',
      })
    }
  }
  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }
  updateImage(e) {
    if (e.target.files.length === 0) return
    const file = e.target.files[0]
    MessagesAction.sendImageToDB(file, MessagesStore.getOpenChatUserID())
  }
  render() {
    return (
      <div className='reply-box'>
        <input
          value={ this.state.value }
          onKeyDown={ this.handleKeyDown }
          onChange={ this.updateValue }
          className='reply-box__input'
          placeholder='Type message to reply..'
          disabled={ MessagesStore.getOpenChatUserID() === 0 }
        />
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
        <input
          type='file'
          accept='.jpg,.gif,.png,image/gif,image/jpeg,image/png'
          disabled={ MessagesStore.getOpenChatUserID() === 0 }
          onChange={ this.updateImage }
        />
      </div>
    )
  }
}

export default ReplyBox

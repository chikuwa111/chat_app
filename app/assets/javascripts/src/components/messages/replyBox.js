import React from 'react'
import MessagesAction from '../../actions/messages'

class ReplyBox extends React.Component {

  static get propTypes() {
    return {
      openChatID: React.PropTypes.number.isRequired,
    }
  }
  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return {
      value: '',
    }
  }
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      MessagesAction.sendMessageToDB(this.state.value, this.props.openChatID)
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
    MessagesAction.sendImageToDB(file, this.props.openChatID)
  }
  render() {
    return (
      <div className='reply-box'>
        <input
          value={ this.state.value }
          onKeyDown={ this.handleKeyDown.bind(this) }
          onChange={ this.updateValue.bind(this) }
          className='reply-box__input'
          placeholder='Type message to reply..'
          disabled={ this.props.openChatID === 0 }
        />
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
        <input
          type='file'
          accept='.jpg,.gif,.png,image/gif,image/jpeg,image/png'
          disabled={ this.props.openChatID === 0 }
          onChange={ this.updateImage.bind(this) }
        />
      </div>
    )
  }
}

export default ReplyBox

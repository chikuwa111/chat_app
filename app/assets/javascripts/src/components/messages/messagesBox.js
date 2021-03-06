import React from 'react'
import classNames from 'classNames'
import ReplyBox from '../../components/messages/replyBox'

class MessagesBox extends React.Component {

  static get propTypes() {
    return {
      openChatID: React.PropTypes.number.isRequired,
      messages: React.PropTypes.array.isRequired,
    }
  }
  componentDidUpdate() {
    setTimeout(() => {
      const node = this.refs.node
      node.scrollTop = node.scrollHeight
    }, 0)
  }
  render() {
    const messages = this.props.messages.map(message => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.from_user_id !== this.props.openChatID,
        'clear': true,
        'message-box__item--image': message.image,
      })

      return (
        <li key={ message.id } className={ messageClasses }>
          <div className='message-box__item__contents'>
            { message.image ? <img src={`message_image/${message.image}`} /> : message.contents }
          </div>
        </li>
      )
    })

    return (
        <div className='message-box'>
          <ul className='message-box__list' ref='node'>
            { messages }
          </ul>
          <ReplyBox openChatID={ this.props.openChatID }/>
        </div>
      )
  }
}

export default MessagesBox

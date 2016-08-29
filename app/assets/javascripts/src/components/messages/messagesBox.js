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
    const node = this.refs.node
    node.scrollTop = node.scrollHeight
  }
  render() {
    const messages = this.props.messages.map(message => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.from_user_id !== this.props.openChatID,
        'clear': true,
        'message-box__item--image': message.image,
      })

      if (!message.image) {
        return (
          <li key={ message.id } className={ messageClasses }>
            <div className='message-box__item__contents'>
              { message.contents }
            </div>
          </li>
        )
      } else {
        const filePath = 'message_image/' + message.image
        return (
          <li key={ message.id } className={ messageClasses }>
            <div className='message-box__item__contents'>
              <img src={ filePath } />
            </div>
          </li>
        )
      }
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

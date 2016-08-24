import React from 'react'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import ReplyBox from '../../components/messages/replyBox'
// import UsersStore from '../../stores/user'
// import Utils from '../../utils'

class MessagesBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    return {messages: MessagesStore.getChatByUserID(MessagesStore.getOpenChatUserID())}
  }
  componentDidMount() {
    MessagesAction.getMessageFromDB()
  }
  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  render() {
    // const messagesLength = this.state.messages.length
    // const currentUserID = UsersStore.user.id

    const messages = this.state.messages.map(message => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.from_user_id !== MessagesStore.getOpenChatUserID(),
        'clear': true,
        'message-box__item--image': message.image,
      })

      // <li key={ message.timestamp + '-' + message.from } className={ messageClasses }>
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

    // const lastMessage = this.state.messages[messagesLength - 1]
    //
    // if (lastMessage.from === currentUserID) {
    //   if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
    //     const date = Utils.getShortDate(lastMessage.timestamp)
    //     messages.push(
    //         <li key='read' className='message-box__item message-box__item--read'>
    //           <div className='message-box__item__contents'>
    //             Read { date }
    //           </div>
    //         </li>
    //       )
    //   }
    // }
    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            { messages }
          </ul>
          <ReplyBox />
        </div>
      )
  }
}

export default MessagesBox

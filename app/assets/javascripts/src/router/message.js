import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import MessageApp from '../components/messages/messageApp'
import MessagesAction from '../actions/messages'

export default class MessageRouter extends BaseRouter {
  register() {
    this.route('/messages', this.loadMessage, this.loadFriendsData, this.decorateMessage)
  }

  decorateMessage(ctx, next) {
    (new ReactDecorator()).decorate('react-messages', MessageApp)
    next()
  }

  loadMessage(ctx, next) {
    MessagesAction.getMessageFromDB()
    next()
  }

  loadFriendsData(ctx, next) {
    MessagesAction.getFriendsDataFromDB()
    next()
  }
}

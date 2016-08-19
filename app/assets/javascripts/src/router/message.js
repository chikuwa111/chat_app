import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import MessageApp from '../components/messages/messageApp'

export default class MessageRouter extends BaseRouter {
  register() {
    this.route('/messages', this.decorateMessage)
  }

  decorateMessage(ctx, next) {
    (new ReactDecorator()).decorate('react-messages', MessageApp)
    next()
  }
}

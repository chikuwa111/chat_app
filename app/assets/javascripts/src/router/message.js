import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../app'

export default class CardRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp)
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    next()
  }
}

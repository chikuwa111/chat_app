import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import UserApp from '../components/users/userApp'

export default class UserRouter extends BaseRouter {
  register() {
    this.route('/users/find', this.decorateUser)
  }

  decorateUser(ctx, next) {
    (new ReactDecorator()).decorate('react-search', UserApp)
    next()
  }
}

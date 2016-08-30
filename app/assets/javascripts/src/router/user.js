import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import UserApp from '../components/users/userApp'
import UsersAction from '../actions/users'

export default class UserRouter extends BaseRouter {
  register() {
    this.route('/users/find', this.decorateUser, this.loadUser)
  }

  decorateUser(ctx, next) {
    (new ReactDecorator()).decorate('react-search', UserApp)
    next()
  }

  loadUser(ctx, next) {
    UsersAction.getUserFromDB()
    next()
  }
}

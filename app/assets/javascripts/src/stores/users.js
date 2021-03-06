import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import _ from 'lodash'
import {ActionTypes} from '../constants/app'

// const UsersStore = {
//   user: {
//     id: 1,
//     name: 'John Doek',
//     profilePicture: 'https://avatars1.githubusercontent.com/u/8901351?v=3&s=200',
//   },
// }

class UserStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getAllUsers() {
    if (!this.get('users')) this.setUsers([])
    return this.get('users')
  }
  setUsers(array) {
    this.set('users', array)
  }
  getShownUsers(array) {
    if (!this.get('shown_users')) this.setShownUsers([])
    return this.get('shown_users')
  }
  setShownUsers(array) {
    this.set('shown_users', array)
  }
}
const UsersStore = new UserStore()

UsersStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action
  switch (action.type) {
    case ActionTypes.LOAD_USERS:
      const json = payload.action.json
      UsersStore.setUsers(json)
      UsersStore.emitChange()
      break

    case ActionTypes.LOAD_SEARCH_USERS:
      const input = payload.action.input
      const shownUsers = []
      if (input !== '') {
        const users = UsersStore.getAllUsers()
        _.forEach(users, (user) => {
          if (_.toLower(user.name).indexOf(_.toLower(input)) !== -1) {
            shownUsers.push(user)
          }
        })
      }
      UsersStore.setShownUsers(shownUsers)
      UsersStore.emitChange()
      break

    default:
  }
})

export default UsersStore

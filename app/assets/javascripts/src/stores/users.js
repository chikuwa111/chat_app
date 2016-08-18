import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'

let users = []

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
    return users
  }
}
const UsersStore = new UserStore()

UsersStore.dispatchToken = Dispatcher.register(payload => {
  const actions = {
    getUserFromDB(payload) {
      const json = payload.action.json
      users = json
      UsersStore.emitChange()
    },
  }

  actions[payload.action.type] && actions[payload.action.type](payload)
})

export default UsersStore

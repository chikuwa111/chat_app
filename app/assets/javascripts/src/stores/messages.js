import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'
// import UsersStore from '../stores/user'

// const messages = {
//   2: {
//     user: {
//       profilePicture: 'https://avatars0.githubusercontent.com/u/7922109?v=3&s=460',
//       id: 2,
//       name: 'Ryan Clark',
//       status: 'online',
//     },
//     lastAccess: {
//       recipient: 1424469794050,
//       currentUser: 1424469794080,
//     },
//     messages: [
//       {
//         contents: 'Hey!',
//         from: 2,
//         timestamp: 1424469793023,
//       },
//       {
//         contents: 'Hey, what\'s up?',
//         from: 1,
//         timestamp: 1424469794000,
//       },
//     ],
//   },
//   3: {
//     user: {
//       read: true,
//       profilePicture: 'https://avatars3.githubusercontent.com/u/2955483?v=3&s=460',
//       name: 'Jilles Soeters',
//       id: 3,
//       status: 'online',
//     },
//     lastAccess: {
//       recipient: 1424352522000,
//       currentUser: 1424352522080,
//     },
//     messages: [
//       {
//         contents: 'Want a game of ping pong?',
//         from: 3,
//         timestamp: 1424352522000,
//       },
//     ],
//   },
//   4: {
//     user: {
//       name: 'Todd Motto',
//       id: 4,
//       profilePicture: 'https://avatars1.githubusercontent.com/u/1655968?v=3&s=460',
//       status: 'online',
//     },
//     lastAccess: {
//       recipient: 1424423579000,
//       currentUser: 1424423574000,
//     },
//     messages: [
//       {
//         contents: 'Please follow me on twitter I\'ll pay you',
//         timestamp: 1424423579000,
//         from: 4,
//       },
//     ],
//   },
// }
//
// var openChatID = parseInt(Object.keys(messages)[0], 10)

class ChatStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getOpenChatUserID() {
    if (!this.get('openChatID')) {
      this.setOpenChatUserID(0)
    }
    return this.get('openChatID')
  }
  setOpenChatUserID(id) {
    this.set('openChatID', id)
  }
  getChatByUserID(id) {
    const messages = []
    MessagesStore.getAllChats().map(message => {
      if (message.from_user_id === id || message.to_user_id === id) {
        messages.push(message)
      }
    }, this)
    return messages
  }
  getAllChats() {
    if (!this.get('messages')) this.setChats([])
    return this.get('messages')
  }
  setChats(array) {
    this.set('messages', array)
  }
  getFriends() {
    if (!this.get('friends')) this.setFriends([])
    return this.get('friends')
  }
  setFriends(array) {
    this.set('friends', array)
  }
  getLastMessages() {
    if (!this.get('lastMessages')) this.setLastMessages({})
    return this.get('lastMessages')
  }
  setLastMessages(array) {
    this.set('lastMessages', array)
  }
  setLastChat(id, message) {
    const lastMessages = this.getLastMessages()
    lastMessages[id] = message
    this.setLastMessages(lastMessages)
  }
}
const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action
  switch (action.type) {
    // updateOpenChatID(payload) {
    //   openChatID = payload.action.userID
    //   messages[openChatID].lastAccess.currentUser = +new Date()
    //   MessagesStore.emitChange()
    // },
    // sendMessage(payload) {
    //   const userID = payload.action.userID
    //   messages[userID].messages.push({
    //     contents: payload.action.message,
    //     timestamp: payload.action.timestamp,
    //     from: UsersStore.user.id,
    //   })
    //   messages[userID].lastAccess.currentUser = +new Date()
    //   MessagesStore.emitChange()
    // },
    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      MessagesStore.setOpenChatUserID(action.id)
      MessagesStore.emitChange()
      break

    case ActionTypes.LOAD_MESSAGES:
      MessagesStore.setChats(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.SAVE_MESSAGE:
      if (action.json.contents !== '') {
        MessagesStore.getAllChats().push(action.json)
        MessagesStore.setLastChat(action.json.to_user_id, action.json)
      }
      MessagesStore.emitChange()
      break

    case ActionTypes.LOAD_FRIENDS:
      MessagesStore.setFriends(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.SAVE_IMAGE_CHAT:
      MessagesStore.getAllChats().push(action.json)
      MessagesStore.setLastChat(action.json.to_user_id, action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.LOAD_LAST_MESSAGES:
      MessagesStore.setLastMessages(action.json)
      MessagesStore.emitChange()
      break

    default:
  }
})
window.MessagesStore = MessagesStore
export default MessagesStore

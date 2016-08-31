import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import _ from 'lodash'
import {ActionTypes} from '../constants/app'

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
    const messages = MessagesStore.getAllChats().filter(message => {
      return (message.from_user_id === id || message.to_user_id === id)
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
  getFriendsData() {
    if (!this.get('friends_data')) this.setFriendsData([])
    return this.get('friends_data')
  }
  setFriendsData(array) {
    this.set('friends_data', array)
  }
  updateFriendsData(json) {
    const friendsData = this.getFriendsData()
    const updatedFriendsData = this.applyLastAction(friendsData, json)
    this.setFriendsData(updatedFriendsData)
  }
  updateLastAccess(id, datetime) {
    const friendsData = this.getFriendsData()
    const updatedFriendsData = this.applyLastAccess(friendsData, id, datetime)
    this.setFriendsData(updatedFriendsData)
  }
  applyLastAction(friendsData, json) {
    const index = _.findIndex(friendsData, friendData => {
      return friendData.id === json.message.to_user_id
    })
    const openChatFriendData = friendsData[index]
    openChatFriendData.last_action = json.message
    openChatFriendData.last_action_timestamp = json.timestamp
    friendsData.splice(index, 1)
    friendsData.unshift(openChatFriendData)
    return friendsData
  }
  applyLastAccess(friendsData, id, datetime) {
    const index = _.findIndex(friendsData, friendData => {
      return friendData.id === id
    })
    const openChatFriendData = friendsData[index]
    openChatFriendData.last_access = datetime
    return friendsData
  }
}
const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action
  switch (action.type) {
    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      MessagesStore.setOpenChatUserID(action.id)
      MessagesStore.updateLastAccess(action.id, action.datetime)
      MessagesStore.emitChange()
      break

    case ActionTypes.LOAD_MESSAGES:
      MessagesStore.setChats(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.SAVE_MESSAGE:
      if (action.json.contents !== '') {
        MessagesStore.getAllChats().push(action.json.message)
        MessagesStore.updateFriendsData(action.json)
      }
      MessagesStore.emitChange()
      break

    case ActionTypes.LOAD_FRIENDS_DATA:
      MessagesStore.setFriendsData(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.SAVE_IMAGE_CHAT:
      MessagesStore.getAllChats().push(action.json.message)
      MessagesStore.updateFriendsData(action.json)
      MessagesStore.emitChange()
      break

    default:
  }
})
window.MessagesStore = MessagesStore
export default MessagesStore

import _ from 'lodash'
import $ from '../vendor/jquery'
import {CSRFToken} from '../constants/app'
import MessagesStore from '../stores/messages'

const Utils = {
  post: (path, params) => {
    params['authenticity_token'] = CSRFToken()
    const form = $('<form></form>')
    form.attr('method', 'post')
    form.attr('action', path)

    _.each(params, (value, key) => {
      const field = $('<input></input>')
      field.attr('type', 'hidden')
      field.attr('name', key)
      field.attr('value', value)
      form.append(field)
    })

    $(document.body).append(form)
    form.submit()
  },

  patch: (path, params) => {
    params['_method'] = 'patch'
    Utils.post(path, params)
  },

  delete: (path) => {
    const params = {'_method': 'delete'}
    Utils.post(path, params)
  },

  updateFriendsData: (json) => {
    const friendsData = MessagesStore.getFriendsData()
    const index = _.findIndex(friendsData, friendData => {
      return friendData.id === json.message.to_user_id
    })
    const openChatFriendData = friendsData.slice(index, index + 1)[0]
    openChatFriendData.last_action = json.message
    openChatFriendData.last_action_timestamp = json.timestamp
    friendsData.splice(index, 1)
    friendsData.unshift(openChatFriendData)
    MessagesStore.setFriendsData(friendsData)
  },

  updateLastAccess: (id, datetime) => {
    const friendsData = MessagesStore.getFriendsData()
    const index = _.findIndex(friendsData, friendData => {
      return friendData.id === id
    })
    const openChatFriendData = friendsData[index]
    openChatFriendData.last_access = datetime
    MessagesStore.setFriendsData(friendsData)
  },
}

window.Utils = Utils
export default Utils

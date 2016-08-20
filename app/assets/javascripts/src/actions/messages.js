import Dispatcher from '../dispatcher'
import request from 'superagent'

export default {
  changeOpenChat(id) {
    Dispatcher.handleViewAction({
      type: 'updateOpenChatID',
      id: id,
    })
  },
  // sendMessage(userID, message) {
  //   Dispatcher.handleViewAction({
  //     type: 'sendMessage',
  //     userID: userID,
  //     message: message,
  //     timestamp: +new Date(),
  //   })
  // },
  getMessageFromDB() {
    return new Promise((resolve, reject) => {
      request
      .get('/api/messages')
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          resolve(json)
          Dispatcher.handleServerAction({
            type: 'getMessageFromDB',
            json: json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
  sendMessageToDB(message, id) {
    return new Promise((resolve, reject) => {
      request
      .post('/api/messages.json')
      .send({contents: message,
            to_user_id: id})
      .end((error, res) => {
        if (!error && res.ok) {
          console.log('success')
          Dispatcher.handleViewAction({
            type: 'sendMessageToDB',
            message: message,
            to_user_id: id,
          })
        } else {
          console.error(error)
        }
      })
    })
  },
  getFriendFromDB() {
    return new Promise((resolve, reject) => {
      request
      .get('/api/friends')
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          resolve(json)
          Dispatcher.handleServerAction({
            type: 'getFriendFromDB',
            json: json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
}

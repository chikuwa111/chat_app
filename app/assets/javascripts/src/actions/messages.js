import Dispatcher from '../dispatcher'
import request from 'superagent'

export default {
  // changeOpenChat(newUserID) {
  //   Dispatcher.handleViewAction({
  //     type: 'updateOpenChatID',
  //     userID: newUserID,
  //   })
  // },
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
  sendMessageToDB(message) {
    return new Promise((resolve, reject) => {
      request
      .post('/api/messages.json')
      .send({contents: message})
      .end((error, res) => {
        if (!error && res.ok) {
          console.log('success')
          Dispatcher.handleViewAction({
            type: 'sendMessageToDB',
            message: message,
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

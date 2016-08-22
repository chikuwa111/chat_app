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
  sendImageToDB(file, file_name, to_user_id) {
    return new Promise((resolve, reject) => {
      request
      .post('/api/messages.json')
      .field('contents', 'image')
      .field('to_user_id', to_user_id)
      .field('file_name', file_name)
      .attach('image', file)
      .end((error, res) => {
        if (!error && res.ok) {
          Dispatcher.handleServerAction({
            type: 'sendImageToDB',
            file_name: file_name,
            to_user_id: to_user_id,
          })
        } else {
          console.error(error)
        }
      })
    })
  },
}

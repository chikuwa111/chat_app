import Dispatcher from '../dispatcher'
import request from 'superagent'
import {APIEndpoints, ActionTypes, CSRFToken} from '../constants/app'

export default {
  changeOpenChat(id) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID,
      id: id,
    })
  },

  getMessageFromDB() {
    return new Promise((resolve, reject) => {
      request
      .get(APIEndpoints.MESSAGES)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          resolve(json)
          Dispatcher.handleServerAction({
            type: ActionTypes.LOAD_MESSAGES,
            json: json,
          })
        } else {
          reject(res)
        }
      })
    })
  },

  sendMessageToDB(message, to_user_id) {
    return new Promise((resolve, reject) => {
      request
      .post(APIEndpoints.MESSAGES)
      .set('X-CSRF-Token', CSRFToken())
      .send({contents: message,
            to_user_id: to_user_id})
      .end((error, res) => {
        if (!error && res.ok) {
          const json = JSON.parse(res.text)
          Dispatcher.handleViewAction({
            type: ActionTypes.SAVE_MESSAGE,
            json: json,
            to_user_id: to_user_id,
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
      .get(APIEndpoints.FRIENDS)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          resolve(json)
          Dispatcher.handleServerAction({
            type: ActionTypes.LOAD_FRIENDS,
            json: json,
          })
        } else {
          reject(res)
        }
      })
    })
  },

  sendImageToDB(file, to_user_id) {
    return new Promise((resolve, reject) => {
      request
      .post(APIEndpoints.MESSAGES)
      .set('X-CSRF-Token', CSRFToken())
      .field('contents', 'sent image')
      .field('to_user_id', to_user_id)
      .attach('image', file)
      .end((error, res) => {
        if (!error && res.ok) {
          const json = JSON.parse(res.text)
          resolve(json)
          Dispatcher.handleServerAction({
            type: ActionTypes.SAVE_IMAGE_CHAT,
            json: json,
            to_user_id: to_user_id,
          })
        } else {
          console.error(error)
        }
      })
    })
  },

  getLastMessagesFromDB() {
    return new Promise((resolve, reject) => {
      request
      .get(APIEndpoints.LAST_MESSAGES)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          resolve(json)
          Dispatcher.handleServerAction({
            type: ActionTypes.LOAD_LAST_MESSAGES,
            json: json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
}

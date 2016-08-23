import Dispatcher from '../dispatcher'
import request from 'superagent'
import {APIEndpoints, ActionTypes} from '../constants/app'

export default {
  getUserFromDB() {
    return new Promise((resolve, reject) => {
      request
      .get(APIEndpoints.USERS)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          resolve(json)
          Dispatcher.handleServerAction({
            type: ActionTypes.LOAD_USERS,
            json: json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
  searchUser(input) {
    Dispatcher.handleViewAction({
      type: ActionTypes.LOAD_SEARCH_USERS,
      input: input,
    })
  },
}

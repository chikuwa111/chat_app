import Dispatcher from '../dispatcher'
import request from 'superagent'

export default {
  getUserFromDB() {
    return new Promise((resolve, reject) => {
      request
      .get('/api/users')
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          resolve(json)
          Dispatcher.handleServerAction({
            type: 'getUserFromDB',
            json: json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
}

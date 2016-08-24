import _ from 'lodash'
import $ from '../vendor/jquery'
import {CSRFToken} from '../constants/app'

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
}

window.Utils = Utils
export default Utils

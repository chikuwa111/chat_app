import React from 'react'
import ReactDOM from 'react-dom'
import {EventEmitter2 as EventEmitter} from 'eventemitter2'
import _ from 'lodash'

export default class ReactDecorator extends EventEmitter {
  constructor(opts) {
    super(opts)
    this.cid = _.uniqueId('react_view')
    this.options = opts || {}
    this._decorated = false
  }

  decorate(id, Component, opts) {
    if (!this._decorated) {
      if (!id || !Component) throw Error('InvalidArgumentsError', 'id and component class must be required')
      if (!document.getElementById(id)) return console.log('NotFound', `element #${id} not found`)
      this._decorated = true
      ReactDOM.render(
        <Component {...opts} />,
        document.getElementById(id)
      )
    }
  }

  isDecorated() {
    return this._decorated
  }

  dispose() {
    this.removeAllListeners()
    delete this.options
    delete this._decorated
  }
}

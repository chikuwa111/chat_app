import _ from 'lodash'
import page from 'page'

export default class Router {
  constructor() {
    this.views = {}
  }

  route() {
    let args = _.map(arguments, (arg) => {
      if (_.isFunction(arg)) return arg.bind(this)
      else return arg
    })
    page.apply(this, args)
  }

  // just use for rendering single view (not multiple)
  decorateView(View, el, opts) {
    if (!this.views[View.name]) this.views[View.name] = new View(opts)
    this.views[View.name].decorate(el, opts)
    return this.views[View.name]
  }
}

import 'babel-polyfill'
import $ from './vendor/jquery'
import page from 'page'
import MessageRouter from './router/message'

$(() => {
  const messageRouter = new MessageRouter()
  messageRouter.register()

  page({click: false})
})

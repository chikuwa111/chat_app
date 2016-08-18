import 'babel-polyfill'
import $ from './vendor/jquery'
import page from 'page'
import MessageRouter from './router/message'
import UserRouter from './router/user'

$(() => {
  const messageRouter = new MessageRouter()
  messageRouter.register()

  const userRouter = new UserRouter()
  userRouter.register()

  page({click: false})
})

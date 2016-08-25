import keyMirror from 'keymirror'

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  USERS: APIRoot + '/users',
  FRIENDS: APIRoot + '/friends',
  LAST_MESSAGES: APIRoot + '/messages/last',
}

export const ActionTypes = keyMirror({
  // messages
  LOAD_MESSAGES: null,
  SAVE_MESSAGE: null,
  UPDATE_OPEN_CHAT_ID: null,
  SAVE_IMAGE_CHAT: null,
  LOAD_FRIENDS: null,
  LOAD_LAST_MESSAGES: null,

  // user
  LOAD_USERS: null,
  LOAD_SEARCH_USERS: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

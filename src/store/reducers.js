import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import * as actions from 'store/actions'

const messages = handleActions({
  [actions.sendMessage]: (state, action) => []
}, [])

export default combineReducers({
  messages
})

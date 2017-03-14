import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions'
import * as actions from 'store/actions'

const messages = handleActions({
  [actions.createMessage]: (state, { payload }) => state.concat(payload)
}, [])

const sessionId = handleAction(
  actions.setSessionId,
  (state, { payload }) => payload,
  null
)

export default combineReducers({
  messages,
  sessionId
})

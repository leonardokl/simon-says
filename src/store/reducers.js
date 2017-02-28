import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import * as actions from 'store/actions'

const messages = handleActions({
  [actions.createMessage]: (state, { payload }) => state.concat(payload)
}, [])

export default combineReducers({
  messages
})

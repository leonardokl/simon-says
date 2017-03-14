import { call, put, takeEvery, select } from 'redux-saga/effects'
import * as actions from './actions'
import { tts, pandora } from 'utils'
import { getSessionId } from 'store/selectors'

function* handleInit () {
  try {
    const { data: { responses, sessionid } } = yield call(pandora.talk, { input: 'oi' })

    yield [
      put(actions.createMessage({ text: responses[0], bot: true })),
      put(actions.setSessionId(sessionid))
    ]
  } catch (err) {
    yield put(actions.createMessage({
      text: 'Desculpe, não posso responder no momento', bot: true
    }))
  }
}

function* handleSendMessage ({ payload: { text } }) {
  const sessionId = yield select(getSessionId)

  yield put(actions.createMessage({ text, bot: false }))

  try {
    const { data: { responses } } = yield call(pandora.talk, { sessionId, input: text })

    yield put(actions.createMessage({ text: responses[0], bot: true }))
  } catch (err) {
    console.error(err)
    yield put(actions.createMessage({
      text: 'Não posso responder no momento...',
      bot: true
    }))
  }
}

function* handleCreateMessage ({ payload: { text, bot } }) {
  if (bot) tts.speak(text)
}

export default function* () {
  yield [
    takeEvery(actions.init.toString(), handleInit),
    takeEvery(actions.sendMessage.toString(), handleSendMessage),
    takeEvery(actions.createMessage.toString(), handleCreateMessage)
  ]
}

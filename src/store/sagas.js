import { call, put, takeEvery } from 'redux-saga/effects'
import * as actions from './actions'
import { tts, pandora } from 'utils'

function* handleInit () {
  try {
    const { data: { responses } } = yield call(pandora.talk, { input: 'oi' })

    yield put(actions.createMessage({ text: responses[0], bot: true }))
  } catch (err) {
    yield put(actions.createMessage({
      text: 'Desculpe, não posso responder no momento', bot: true
    }))
  }
}

function* handleSendMessage ({ payload: { text } }) {
  yield put(actions.createMessage({ text, bot: false }))

  try {
    const { data: { responses } } = yield call(pandora.talk, { input: text })

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

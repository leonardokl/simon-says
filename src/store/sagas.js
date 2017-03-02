import { call, put, takeEvery } from 'redux-saga/effects'
import * as actions from './actions'
import { delay, synthesizeSpeech } from 'utils'
import Const from 'constants.js'
import axios from 'axios'

function* handleInit () {
  yield call(delay)
  yield put(actions.createMessage({ text: 'Olá!', bot: true }))
}

function* handleSendMessage ({ payload: { text } }) {
  yield put(actions.createMessage({ text, bot: false }))

  try {
    const { data: { botsay } } = yield call(axios.get, `${Const.api}${text}`)

    yield put(actions.createMessage({ text: botsay, bot: true }))
  } catch (err) {
    console.error(err)
    yield put(actions.createMessage({
      text: 'Não posso responder no momento, estou passando por uma manutenção',
      bot: true
    }))
  }
}

function* handleCreateMessage ({ payload: { text, bot } }) {
  if (bot) synthesizeSpeech(text)
}

export default function* () {
  yield [
    takeEvery(actions.init.toString(), handleInit),
    takeEvery(actions.sendMessage.toString(), handleSendMessage),
    takeEvery(actions.createMessage.toString(), handleCreateMessage)
  ]
}

import { call, put, takeEvery } from 'redux-saga/effects'
import * as actions from './actions'
import { delay, synthesizeSpeech } from 'utils'
import Const from 'constants.js'

const getRandomMesage = () => {
  const { messages } = Const

  return messages[Math.floor((Math.random() * messages.length))]
}

function* handleInit () {
  yield call(delay)
  yield put(actions.createMessage({ text: 'Olá!', bot: true }))
}

function* handleSendMessage ({ payload: { text } }) {
  yield put(actions.createMessage({ text, bot: false }))
  yield call(delay)
  yield put(actions.createMessage(getRandomMesage()))
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

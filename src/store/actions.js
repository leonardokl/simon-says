import { createAction } from 'redux-actions'

export const init = createAction('INIT')
export const sendMessage = createAction('SEND_MESSAGE')
export const createMessage = createAction('CREATE_MESSAGE')
export const receiveMessage = createAction('RECEIVE_MESSAGE')

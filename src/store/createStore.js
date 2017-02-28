import { applyMiddleware, compose, createStore } from 'redux'
import reduxSaga from 'redux-saga'
import identity from 'lodash/identity'
import reducers from './reducers'
import sagas from './sagas'

const PRODUCTION_ENV = process.env.NODE_ENV === 'production'
const devToolsExtension = () => window.devToolsExtension
  ? window.devToolsExtension()
  : identity
const configureStore = () => {
  const saga = reduxSaga()
  const middlewares = applyMiddleware(saga)

  const options = PRODUCTION_ENV
    ? middlewares
    : compose(middlewares, devToolsExtension())

  const store = createStore(reducers, options)

  saga.run(sagas)

  return store
}

export default configureStore()

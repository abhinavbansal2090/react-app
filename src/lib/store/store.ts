import {
  Middleware,
  Store,
  StoreEnhancer,
  applyMiddleware,
  compose,
  createStore,
} from 'redux'
import { Persistor, persistCombineReducers, persistStore } from 'redux-persist'
import { createEpicMiddleware } from 'redux-observable'
import storage from 'redux-persist/lib/storage'
import * as reduxLogger from 'redux-logger'
import { StoreState, reducers } from './reducers'
import { rootEpic } from './epics'

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const epicMiddleware = createEpicMiddleware()
const middlewares: Middleware[] = [epicMiddleware]

const logger: Middleware = reduxLogger.createLogger({ collapsed: true })
middlewares.push(logger)
const enhancer: StoreEnhancer = composeEnhancers(
  applyMiddleware(...middlewares)
)

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'locale'],
}

const reducer = persistCombineReducers<StoreState>(persistConfig, {
  ...reducers,
})

export const configureStore = () => {
  const preStore: Store<StoreState> = createStore(reducer, enhancer)
  epicMiddleware.run(rootEpic as any)
  const prePersistor: Persistor = persistStore(preStore)

  return {
    persistor: prePersistor,
    store: preStore,
  }
}

export const { store, persistor } = configureStore()

import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()
const initialState = {}

const middlewares = [sagaMiddleware]

const reduxDevTools =
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares), reduxDevTools)
)

sagaMiddleware.run(rootSaga)

export default store

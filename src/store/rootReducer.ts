import { combineReducers } from 'redux'
import appReducer from './app/reducer'
import driversReducer from './drivers/reducer'
import orderReducer from './order/reducer'

const rootReducer = combineReducers({
    app: appReducer,
    drivers: driversReducer,
    order: orderReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer

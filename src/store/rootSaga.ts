import { all } from 'redux-saga/effects'
import { addressWatchers } from './app/sagas/watchers'
import { driversWatchers } from './drivers/sagas/watchers'
import { orderWatchers } from './order/sagas/watchers'

export default function* rootSaga() {
    const watchers = [...addressWatchers, ...driversWatchers, ...orderWatchers]
    yield all(watchers)
}

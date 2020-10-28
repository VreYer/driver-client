import { ForkEffect, takeEvery, fork } from 'redux-saga/effects'
import { ORDER_CREATE } from '../../types'
import { orderWorker } from './order'

export function* orderWatch() {
    yield takeEvery(ORDER_CREATE, orderWorker)
}

export const orderWatchers: ForkEffect[] = [fork(orderWatch)]

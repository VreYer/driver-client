import { ForkEffect, takeEvery, fork } from 'redux-saga/effects'
import { ADDRESS_REQUEST } from '../../types'
import { addressWorker } from './get'

export function* addressWatch() {
    yield takeEvery(ADDRESS_REQUEST, addressWorker)
}

export const addressWatchers: ForkEffect[] = [fork(addressWatch)]

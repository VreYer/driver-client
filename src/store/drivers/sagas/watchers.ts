import { ForkEffect, takeEvery, fork } from 'redux-saga/effects'
import { DRIVERS_REQUEST } from '../../types'
import { driversWorker } from './drivers'

export function* driversWatch() {
    yield takeEvery(DRIVERS_REQUEST, driversWorker)
}

export const driversWatchers: ForkEffect[] = [fork(driversWatch)]

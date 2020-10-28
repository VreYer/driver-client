import { call, put } from 'redux-saga/effects'
import axios from 'axios'

import { showLoader, hideLoader } from '../actions'
import { driversSuccess, driversError } from '../actions'
import { BASE_API_URL } from 'utils/constants'
import { InfoData } from '../type'

const apiURL = `${BASE_API_URL}drivers`

const driversAPI = async (info: InfoData) => {
    try {
        const body = await JSON.stringify(info)
        return await axios.post(`${apiURL}`, body, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
    } catch (err) {
        throw err
    }
}

export function* driversWorker(action: any) {
    try {
        yield put(showLoader())
        const response = yield call(driversAPI, action.info)

        if (response.data.code === 0) {
            yield put(driversSuccess(response.data.data.crews_info))
        } else {
            yield put(driversError('Drivers not found'))
        }

        yield put(hideLoader())
    } catch (err) {
        yield put(driversError('Something went wrong'))
        yield put(hideLoader())
    }
}

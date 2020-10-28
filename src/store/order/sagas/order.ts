import { call, put } from 'redux-saga/effects'
import axios from 'axios'

import { showLoader, hideLoader } from '../actions'
import { orderSuccess, orderError } from '../actions'
import { BASE_API_URL } from 'utils/constants'
import { InfoData } from '../type'

const apiURL = `${BASE_API_URL}order`

const orderAPI = async (info: InfoData) => {
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

export function* orderWorker(action: any) {
    try {
        yield put(showLoader())
        const response = yield call(orderAPI, action.info)

        if (response.data.code === 0) {
            yield put(orderSuccess(response.data.data))
        } else {
            yield put(orderError('Order has not been done'))
        }

        yield put(hideLoader())
    } catch (err) {
        yield put(orderError('Something went wrong'))
        yield put(hideLoader())
    }
}

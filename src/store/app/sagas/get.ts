import { call, put } from 'redux-saga/effects'
import axios from 'axios'

import { showLoader, hideLoader } from '../actions'
import { addressSuccess, addressError } from '../actions'
import { GEOCODER_URL } from 'utils/constants'
import { driversRequest } from 'store/drivers/actions'
import { formatDate, hasNumber } from 'utils/utlis'

const geocoderURL = `${GEOCODER_URL}`
const geocoderReverseURL = `${GEOCODER_URL}`

const baseAPI = async (action: any) => {
    const url =
        action.method === 0
            ? geocoderURL + action.address
            : geocoderReverseURL + action.address
    try {
        return await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
    } catch (err) {
        throw err
    }
}

export function* addressWorker(action: any) {
    if (action.method === 0) {
        let addressArray = action.address.split(', ')
        const [first, ...rest] = addressArray.reverse()
        const returnArray = first + ', ' + rest.join(' ')
        action.address = returnArray
        action = { ...action, address: returnArray }
    }

    try {
        yield put(showLoader())
        const response = yield call(baseAPI, action)
        const result = response.data.results

        // 18/10 Abovyan Street, Yerevan
        if (result[0] && result[0].locations.length > 0) {
            if (result[0].locations[0].street !== '') {
                const address = `${result[0].locations[0].street}`
                const latLng = result[0].locations[0].latLng

                //check if address is valid
                let addressArray = address.split(' ')

                if (!hasNumber(addressArray[0])) {
                    yield put(addressError('Address not found'))
                    return
                }

                const [first, ...rest] = addressArray
                const returnArray = rest.join(' ') + ', ' + first

                yield put(addressSuccess(latLng, returnArray))
                yield put(
                    driversRequest({
                        source_time: formatDate(),
                        addresses: [
                            {
                                address: action.address,
                                lat: result[0].locations[0].latLng.lat,
                                lng: result[0].locations[0].latLng.lng,
                            },
                        ],
                    })
                )
            } else {
                yield put(addressError('Address not found'))
            }
        } else {
            yield put(addressError('Address not found'))
        }

        yield put(hideLoader())
    } catch (err) {
        yield put(addressError('Something went wrong'))
        yield put(hideLoader())
    }
}

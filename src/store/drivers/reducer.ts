import {
    SHOW_LOADER,
    HIDE_LOADER,
    DRIVERS_ERROR,
    DRIVERS_SUCCESS,
} from '../types'
import { DriversAction } from './actions'
import { Car } from './type'

interface DriversState {
    loading: boolean
    data: Car[]
    error: string
}

const initialState = {
    loading: false,
    error: '',
    data: [] as Car[],
}

const driversReducer = (
    state: DriversState = initialState,
    action: DriversAction
) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {
                ...state,
                loading: true,
            }
        case HIDE_LOADER:
            return {
                ...state,
                loading: false,
            }
        case DRIVERS_ERROR:
            return {
                ...state,
                error: action.error,
                data: null,
            }
        case DRIVERS_SUCCESS:
            return {
                ...state,
                error: '',
                data: action.data,
            }
        default:
            return state
    }
}

export default driversReducer

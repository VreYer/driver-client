import {
    SHOW_LOADER,
    HIDE_LOADER,
    ADDRESS_ERROR,
    ADDRESS_SUCCESS,
} from '../types'
import { AppAction } from './actions'

interface AppState {
    loading: boolean
    coordinates: any
    address: string
    error: string
}

const initialState = {
    loading: false,
    error: '',
    coordinates: null,
    address: '',
}

const appReducer = (state: AppState = initialState, action: AppAction) => {
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
        case ADDRESS_ERROR:
            return {
                ...state,
                error: action.error,
                coordinates: null,
                address: '',
            }
        case ADDRESS_SUCCESS:
            return {
                ...state,
                error: '',
                coordinates: action.coordinates,
                address: action.address,
            }
        default:
            return state
    }
}

export default appReducer

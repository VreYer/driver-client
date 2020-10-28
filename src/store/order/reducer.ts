import { SHOW_LOADER, HIDE_LOADER, ORDER_ERROR, ORDER_SUCCESS } from '../types'
import { OrderAction } from './actions'
import { Order } from './type'

interface OrderState {
    loading: boolean
    data: Order
    error: string
}

const initialState = {
    loading: false,
    error: '',
    data: {} as Order,
}

const orderReducer = (
    state: OrderState = initialState,
    action: OrderAction
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
        case ORDER_ERROR:
            return {
                ...state,
                error: action.error,
                data: null,
            }
        case ORDER_SUCCESS:
            return {
                ...state,
                error: '',
                data: action.data,
            }
        default:
            return state
    }
}

export default orderReducer

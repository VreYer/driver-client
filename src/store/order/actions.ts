import {
    SHOW_LOADER,
    HIDE_LOADER,
    ORDER_CREATE,
    ORDER_SUCCESS,
    ORDER_ERROR,
} from '../types'
import { InfoData, Order } from './type'

export interface showLoaderAction {
    type: typeof SHOW_LOADER
}

export interface hideLoaderAction {
    type: typeof HIDE_LOADER
}

export interface createOrderAction {
    type: typeof ORDER_CREATE
    info: InfoData
}

export interface successOrderAction {
    type: typeof ORDER_SUCCESS
    data: Order
}

export interface errorOrderAction {
    type: typeof ORDER_ERROR
    error: string
}

export type OrderAction =
    | showLoaderAction
    | hideLoaderAction
    | createOrderAction
    | successOrderAction
    | errorOrderAction

export const showLoader = (): OrderAction => {
    return {
        type: SHOW_LOADER,
    }
}

export const hideLoader = (): OrderAction => {
    return {
        type: HIDE_LOADER,
    }
}

export const orderCreate = (info: InfoData): OrderAction => {
    return {
        type: ORDER_CREATE,
        info,
    }
}

export const orderSuccess = (data: Order): OrderAction => {
    return {
        type: ORDER_SUCCESS,
        data,
    }
}

export const orderError = (error: string): OrderAction => {
    return {
        type: ORDER_ERROR,
        error,
    }
}

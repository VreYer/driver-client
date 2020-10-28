import {
    SHOW_LOADER,
    HIDE_LOADER,
    ADDRESS_REQUEST,
    ADDRESS_SUCCESS,
    ADDRESS_ERROR,
} from '../types'

export interface showLoaderAction {
    type: typeof SHOW_LOADER
}

export interface hideLoaderAction {
    type: typeof HIDE_LOADER
}

export interface requestAddressAction {
    type: typeof ADDRESS_REQUEST
    method: number
    address: string
}

export interface successAddressAction {
    type: typeof ADDRESS_SUCCESS
    coordinates: any
    address: string
}

export interface errorAddressAction {
    type: typeof ADDRESS_ERROR
    error: string
}

export type AppAction =
    | showLoaderAction
    | hideLoaderAction
    | requestAddressAction
    | successAddressAction
    | errorAddressAction

export const showLoader = (): AppAction => {
    return {
        type: SHOW_LOADER,
    }
}

export const hideLoader = (): AppAction => {
    return {
        type: HIDE_LOADER,
    }
}

export const addressRequest = (method: number, address: string): AppAction => {
    return {
        type: ADDRESS_REQUEST,
        address,
        method,
    }
}

export const addressSuccess = (
    coordinates: any,
    address: string
): AppAction => {
    return {
        type: ADDRESS_SUCCESS,
        coordinates,
        address,
    }
}

export const addressError = (error: string): AppAction => {
    return {
        type: ADDRESS_ERROR,
        error,
    }
}

import {
    SHOW_LOADER,
    HIDE_LOADER,
    DRIVERS_REQUEST,
    DRIVERS_SUCCESS,
    DRIVERS_ERROR,
} from '../types'
import { Car, InfoData } from './type'

export interface showLoaderAction {
    type: typeof SHOW_LOADER
}

export interface hideLoaderAction {
    type: typeof HIDE_LOADER
}

export interface requestDriversAction {
    type: typeof DRIVERS_REQUEST
    info: InfoData
}

export interface successDriversAction {
    type: typeof DRIVERS_SUCCESS
    data: Car[]
}

export interface errorDriversAction {
    type: typeof DRIVERS_ERROR
    error: string
}

export type DriversAction =
    | showLoaderAction
    | hideLoaderAction
    | requestDriversAction
    | successDriversAction
    | errorDriversAction

export const showLoader = (): DriversAction => {
    return {
        type: SHOW_LOADER,
    }
}

export const hideLoader = (): DriversAction => {
    return {
        type: HIDE_LOADER,
    }
}

export const driversRequest = (info: InfoData): DriversAction => {
    return {
        type: DRIVERS_REQUEST,
        info,
    }
}

export const driversSuccess = (data: Car[]): DriversAction => {
    return {
        type: DRIVERS_SUCCESS,
        data,
    }
}

export const driversError = (error: string): DriversAction => {
    return {
        type: DRIVERS_ERROR,
        error,
    }
}

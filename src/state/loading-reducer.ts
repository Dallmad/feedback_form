import axios, {AxiosError} from 'axios'
import {Dispatch} from 'redux'
import {api} from '../api/api'
import {handleServerNetworkError} from '../components/Error/error'

const LOADING = 'LOADING'
const SET_SUCCESS = 'SET_SUCCESS'
const SET_ERROR = 'SET-ERROR'

const initialState = {
    isLoading: false,
    isSuccess: false,
    error: '',
}
export const loadingReducer = (state: InitialStateType = initialState, action: LoadingActionsType): InitialStateType => {
    switch (action.type) {
        case LOADING:
            return {...state, isLoading: action.isLoading}
        case SET_SUCCESS:
            return {...state, isSuccess: action.isSuccess}
        case SET_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}
// actions
export const loading = (isLoading: boolean) => ({type: LOADING, isLoading} as const)
export const successAC = (isSuccess: boolean) => ({type: SET_SUCCESS, isSuccess} as const)
export const setError = (error: string) => ({type: SET_ERROR, error} as const)


// thunks
export const createUserTC = (user: UserType) => async (dispatch: Dispatch) => {
    
    try {
        dispatch(loading(true))
        await api.createUsers(user)
        dispatch(successAC(true))
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkError(error.message, dispatch)
            dispatch(loading(false))
        }
    } finally {
        dispatch(loading(false))
    }
}

// types
type InitialStateType = typeof initialState
export type setErrorActionType = ReturnType<typeof setError>

export type LoadingActionsType =
    ReturnType<typeof loading>
    | ReturnType<typeof successAC>
    | setErrorActionType

export type UserType = {
    id: string
    firstAndLastName: string
    email: string
    phone: string
    birthDate: string
    message: string
}

function dispatch(arg0: { readonly type: 'LOADING'; readonly isLoading: boolean }) {
    throw new Error('Function not implemented.')
}

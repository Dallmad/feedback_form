import {AxiosResponse} from 'axios'
import { UserType } from '../state/loading-reducer';
import {instance} from './instance';

export const api = {
    getUsers(data: UserType) {
        return instance.get<UserType, AxiosResponse<ResponseType>>('users')
    },
    createUsers(data: UserType) {
        return instance.post<UserType>('users', data)
    }
}

//types
type ResponseType = {
    success?: boolean
    error?:string
}

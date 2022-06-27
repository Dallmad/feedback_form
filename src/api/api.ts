import {AxiosResponse} from 'axios'
import { UserType } from '../state/loading-reducer'
import {instance} from './instance'

export const api = {
    createUsers(data: UserType) {
        return instance.post<UserType>('users', data)
    }
}


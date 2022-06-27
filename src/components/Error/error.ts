import {Dispatch} from 'redux';
import {setError, setErrorActionType } from '../../state/loading-reducer';



export const handleServerNetworkError = (error: string , dispatch: Dispatch<setErrorActionType>) => {
    dispatch(setError(error ? error: 'Some error occurred'))
}
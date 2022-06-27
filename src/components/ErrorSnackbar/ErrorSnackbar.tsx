import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import s from './ErrorSnackbar.module.scss'
import {useEffect} from 'react';
import {loading, setError, successAC} from '../../state/loading-reducer';


export const ErrorSuccessSnackbar = () => {
    const error = useSelector<AppRootStateType, string>(state => state.loading.error)
    const success = useSelector<AppRootStateType, boolean>(state => state.loading.isSuccess)

    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(setError(''))
                dispatch(loading(false))
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [error])

    const handleClose = () => {
        dispatch(setError(''))
        dispatch(loading(false))
    }
    const handleCloseSuccess = () => {
        dispatch(successAC(false))
        dispatch(loading(false))
    }

    return (
        <>
            {error && <div onClick={handleClose} className={s.error}>{error}</div>}
            {success && <div onClick={handleCloseSuccess} className={s.success}>Success</div>}
        </>
    )
}
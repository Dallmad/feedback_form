import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {v1} from 'uuid'
import {ErrorSuccessSnackbar} from '../../components/ErrorSnackbar/ErrorSnackbar'
import {createUserTC, loading, successAC} from '../../state/loading-reducer'
import {AppRootStateType, useTypedDispatch} from '../../state/store'
import s from './FeedbackForm.module.scss'

export const FeedbackForm = () => {

    const dispatch = useTypedDispatch()

    const error = useSelector<AppRootStateType, string>(state => state.loading.error)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.loading.isLoading)
    const success = useSelector<AppRootStateType, boolean>(state => state.loading.isSuccess)

    const [inputValues, setInputValue] = useState<InputValueType>({
        id: v1(),
        firstAndLastName: '',
        email: '',
        phone: '',
        birthDate: '',
        message: '',
    })

    const [validation, setValidation] = useState<ValidationType>({
        firstAndLastName: '',
        email: '',
        phone: '',
        birthDate: '',
        message: '',
    })

    const [disable, setDisable] = useState<boolean>(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setInputValue({...inputValues, [name]: value})
    }

    const checkValidation = () => {
        let errors = validation

        //name validation
        const nameCond = /^([A-Z]{3,30})\s([A-Z]{3,30})$/i
        if (!inputValues.firstAndLastName.trim()) {
            errors.firstAndLastName = 'You need to enter your first and last name'
        } else if (!nameCond.test(inputValues.firstAndLastName)) {
            errors.firstAndLastName = 'First and last names must contain from 3 to 30 Latin letters'
        } else {
            errors.firstAndLastName = ''
        }

        //email validation
        const emailCond = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i
        if (!inputValues.email.trim()) {
            errors.email = 'Email is required'
        } else if (!emailCond.test(inputValues.email)) {
            errors.email = 'Please enter a valid email address'
        } else {
            errors.email = ''
        }

        //phone validation
        if (inputValues.phone.length < 16) {
            errors.phone = 'Phone is required'
        } else {
            errors.phone = ''
        }

        //message validation
        if (!inputValues.message.trim()) {
            errors.message = 'Message is required'
        } else if (inputValues.message.length < 10) {
            errors.message = 'Message must be longer than 10 characters'
        } else if (inputValues.message.length > 300) {
            errors.message = 'Message must be shorter than 300 characters'
        } else {
            errors.message = ''
        }
        setValidation(errors)

        if (validation.message
            || validation.email
            || validation.firstAndLastName
            || validation.phone
        ) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }

    const newMessage = {
        id: v1(),
        firstAndLastName: '',
        email: '',
        phone: '',
        birthDate: '',
        message: '',
    }
    useEffect(() => {
        if (isLoading || success || error) {
            setDisable(true)
        } else setDisable(false)
        if (success) {
            const timer = setTimeout(() => {
                dispatch(successAC(false))
                dispatch(loading(false))
                setInputValue(newMessage)
            }, 1500)
            return () => clearTimeout(timer)
        }
        checkValidation()
    }, [inputValues, success, isLoading, error])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        dispatch(createUserTC(inputValues))
        e.preventDefault()
    }

    const phoneFormat = (e: ChangeEvent<HTMLInputElement>) => {
        let content: string | string[] = e.currentTarget.value
        if (!content) return

        content = Array.from(content).filter(ltr => ltr.charCodeAt(0) > 47 && ltr.charCodeAt(0) < 58)

        let [countryCode, operatorCode, threeNumbers, firstTwoNumbers, secondTwoNumbers] = [
            content[0] = '7',
            content.slice(1, 4).join(''),
            content.slice(4, 7).join(''),
            content.slice(7, 9).join(''),
            content.slice(9, 11).join(''),
        ]

        e.currentTarget.value = countryCode.length ? `+${countryCode}` : ''
        if (operatorCode.length) e.target.value += `(${operatorCode}`
        if (threeNumbers.length) e.target.value += `)${threeNumbers}`
        if (firstTwoNumbers.length) e.target.value += `-${firstTwoNumbers}`
        if (secondTwoNumbers.length) e.target.value += `-${secondTwoNumbers}`

        setInputValue({...inputValues, phone: e.currentTarget.value})
    }

    return (
        <div className={s.container}>
            <form
                className={s.form}
                id="FeedbackForm"
                onSubmit={handleSubmit}
            >
                <div className={s.box}>
                    <input
                        className={s.input}
                        placeholder="First and Last Name"
                        name="firstAndLastName"
                        onChange={(e) => handleChange(e)}
                        value={inputValues.firstAndLastName.toUpperCase()}
                        autoFocus
                    />
                    {validation.firstAndLastName && <p className={s.error}>{validation.firstAndLastName}</p>}
                </div>
                
                <div className={s.box}>
                    <input
                        className={s.input}
                        type={'email'}
                        placeholder="email"
                        name="email"
                        onChange={(e) => handleChange(e)}
                        value={inputValues.email}
                        formNoValidate
                    />
                    {validation.email && <p className={s.error}>{validation.email}</p>}
                </div>

                <div className={s.box}>
                    <input
                        className={s.input}
                        placeholder="+7(___)___-__-__)"
                        type={'tel'}
                        name="phone"
                        onChange={(e) => phoneFormat(e)}
                        value={inputValues.phone}
                    />
                    {validation.phone && <p className={s.error}>{validation.phone}</p>}
                </div>

                <div className={s.box}>
                    <input
                        className={s.input}
                        type={'date'}
                        placeholder="Birth Date"
                        name="birthDate"
                        onChange={(e) => handleChange(e)}
                        value={inputValues.birthDate}
                    />
                    {validation.birthDate && <p className={s.error}>{validation.birthDate}</p>}
                </div>

                <div className={s.box}>
                    <input
                        className={s.input}
                        placeholder="Message"
                        name="message"
                        onChange={(e) => handleChange(e)}
                        value={inputValues.message}
                    />
                    {validation.message && <p className={s.error}>{validation.message}</p>}
                </div>

                <button type="submit" disabled={disable} className={s.submit}>
                    submit
                </button>
            </form>
            <ErrorSuccessSnackbar/>
        </div>
    )
}

//types
type InputValueType = {
    id: string
    firstAndLastName: string
    email: string
    phone: string
    birthDate: string
    message: string
}

type ValidationType = {
    firstAndLastName: string,
    email: string,
    phone: string,
    birthDate: string,
    message: string,
}
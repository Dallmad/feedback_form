import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v1} from 'uuid';
import {ErrorSuccessSnackbar} from '../../components/ErrorSnackbar/ErrorSnackbar';
import {InputPhone} from '../../components/Input/PhoneInput';
import {createUserTC, loading, successAC} from '../../state/loading-reducer';

import {AppRootStateType, useTypedDispatch} from '../../state/store';


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
    });

    const [validation, setValidation] = useState<ValidationType>({
        firstAndLastName: '',
        email: '',
        phone: '',
        birthDate: '',
        message: '',
    });

    const [disable, setDisable] = useState<boolean>(false)
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setInputValue({...inputValues, [name]: value});
    }

    const checkValidation = () => {
            let errors = validation;

            //first Name validation
            const nameCond = /^([A-Z]{3,30})\s([A-Z]{3,30})$/i
            if (!inputValues.firstAndLastName.trim()) {
                errors.firstAndLastName = 'You need to enter your first and last name';
            } else if (!nameCond.test(inputValues.firstAndLastName)) {
                errors.firstAndLastName = 'First or Last name is required!!';
            } else {
                errors.firstAndLastName = '';
            }

            // email validation
            const emailCond = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i
            if (!inputValues.email.trim()) {
                errors.email = 'Email is required';
            } else if (!emailCond.test(inputValues.email)) {
                errors.email = 'Please enter a valid email address';
            } else {
                errors.email = '';
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
            /* const cond1 = '/^(?=.*[a-z]).{6,20}$/';
             const cond2 = '/^(?=.*[A-Z]).{6,20}$/';
             const cond3 = '/^(?=.*[0-9]).{6,20}$/';
             const password = inputValues.password;
             if (!password) {
                 errors.password = "password is required";
             } else if (password.length < 6) {
                 errors.password = "Password must be longer than 6 characters";
             } else if (password.length >= 20) {
                 errors.password = "Password must shorter than 20 characters";
             } else if (!password.match(cond1)) {
                 errors.password = "Password must contain at least one lowercase";
             } else if (!password.match(cond2)) {
                 errors.password = "Password must contain at least one capital letter";
             } else if (!password.match(cond3)) {
                 errors.password = "Password must contain at least a number";
             } else {
                 errors.password = "";
             }
     */
            setValidation(errors);
        }
    ;
    const newMessage = {
        id: v1(),
        firstAndLastName: '',
        email: '',
        phone: '',
        birthDate: '',
        message: '',
    }
    useEffect(() => {
        if (isLoading||success||error) {
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
        checkValidation();
    }, [inputValues, success, isLoading, error]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        dispatch(createUserTC(inputValues))
        e.preventDefault();
    };

    return (
        <div>
            <div>
                <form
                    id="FeedbackForm"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <input
                            placeholder="First and Last Name"
                            name="firstAndLastName"
                            onChange={(e) => handleChange(e)}
                            value={inputValues.firstAndLastName.toUpperCase()}
                        />
                    </div>
                    {validation.firstAndLastName && <p>{validation.firstAndLastName}</p>}

                    <div>
                        <input
                            type={'email'}
                            placeholder="email"
                            name="email"
                            onChange={(e) => handleChange(e)}
                            value={inputValues.email}
                        />
                    </div>
                    {validation.email && <p>{validation.email}</p>}

                    <div>
                        {/* <select name="код">
                            <option value="РФ" selected={true}>+7</option>
                            <option value="Беларусь">+375</option>
                        </select>*/}
                        <input
                            placeholder="Phone Number"
                            name="phone"
                            onChange={(e) => handleChange(e)}
                            value={inputValues.phone}
                        />
                    </div>
                    {validation.phone && <p>{validation.phone}</p>}

                    <div>
                        <input
                            type={'date'}
                            placeholder="Birth Date"
                            name="birthDate"
                            onChange={(e) => handleChange(e)}
                            value={inputValues.birthDate}
                        />
                    </div>
                    {validation.birthDate && <p>{validation.birthDate}</p>}

                    <div>
                        <input
                            placeholder="Message"
                            name="message"
                            onChange={(e) => handleChange(e)}
                            value={inputValues.message}
                        />
                    </div>
                    {validation.message && <p>{validation.message}</p>}

                        <button type="submit" disabled={disable}>
                            submit
                        </button>
                </form>
                <ErrorSuccessSnackbar/>
            </div>
        </div>
    );
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
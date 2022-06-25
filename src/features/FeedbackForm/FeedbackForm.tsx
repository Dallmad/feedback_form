import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';

export const FeedbackForm = () => {
    const [inputValues, setInputValue] = useState<InputValueType>({
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

    //handle submit updates
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setInputValue({...inputValues, [name]: value});
    }

    const checkValidation = () => {
            let errors = validation;

            //first Name validation
            if (!inputValues.firstAndLastName.trim()) {
                errors.firstAndLastName = 'First or Last name is required';
            } else {
                errors.firstAndLastName = '';
            }

            // email validation
            const emailCond =
                "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/";
            if (!inputValues.email.trim()) {
                errors.email = 'Email is required';
            } else if (!inputValues.email.match(emailCond)) {
                errors.email = 'Please ingress a valid email address';
            } else {
                errors.email = '';
            }

            //message validation
            //const messageCond = '/^(?=.*[a-z]).{10,300}$/'
            if (!inputValues.message.trim()) {
                errors.message = "Message is required"
            } else if (inputValues.message.length < 10) {
                errors.message = "Message must be longer than 10 characters"
            } else if (inputValues.message.length > 300) {
                errors.message = "Message must be shorter than 300 characters"
            } else {
                errors.message = ""
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
            //matchPassword validation
            /* if (!inputValues.confirmPassword) {
                 errors.confirmPassword = "Password confirmation is required";
             } else if (inputValues.confirmPassword !== inputValues.Password) {
                 errors.confirmPassword = "Password does not match confirmation password";
             } else {
                 errors.password = "";
             }
     */
            setValidation(errors);
        }
    ;

    useEffect(() => {
        checkValidation();
    }, [inputValues]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div>
            <div>
                <form
                    id='FeedbackForm'
                    //action="/"
                    //method="POST"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <input
                            placeholder='First and Last Name'
                            name='firstAndLastName'
                            onChange={(e) => handleChange(e)}
                            value={inputValues.firstAndLastName}
                        />
                    </div>
                    {validation.firstAndLastName && <p>{validation.firstAndLastName}</p>}

                    <div>
                        <input
                            type={'email'}
                            placeholder='email'
                            name='email'
                            onChange={(e) => handleChange(e)}
                            value={inputValues.email}
                        />
                    </div>
                    {validation.email && <p>{validation.email}</p>}

                    <div>
                        <select name="код">
                            <option value="РФ" selected={true}>+7</option>
                            <option value="Беларусь">+375</option>
                        </select>
                        <input
                            placeholder='Phone Number'
                            name='phone'
                            onChange={(e) => handleChange(e)}
                            value={inputValues.phone}
                        />
                    </div>
                    {validation.phone && <p>{validation.phone}</p>}

                    <div>
                        <input
                            type={'date'}
                            placeholder='Birth Date'
                            name='birthDate'
                            onChange={(e) => handleChange(e)}
                            value={inputValues.birthDate}
                        />
                    </div>
                    {validation.birthDate && <p>{validation.birthDate}</p>}

                    <div>
                        <input
                            placeholder='Message'
                            name='message'
                            onChange={(e) => handleChange(e)}
                            value={inputValues.message}
                        />
                    </div>
                    {validation.message && <p>{validation.message}</p>}

                    <button type='submit'>
                        submit
                    </button>
                </form>
            </div>
        </div>
    );
}

//types
type InputValueType = {
    firstAndLastName: string,
    email: string,
    phone: string,
    birthDate: string,
    message: string,
}

type ValidationType = {
    firstAndLastName: string,
    email: string,
    phone: string,
    birthDate: string,
    message: string,
}
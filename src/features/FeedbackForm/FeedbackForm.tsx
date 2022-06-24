import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';

export const FeedbackForm = () => {
    const [inputValues, setInputValue] = useState({
        firstAndLastName: '',
        email: '',
        phone: null,
        birthDate: new Date(),
        message: '',
    });

    const [validation, setValidation] = useState({
        firstAndLastName: '',
        email: '',
        phone: null,
        birthDate: new Date(),
        message: '',
    });

    //handle submit updates
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputValue({ ...inputValues, [name]: value });
    }

    const checkValidation = () => {
        let errors = validation;

        //first Name validation
        if (!inputValues.firstAndLastName.trim()) {
            errors.firstAndLastName = "First or Last name is required";
        } else {
            errors.firstAndLastName = "";
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

        //password validation
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
    };

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
                    id="FeedbackForm"
                    //action="/"
                    //method="POST"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <input
                            placeholder="First and Last Name"
                            type="string"
                            name="firstAndLastName"
                            id="firstAndLastName"
                            onChange={(e) => handleChange(e)}
                            value={inputValues.firstAndLastName}
                        />
                        {validation.firstAndLastName && <p>{validation.firstAndLastName}</p>}
                        {/*{validation.firstAndLastName && console.log(validation)}*/}
                    </div>
                    {/*<div className="form-control">
                        <input
                            placeholder="Last Name"
                            type="string"
                            id="lName"
                            name="lName"
                            className="input-field"
                            onChange={(e) => handleChange(e)}
                            value={inputValues.lName}
                        />
                        {validation.lName && <p>{validation.lName}</p>}
                    </div>*/}
                    <div className="form-control">
                        <input
                            placeholder="email"
                            type="email"
                            name="email"
                            onChange={(e) => handleChange(e)}
                            value={inputValues.email}
                        />
                    </div>
                    {validation.email && <p>{validation.email}</p>}

                   {/* <div className="form-control">
                        <input
                            placeholder="password"
                            type="password"
                            name="password"
                            className="input-field"
                            onChange={(e) => handleChange(e)}
                            value={inputValues.password}
                            required
                        />
                        {validation.password && <p>{validation.password}</p>}
                    </div>*/}
                    {/*<div className="form-control">
                        <input
                            placeholder="confirm password"
                            type="password"
                            name="confirmPassword"
                            className="input-field"
                            onChange={(e) => handleChange(e)}
                            value={inputValues.confirmPassword}
                            required
                        />
                    </div>*/}
                    <button type="submit" id="submit-button">
                        submit
                    </button>
                </form>
            </div>
        </div>
    );
}
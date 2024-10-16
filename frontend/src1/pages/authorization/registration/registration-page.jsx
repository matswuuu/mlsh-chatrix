import {useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import {Trans, useTranslation} from "react-i18next";
import AuthorizationInput from "../authorization-input.jsx";
import "../authorization.css"

const CREATE_USER = gql`
    mutation CreateUser(
        $firstName: String!,
        $lastName: String!,
        $middleName: String,
        $password: String!,
        $email: String
    ) {
        createUser(
            firstName: $firstName,
            middleName: $middleName,
            lastName: $lastName,
            password: $password,
            email: $email
        ) {
            firstName
            middleName
            lastName
            password
            email
        }
    }
`;

const RegistrationPage = () => {
    const {t, i18n} = useTranslation();
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [error, setError] = useState('');

    const passwordRegex = /^(?=.*[A-ZА-Я])(?=.*[0-9])(?=.*[a-zа-я]).{8,}$/;
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    const inputNone = (inputId) => {
        const block = document.getElementById(`${inputId}-block`);
        block.classList.remove("input-error", "input-accept", "authorization-input-active");
    }

    const inputError = (inputId, error) => {
        const block = document.getElementById(`${inputId}-block`);
        block.classList.remove("input-error", "input-accept");
        block.classList.add("input-error");

        if (error !== undefined) {
            // document.getElementById(`${inputId}-error`).text(t(error));
            block.classList.remove("authorization-input-active");
            block.classList.add("authorization-input-active");
        }
    }

    const createUser = useMutation(CREATE_USER, {
        onCompleted: (data) => {
            console.log('User created successfully:', data);
        }, onError: (err) => {
            console.error("error", err);
            setError('An error occurred while creating the user.');
        },
    });

    const handleRegister = (e) => {
        e.preventDefault();

        if (email && !emailRegex.test(email)) {
            inputError("email", "registration.input.first-name.error")
            return;
        }

        if (password !== repeatedPassword || !passwordRegex.test(password)) {
            inputError("password", "registration.input.password.error")
            inputError("repeat-password", "registration.input.repeat-password.error")
            return;
        }

        createUser({variables: {email, firstName, middleName, lastName}});
    };

    return (<div className="block-auth">
            <div className="box-auth">
                <h2>{t('authorization.registration.form')}</h2>
                <form className="box-auth-form" onSubmit={handleRegister}>
                    <AuthorizationInput
                        id="full-name"
                        type="text"
                        placeholder="authorization.input.full-name.placeholder"
                        value={password}
                        onChange={(event) => {
                            // const u = event.target.value;
                            // username = u;
                            // setUsername(u);
                            //
                            // if (u.length === 0 || validateUsername(u))
                            //     setNone("username");
                            // else
                            //     setError("username", "authorization.input.username.error.invalid-username");
                            //
                            // checkWholeValidity();
                        }}
                    />
                    <AuthorizationInput
                        id="username"
                        type="text"
                        placeholder="authorization.input.username.placeholder"
                        value={password}
                        onChange={(event) => {
                            // const p = event.target.value;
                            // password = p;
                            // setPassword(p);
                            //
                            // if (p.length === 0 || validatePassword(p))
                            //     setNone("password");
                            // else
                            //     setError("password", "authorization.input.password.error.invalid-password");
                            //
                            // checkWholeValidity();
                        }}
                    />
                    <AuthorizationInput
                        id="password"
                        type="password"
                        placeholder="authorization.input.password.placeholder"
                        value={password}
                        onChange={(event) => {
                            // const p = event.target.value;
                            // password = p;
                            // setPassword(p);
                            //
                            // if (p.length === 0 || validatePassword(p))
                            //     setNone("password");
                            // else
                            //     setError("password", "authorization.input.password.error.invalid-password");
                            //
                            // checkWholeValidity();
                        }}
                    />
                    <AuthorizationInput
                        id="password-repeat"
                        type="password"
                        placeholder="authorization.input.password-repeat.placeholder"
                        value={password}
                        onChange={(event) => {
                            // const p = event.target.value;
                            // password = p;
                            // setPassword(p);
                            //
                            // if (p.length === 0 || validatePassword(p))
                            //     setNone("password");
                            // else
                            //     setError("password", "authorization.input.password.error.invalid-password");
                            //
                            // checkWholeValidity();
                        }}
                    />
                    <div className="block-checkbox">
                        <label className="box-checkbox">
                            <input id="agreed-input" name="reg" className="checkbox" type="checkbox"/>
                            <span>
                                <Trans
                                    i18nKey="authorization.politics-accept"
                                    components={{
                                        link: (
                                            <a href="/privacy-policy"                                                    className="link"/>
                                        )
                                    }}
                                />
                            </span>
                        </label>
                    </div>
                    <button className="auth-button" id="registration-button" type="submit"
                            disabled={true}>{t('authorization.registration.submit-button')}</button>
                    <text className="text">{t("authorization.unnecessary-parameter")}</text>
                </form>
            </div>
    </div>);
};

export default RegistrationPage;
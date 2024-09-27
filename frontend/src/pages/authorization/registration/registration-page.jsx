import {useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import {useTranslation} from "react-i18next";
import AuthorizationInput from "../../../component/authorization/authorization-input.jsx";
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
        block.classList.remove("input-error", "input-accept", "box-input-active");
    }

    const inputError = (inputId, error) => {
        const block = document.getElementById(`${inputId}-block`);
        block.classList.remove("input-error", "input-accept");
        block.classList.add("input-error");

        if (error !== undefined) {
            // document.getElementById(`${inputId}-error`).text(t(error));
            block.classList.remove("box-input-active");
            block.classList.add("box-input-active");
        }
    }

    const [createUser, {loading}] = useMutation(CREATE_USER, {
        onCompleted: (data) => {
            console.log('User created successfully:', data);
        },
        onError: (err) => {
            console.error("error", err);
            setError('An error occurred while creating the user.');
        },
    });

    const handleRegister = (e) => {
        e.preventDefault();

        if (email && !emailRegex.test(email)) {
            inputError("email","registration.input.first-name.error")
            return;
        }

        if (password !== repeatedPassword || !passwordRegex.test(password)) {
            inputError("password","registration.input.password.error")
            inputError("repeat-password","registration.input.repeat-password.error")
            return;
        }

        createUser({variables: {email, firstName, middleName, lastName}});
    };

    return (
        <div className="block-auth">
            <div className="box-auth">
                <h2>{t('registration.form')}</h2>
                <form className="box-auth-form" onSubmit={handleRegister}>
                    <AuthorizationInput
                        id="name"
                        type="text"
                        placeholder="registration.input.name.placeholder"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                    <AuthorizationInput
                        id="password"
                        type="text"
                        placeholder="registration.input.password.placeholder"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <AuthorizationInput
                        id="repeat-password"
                        type="text"
                        placeholder="registration.input.repeat-password.placeholder"
                        value={repeatedPassword}
                        onChange={(event) => setRepeatedPassword(event.target.value)}
                    />
                    <AuthorizationInput
                        id="email"
                        type="email"
                        placeholder="registration.input.email.placeholder"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <button className="auth-button" id="register-button" type="submit" disabled="">{t('registration.button-confirm')}</button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;
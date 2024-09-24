import {useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import {useTranslation} from "react-i18next";
import PropTypes, {element} from 'prop-types';
import "./registration.css"

const CREATE_USER = gql`
    mutation CreateUser($email: String, $firstName: String!, $middleName: String, $lastName: String!) {
        createUser(email: $email, firstName: $firstName, middleName: $middleName, lastName: $lastName) {
            id
            email
            firstName
            middleName
            lastName
        }
    }
`;

const Registration = () => {
    const {t, i18n} = useTranslation();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const passwordRegex = /^(?=.*[A-ZА-Я])(?=.*[0-9])(?=.*[a-zа-я]).{8,}$/;
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    const inputNone = (inputId) => {
        (`#${inputId}-error-block`).removeClass("input-error input-accept box-input-active");
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

    const validateEmail = (email) => {
        return emailRegex.test(email);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (email && !validateEmail(email)) {
            inputError("email","registration.input.first-name.error")
            setError('Invalid email format.');
            return;
        }

        setError('');
        createUser({variables: {email, firstName, middleName, lastName}});
    };

    const InputBox = ({id, type, placeholder, value, onChange}) => {
        return (
            <div className="box-input" id={`${id}-block`}>
                <input
                    id={id}
                    type={type}
                    placeholder={t(placeholder)}
                    value={value}
                    onChange={onChange}
                />
                <text id={`${id}-error`}></text>
            </div>
        )
    }

    InputBox.propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    return (
        <div>
            <h2>User Registration</h2>
            <form className="box-auth-form" onSubmit={handleRegister}>
                <InputBox
                    id="first-name"
                    type="text"
                    placeholder="registration.input.first-name.placeholder"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />
                <InputBox
                    id="last-name"
                    type="text"
                    placeholder="registration.input.last-name.placeholder"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
                <InputBox
                    id="middle-name"
                    type="text"
                    placeholder="registration.input.middle-name.placeholder"
                    value={middleName}
                    onChange={(event) => setMiddleName(event.target.value)}
                />
                <InputBox
                    id="password"
                    type="text"
                    placeholder="registration.input.password.placeholder"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <InputBox
                    id="repeat-password"
                    type="text"
                    placeholder="registration.input.repeat-password.placeholder"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <InputBox
                    id="email"
                    type="email"
                    placeholder="registration.input.email.placeholder"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Registration;
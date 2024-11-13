import AuthorizationInput, {
    setError, setNone,
    validatePassword,
    validateUsername
} from "../authorization-input.jsx";
import {useTranslation} from "react-i18next";
import {useEffect, useRef, useState} from "react";
import {gql, useMutation} from "@apollo/client";
import {useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password)
    }
`

const LoginPage = () => {
    const navigate = useNavigate();
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const buttonRef = useRef(null)
    const {t} = useTranslation();

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    const [logged, setLogged] = useState(false);

    const [login] = useMutation(LOGIN, {
        onCompleted: (data) => {
            const token = data["login"];
            localStorage.setItem("token", token);

            const decoded = jwtDecode(token);
            localStorage.setItem("user_id", decoded["id"]);

            setLogged(true);
        },
        onError: (error) => {
            console.error("error", error);
        }
    });

    useEffect(() => {
        usernameRef.current = document.getElementById('username-block');
        passwordRef.current = document.getElementById('password-block');
        buttonRef.current = document.getElementById('login-button');

        if (logged) navigate("/chat");
    });

    const checkWholeValidity = () => {
        buttonRef.current.disabled = !(
            username.length > 0 && !usernameRef.current.classList.contains("input-error") &&
            password.length > 0 && !passwordRef.current.classList.contains("input-error")
        );
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        buttonRef.current.disabled = true;
        await login({variables: {username: username, password: password}});
    }

    return (
        <div className="block-auth">
            <div className="box-auth">
                <h2>{t('authorization.login.form')}</h2>
                <form className="box-auth-form" onSubmit={handleLogin}>
                    <AuthorizationInput
                        id="username"
                        type="text"
                        placeholder="authorization.input.username.placeholder"
                        value={username}
                        onChange={(event) => {
                            username = event.target.value;
                            setUsername(username);

                            if (username.length === 0 || validateUsername(username))
                                setNone("username");
                            else
                                setError("username", "authorization.input.username.error.invalid-username");

                            checkWholeValidity();
                        }}
                    />
                    <AuthorizationInput
                        id="password"
                        type="password"
                        placeholder="authorization.input.password.placeholder"
                        value={password}
                        onChange={(event) => {
                            password = event.target.value;
                            setPassword(password);

                            if (password.length === 0 || validatePassword(password))
                                setNone("password");
                            else
                                setError("password", "authorization.input.password.error.invalid-password");

                            checkWholeValidity();
                        }}
                    />
                    <button className="auth-button" id="login-button" type="submit" disabled={true}>
                        {t('authorization.login.submit-button')}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
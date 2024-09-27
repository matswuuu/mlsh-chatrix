import AuthorizationInput from "../../../component/authorization/authorization-input.jsx";
import "../authorization.css"
import {useTranslation} from "react-i18next";
import {useState} from "react";

const LoginPage = () => {
    const {t} = useTranslation();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {

    }

    return (
        <div className="block-auth">
            <div className="box-auth">
                <h2>{t('registration.form')}</h2>
                <form className="box-auth-form" onSubmit={handleLogin}>
                    <AuthorizationInput
                        id="name"
                        type="text"
                        placeholder="registration.input.name.placeholder"
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                    <AuthorizationInput
                        id="password"
                        type="text"
                        placeholder="registration.input.password.placeholder"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button className="auth-button" id="register-button" type="submit"
                            disabled="">{t('registration.button-confirm')}</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
import i18n from "i18next";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

export const validateUsername = (username) =>
    username != null && username.length > 3

export const validatePassword = (password)=>
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(password);

export const setNone = (id) => {
    document.getElementById(`${id}-block`).classList
        .remove("input-error", "input-accept", "authorization-input-active")
}

export const setError = (id, error) => {
    const block= document.getElementById(`${id}-block`);
    block.classList.add("input-error");

    if (error !== undefined) {
        document.getElementById(`${id}-error`).textContent = i18n.t(error);
        block.classList.remove("authorization-input-active");
        block.classList.add("authorization-input-active");
    }
};

const AuthorizationInput = ({id, type, placeholder, value, onChange}) => {
    const {t} = useTranslation();

    AuthorizationInput.propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    return (
        <div className="authorization-input" id={`${id}-block`}>
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

export default AuthorizationInput;
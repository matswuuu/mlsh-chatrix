import {useTranslation} from "react-i18next";
import PropTypes from 'prop-types';

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

export default AuthorizationInput;
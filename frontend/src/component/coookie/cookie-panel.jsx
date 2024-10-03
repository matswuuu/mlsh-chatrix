import i18n from "i18next";
import {useTranslation} from "react-i18next";

const CookiePanel = () => {
    const {t} = useTranslation();

    return (
        <div id="cookiePanel" className="block-cookie">
            <div className="cookie">
                <text>{t("cookie.confirm.usage")}</text>
                <button id="cookieBtn" className="cookie-btn">Окей</button>
            </div>
        </div>
    )
}

export default CookiePanel
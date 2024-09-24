// import { useState } from 'react'
import './App.css'
import Registration from "./component/registration.jsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function App() {
    const { t, i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

    const handleChangeLanguage = () => {
        const newLanguage = currentLanguage === "en" ? "ru" : "en";
        setCurrentLanguage(newLanguage);
        i18n.changeLanguage(newLanguage)
    }

    return (
        <div>
            <h1>{t('test')}</h1>
            <h3>
                Current Language: {currentLanguage}
            </h3>
            <button
                type="button"
                onClick={handleChangeLanguage}
            >
                Change Language
            </button>


            <Registration/>
        </div>
    );
}

export default App

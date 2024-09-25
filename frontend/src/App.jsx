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
        <>
            <Registration/>
        </>
    );
}

export default App

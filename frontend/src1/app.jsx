import {useState} from "react";
import {useTranslation} from "react-i18next";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import RegistrationPage from "./pages/authorization/registration/registration-page.jsx";
import LoginPage from "./pages/authorization/login/login-page.jsx";
import ChatPage from "./pages/chat/chat.jsx";
import CookiePanel from "./component/coookie/cookie-panel.jsx";

function App() {
    const {t, i18n} = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

    const handleChangeLanguage = () => {
        const newLanguage = currentLanguage === "en" ? "ru" : "en";
        setCurrentLanguage(newLanguage);
        i18n.changeLanguage(newLanguage)
    }

    return (
        <Router>
            <Routes>
                <Route exact path="/registration" element={<RegistrationPage/>}/>
                <Route exact path="/login" element={<LoginPage/>}/>
                <Route exact path="/chat" element={<ChatPage/>}/>
            </Routes>
            {/*<CookiePanel/>*/}
        </Router>
    );
}

export default App

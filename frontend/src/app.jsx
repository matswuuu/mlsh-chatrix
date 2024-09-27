import {useState} from "react";
import {useTranslation} from "react-i18next";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import RegistrationPage from "./pages/authorization/registration/registration-page.jsx";
import LoginPage from "./pages/authorization/login/login-page.jsx";

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
            {/*<Navbar />*/}
            <Routes>
                <Route exact path="/registration" element={<RegistrationPage/>}/>
                <Route exact path="/login" element={<LoginPage/>}/>
                {/*<Route path="/about" element={<About />} />*/}
                {/*<Route*/}
                {/*    path="/contact"*/}
                {/*    element={<Contact />}*/}
                {/*/>*/}
                {/*<Route path="/blogs" element={<Blogs />} />*/}
                {/*<Route*/}
                {/*    path="/sign-up"*/}
                {/*    element={<SignUp />}*/}
                {/*/>*/}
            </Routes>
        </Router>
    );
}

export default App

import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import ChatPage from "./pages/chat/chat-page.jsx";
import LoginPage from "./pages/authorization/login/login-page.jsx";
import RegistrationPage from "./pages/authorization/registration/registration-page.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    exact path="/registration"
                    element={localStorage.getItem("token") ? <ChatPage/> : <RegistrationPage/>}
                />
                <Route
                    exact path="/login"
                    element={localStorage.getItem("token") ? <ChatPage/> : <LoginPage/>}
                />
                <Route
                    exact path="/chat"
                    element={localStorage.getItem("token") ? <ChatPage/> : <Navigate to="/login"/>}
                />
                <Route exact path="/*" element={<Navigate to='/login' replace />}/>
            </Routes>
            {/*<CookiePanel/>*/}
        </Router>
    );
}

export default App;

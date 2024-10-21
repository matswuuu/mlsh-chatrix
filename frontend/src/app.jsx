import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import RegistrationPage from "./pages/authorization/registration/registration-page.jsx";
import LoginPage from "./pages/authorization/login/login-page.jsx";
import ChatPage from "./pages/chat/chat-page.jsx";

const App = () => {
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

export default App;
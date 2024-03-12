import { Route, Routes } from "react-router-dom";
import PageLayout from "./pages/PageLayout";
import { DiVim } from "react-icons/di";
import Logout from "./security/Logout";
import Login from "./security/Login";
import Signup from "./security/Signup";
import SignInPage from "./pages/SignInPage";

function App() {
    return (
        <>
            <PageLayout>
                <Routes>
                    <Route path="/" element={<div>Startpage</div>} />
                    <Route path="/home" element={<div>Home</div>} />
                    <Route path="/login" element={<SignInPage />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </PageLayout>
        </>
    );
}

//<Route path="/" element="home" />
export default App;

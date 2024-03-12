import { Route, Routes } from "react-router-dom";
import PageLayout from "./pages/PageLayout";
import Logout from "./security/Logout";
import SignInPage from "./pages/SignInPage";
import { Toaster } from "@/components/ui/toaster";

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
                <Toaster/>
            </PageLayout>
        </>
    );
}

//<Route path="/" element="home" />
export default App;

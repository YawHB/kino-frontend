import { Route, Routes } from "react-router-dom";
import PageLayout from "./pages/PageLayout";
import Logout from "./security/Logout";
import SignInPage from "./pages/SignInPage";
import { Toaster } from "@/components/ui/toaster";
import RequireKino from "./security/RequireKino";
import RequireAuth from "./security/RequireAuth";

function App() {
    return (
        <>
            <PageLayout>
                <Routes>
                    <Route path="/" element={<div>Startpage</div>} />
                    <Route
                        path="/home"
                        element={
                            <RequireKino>
                                <div>Home</div>
                            </RequireKino>
                        }
                    />
                    <Route path="/login" element={<SignInPage />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route
                        path="/admin"
                        element={
                            <RequireAuth roles={["ADMIN"]}>
                                <div>Admin</div>
                            </RequireAuth>
                        }
                    />
                </Routes>
            </PageLayout>
            <Toaster />
        </>
    );
}

//<Route path="/" element="home" />
export default App;

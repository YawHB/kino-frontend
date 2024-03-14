import { Route, Routes } from "react-router-dom";
import PageLayout from "./pages/PageLayout";
import Logout from "./security/Logout";
import SignInPage from "./pages/SignInPage";
import { Toaster } from "@/components/ui/toaster";
import RequireKino from "./security/RequireKino";
import RequireAuth from "./security/RequireAuth";
import StartPage from "./pages/StartPage";       
import ProfilePage from "./pages/ProfilePage";
import MovieListPage from "./pages/MovieListPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";



function App() {
    return (
        <>
            <PageLayout>
                <Routes>
                    <Route path="/" element={<StartPage />} />
                    <Route path="/movies">
                        <Route
                            index
                            element={
                                <RequireKino>
                                    <MovieListPage />
                                </RequireKino>
                            }
                        />
                        <Route path=":id" element={<MovieDetailsPage />} />
                    </Route>
                    <Route path="/login" element={<SignInPage />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route
                        path="/admin"
                        element={
                            <RequireAuth roles={['ADMIN']}>
                                <div>Admin</div>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <RequireAuth roles={["USER"]}>
                                <ProfilePage/>
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

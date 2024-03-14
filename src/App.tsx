import { Route, Routes } from "react-router-dom";
import PageLayout from "./pages/PageLayout";
import Logout from "./security/Logout";
import SignInPage from "./pages/SignInPage";
import { Toaster } from "@/components/ui/toaster";
import RequireKino from "./security/RequireKino";
import RequireAuth from "./security/RequireAuth";
import StartPage from "./pages/StartPage";
import MovieListPage from "./pages/MovieListPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage.tsx";
import CreateMoviePage from "@/pages/CreateMoviePage.tsx";

function App() {
    return (
        <>
            <PageLayout>
                <Routes>
                    <Route path="/" element={<StartPage />} />
                    <Route path="/movies">
                        <Route index element={
                            <RequireKino>
                                <MovieListPage/>
                            </RequireKino>
                        } />
                        <Route path=":id" element={<MovieDetailsPage/>}/>
                    </Route>
                    <Route path="/login" element={<SignInPage />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/admin">
                        <Route
                            index
                            element={
                                <RequireAuth roles={["ADMIN"]}>
                                    <AdminDashboardPage/>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={"movie"}
                            element={
                                <RequireAuth roles={["ADMIN"]}>
                                    <CreateMoviePage/>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={"screening"}
                            element={
                                <RequireAuth roles={["ADMIN"]}>
                                    <div>Create screening</div>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={"reservations"}
                            element={
                                <RequireAuth roles={["ADMIN"]}>
                                    <div>See reservations</div>
                                </RequireAuth>
                            }
                        />
                    </Route>


                    <Route
                        path="/profile"
                        element={
                            <RequireAuth roles={["USER"]}>
                                <div>My Profile</div>
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

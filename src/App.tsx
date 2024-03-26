import { Route, Routes } from "react-router-dom";
import PageLayout from "./components/layouts/PageLayout";
import Logout from "./security/Logout";
import SignInPage from "./pages/SignInPage";
import { Toaster } from "@/components/ui/toaster";
import RequireKino from "./security/RequireKino";
import RequireAuth from "./security/RequireAuth";
import StartPage from "./pages/StartPage";
import ProfilePage from "./pages/ProfilePage";
import MovieListPage from "./pages/MovieListPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage.tsx";
import CreateMoviePage from "@/pages/CreateMoviePage.tsx";
import CreateScreeningPage from "@/pages/CreateScreeningPage.tsx";
import ScreeningPage from "@/pages/ScreeningPage.tsx";
import SubmitReservationPage from "@/pages/SubmitReservationPage.tsx";

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
                    <Route path="/admin">
                        <Route
                            index
                            element={
                                <RequireAuth roles={["ADMIN"]}>
                                    <AdminDashboardPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={"movie"}
                            element={
                                <RequireAuth roles={["ADMIN"]}>
                                    <CreateMoviePage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={"screening"}
                            element={
                                <RequireAuth roles={["ADMIN"]}>
                                    <CreateScreeningPage />
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
                                <ProfilePage />
                            </RequireAuth>
                        }
                    />
                    <Route path="/screening">
                        <Route
                            index
                            element={
                                <RequireAuth roles={["USER"]}>
                                    <ScreeningPage />
                                </RequireAuth>
                            }
                        />

                        <Route
                            path=":screeningId"
                            element={
                                <RequireAuth roles={["USER"]}>
                                    <SubmitReservationPage />
                                </RequireAuth>
                            }
                        />
                    </Route>
                    <Route path="*" element={<h2>Not found</h2>} />
                </Routes>
            </PageLayout>
            <Toaster />
        </>
    );
}

//<Route path="/" element="home" />
export default App;

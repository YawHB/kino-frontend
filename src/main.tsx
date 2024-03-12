import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./contexts/AuthProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import KinoProvider from "./contexts/KinoProvidor.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <KinoProvider>
                    <App />
                </KinoProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);

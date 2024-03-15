import { useKino } from "@/contexts/KinoProvider";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireKino({ children }: { children: ReactNode }) {
    const { kino } = useKino();
    const location = useLocation();

    if (!kino) {
        //vælg biograf
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}

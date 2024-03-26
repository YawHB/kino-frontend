import { ReactNode, useEffect } from "react";
import { useKino } from "../../contexts/KinoProvider";
import NavHeader from "./NavHeader";
import { useNavigate } from "react-router-dom";

type Props = {
    children: ReactNode;
};

export default function PageLayout({ children }: Props) {
    const { kino } = useKino();
    const navigate = useNavigate();

    useEffect(() => {
        if (kino) navigate("/movies");
    }, []);

    return (
        <>
            {kino && <NavHeader />}
            <main className="m-8">{children}</main>
        </>
    );
}

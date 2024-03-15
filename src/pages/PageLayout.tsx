import { ReactNode } from "react";
import {  useKino} from "../contexts/KinoProvider";
import NavHeader from "../components/layouts/NavHeader";

type Props = {
    children: ReactNode;
};

export default function PageLayout({ children }: Props) {
    const {kino} = useKino();

    return (
        <>
            {kino && <NavHeader />}
            <main className="m-8">
                {children}
            </main>
        </>
    );
}

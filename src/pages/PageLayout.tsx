import { ReactNode } from "react"
import NavHeader from "../components/layouts/NavHeader";

type Props = {
    children: ReactNode;
}


export default function PageLayout({children}: Props) {



    return (
        <>
            <NavHeader/>
            {children}
        </>
    )
}
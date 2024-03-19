import Auditorium from "@/components/core/Auditorium";
import { IScreening } from "@/models/screening";
import { useLocation } from "react-router-dom";

const ScreeningPage = () => {
    const screening = useLocation().state as IScreening;

    console.log(screening);

    return (
        <>
            <h1>Screening Page</h1>
            <Auditorium screening={screening} />
        </>
    );
}

export default ScreeningPage;
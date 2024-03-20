import Auditorium from "@/components/core/Auditorium";
import SeatPricing from "@/components/core/SeatPricing";
import { IScreening } from "@/models/screening";
import { Iseat } from "@/models/seat";
import { useState } from "react";
import {Link, useLocation} from "react-router-dom";
import Button from "@/components/core/Button.tsx";

const ScreeningPage = () => {
    const screening = useLocation().state as IScreening;
    const [selectedSeats, setSelectedSeats] = useState<Iseat[]>([]);

    function handleSeatClick(seat: Iseat) {
        if (selectedSeats.includes(seat)) {
            const filteredSeats = selectedSeats.filter((currSeat) => currSeat !== seat);
            setSelectedSeats(filteredSeats);
        } else {
            setSelectedSeats((prev) => [...prev, seat]);
        }
    }

    return (
        <>
            <h1 className={"text-center my-4"}>Screening Page</h1>
            <div className={"flex flex-wrap justify-center gap-5"}>

                <Auditorium screening={screening} handleSeatClick={handleSeatClick}/>

                <div className={"flex flex-col gap-5"}>
                    <SeatPricing seats={selectedSeats} is3D={screening.is3D} runtime={screening.movie.runtime}/>
                    <div className={"flex justify-end"}>
                        <Link to={`${screening.id}`} state={selectedSeats}><Button>Continue</Button></Link>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ScreeningPage;

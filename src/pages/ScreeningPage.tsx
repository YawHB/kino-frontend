import Auditorium from "@/components/core/Auditorium";
import SeatPricing from "@/components/core/SeatPricing";
import { IScreening } from "@/models/screening";
import { Iseat } from "@/models/seat";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@/components/core/Button.tsx";
import ScreeningInfo from "@/components/core/ScreeningInfo";
import ScreeningTicketFooter from "@/components/layouts/ScreeningTicketFooter";
import Seat from "@/components/core/Seat";
import SeatIcon from "@/components/core/SeatIcon";

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
            <ScreeningInfo screening={screening} />

            <div className={"flex flex-wrap justify-center gap-4 sm:mb-32 sm:gap-10"}>
                <Auditorium screening={screening} handleSeatClick={handleSeatClick} />

                <div className={"mb-20 flex flex-col gap-5"}>
                    <div className="flex gap-2 justify-between">
                        <SeatIcon color="#22c55e" text="Available" />
                        <SeatIcon color="#3b82f6" text="Selected" />
                        <SeatIcon color="#dc2626" text="Occupied" />
                    </div>

                    <SeatPricing seats={selectedSeats} is3D={screening.is3D} runtime={screening.movie.runtime} />
                    <div className={"flex justify-center"}>
                        <Link to={`${screening.id}`} state={selectedSeats}>
                            <Button style="secondary">Continue</Button>
                        </Link>
                    </div>
                </div>
            </div>

            <ScreeningTicketFooter selectedSeats={selectedSeats} />
        </>
    );
};

export default ScreeningPage;

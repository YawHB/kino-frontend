import { useEffect, useState } from "react";
import { getReservedSeatsByScreeningId, getSeatsByAuditoriumId } from "@/services/apiFacade.ts";
import { Iseat } from "@/models/seat.ts";
import { toast } from "@/components/ui/use-toast";
import Seat from "@/components/core/Seat.tsx";
import { IScreening } from "@/models/screening";

// probs = screening object
type Props = {
    screening: IScreening;
    handleSeatClick: (seat: Iseat) => void;
};

export default function Auditorium({ screening, handleSeatClick }: Props) {
    const [seats, setSeats] = useState<Iseat[] | null>(null);
    const [reservedSeats, setReservedSeats] = useState<Iseat[] | null>(null);

    useEffect(() => {
        getSeatsByAuditoriumId(screening.auditorium.id)
            .then((seats) => {
                setSeats(seats);
            })
            .catch(() => {
                toast({
                    title: "Error fetching seats!",
                    description: "We could not find any seats for this auditorium, please reload page, or try again later.",
                    variant: "destructive",
                });
            });

        getReservedSeatsByScreeningId(screening.id)
            .then((reserved) => {
                console.log(reserved);

                setReservedSeats(reserved);
            })
            .catch(() => {
                toast({
                    title: "Error fetching Reserved seats!",
                    description: "We could not find any reserved seats for this auditorium, please reload page, or try again later.",
                    variant: "destructive",
                });
            });
    }, []); // figure out what to do with dependency array when not hardcoding id value

    const lastSeat = seats?.[seats.length - 1];
    const numberOfRows = lastSeat?.rowNumber;
    const seatsPerRow = lastSeat?.seatNumber;

    // console.log(`numberOfRows: ${numberOfRows}`);
    // console.log(`seatsPerRow: ${seatsPerRow}`);

    //TODO: fetch reservations ud fra screenings id (ikke relevant endnu)

    return (
        // cols = seatsPerRow
        // rows = numberOfRows
        <>
            {seats && reservedSeats && (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${seatsPerRow}, minmax(0, 1fr))`,
                        gridGap: "0.25rem",
                        width: "33.333333%",
                        /*marginLeft: "auto",
                        marginRight: "auto",*/
                    }}
                >
                    {seats?.map((seat) => (
                        <Seat
                            key={seat.id}
                            seat={seat}
                            onSeatClick={handleSeatClick}
                            disabled={reservedSeats.some((reserved) => reserved.id == seat.id)}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
// overordnet auditorium component
// grid(rows, seatPerRow)
// seat components i grid

//reservedSeats?.includes(seat)

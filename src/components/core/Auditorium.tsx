import {useEffect, useState} from "react"
import {getSeatsByAuditoriumId} from "@/services/apiFacade.ts";
import {Iseat} from "@/models/seat.ts";
import { toast } from '@/components/ui/use-toast';
import Seat from "@/components/core/Seat.tsx";
import SeatPricing from "./SeatPricing";

// probs = screening object

export default function Auditorium () {
const [seats, setSeats] = useState<Iseat[] | null>(null);
const [reservedSeats, setReservedSeats] = useState<Iseat[]>([])


function handleSeatClick(seat: Iseat) {
    console.log("seat:");
    console.log(seat)
    console.log("reserved seats:")
    
    if(reservedSeats.some((currSeat) => currSeat === seat)) {
        const filteredSeats = reservedSeats.filter((currSeat) => currSeat !== seat);
        setReservedSeats(prev => filteredSeats);
    } else {
        setReservedSeats(prev => [...prev, seat])
    }
    
    // console.log(reservedSeats)
}



    useEffect(() => {
        getSeatsByAuditoriumId(6)
            .then(seats => {
                console.log(seats);
                setSeats(seats)
            })
            .catch(()=> {
                toast({
                    title: "Error fetching seats!",
                    description: "We could not find any seats for this auditorium, please reload page, or try again later.",
                    variant: "destructive",
                    });
            });
    }, []); // figure out what to do with dependency array when not hardcoding id value

    const lastSeat = seats?.[seats.length - 1];
    const numberOfRows = lastSeat?.rowNumber;
    const seatsPerRow = lastSeat?.seatNumber;

    console.log(`numberOfRows: ${numberOfRows}`);
    console.log(`seatsPerRow: ${seatsPerRow}`);
    
    //TODO: fetch reservations ud fra screenings id (ikke relevant endnu)


    return (
        // cols = maxSeats
        // rows = maxRows 
        // DO NOT TOUCH THIS - IT WILL BREAK MAGICALLY (not a joke)
        <>
            <SeatPricing seats={reservedSeats}/>
            <div className={`grid grid-cols-${seatsPerRow} gap-1 w-1/3 mx-auto`}>
                {seats?.map((seat, index) => <Seat seat={seat} onSeatClick={handleSeatClick}/>)}
            
            </div>
        </>
    )
}
// overordnet auditorium component
// grid(rows, seatPerRow)
// seat components i grid
import {useEffect, useState} from "react"
import {getSeatsByAuditoriumId} from "@/services/apiFacade.ts";
import {Iseat} from "@/models/seat.ts";
import { toast } from '@/components/ui/use-toast';

// probs = screening object

export default function Auditorium () {
const [seats, setSeats] = useState<Iseat[] | null>(null);
    useEffect(() => {
        getSeatsByAuditoriumId(1)
            .then(seats => {
                console.log(seats)
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

    const highestValues = seats?.reduce((acc, seat) => {
        if (seat.rowNum > acc.highestRowNum) {
            acc.highestRowNum = seat.rowNum;
        }
        if (seat.seatNum > acc.highestSeatNum) {
            acc.highestSeatNum = seat.seatNum;
        }
        return acc;
    }, { highestRowNum: 0, highestSeatNum: 0 });

    console.log(highestValues!.highestRowNum)
    console.log(highestValues!.highestSeatNum)



    //TODO: fetch reservations ud fra screenings id (ikke relevant endnu)


    return (
        <>
        <section className="bg-amber-800 size-10" ></section>
        </>
    )
}


// overordnet auditorium component
// grid(rows, seatPerRow)
// seat components i grid
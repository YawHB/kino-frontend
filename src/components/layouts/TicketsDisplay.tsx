import { Iseat } from "@/models/seat";
import Ticket from "../core/Ticket";

interface Props {
    selectedSeats: Iseat[];
}

export default function TicketsDisplay({ selectedSeats }: Props) {
    
    return (

        <div className="flex justify-center gap-2">
            {selectedSeats.map(seat => <Ticket key={seat.id} seat={seat}/>)}
        </div>
    );
}

import React from "react";
import TicketsDisplay from "./TicketsDisplay";
import { Iseat } from "@/models/seat";
interface Props {
    selectedSeats: Iseat[];
}

export default function ScreeningTicketFooter({ selectedSeats }: Props) {
    return (
        <footer
            className="fixed 
             inset-x-0 bottom-0 h-20
              bg-slate-600 
             bg-opacity-80 
             p-4 
             text-white
             backdrop-blur-sm"
        >
            <TicketsDisplay selectedSeats={selectedSeats} />
        </footer>
    );
}

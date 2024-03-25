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
              bg-slate-500 
             bg-opacity-100 
             text-white
             backdrop-blur-sm"
        >
            <div className="flex justify-between items-center h-full px-2">
                <section className="w-1/2 pl-10">
                    <TicketsDisplay selectedSeats={selectedSeats} />
                </section>
                <section className="p-3 text-lg border-l-2 border-slate-400">
                    <span className="font-bold text">{selectedSeats.length}</span> Tickets
                </section>
            </div>
        </footer>
    );
}

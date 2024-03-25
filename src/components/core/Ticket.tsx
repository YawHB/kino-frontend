import { Iseat } from "@/models/seat";

interface Props {
    seat: Iseat;
}

export default function Ticket({ seat }: Props) {
    return (
        <div className="flex h-14 w-[120px] scale-75 items-center justify-center gap-5 bg-[url('ticket-shape.svg')] bg-no-repeat text-white sm:scale-100">
            <div className="opacity-80 text-center">
                Row <span className="block font-bold">{seat.rowNumber}</span>
            </div>
            <div className="opacity-80 text-center">
                Seat <span className="block font-bold">{seat.seatNumber}</span>
            </div>
        </div>
    );
}

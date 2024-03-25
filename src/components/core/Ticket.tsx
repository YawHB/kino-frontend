import { Iseat } from "@/models/seat";

interface Props {
    seat: Iseat;
}

export default function Ticket({ seat }: Props) {
    return (
        <div className="flex h-14 w-[120px] items-center justify-center bg-[url('ticket-shape.svg')] bg-no-repeat text-white gap-5">
            <div className="">
                Row <span className="block font-bold">{seat.rowNumber}</span>
            </div>
            <div>
                Seat <span className="block font-bold">{seat.seatNumber}</span>
            </div>
        </div>
    );
}

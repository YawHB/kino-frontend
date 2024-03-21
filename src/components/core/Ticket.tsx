import { Iseat } from "@/models/seat";

interface Props {
    seat: Iseat;
}

export default function Ticket({ seat }: Props) {
    return <div className="flex h-14 w-32 items-center justify-center bg-blue-600 text-white">row {seat.rowNumber}, seat { seat.seatNumber}</div>;
}

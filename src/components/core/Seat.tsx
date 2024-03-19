import {Iseat} from "@/models/seat.ts";

interface Props {
    seat: Iseat,
    onSeatClick: (seat: Iseat)=> void;
}


const Seat = ({ seat, onSeatClick }: Props) => {
    return (
        <div className="w-5 h-5"
            onClick={() => onSeatClick(seat)}>
            <img src="seat-icon.png" alt="lol" />
        </div>
    );
}

export default Seat;
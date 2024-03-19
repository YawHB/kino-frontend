import {Iseat} from "@/models/seat.ts";
import { useState } from "react";

type Props = {
    seat: Iseat,
    onSeatClick: (seat: Iseat)=> void;
}


const Seat = ({ seat, onSeatClick }: Props) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        setIsSelected(prev => !prev);
        onSeatClick(seat)
    }

    return (
        <div className="w-5 h-5"
            onClick={handleClick}>
            <img src="./seat-icon.png" alt="seat-icon"/>
        </div>
    );
}


export default Seat;
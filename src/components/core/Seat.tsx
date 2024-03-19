import { Iseat } from "@/models/seat.ts";
import { useState } from "react";


type Props = {
    seat: Iseat;
    onSeatClick: (seat: Iseat) => void;
    disabled: boolean;
};


function getColor(isSelected: boolean, disabled: boolean) {
    if (disabled) {
        return "#ff0000"
    } 

    if (isSelected) {
        return "#0000ff"
    } else {
        return "#000000"
    }
}

const Seat = ({ seat, onSeatClick, disabled }: Props) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        if (disabled) return;
        setIsSelected((prev) => !prev);
        onSeatClick(seat);
    };

    const color = getColor(isSelected, disabled);

    return (
        <div className={`h-6 w-6 ${!disabled && "hover:cursor-pointer"}`} onClick={handleClick}>
            <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 356 289"
                preserveAspectRatio="xMidYMid meet"
            >
                <g transform="translate(20.0,270.0) scale(0.50,-0.50)" fill={color} stroke="#36454F" strokeWidth="5">
                    <path
                        d="M201 511 c-67 -17 -76 -37 -79 -174 -4 -134 3 -167 43 -193 35 -23
                            194 -31 264 -14 77 18 86 38 86 180 0 191 -8 201 -173 206 -59 2 -122 -1 -141
                            -5z"
                    />
                    <path
                        d="M10 455 c-14 -36 -12 -232 3 -275 10 -30 17 -35 42 -35 28 0 30 2 27
                            35 -1 19 -3 94 -5 165 l-2 130 -27 3 c-22 3 -30 -2 -38 -23z"
                    />
                    <path
                        d="M566 468 c-3 -7 -6 -82 -9 -166 -3 -137 -2 -154 13 -162 44 -24 70
                            49 69 195 -1 118 -8 139 -42 143 -16 2 -29 -2 -31 -10z"
                    />
                    <path
                        d="M89 94 c-27 -32 19 -66 111 -84 184 -35 421 27 345 90 -12 10 -26 9
                            -73 -6 -74 -24 -237 -24 -302 -1 -56 21 -64 21 -81 1z"
                    />
                </g>
            </svg>
        </div>
    );
};

export default Seat;

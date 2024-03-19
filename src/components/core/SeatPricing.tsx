import { Iseat } from "@/models/seat";
import React from "react";
import { SiUbereats } from "react-icons/si";

interface Props {
    seats: Iseat[];
    runtime?: number;
    is3D?: boolean;
}

function calculatSeatsPrice(seats: Iseat[]) {
    return seats.reduce((sum, currSeat) => sum + currSeat.seatPricing.price, 0);
}

export default function SeatPricing({ seats, runtime, is3D }: Props) {
    const COWBOY_SEATS: Iseat[] = [];
    const STANDARD_SEATS: Iseat[] = [];
    const DELUXE_SEATS: Iseat[] = [];
    console.log(seats);

    const DUMMY_MOVIE_RUNTIME = 180;
    const DUMMY_MOVIE_IS3D = true;

    const GROUP_PRICING_ADJUSTMENT = seats.length <= 5 ? 1.05 : seats.length > 10 ? 0.97 : 1;

    const TOTAL_SEAT_PRICE = calculatSeatsPrice(seats) * GROUP_PRICING_ADJUSTMENT;

    const RUNTIME_FEE = DUMMY_MOVIE_RUNTIME >= 170 ? 10 : 0;

    const FEE_3D = DUMMY_MOVIE_IS3D ? 15 : 0;

    for (const seat of seats) {
        if (seat.seatPricing.name === "cowboy") COWBOY_SEATS.push(seat);
        if (seat.seatPricing.name === "standard") STANDARD_SEATS.push(seat);
        if (seat.seatPricing.name === "deluxe") DELUXE_SEATS.push(seat);
    }

    return (
        <>
            <div className="font-bold">Seats</div>
            {COWBOY_SEATS.length > 0 && (
                <div>
                    {COWBOY_SEATS.length}x Cowboy - {calculatSeatsPrice(COWBOY_SEATS)}kr.
                </div>
            )}
            {STANDARD_SEATS.length > 0 && (
                <div>
                    {STANDARD_SEATS.length}x Standard - {calculatSeatsPrice(STANDARD_SEATS)}
                    kr.
                </div>
            )}
            {DELUXE_SEATS.length > 0 && (
                <div>
                    {DELUXE_SEATS.length}x Deluxe - {calculatSeatsPrice(DELUXE_SEATS)}kr.
                </div>
            )}
            <div>Total seats price - {TOTAL_SEAT_PRICE}kr.</div>
            <div className="font-bold">Fees</div>
            {DUMMY_MOVIE_IS3D && (
                <div>
                    3D Fee ({seats.length} x {FEE_3D}kr.) - {FEE_3D * seats.length}kr.
                </div>
            )}

            {RUNTIME_FEE > 0 && (
                <div>
                    Runtime fee ({seats.length} x {RUNTIME_FEE}kr.) - {RUNTIME_FEE * seats.length}kr.
                </div>
            )}

            <div className="font-bold">I Alt - {TOTAL_SEAT_PRICE + (FEE_3D + RUNTIME_FEE) * seats.length}kr.</div>
        </>
    );
}

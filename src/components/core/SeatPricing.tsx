import { Iseat } from "@/models/seat";
import { getAllPriceAdjustments } from "@/services/apiFacade";
import React, { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import { IPriceAdjustment } from "@/models/priceAdjustment";

interface Props {
    seats: Iseat[];
    runtime: number;
    is3D: boolean;
}

function calculatSeatsPrice(seats: Iseat[]) {
    return seats.reduce((sum, currSeat) => sum + currSeat.seatPricing.price, 0);
}

export default function SeatPricing({ seats, runtime, is3D }: Props) {
    const [priceAdjustments, setPriceAdjustments] = useState<IPriceAdjustment[] | null>(null);

    const COWBOY_SEATS: Iseat[] = [];
    const STANDARD_SEATS: Iseat[] = [];
    const DELUXE_SEATS: Iseat[] = [];
    console.log(seats);

    const GROUP_PRICING_ADJUSTMENT = seats.length <= 5 ? 1.05 : seats.length > 10 ? 0.93 : 1;

    const TOTAL_SEAT_PRICE = calculatSeatsPrice(seats) * GROUP_PRICING_ADJUSTMENT;

    const RUNTIME_FEE = runtime >= 170 ? 10 : 0;

    const FEE_3D = is3D ? 15 : 0;

    for (const seat of seats) {
        if (seat.seatPricing.name === "cowboy") COWBOY_SEATS.push(seat);
        if (seat.seatPricing.name === "standard") STANDARD_SEATS.push(seat);
        if (seat.seatPricing.name === "deluxe") DELUXE_SEATS.push(seat);
    }

    useEffect(() => {
        getAllPriceAdjustments()
            .then((data) => {
                console.log("fetched: ", data);
                setPriceAdjustments(data);
            })
            .catch(() => {
                toast({
                    title: "Something went wrong!",
                    description: `Could not find the price adjustments in our system. Please reload the webpage or try again at a later time.`,
                    variant: "destructive",
                });
            });
    }, []);

    const FEE3D = priceAdjustments?.find((price) => price.name === "fee3D")?.adjustment;
    console.log("3D FEE", FEE3D);

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
            {is3D && (
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

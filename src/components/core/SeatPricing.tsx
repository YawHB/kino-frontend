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
    const [priceAdjustments, setPriceAdjustments] = useState<IPriceAdjustment | null>(null);
    const { smallGroup = 0, largeGroup = 0, feeRuntime = 0, fee3D = 0 } = priceAdjustments?.priceAdjustments || {};

    const COWBOY_SEATS: Iseat[] = [];
    const STANDARD_SEATS: Iseat[] = [];
    const DELUXE_SEATS: Iseat[] = [];

    console.log(seats);

    const GROUP_PRICING_ADJUSTMENT = seats.length <= 5 ? smallGroup : seats.length >= 10 ? largeGroup : 1;

    const TOTAL_SEAT_PRICE = calculatSeatsPrice(seats) * GROUP_PRICING_ADJUSTMENT!;

    const RUNTIME_FEE = runtime >= 170 ? feeRuntime : 0;

    const FEE_3D = is3D ? fee3D : 0;

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

    return (
        <div className="min-w-80 max-w-96 rounded-sm bg-slate-300 p-5">
            <div className="grid grid-cols-2 gap-1">
                <div className="col-span-2 font-bold">Seats</div>
                {COWBOY_SEATS.length > 0 && (
                    <>
                        <div>
                            Cowboy <span className="opacity-40">x {COWBOY_SEATS.length}</span>
                        </div>
                        <div className="ml-auto">{calculatSeatsPrice(COWBOY_SEATS)},-</div>
                    </>
                )}
                {STANDARD_SEATS.length > 0 && (
                    <>
                        <div>
                            Standard <span className="opacity-40">x {STANDARD_SEATS.length}</span>
                        </div>
                        <div className="ml-auto">{calculatSeatsPrice(STANDARD_SEATS)},-</div>
                    </>
                )}
                {DELUXE_SEATS.length > 0 && (
                    <>
                        <div>
                            Deluxe <span className="opacity-40">x {DELUXE_SEATS.length}</span>
                        </div>
                        <div className="ml-auto">{calculatSeatsPrice(DELUXE_SEATS)},-</div>
                    </>
                )}
                <div>Total seats price</div>
                <div className="ml-auto">{TOTAL_SEAT_PRICE},-</div>

                {seats.length > 9 && (
                    <>
                        <div className="col-span-2 mt-3 font-bold">Discounts</div>
                        <p>Large group</p>
                        <div className="ml-auto">{calculatSeatsPrice(seats) - TOTAL_SEAT_PRICE},-</div>
                    </>
                )}

                {(seats.length > 0 && seats.length <= 5) || is3D || RUNTIME_FEE > 0 ? <div className="col-span-2 mt-3 font-bold">Fees</div> : null}

                {seats.length > 0 && seats.length <= 5 && (
                    <>
                        <p> Small group fee</p>
                        <div className="ml-auto">{Math.abs(calculatSeatsPrice(seats) - TOTAL_SEAT_PRICE)},-</div>
                    </>
                )}

                {is3D && (
                    <>
                        <div>
                            3D Fee{" "}
                            <span className="opacity-40">
                                ({seats.length} x {FEE_3D},-)
                            </span>
                        </div>
                        <div className="ml-auto">{FEE_3D * seats.length},-</div>
                    </>
                )}

                {RUNTIME_FEE > 0 && (
                    <>
                        <div>
                            Runtime fee{" "}
                            <span className="opacity-40">
                                ({seats.length} x {RUNTIME_FEE},-)
                            </span>
                        </div>
                        <div className="ml-auto">{RUNTIME_FEE * seats.length},-</div>
                    </>
                )}
                <div className="col-span-2 mt-2 border-b-2 border-slate-400"></div>
                <div className="font-bold">Total</div>
                <div className="ml-auto font-bold">{TOTAL_SEAT_PRICE + (FEE_3D + RUNTIME_FEE) * seats.length},-</div>
            </div>
        </div>
    );
}

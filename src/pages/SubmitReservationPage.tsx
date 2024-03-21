import { createReservation, getCalculatedReservationPrice, TReservationPriceRequest, TReservationRequest } from "@/services/apiFacade.ts";
import { toast } from "@/components/ui/use-toast.ts";
import { useLocation, useParams } from "react-router-dom";
import { Iseat } from "@/models/seat.ts";
import SeatPricing from "@/components/core/SeatPricing.tsx";
import Button from "@/components/core/Button.tsx";
import { useEffect, useState } from "react";

export type TCalculatedPrice = {
    seats: number;
    fees: number;
    discounts: number;
    totalPrice: number;
};

export default function SubmitReservationPage() {
    const [calculatedPrice, setCalculatedPrice] = useState<TCalculatedPrice | null>(null);

    const { screeningId } = useParams();
    const selectedSeats = useLocation().state as Iseat[];
    const seatIds = selectedSeats.map((seat) => seat.id);

    const request: TReservationPriceRequest = {
        seatIds,
        screeningId: Number(screeningId),
    };

    useEffect(() => {
        getCalculatedReservationPrice(request)
            .then((data) => {
                console.log(data);
                
                setCalculatedPrice(data)})
            .catch((e) => {
                console.log(e);
                
                toast({
                    title: "Something went wrong!",
                    description: `Could not calculate the prices in our system. Please reload the webpage or try again at a later time.`,
                    variant: "destructive",
                });
            });
    }, []);

    function handleSubmitReservation() {
        const request: TReservationRequest = {
            screeningId: Number(screeningId as string),
            seatIds: selectedSeats.map((s) => s.id),
        };

        createReservation(request)
            .then(() => {
                toast({
                    title: "Reservation Created!",
                    description: "Success!",
                });
            })
            .catch(() => {
                toast({
                    title: "Something went wrong!",
                    description: "Could not create reservation. Try again later",
                    variant: "destructive",
                });
            });
    }

    return (
        <>
            <div>
                VIS PRIS HER
                <Button onClick={handleSubmitReservation}>Buy</Button>
            </div>
        </>
    );
}

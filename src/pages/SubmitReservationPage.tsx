import { createReservation, getCalculatedReservationPrice, TReservationPriceRequest, TReservationRequest } from "@/services/apiFacade.ts";
import { toast } from "@/components/ui/use-toast.ts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Iseat } from "@/models/seat.ts";
import Button from "@/components/core/Button.tsx";
import { useEffect, useState } from "react";
import PricingDisplay from "@/components/layouts/PricingDisplay";

export type TCalculatedPrice = {
    seats: number;
    fees: number;
    discounts: number;
    totalPrice: number;
};

export default function SubmitReservationPage() {
    const [calculatedPrice, setCalculatedPrice] = useState<TCalculatedPrice | null>(null);
    const navigate = useNavigate();

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
                setCalculatedPrice(data);
            })
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
                navigate("/profile");
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
        <div className="flex h-full flex-col items-center gap-10">
            <h1 className="text-4xl font-semibold">Confirm purchase</h1>
            <PricingDisplay>
                <div>
                    Seats <span className="opacity-40">(Cowboy, Standard, Deluxe)</span>
                </div>
                <div className="ml-auto">{calculatedPrice?.seats},-</div>
                <div>
                    Fees <span className="opacity-40">(3D, runtime, small group)</span>
                </div>
                <div className="ml-auto">{calculatedPrice?.fees},-</div>
                <div>
                    Discounts <span className="opacity-40">(large group)</span>
                </div>
                <div className="ml-auto">{calculatedPrice?.discounts},-</div>

                <div className="col-span-2 mt-5 border-b-2 border-red-500"></div>
                <div className="font-bold">Total</div>
                <div className="ml-auto font-bold">{calculatedPrice?.totalPrice},-</div>
            </PricingDisplay>
            <div>
                <Button style="secondary" onClick={handleSubmitReservation}>
                    Buy Tickets
                </Button>
            </div>
        </div>
    );
}

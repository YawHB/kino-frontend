import {createReservation, TReservationRequest} from "@/services/apiFacade.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {useLocation, useParams} from "react-router-dom";
import {Iseat} from "@/models/seat.ts";
import SeatPricing from "@/components/core/SeatPricing.tsx";
import Button from "@/components/core/Button.tsx";


export default function SubmitReservationPage() {
    const {screeningId} = useParams();
    const selectedSeats = useLocation().state as Iseat[]

    function handleSubmitReservation() {
        const request: TReservationRequest = {
            screeningId: Number(screeningId as string),
            seatIds: selectedSeats.map((s) => s.id)
        }

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
            })
    }

    return (
        <>
            <div>
                VIS PRIS HER
                <Button onClick={handleSubmitReservation}>Buy</Button>
            </div>
        </>
    )
}
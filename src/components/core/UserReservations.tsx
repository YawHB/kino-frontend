import {useEffect, useState} from "react";
import {IReservation} from "@/models/reservation.ts";
import {getReservationsByUsername} from "@/services/apiFacade.ts";
import {useAuth} from "@/contexts/AuthProvider.tsx";
import {toast} from "@/components/ui/use-toast.ts";


export default function UserReservations() {
    const {username} = useAuth();
    const [reservations, setReservations] = useState<null | IReservation[]>(null);

    useEffect(() => {
        getReservationsByUsername(username as string)
            .then((data) => {
                setReservations(data);
            })
            .catch(() => {
                toast({
                    title: "Something went wrong!",
                    description: `Could not get your reservations. Please reload the webpage or try again at a later time.`,
                    variant: "destructive",
                });
            })
    }, []);

    return (
        <>
            <div>
                {reservations?.map((reservation) => (
                    <div>{reservation.screening.movie.title}</div>
                ))}

            </div>
        </>
    )
}
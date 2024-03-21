import {useEffect, useState} from "react";
import {IReservation} from "@/models/reservation.ts";
import {getReservationsByUsername} from "@/services/apiFacade.ts";
import {useAuth} from "@/contexts/AuthProvider.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import UserReservationsItem from "@/components/core/UserReservationsItem.tsx";


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
            <div className={"flex flex-col"}>
                {reservations?.map((reservation) => (
                    <UserReservationsItem key={reservation.id} reservation={reservation}/>
                ))}

            </div>
        </>
    )
}
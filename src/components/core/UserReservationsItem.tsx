import { IReservation } from "@/models/reservation.ts";
import { POSTER_URL } from "@/pages/MovieDetailsPage.tsx";

type Props = {
    reservation: IReservation;
};

const options: Intl.DateTimeFormatOptions = {
    //dateStyle: "full",
    year: "numeric",
    month: "long",
    day: "numeric",
    //timeStyle: "short",
    hour: "numeric",
    minute: "numeric",
};

export default function UserReservationsItem({ reservation }: Props) {
    console.log(reservation.screening.startTime);

    return (
        <>
            <div>
                <h2>{reservation.screening.movie.title}</h2>
                <p>{reservation.screening.movie.runtime} Minutes</p>
                <p>{new Intl.DateTimeFormat("da-DK", options).format(new Date(reservation.screening.startTime))}</p>
                <p>Total tickets: {reservation.seats.length}</p>
                <div className="flex flex-row items-center gap-3">
                    <img src={POSTER_URL + reservation.screening.movie.poster} className="max-w-32" />
                </div>
            </div>
        </>
    );
}

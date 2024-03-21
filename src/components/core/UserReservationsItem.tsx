import {IReservation} from "@/models/reservation.ts";
import {POSTER_URL} from "@/pages/MovieDetailsPage.tsx";

type Props = {
    reservation: IReservation
}

let options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",

};


export default function UserReservationsItem({reservation}: Props) {

    console.log(reservation.screening.startTime)

    return (
        <>
            <div className={"my-5"}>
                <h2>{reservation.screening.movie.title}</h2>
                <p>{reservation.screening.movie.runtime} Minutes</p>
                <div className="flex flex-row items-center gap-3">
                    <img src={POSTER_URL + reservation.screening.movie.poster} className="max-w-32"/>
                    <div className={"flex flex-row flex-wrap gap-3"}>
                        {reservation.seats.map((s, i) => (
                            <div key={i} className="w-[calc(60%-6px)]">
                                <p>Ticket nr. {i + 1}</p>
                                <p>Row nr. {s.rowNumber}, Seat nr. {s.seatNumber}</p>
                            </div>
                        ))}
                    </div>
                    <p>{new Intl.DateTimeFormat("en-US", options).format(new Date(reservation.screening.startTime))}</p>
                </div>
            </div>
        </>
    )
}
import ScreeningDate from "./ScreeningDate";
import { useEffect, useState } from "react";
import { IScreening } from "@/models/screening";
import { getMovieScreeningsInCinema } from "@/services/apiFacade";
import { useKino } from "@/contexts/KinoProvider";
import { DATE_TIME_OPTIONS, TODAY, upcomingWeekDates } from "@/utils/dateUtils";

type Props = {
    movieId: number;
};

export default function ScreeningOverview({ movieId }: Props) {
    const [screenings, setScreenings] = useState<IScreening[] | null>(null);
    const { id, kino } = useKino();

    const week = upcomingWeekDates();

    useEffect(() => {
        const endDate = new Date(TODAY);
        endDate.setDate(endDate.getDate() + 6);

        getMovieScreeningsInCinema(movieId, id, TODAY.toISOString(), endDate.toISOString())
            .then((data) => setScreenings(data))
            .catch((e) => console.log(e));
    }, [kino]);

    return (
        <>
            <h2 className="my-8 text-2xl font-bold sm:text-3xl">Showings in {kino}</h2>
            <section className="flex w-full">
                {week.map((date) => {
                    const s = screenings?.filter((screen) => {
                        const copy = new Date(screen.startTime);

                        return new Intl.DateTimeFormat("en-GB", DATE_TIME_OPTIONS).format(copy) == date;
                    }) as IScreening[];

                    return <ScreeningDate key={date} date={date} screenings={s} />;
                })}
            </section>
        </>
    );
}

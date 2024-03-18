import { intlFormat } from "date-fns";
import ScreeningDate from "./ScreeningDate";
import { useEffect, useState } from "react";
import { IScreening } from "@/models/screening";
import { getMovieScreeningsInCinema } from "@/services/apiFacade";
import { useKino } from "@/contexts/KinoProvider";

const TODAY = new Date();

const OPTIONS: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "numeric",
    day: "numeric",
};

type Props = {
    movieId: number;
};

export default function ScreeningOverview({ movieId }: Props) {
    const [screenings, setScreenings] = useState<IScreening[] | null>(null);
    const { id } = useKino();
    const week: string[] = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(TODAY);
        week.push(new Intl.DateTimeFormat("da-DK", OPTIONS).format(date.setDate(date.getDate() + i)));
    }

    useEffect(() => {
        const endDate = new Date(TODAY);
        endDate.setDate(endDate.getDate() + 6);

        getMovieScreeningsInCinema(movieId, id, TODAY.toISOString(), endDate.toISOString())
            .then((data) => setScreenings(data))
            .catch((e) => console.log(e));
    }, []);

    console.log(screenings);

    return (
        <>
            <h2>Screening</h2>
            <div className="flex gap-3">
                {week.map((date) => {
                    const s = screenings?.filter((screen) => {
                        const copy = new Date(screen.startTime);
                        return new Intl.DateTimeFormat("da-DK", OPTIONS).format(copy) == date;
                    }) as IScreening[];
                    return <ScreeningDate key={date} date={date} screenings={s} />;
                })}
            </div>
        </>
    );
}

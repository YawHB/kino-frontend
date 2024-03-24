import { useKino } from "@/contexts/KinoProvider";
import { IScreening } from "@/models/screening";
import React from "react";

interface Props {
    screening: IScreening;
}

export default function ScreeningInfo({ screening }: Props) {
    const { kino } = useKino();

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(new Date(screening.startTime));

    return (
        <div className="mb-10 flex flex-col items-center gap-5">
            <h1 className="text-center text-4xl font-semibold sm:text-5xl sm:text-start">{screening.movie.title}</h1>
            <h2 className="text-2xl font-semibold sm:text-3xl">
                {kino} - {screening.auditorium.name}
            </h2>
            <h3 className="text-1xl sm:text-2xl">{formattedDate}</h3>
        </div>
    );
}

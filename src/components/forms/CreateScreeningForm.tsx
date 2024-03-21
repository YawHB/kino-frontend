import KinoSelect from "@/components/layouts/KinoSelect.tsx";
import React, {useEffect, useState} from "react";
import {IMovieItem} from "@/models/movie.ts";

import MovieSelect from "@/components/core/MovieSelect.tsx";
import {useKino} from "@/contexts/KinoProvider.tsx";
import {IAuditorium} from "@/models/auditorium.ts";
import AuditoriumSelect from "@/components/core/AuditoriumSelect.tsx";
import {TScreeningRequest} from "@/services/apiFacade.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button as ShadButton} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {Calendar as CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar.tsx";

type Props = {
    onSubmit: (newScreening: TScreeningRequest) => void;
}


export default function CreateScreeningForm({onSubmit}: Props) {
    const {kino} = useKino();
    const [selectedMovie, setSelectedMovie] = useState<IMovieItem | null>(null)
    const [selectedAuditorium, setSelectedAuditorium] = useState<IAuditorium | null>(null);
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [time, setTime] = useState("");
    const [is3D, setIs3D] = useState<boolean>(false);
    const fromDate = new Date(selectedMovie?.premiere as string).getTime() > new Date().getTime() ? new Date(selectedMovie?.premiere as string) : new Date()

    useEffect(() => {
        setSelectedAuditorium(null);
    }, [kino]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const [hours, minutes] = time.split(":").map(Number);
        const startTime = new Date(date as Date);
        startTime.setHours(hours + 1, minutes);

        const request: TScreeningRequest = {
            movieId: selectedMovie!.id,
            auditoriumId: selectedAuditorium!.id,
            is3D,
            startTime
        }

        onSubmit(request);
    }


    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="movie">Movie:</label>
                    <MovieSelect setSelectedMovie={setSelectedMovie}/>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="cinema">Cinema:</label>
                    <KinoSelect/>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="auditorium">Auditorium</label>
                    <AuditoriumSelect setSelectedAuditorium={setSelectedAuditorium}/>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="auditorium">Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <ShadButton
                                variant={"outline"}
                                className={cn(
                                    "w-[11rem] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </ShadButton>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                captionLayout="dropdown-buttons"
                                fromDate={fromDate}
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                                initialFocus
                                showOutsideDays
                                fixedWeeks
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="time">Time</label>
                    <input
                        required={true}
                        type="time"
                        value={time}
                        onChange={({target}) => setTime(target.value)}
                        step="60"
                        min="09:00"
                        max="23:00"
                    />
                    <p>Selected time: {time}</p>
                </div>

                <div className="flex gap-5">
                    <label htmlFor="is3d">3D</label>
                    <input type="checkbox" checked={is3D} onChange={() => setIs3D(prev => !prev)}/>
                </div>

                <input className={"hover:cursor-pointer"} type="submit" value="Submit"/>
            </form>
        </>
    )
}

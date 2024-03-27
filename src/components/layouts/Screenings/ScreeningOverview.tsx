import ScreeningDate from "./ScreeningDate";
import { useEffect, useState } from "react";
import { IScreening } from "@/models/screening";
import { getMovieScreeningsInCinema } from "@/services/apiFacade";
import { useKino } from "@/contexts/KinoProvider";
import { DATE_TIME_OPTIONS, TODAY, upcomingWeekDates } from "@/utils/dateUtils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
            <section className="flex items-end justify-between">
                <h2 className="text-2xl mb-3 font-bold sm:text-3xl">Showings in {kino}</h2>
                <img className="w-32 drop-shadow-md" src="/cat_showings.png" alt="cat showings" />
            </section> 
            <section className="bg-[var(--backgroundColor)] p-3 rounded-lg shadow-lg">
                <div className="relative flex w-full justify-center">
                    {/* // Gradient fade effect, parent needs to be relative */}
                    <div className="pointer-events-none absolute z-10 h-full w-[90%] bg-[linear-gradient(90deg,rgba(255,220,174,1)0%,rgba(0,0,0,0)5%,rgba(0,0,0,0)95%,rgba(255,220,174,1)100%)]"></div>
                    <Carousel className="ml-0 w-[90%]">
                        <CarouselPrevious variant={"ghost"} className="transition-all hover:scale-125 hover:bg-white active:scale-100" />
                        <CarouselContent className="mx-1 pl-0">
                            {week.map((date) => {
                                const s = screenings?.filter((screen) => {
                                    const currDate = new Date(screen.startTime);
                                    return new Intl.DateTimeFormat("en-GB", DATE_TIME_OPTIONS).format(currDate) == date;
                                }) as IScreening[];
                                return (
                                    <CarouselItem key={date} className="basis-20 pl-0 sm:basis-36">
                                        <ScreeningDate date={date} screenings={s} />
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                        <CarouselNext variant={"ghost"} className="transition-all hover:scale-125 hover:bg-white active:scale-100" />
                    </Carousel>
                </div>
            </section>
            <div className="text-center font-bold mt-3">No showings for this movie</div>
        </>
    );
}

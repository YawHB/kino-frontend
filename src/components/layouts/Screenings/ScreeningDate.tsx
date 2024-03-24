import { IScreening } from "@/models/screening";
import ScreeningTime from "./ScreeningTime";
import { useKino } from "@/contexts/KinoProvider";

type Props = {
    date: string;
    screenings: IScreening[];
};

export default function ScreeningDate({ date, screenings }: Props) {
    const { id } = useKino();
    return (
        <>
            <div key={id} className="flex h-full w-full animate-fade-in flex-col gap-2 border-r-2 border-orange-300 p-2">
                <h2 className="text-center text-sm font-bold">{date}</h2>
                {screenings?.map((s) => <ScreeningTime key={s.id} screening={s} />)}
            </div>
        </>
    );
}

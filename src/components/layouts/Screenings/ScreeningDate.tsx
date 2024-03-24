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
            <div key={id} className="animate-fade-in w3 flex flex-col gap-2 border-l-2 p-3 first:border-l-0 border-slate-300">
                <h2 className="text-sm font-bold">{date}</h2>
                {screenings?.map((s) => <ScreeningTime key={s.id} screening={s} />)}
            </div>
        </>
    );
}

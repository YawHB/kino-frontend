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
            <div key={id} className="animate-fade-in flex flex-col gap-2 rounded-sm border-l-2 p-3 w3">
                <h2 className="text-sm font-bold">{date}</h2>
                {screenings?.map((s) => <ScreeningTime key={s.id} screening={s} />)}
            </div>
        </>
    );
}

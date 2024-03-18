import { IScreening } from "@/models/screening";

type Props = {
    date: string;
    screenings: IScreening[]
};



export default function ScreeningDate({ date, screenings }: Props) {

    return (
        <>
            <div className="flex flex-col gap-2">
                <h2>{date}</h2>
                {screenings?.map((s) => (
                    <div key={s.id} className="bg-green-500">
                        <h3>{s.startTime}</h3>
                    </div>
                ))}
            </div>
        </>
    );
}
/*
<div className="bg-green-500">
                    <h3>21:30</h3>
                </div>
*/
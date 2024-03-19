import { IScreening } from "@/models/screening";
import ScreeningTime from "./ScreeningTime";

type Props = {
  date: string;
  screenings: IScreening[];
};

export default function ScreeningDate({ date, screenings }: Props) {
  return (
    <>
      <div className="flex w-40 flex-col gap-2 rounded-sm bg-slate-200 p-3 text-center">
        <h2 className="text-lg font-bold">{date}</h2>
        {screenings?.map((s) => <ScreeningTime key={s.id} screening={s} />)}
      </div>
    </>
  );
}

import { IScreening } from "@/models/screening";
import { toHourMinuteFormat } from "@/utils/dateUtils";

interface Props {
  screening: IScreening;
}

export default function ScreeningTime({ screening }: Props) {
  function handleClick() {
    console.log(screening.id);
    //TODO: navigate to screening page, to reserve seats
  }
  return (
    <article
      className="w-full cursor-pointer rounded-sm bg-green-500 p-2 text-center text-white transition-all hover:bg-green-400"
      onClick={handleClick}
    >
      <h3>{screening.auditorium.name}</h3>
      <h3 className="font-bold">{toHourMinuteFormat(screening.startTime)}</h3>
    </article>
  );
}

import { IScreening } from "@/models/screening";
import { toHourMinuteFormat } from "@/utils/dateUtils";
import {Link, useNavigate} from "react-router-dom";

interface Props {
  screening: IScreening;
}

export default function ScreeningTime({ screening }: Props) {
  

  return (
      <Link to="/screening" state={screening}>
        <article className="w-full cursor-pointer rounded-sm bg-green-500 p-2 text-center text-white transition-all hover:bg-green-400">
          <h3>{screening.auditorium.name}</h3>
          <h3 className="font-bold">{toHourMinuteFormat(screening.startTime)}</h3>
        </article>
      </Link>
  );
}

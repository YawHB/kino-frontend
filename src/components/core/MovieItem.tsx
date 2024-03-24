import { IMovieItem } from "@/models/movie";
import { Link } from "react-router-dom";
import Button from "./Button";
import { IoTicket } from "react-icons/io5";

type Props = {
    movie: IMovieItem;
};

const POSTER_URL = "https://image.tmdb.org/t/p/w300";

export default function MovieItem({ movie }: Props) {
    // function handleClick() {
    //     console.log(movie.id);
    // }

    return (
        <div className="flex flex-col items-center gap-3">
            <div>
                <img className="h-full w-full rounded-xl object-cover drop-shadow-md" src={POSTER_URL + movie.poster} alt="poster missing" />
            </div>

            <h3 className="line-clamp-1 text-lg font-bold">{movie.title}</h3>
            <div>
                <Link to={`${movie.id}`}>
                    <Button style="secondary" icon={<IoTicket size={20} />}>
                        Buy ticket
                    </Button>
                </Link>
            </div>
        </div>
    );
}

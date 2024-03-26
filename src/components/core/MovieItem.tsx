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
        <article className="group flex max-w-52 flex-col items-center gap-3">
            <Link to={`${movie.id}`} className="h-full w-full">
                <img
                    className="h-full w-full cursor-pointer rounded-xl object-cover brightness-100 drop-shadow-md transition-all group-hover:brightness-110"
                    src={POSTER_URL + movie.poster}
                    alt="poster missing"
                />
            </Link>

            <h3 className="line-clamp-1 pb-2 text-lg font-bold transition-all group-hover:text-white">{movie.title}</h3>
            <div>
                <Link to={`${movie.id}`}>
                    <Button style="secondary" icon={<IoTicket size={20} />}>
                        Buy ticket
                    </Button>
                </Link>
            </div>
        </article>
    );
}

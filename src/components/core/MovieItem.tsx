import { IMovieItem } from "@/models/movie";
import { Link } from "react-router-dom";
import Button from "./Button";

type Props = {
    movie: IMovieItem;
};

export default function MovieItem({ movie }: Props) {

    // function handleClick() {
    //     console.log(movie.id);
    // }

    return (
        <div className="flex flex-col items-center">
            <div>
                <img className="object-cover w-full h-full rounded-xl" src={movie.poster} alt="poster missing" />
            </div>

            <h3 className="font-bold text-lg line-clamp-1">{movie.name}</h3>
            <div>
                <Link to={`${movie.id}`}><Button>Bestil billet</Button></Link>
            </div>
            
        </div>
    );
}

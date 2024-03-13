import { IMovieItem } from "@/models/movie";


type Props = {
    movie: IMovieItem;
}

export default function MovieItem({ movie }: Props) {
    function handleClick() {
        console.log(movie.id);
    }

    return (
        <div>
            <div className="bg-blue-500 h-40 w-20">{movie.poster}</div>
            <div>{movie.name}</div>
            <div onClick={handleClick}>Køb billet</div>
        </div>
    );
}

import { IMovieItem } from '@/models/movie';
import { Link } from 'react-router-dom';
import Button from './Button';

type Props = {
    movie: IMovieItem;
};

const POSTER_URL = 'https://image.tmdb.org/t/p/w300';

export default function MovieItem({ movie }: Props) {
    // function handleClick() {
    //     console.log(movie.id);
    // }

    return (
        <div className="flex flex-col items-center">
            <div>
                <img className="object-cover w-full h-full rounded-xl" src={POSTER_URL + movie.poster} alt="poster missing" />
            </div>

            <h3 className="font-bold text-lg line-clamp-1">{movie.title}</h3>
            <div>
                <Link to={`${movie.id}`}>
                    <Button>Bestil billet</Button>
                </Link>
            </div>
        </div>
    );
}

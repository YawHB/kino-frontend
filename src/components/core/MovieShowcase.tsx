import {IMovieDetails} from "@/models/movie.ts";


type Props = {
    TMDBMovie: IMovieDetails,
}

const POSTER_PREFIX = "https://image.tmdb.org/t/p/w200"

export default function MovieShowcase({TMDBMovie}: Props) {


    return (
        <>
            <div>
                <img src={TMDBMovie.posterPath ? POSTER_PREFIX+TMDBMovie.posterPath : "No poster"} alt=""/>
                <p>{TMDBMovie.title}</p>
                <p>Runtime: {TMDBMovie.runtime} minutes</p>
            </div>
        </>
    )
}
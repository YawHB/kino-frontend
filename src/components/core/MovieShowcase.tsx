import { IMovieDetails } from "@/models/movie.ts";

type Props = {
    TMDBMovie: IMovieDetails;
};

const POSTER_PREFIX = "https://image.tmdb.org/t/p/w200";

export default function MovieShowcase({ TMDBMovie }: Props) {
    return (
        <>
            <article
                key={TMDBMovie.id}
                className={`flex animate-fade-in flex-col items-center text-center transition-all ${TMDBMovie.id ? "max-h-96" : "max-h-0"} `}
            >
                <img
                    className="mb-2 animate-fade-in rounded-md shadow-lg"
                    src={TMDBMovie.posterPath ? POSTER_PREFIX + TMDBMovie.posterPath : "No poster"}
                    alt=""
                />
                <h2 className="font-bold">{TMDBMovie.title}</h2>
                <h2>Runtime - {TMDBMovie.runtime} min.</h2>
            </article>
        </>
    );
}

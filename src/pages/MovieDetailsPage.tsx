import ScreeningOverview from "@/components/layouts/Screenings/ScreeningOverview";
import { toast } from "@/components/ui/use-toast";
import { IMovieDetails } from "@/models/movie";
import { getTMDBMovie } from "@/services/apiFacade";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const POSTER_URL = "https://image.tmdb.org/t/p/w400";

export default function MovieDetailsPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState<IMovieDetails | null>(null);

    const { isLoading } = useQuery({
        queryKey: ["movie"],
        queryFn: () =>
            getTMDBMovie(id!)
                .then((data) => setMovie(data))
                .catch(() => {
                    toast({
                        title: "Something went wrong!",
                        description: `Could not find the movie in our system. Please reload the webpage or try again at a later time.`,
                        variant: "destructive",
                    });
                }),
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <section className="flex flex-col items-center justify-center gap-10 sm:flex-row sm:items-start">
                <div className="sm:min-w-60 animate-fade-in">
                    <img className="w-full max-w-sm rounded-md object-cover drop-shadow-lg" src={POSTER_URL + movie?.posterPath} alt="poster" />
                </div>

                <div className="flex flex-col">
                    <h1 className="mb-5 text-4xl md:text-5xl">{movie?.title}</h1>
                    <p className="mb-4 font-medium"> {movie?.overview}</p>
                    <p className="font-extralight">Runtime</p>
                    <p className="mb-4 font-bold">{movie?.runtime} min.</p>
                    <p className="font-extralight">Genres</p>
                    <p className="font-bold">{movie?.genres.map((genre) => genre).join(", ")}</p>
                </div>
            </section>

            <div>
                <ScreeningOverview movieId={Number(id as string)} />
            </div>
        </div>
    );
}

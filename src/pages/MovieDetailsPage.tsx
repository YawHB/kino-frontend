import ScreeningOverview from "@/components/layouts/Screenings/ScreeningOverview";
import { toast } from "@/components/ui/use-toast";
import { IMovieDetails } from "@/models/movie";
import { getTMDBMovie } from "@/services/apiFacade";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

const POSTER_URL = "https://image.tmdb.org/t/p/w400";

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
        <>
            <div className="flex m-auto">
                <div className=" w-[600px]">
                    <img className="rounded-md w-full object-cover" src={POSTER_URL + movie?.posterPath} alt="poster" />
                </div>
                <div className="p-5">
                    <h1 className="text-5xl mb-5 ">{movie?.title}</h1>
                    {/* <p className="text-2xl">Description </p> */}
                    <p className="font-medium"> {movie?.overview}</p>
                    <p className="font-extralight">Runtime</p>
                    <p className="font-bold">{movie?.runtime}</p>
                    <p className="font-extralight">Genres </p>
                    <p className="font-bold">{movie?.genres.map((genre) => genre).join(", ")}</p>
                </div>
            </div>
            <div>
                <ScreeningOverview movieId={Number(id as string)} />
            </div>
        </>
    );
}

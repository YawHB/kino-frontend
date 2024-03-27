import MovieItem from "@/components/core/MovieItem";
import { toast } from "@/components/ui/use-toast";
import { useKino } from "@/contexts/KinoProvider";
import { IMovieItem } from "@/models/movie";
import { getMoviesByCinemaId } from "@/services/apiFacade";
import { useEffect, useState } from "react";

export default function MovieListPage() {
    const { kino, id } = useKino();
    const [movies, setMovies] = useState<IMovieItem[] | null>(null);

    useEffect(() => {
        getMoviesByCinemaId(id)
            .then((data) => {
                setMovies(data);
            })
            .catch(() => {
                toast({
                    title: "Something went wrong!",
                    description: `Could not find the movies in our system. Please reload the webpage or try again at a later time.`,
                    variant: "destructive",
                });
            });
    }, [id]);

    return (
        <>
        <link rel="preload" href="cat_showings.png" as="image"/>
            <h1 className=" my-16 text-center text-5xl font-extrabold sm:text-left">Movies in {kino}</h1>
            <div key={id} className="animate-fade-in grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {movies?.map((movie) => <MovieItem movie={movie} key={movie.id} />)}
            </div>
        </>
    );
}

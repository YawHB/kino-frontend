import CreateMovieForm from "@/components/forms/CreateMovieForm.tsx";
import {useState} from "react";
import {IMovieDetails} from "@/models/movie.ts";
import MovieShowcase from "@/components/core/MovieShowcase.tsx";
import {getTMDBMovie, postMovie} from "@/services/apiFacade.ts";
import {useToast} from "@/components/ui/use-toast.ts";




export default function CreateMoviePage() {
    const [TMDBMovie, setTMDBMovie] = useState<IMovieDetails | null>(null);
    const { toast } = useToast();

    const handleSearch = (id: string) => {
        getTMDBMovie(id)
            .then((movie) => {
                setTMDBMovie(movie)
                toast({
                    title: "Movie found!",
                    description: `Title: ${movie.title}`,
                });
            })
            .catch(() => {
                setTMDBMovie(null)
                toast({
                    title: "No such movie exists!",
                    description: `Wrong id. Please try again.`,
                    variant: "destructive",
                });
            })
    }

    const handleSubmit = ({id, premiere}: {id: number, premiere: Date}) => {
        const newMovie = {
            id,
            premiere,
            title: TMDBMovie!.title ,
            runtime: TMDBMovie!.runtime,
            poster: TMDBMovie!.posterPath,
        }

        postMovie(newMovie)
            .then(() =>{
            const displayDate = new Date(premiere);
            displayDate.setDate(premiere!.getDate() - 1);
            const dateString = displayDate.toLocaleString().split(", ")[0];

            toast({
                title: "Movie created!",
                description: `Title: ${TMDBMovie!.title} with the premiere date: ${dateString}`,
            });

            setTMDBMovie(null);
        }).catch(() => {
                toast({
                    title: "Something went wrong!",
                    description: `Could not create movie. Try again.`,
                    variant: "destructive",
                });
            })
    }

    console.log(TMDBMovie)


    return (
        <>
            <h2 className="text-center">Create movie page</h2>
            <div className={"flex flex-wrap flex-col justify-center items-center gap-10"}>
                <CreateMovieForm handleSearch={handleSearch} onSubmit={handleSubmit} isSuccess={TMDBMovie != null} />
                {TMDBMovie && <MovieShowcase TMDBMovie={TMDBMovie}/>}
            </div>
        </>
    )
}
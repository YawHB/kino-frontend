import React, {useEffect, useState} from "react";
import {IMovieItem} from "@/models/movie.ts";
import {getAllMovies} from "@/services/apiFacade.ts";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

type Props = {
    setSelectedMovie: React.Dispatch<React.SetStateAction<IMovieItem | null>>;
}


export default function MovieSelect({setSelectedMovie}: Props) {
    const [movies, setMovies] = useState<IMovieItem[] | null>(null)

    useEffect(() => {
        getAllMovies()
            .then((data) => setMovies(data))
            .catch(() => {
                console.log("toast")
            })
    }, []);

    const handleChange = (id: number) => {
        setSelectedMovie(movies?.find((movie) => movie.id === id)!);
    };

    return (
        <>
            <Select required={true} onValueChange={(id) => handleChange(Number(id))}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Movie" />
                </SelectTrigger>
                <SelectContent>
                    {movies?.map((movie) => <SelectItem key={movie.id} value={String(movie.id)}>{movie.title}</SelectItem>)}
                </SelectContent>
            </Select>
        </>
    )
}

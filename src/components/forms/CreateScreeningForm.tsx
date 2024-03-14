import KinoSelect from "@/components/layouts/KinoSelect.tsx";
import { useState} from "react";
import {IMovieItem} from "@/models/movie.ts";

import MovieSelect from "@/components/core/MovieSelect.tsx";
import {useKino} from "@/contexts/KinoProvider.tsx";


export default function CreateScreeningForm() {
    const [selectedMovie, setSelectedMovie] = useState<IMovieItem | null>(null)
    const {kino} = useKino();

    console.log(kino)
    console.log(selectedMovie)

    return (
        <>
            <form className="form">
                <div className="flex flex-col gap-1">
                    <label htmlFor="movie">Movie:</label>
                    <MovieSelect setSelectedMovie={setSelectedMovie}/>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="cinema">Cinema:</label>
                    <KinoSelect/>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="auditorium">Auditorium</label>
                </div>

                <div>
                    start time
                </div>

                <div>
                    is3d
                </div>

                <input className={"hover:cursor-pointer"} type="submit" value="Submit"/>
            </form>
        </>
    )
}
import MovieItem from "@/components/core/MovieItem";
import { useKino } from "@/contexts/KinoProvider";
import { useEffect } from "react";





export default function MovieListPage() {
    const { kino } = useKino();

    useEffect(() => {
        console.log(kino);
        
    },[kino])
    



    return (
        <>
            <h1>Film i {kino}</h1>
            <div className="grid grid-cols-5 gap-4">
                <MovieItem movie={{ name: "The Matrix Resurrections", poster: "MatrixPoster", id: 2 }} />
                <MovieItem movie={{ name: "Spider-Man: No Way Home", poster: "SpiderManPoster", id: 3 }} />
                <MovieItem movie={{ name: "The Batman", poster: "BatmanPoster", id: 4 }} />
                <MovieItem movie={{ name: "Jurassic World: Dominion", poster: "JurassicPoster", id: 5 }} />
                <MovieItem movie={{ name: "Avatar 2", poster: "AvatarPoster", id: 6 }} />
                <MovieItem movie={{ name: "Black Panther: Wakanda Forever", poster: "BlackPantherPoster", id: 7 }} />
                <MovieItem movie={{ name: "The Lord of the Rings: The Rings of Power", poster: "LOTRPoster", id: 8 }} />
                <MovieItem movie={{ name: "Top Gun: Maverick", poster: "TopGunPoster", id: 9 }} />
                <MovieItem movie={{ name: "Mission: Impossible 8", poster: "MissionImpossiblePoster", id: 10 }} />
                <MovieItem movie={{ name: "Fast & Furious 10", poster: "FastAndFuriousPoster", id: 11 }} />
            </div>
            
        </>
    );
}

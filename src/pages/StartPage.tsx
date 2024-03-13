import StartPageButton from "@/components/core/StartPageButton";
import { useKino } from "@/contexts/KinoProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const DUMMYCINEMA = [
    {
        name: "Imperial",
        city: "København",
    },
    {
        name: "Big Bio",
        city: "Aalborg",
    },
    {
        name: "Grande Bio",
        city: "Esbjerg",
    },
];


export default function StartPage() {
    const { setKino } = useKino();
    const [kinos, setKinos] = useState(DUMMYCINEMA);
    const navigate = useNavigate();

    useEffect(() => {
        //hent alle biografer
    }, [])

    

    const handleClick = (chosenCinema: string) => {
        setKino(chosenCinema);
        navigate("/movies", { replace: true });
    }
    
    return (
        <>
            <h1>Vælg Biograf</h1>
            {kinos.map((kino) => (
                <StartPageButton name={kino.name} city={kino.city} onClick={handleClick} />
            ))}
        </>
    );
}
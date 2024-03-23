import StartPageButton from "@/components/core/StartPageButton";
import { useToast } from "@/components/ui/use-toast";
import { useKino } from "@/contexts/KinoProvider";
import { IKino } from "@/models/kino";
import { getKinos } from "@/services/apiFacade";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
    const { setKino, setId } = useKino();
    const [kinos, setKinos] = useState<IKino[] | null>(null);
    const navigate = useNavigate();
    const { toast } = useToast();
    console.log(kinos);

    //const queryClient = useQueryClient();

    const { isLoading } = useQuery({
        queryKey: ["kinos"],
        queryFn: () =>
            getKinos()
                .then((data) => setKinos(data))
                .catch(() => {
                    toast({
                        title: "Something went wrong!",
                        description: `Could not find the cinemas in our system. Please reload the webpage or try again at a later time.`,
                        variant: "destructive",
                    });
                }),
    });

    const handleClick = (chosenCinema: string) => {
        const cinema = kinos?.find((k) => k.name === chosenCinema) as IKino;
        setKino(cinema.name);
        setId(cinema.id);
        navigate("/movies", { replace: true });
    };

    //if (isError) return <div>Something went wrong...</div>;

    if (isLoading) return <div>Loading data...</div>;

    return (
        <div className="flex flex-col items-center justify-center md:flex-row">
            <aside className="mb-3 flex flex-col items-center text-center">
                <img className="max-w-xs" src="cat_popcorn.png" alt="cat_popcorn" />
                <h1 className="text-3xl font-semibold">Welcome!</h1>
                <h2 className="text-2xl">Choose a kino</h2>
            </aside>
            <aside className="flex flex-col items-center md:items-start">
                {kinos?.map((kino) => <StartPageButton key={kino.id} name={kino.name} city={kino.city} onClick={handleClick} />)}
            </aside>
        </div>
    );
}

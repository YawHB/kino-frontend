import { useEffect, useState } from "react";
import { useKino } from "../../contexts/KinoProvider";
import { useNavigate } from "react-router-dom";
import { getKinos } from "@/services/apiFacade";
import { IKino } from "@/models/kino";

export default function KinoSelect() {
    const { kino, setKino } = useKino();
    const [kinoOptions, setKinoOptions] = useState<IKino[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getKinos()
            .then((data) => setKinoOptions(data))
            .catch((e) => {
                console.log(e);
            });
    }, [kino]);

    return (
        <>
            <select className="w-40 h-10 rounded-sm px-3 text-lg"
                value={kino}
                onChange={(e) => {
                    setKino(e.target.value);
                    //navigate("/movies", { replace: true });
                }}
            >
                <option value={kino}>{kino}</option>
                {kinoOptions?.map((kinoOption) => 
                    kinoOption.name !== kino && (
                        <option key={kinoOption.name} value={kinoOption.name}>{kinoOption.name}</option>
                    )
                )}
            </select>
        </>
    );
}

import { useEffect, useState } from "react";
import { useKino } from "../../contexts/KinoProvider";
import { getKinos } from "@/services/apiFacade";
import { IKino } from "@/models/kino";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

export default function KinoSelect() {
    const { kino, setKino } = useKino();
    const [kinoOptions, setKinoOptions] = useState<IKino[] | null>(null);

    useEffect(() => {
        getKinos()
            .then((data) => setKinoOptions(data))
            .catch((e) => {
                console.log(e);
            });
    }, [kino]);

    return (
        <>
            <Select value={kino} onValueChange={(name) => setKino(name)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Cinema"/>
                </SelectTrigger>
                <SelectContent>
                    {kinoOptions?.map((kinoOption) => <SelectItem key={kinoOption.name} value={kinoOption.name}>{kinoOption.name}</SelectItem>)}
                </SelectContent>
            </Select>
        </>
    );
}

/*
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

 */
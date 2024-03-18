import React, {useEffect, useState} from "react";
import {IAuditorium} from "@/models/auditorium.ts";
import {getAuditoriumsByCinemaId} from "@/services/apiFacade.ts";
import {useKino} from "@/contexts/KinoProvider.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

type Props = {
    setSelectedAuditorium: React.Dispatch<React.SetStateAction<IAuditorium | null>>;
}

export default function AuditoriumSelect({setSelectedAuditorium}: Props) {
    const [auditoriums, setAuditoriums] = useState<null | IAuditorium[] >(null);
    const {id} = useKino()

    useEffect(() => {
        console.log(id)
        getAuditoriumsByCinemaId(id)
            .then((auditoriums) => setAuditoriums(auditoriums))
            .catch(() => console.log("toast"))

    }, [id]);

    const handleChange = (auditoriumId: number) => {
        console.log("Auditorium id " + auditoriumId)
        setSelectedAuditorium(auditoriums?.find((a) => a.id === auditoriumId)!);
    }

    return (
        <>
            <Select required={true} onValueChange={(id) => handleChange(Number(id))}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                    {auditoriums?.map((auditorium) => <SelectItem key={auditorium.id} value={String(auditorium.id)}>{auditorium.name}</SelectItem>)}
                </SelectContent>
            </Select>
        </>
    )

}
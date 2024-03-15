import {useEffect, useState} from "react";
import {IAuditorium} from "@/models/auditorium.ts";
import {getAuditoriumsByCinemaId} from "@/services/apiFacade.ts";
import {useKino} from "@/contexts/KinoProvider.tsx";



export default function AuditoriumSelect() {
    const [auditoriums, setAuditoriums] = useState<null | IAuditorium[] >(null);
    const {id} = useKino()

    useEffect(() => {
        getAuditoriumsByCinemaId(id)
            .then((auditoriums) => setAuditoriums(auditoriums))
            .catch(() => console.log("toast"))

    }, [id]);

    console.log(auditoriums)

    return (
        <>
            //TODO: Vis auditoriums her:
        </>
    )

}
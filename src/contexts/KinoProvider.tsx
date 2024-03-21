import React, { ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

type KinoContextType = {
    kino: string,
    setKino: React.Dispatch<SetStateAction<string>>
    id: number,
    setId: React.Dispatch<SetStateAction<number>>
}

const KinoContext = createContext<KinoContextType>(null!);

export default function KinoProvider({ children }: { children: ReactNode }) {
    const [kino, setKino] = useState(localStorage.getItem("kinoName") || "");
    const [id, setId] = useState<number>(parseInt(localStorage.getItem("kinoId") || "0"))

    // add selected kino to localStorage
    useEffect(() => {
        localStorage.setItem("kinoName", kino)
        localStorage.setItem("kinoId", id.toString())
    }, [kino, id])
    
    return (
        <KinoContext.Provider value={{ kino, setKino, id, setId }}>{children}</KinoContext.Provider>
    )
}


export function useKino() {
    return useContext(KinoContext);
}
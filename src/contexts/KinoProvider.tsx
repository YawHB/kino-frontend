import React, { ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type KinoContextType = {
    kino: string,
    setKino: React.Dispatch<SetStateAction<string>>
    id: number,
    setId: React.Dispatch<SetStateAction<number>>
}

const KinoContext = createContext<KinoContextType>(null!);

export default function KinoProvider({ children }: { children: ReactNode }) {
    const [kino, setKino] = useState("");
    const [id, setId] = useState<number>(0)
    
    return (
        <KinoContext.Provider value={{ kino, setKino, id, setId }}>{children}</KinoContext.Provider>
    )
}


export function useKino() {
    return useContext(KinoContext);
}
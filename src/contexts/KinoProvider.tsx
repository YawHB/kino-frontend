import { ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type KinoContextType = {
    kino: string,
    setKino: React.Dispatch<SetStateAction<string>>
}

const KinoContext = createContext<KinoContextType>(null!);

export default function KinoProvider({ children }: { children: ReactNode }) {
    const [kino, setKino] = useState("");
    
    return (
        <KinoContext.Provider value={{ kino, setKino }}>{children}</KinoContext.Provider>
    )
}


export function useKino() {
    return useContext(KinoContext);
}
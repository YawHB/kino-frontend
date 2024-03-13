import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick?: (e: React.MouseEvent) => void;
}

export default function Button({ onClick, children }: Props) {

    
    return (
        <button onClick={(e) => onClick && onClick(e)} className="bg-green-400">
            {children}
        </button>
    );
}

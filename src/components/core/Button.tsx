import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick?: (e: React.MouseEvent) => void;
}

export default function Button({ onClick, children }: Props) {
    const primary = "bg-slate-400 hover:bg-slate-200";

    return (
        <button
            onClick={(e) => onClick && onClick(e)}
            className={`${primary} px-4 py-2 rounded-sm  transition-all text-lg`}
        >
            {children}
        </button>
    );
}

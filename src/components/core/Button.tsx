import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
    icon?: ReactNode;
    style: "primary" | "secondary";
    onClick?: (e: React.MouseEvent) => void;
}

export default function Button({ onClick, icon, style, children }: Props) {
    const primary = "hover:text-cyan-400 font-bold text-white transition-all hover:scale-105 active:scale-100 active:text-white";

    const secondary =
        "text-white bg-red-600 hover:bg-white hover:text-red-600 active:scale-100 hover:outline outline-2 outline-red-600 font-bold drop-shadow-md";

    const buttonStyle = style === "primary" ? primary : secondary;

    return (
        <button onClick={(e) => onClick && onClick(e)} className={`${buttonStyle} rounded-md bg-none px-4 py-2 text-sm transition-all`}>
            <div className="flex items-center gap-1 align-middle ">
                {icon && <div>{icon}</div>}

                <div>{children}</div>
            </div>
        </button>
    );
}

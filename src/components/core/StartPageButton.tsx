import React from "react";

interface Props {
    name: string;
    city: string;
    onClick: (cinema: string) => void;
}

export default function StartPageButton({ name, city, onClick }: Props) {
    return (
        <article
            className="m-3 w-52 cursor-pointer rounded-md bg-red-600 p-3 shadow-sm shadow-slate-300 transition-all hover:scale-105 hover:bg-red-500 active:scale-95 active:bg-red-200"
            onClick={() => onClick(name)}
        >
            <h2 className="text-2xl font-bold text-white">{name}</h2>
            <h3 className="text-white opacity-70">{city}</h3>
        </article>
    );
}

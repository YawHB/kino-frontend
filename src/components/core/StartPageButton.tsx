import React from "react";

interface Props {
    name: string;
    city: string;
    onClick: (cinema: string) => void;
}

export default function StartPageButton({ name, city, onClick }: Props) {
    return (
        <div className="w-50 bg-slate-500 m-3" onClick={() => onClick(name)}>
            <div>{name}</div>
            <div>{city}</div>
        </div>
    );
}

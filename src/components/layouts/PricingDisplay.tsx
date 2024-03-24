import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function PricingDisplay({ children }: Props) {
    return (
        <div className="min-h-80 min-w-80 max-w-96 rounded-lg bg-orange-100 p-5 shadow-lg">
            <div className="grid grid-cols-[2fr,1fr] gap-1">{children}</div>
        </div>
    );
}

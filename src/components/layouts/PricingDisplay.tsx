import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export default function PricingDisplay({children}: Props) {
  return (
      <div className="min-w-80 max-w-96 rounded-sm bg-slate-300 p-5">
          <div className="grid grid-cols-[3fr,1fr] gap-1">
           {children}
          </div>
      </div>
  );
}

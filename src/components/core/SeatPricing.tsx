import { Iseat } from '@/models/seat'
import React from 'react'
import { SiUbereats } from 'react-icons/si';

interface Props {
    seats: Iseat[]
}


export default function SeatPricing({seats}: Props) {
    const TOTAL_SEAT_PRICE = seats.reduce((sum, currSeat) =>  sum + currSeat.seatPricing.price, 0 )
    
    console.log(seats);
    
  return (
    <div>Total price - {TOTAL_SEAT_PRICE}</div>
  )
}

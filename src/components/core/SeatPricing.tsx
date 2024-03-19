import { Iseat } from "@/models/seat";
import React from "react";
import { SiUbereats } from "react-icons/si";

interface Props {
  seats: Iseat[];
}

export default function SeatPricing({ seats }: Props) {
  const GROUP_PRICING_ADJUSTMENT =
    seats.length <= 5 ? 1.05 : seats.length > 10 ? 0.97 : 1;

  const TOTAL_SEAT_PRICE =
    seats.reduce((sum, currSeat) => sum + currSeat.seatPricing.price, 0) *
    GROUP_PRICING_ADJUSTMENT;

  console.log(seats);
  console.log(GROUP_PRICING_ADJUSTMENT);
  

  return <div>Total price - {TOTAL_SEAT_PRICE}</div>;
}

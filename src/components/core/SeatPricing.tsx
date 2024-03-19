import { Iseat } from "@/models/seat";
import React from "react";
import { SiUbereats } from "react-icons/si";

interface Props {
  seats: Iseat[];
  runtime?: number;
  is3D?: boolean;
}

export default function SeatPricing({ seats, runtime, is3D }: Props) {
  const DUMMY_MOVIE_RUNTIME = 160;
  const DUMMY_MOVIE_IS3D = false;

  const GROUP_PRICING_ADJUSTMENT =
    seats.length <= 5 ? 1.05 : seats.length > 10 ? 0.97 : 1;

  const TOTAL_SEAT_PRICE =
    seats.reduce((sum, currSeat) => sum + currSeat.seatPricing.price, 0) *
    GROUP_PRICING_ADJUSTMENT;

  const RUNTIME_FEE = DUMMY_MOVIE_RUNTIME >= 170 ? 10 : 0;
  console.log("runtime fee: " + RUNTIME_FEE);
  
  const FEE_3D = DUMMY_MOVIE_IS3D ? 15 : 0;
  console.log("3d fee: " + FEE_3D);

    
  console.log(seats);
  console.log(GROUP_PRICING_ADJUSTMENT);

  return <div>Total price - {TOTAL_SEAT_PRICE}</div>;
}

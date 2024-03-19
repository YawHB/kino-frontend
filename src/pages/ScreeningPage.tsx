import Auditorium from "@/components/core/Auditorium";
import { IScreening } from "@/models/screening";
import { Iseat } from "@/models/seat";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const ScreeningPage = () => {
  const screening = useLocation().state as IScreening;
  const [selectedSeats, setSelectedSeats] = useState<Iseat[]>([]);

  function handleSeatClick(seat: Iseat) {
    console.log("seat: " + seat);

    if (selectedSeats.includes(seat)) {
      const filteredSeats = selectedSeats.filter(
        (currSeat) => currSeat !== seat,
      );
      setSelectedSeats(filteredSeats);
    } else {
      setSelectedSeats((prev) => [...prev, seat]);
    }
  }

  console.log("Selected seats: " + selectedSeats);

  console.log(screening);

  return (
    <>
      <h1>Screening Page</h1>
      <Auditorium screening={screening} handleSeatClick={handleSeatClick} />
    </>
  );
};

export default ScreeningPage;

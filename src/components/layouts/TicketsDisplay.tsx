import { Iseat } from "@/models/seat";
import Ticket from "../core/Ticket";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface Props {
    selectedSeats: Iseat[];
}

export default function TicketsDisplay({ selectedSeats }: Props) {
    return (
        <Carousel>
            <CarouselPrevious />
            <CarouselContent>
                {selectedSeats.map((seat) => (
                    <CarouselItem key={seat.id} className="basis-36">
                        <Ticket seat={seat} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext />
        </Carousel>
    );
}

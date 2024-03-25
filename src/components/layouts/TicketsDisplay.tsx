import { Iseat } from "@/models/seat";
import Ticket from "../core/Ticket";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface Props {
    selectedSeats: Iseat[];
}

export default function TicketsDisplay({ selectedSeats }: Props) {
    return (
        <div className="relative">
            <div className="pointer-events-none absolute opacity-80 z-10 h-full w-full bg-[linear-gradient(90deg,rgba(100,116,139,1)0%,rgba(0,0,0,0)5%,rgba(0,0,0,0)95%,rgba(100,116,139,1)100%)]"></div>
            <Carousel>
                <CarouselPrevious variant={"ghost"} />
                <CarouselContent>
                    {selectedSeats.map((seat) => (
                        <CarouselItem key={seat.id} className="basis-36 animate-fade-in">
                            <Ticket seat={seat} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext variant={"ghost"} />
            </Carousel>
        </div>
    );
}

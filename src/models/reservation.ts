import {IScreening} from "@/models/screening.ts";
import {Iseat} from "@/models/seat.ts";


export interface IReservation {
    id: number,
    user: string,
    screening: IScreening,
    seats: Iseat[],
    createdAt: string
}
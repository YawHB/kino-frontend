import {IAuditorium} from "@/models/auditorium.ts";


export interface IScreening {
    id: number,
    auditorium: IAuditorium,
    startTime: Date,
    is3D: boolean
}
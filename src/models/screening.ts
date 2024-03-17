import {IAuditorium} from "@/models/auditorium.ts";
import { IMovieItem } from "./movie";


export interface IScreening {
    id: number;
    auditorium: IAuditorium;
    movie: IMovieItem;
    startTime: Date;
    is3D: boolean;
}

import { API_URL } from "@/settings";
import {handleHttpErrors, makeOptions} from "./fetchUtils";
import {IAuditorium} from "@/models/auditorium.ts";
import {IScreening} from "@/models/screening.ts";
import {Iseat} from "@/models/seat.ts";

const KINO_URL = API_URL + "/cinemas";
const MOVIE_URL = API_URL + "/movies";
const SCREENING_URL = API_URL + "/screenings";
const SEAT_URL = API_URL + "/seats";

type TMovieRequest = {
    id: number,
    title: string,
    runtime: number,
    premiere: Date,
    poster: string
}

export type TScreeningRequest = {
    movieId: number,
    auditoriumId: number,
    is3D: boolean,
    startTime: Date
}


export async function getKinos() {
    return await fetch(KINO_URL).then(handleHttpErrors);
}

export async function getTMDBMovie(id: string) {
    return await fetch(`${MOVIE_URL}/TMDB/${id}`).then(handleHttpErrors);
}

export async function postMovie(newMovie: TMovieRequest) {
    const options = makeOptions("POST", newMovie);
    return await fetch(MOVIE_URL, options).then(handleHttpErrors);
}

export async function getAllMovies() {
    return await fetch(MOVIE_URL).then(handleHttpErrors);
}

export async function getMoviesByCinemaId(cinemaId: number) {
    return await fetch(`${MOVIE_URL}/cinemas/${cinemaId}`).then(handleHttpErrors);
}

export async function getAuditoriumsByCinemaId(cinemaId: number): Promise<IAuditorium[]> {
    return await fetch(`${KINO_URL}/${cinemaId}/auditoriums`).then(handleHttpErrors);
}

export async function createScreening(newScreening: TScreeningRequest): Promise<IScreening> {
    const options = makeOptions("POST", newScreening);
    return await fetch(`${SCREENING_URL}`, options).then(handleHttpErrors);
}

export async function getSeatsByAuditoriumId(auditoriumId: number): Promise<Iseat[]> {
    return await fetch(`${SEAT_URL}/auditorium/${auditoriumId}`).then(handleHttpErrors)
}

export async function getMovieScreeningsInCinema(movieId: number, cinemaId: number, startDate: string, endDate: string): Promise<IScreening[]> {
    return await fetch(`${SCREENING_URL}?movieId=${movieId}&cinemaId=${cinemaId}&startDate=${startDate}&endDate=${endDate}`).then(handleHttpErrors);
}

export async function getReservedSeatsByScreeningId(screeningId: number): Promise<Iseat[]> {
    return await fetch(`${SEAT_URL}/screening/${screeningId}`).then(handleHttpErrors);
}
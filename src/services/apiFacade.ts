
import { API_URL } from "@/settings";
import {handleHttpErrors, makeOptions} from "./fetchUtils";
import {IAuditorium} from "@/models/auditorium.ts";

const KINO_URL = API_URL + "/cinemas";
const MOVIE_URL = API_URL + "/movies";

type TMovieRequest = {
    id: number,
    title: string,
    runtime: number,
    premiere: Date,
    poster: string
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

export async function getAuditoriumsByCinemaId(cinemaId: number): Promise<IAuditorium[]> {
    return await fetch(`${KINO_URL}/${cinemaId}/auditoriums`).then(handleHttpErrors);
}
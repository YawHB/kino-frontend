import { API_URL } from '@/settings';
import { makeOptions, handleHttpErrors } from './fetchUtils';

const KINO_URL = API_URL + '/cinemas';
const MOVIES_URL = API_URL + '/movies';

export async function getKinos() {
    return await fetch(KINO_URL).then(handleHttpErrors);
}

export async function getAllMovies() {
    return await fetch(MOVIES_URL).then(handleHttpErrors);
}

import { API_URL } from "@/settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";

const KINO_URL = API_URL + "/cinemas";

export async function getKinos() {
    return await fetch(KINO_URL).then(handleHttpErrors);
}

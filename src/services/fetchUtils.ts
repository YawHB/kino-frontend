import {IReservation} from "@/models/reservation.ts";

/**
 * Utility Method to create options for a fetch call
 * @param method GET, POST, PUT, DELETE
 * @param body  The request body (only relevant for POST and PUT)
 * @param authRequired
 * @returns
 */
export function makeOptions(method: string, body: object | null, authRequired?: boolean): RequestInit {
    const headers = new Headers();
    headers.append("Content-type", "application/json");
    headers.append("Accept", "application/json");

    if (authRequired) {
        const token = localStorage.getItem("token");
        headers.append("Authorization", `Bearer ${token}`);
    }

    const opts: RequestInit = {
        method: method,
        headers: headers,
    };

    if (body) {
        opts.body = JSON.stringify(body);
    }

    return opts;
}

/**
 * Utility Method to handle http-errors returned as a JSON-response with fetch
 * Meant to be used in the first .then() clause after a fetch-call
 */
export async function handleHttpErrors(res: Response) {
    if (!res.ok) {
        const errorResponse = await res.json();
        const msg = errorResponse.message ? errorResponse.message : "No details provided";
        throw new Error(msg);
    }
    return res.json();
}

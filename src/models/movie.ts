//TODO Vi starter her:
export interface IMovieItem {
    id: number;
    title: string;
    poster: string;
    runtime: number;
    premiere: string;
}

export interface IMovieDetails {
    id: number;
    title: string;
    overview: string;
    runtime: number;
    //premiere: string; //TODO: Missing on DTO from backend
    posterPath: string;
    genres: string[];
}

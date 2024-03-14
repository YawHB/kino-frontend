//TODO Vi starter her:
export interface IMovieItem {
    id: number;
    name: string;
    poster: string;
}

export interface IMovieDetail {
    id: number,
    title: string,
    overview: string,
    runtime: number,
    status: string,
    posterPath: string,
    genres: string[]
}
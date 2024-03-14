import MovieItem from '@/components/core/MovieItem';
import { toast } from '@/components/ui/use-toast';
import { useKino } from '@/contexts/KinoProvider';
import { IMovieItem } from '@/models/movie';
import { getAllMovies, getKinos } from '@/services/apiFacade';
import { useQuery } from '@tanstack/react-query';
import { log } from 'console';
import { useEffect, useState } from 'react';

export default function MovieListPage() {
    const { kino } = useKino();
    const [movies, setMovies] = useState<IMovieItem[] | null>(null);
    console.log(movies);

    // useEffect(() => {
    //     console.log(kino);
    // }, [kino]);

    const { isLoading } = useQuery({
        queryKey: ['movies'],
        queryFn: () =>
            getAllMovies()
                .then((data) => setMovies(data))
                .catch(() => {
                    toast({
                        title: 'Something went wrong!',
                        description: `Could not find the movies in our system. Please reload the webpage or try again at a later time.`,
                        variant: 'destructive',
                    });
                }),
    });

    return (
        <>
            <h1 className="my-16 text-5xl font-extrabold">Film i {kino}</h1>
            <div className="grid grid-cols-5 gap-4">{movies?.map((movie) => <MovieItem movie={movie} key={movie.id} />)}</div>
        </>
    );
}

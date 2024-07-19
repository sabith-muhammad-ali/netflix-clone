import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieItem from './MovieItem'

interface Movie {
  title: string;
  id: number;
}

interface MovieRowProps {
  title: string;
  url: string;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, url }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    axios.get(url).then((response) => setMovies(response.data.results));
  }, [url]);

  return (
    <>
      <h2 className="font-nsans-bold md:text-xl p-4 capitalize">{title}</h2>

      <div className="relative flex items-center">
        <div
          id={`slider`}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieRow;

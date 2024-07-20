import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface Movie {
  title: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
}

interface MovieRowProps {
  title: string;
  url: string;
  slider: string;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, url, slider }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [rowId] = useState(() => Math.floor(Math.random() + 1000));

  useEffect(() => {
    axios.get(url).then((response) => setMovies(response.data.results));
  }, [url]);

  const slide = (offset: number) => {
    const sliderElement = document.getElementById(
      slider + rowId
    ) as HTMLElement;
    if (sliderElement) {
      sliderElement.scrollLeft = sliderElement.scrollLeft + offset;
    }
  };

  return (
    <>
      <h2 className="font-nsans-bold md:text-xl p-4 capitalize">{title}</h2>

      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => slide(-500)}
          className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
        <div
          id={slider + rowId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies &&
            movies.map((movie) => <MovieItem key={movie.id} movie={movie} />)}
        </div>
        <MdChevronRight
          onClick={() => slide(500)}
          className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
      </div>
    </>
  );
};

export default MovieRow;

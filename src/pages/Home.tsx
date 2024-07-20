import React from "react";
import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";
import endpoints from "../services/movieServices";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <MovieRow title="upcoming" url={endpoints.upcoming} slider="upcomint"/>
      <MovieRow title="trending" url={endpoints.trending} slider="trending"/>
      <MovieRow title="top rated" url={endpoints.topRated} slider="top rated"/>
      <MovieRow title="comedy" url={endpoints.comedy} slider="comedy"/>
      <MovieRow title="popular" url={endpoints.popular} slider="popular"/>
    </>
  );
};

export default Home;

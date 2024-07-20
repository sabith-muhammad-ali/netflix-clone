import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { createImgUrl } from "../services/movieServices";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";

interface Movie {
  title: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
}

const Profile = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      const userDoc = doc(db, "users", `${user.email}`);
      const unsubscribe = onSnapshot(userDoc, (doc) => {
        if (doc.exists()) setMovies(doc.data().favShows || []);
      });
      return () => unsubscribe();
    }
  }, [user?.email]);

  console.log(movies);

  const slide = (offset: number) => {
    const sliderElement = document.getElementById("slider") as HTMLElement;
    if (sliderElement) {
      sliderElement.scrollLeft = sliderElement.scrollLeft + offset;
    }
  };

  const handelUnlikeShow = async (movie: Movie) => {
    if (!user?.email) {
      console.error("User email is not available.");
      return;
    }

    try {
      const userDoc = doc(db, "users", user.email);
      await updateDoc(userDoc, {
        favShows: arrayRemove(movie),
      });
    } catch (error) {
      console.error("Error removing movie: ", error);
    }
  };

  if (!user) {
    return <p>Fetching shows...</p>;
  }

  return (
    <>
      <div>
        <div>
          <img
            className="block w-full h-[500px] object-cover"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/655a9668-b002-4262-8afb-cf71e45d1956/5ff265b6-3037-44b2-b071-e81750b21783/IN-en-20240715-POP_SIGNUP_TWO_WEEKS-perspective_WEB_c6d6616f-4478-4ac2-bdac-f54b444771dd_large.jpg"
            alt=""
          />
          <div className="bg-black/60 fixed top-0 left-0 w-full h-[500px]" />
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-4 md:p-8">
            <h1 className="text-3xl md:text-6xl font-nsans-bold text-white">
              My Shows
            </h1>
            <p className="font-nsans-light text-gray-400 text-lg">
              {user.email}
            </p>
          </div>
        </div>

        <h2 className="font-nsans-bold md:text-xl p-4 capitalize">Fav Shows</h2>

        <div className="relative flex items-center group">
          <MdChevronLeft
            onClick={() => slide(-500)}
            className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
            size={40}
          />
          <div
            id="slider"
            className=" w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2"
              >
                <img
                  className="w-full h-40 block object-cover object-top"
                  src={createImgUrl(
                    movie.backdrop_path ?? movie.poster_path,
                    "w500"
                  )}
                  alt={movie.title}
                />
                <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                  <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                    {movie.title}
                  </p>
                  <p>
                    <AiOutlineClose
                      onClick={() => handelUnlikeShow(movie)}
                      size={30}
                      className="absolute top-2 right-2"
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <MdChevronRight
            onClick={() => slide(500)}
            className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
            size={40}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;

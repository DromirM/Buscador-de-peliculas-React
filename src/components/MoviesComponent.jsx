import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import '../styles/MoviesComponentStyle.css';

export const MoviesComponent = ({moviesData}) => {
  if (!moviesData?.results) return null;
  
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if(moviesData?.results.length > 0){
      setMovies(moviesData.results);
    } else{
      setMovies([]);//Si no se encontraron peliculas, limpio la variable de estado.
    }
  }, [moviesData]);
  
  return (
    <>
      <div className="moviesContainer">
        {
          movies.map((movie)=>{
            return(
              <motion.div
                key={movie.id}
                initial={{opacity: 0, y: 20}} //Estado inicial.
                animate={{opacity: 1, y: 0}} //Estado final.
                transition={{duration: 1}} //Duracion de la transicion.
                className="movie"
              >
                <img
                  className="movie-poster"
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '../assets/images/mortimer.png'} 
                  alt="image not found"
                />
                <h2 className="movie-title">{movie.title}</h2>
                <p className="movie-date"><strong>Fecha de estreno:</strong> {movie.release_date}</p>
                <p className="movie-description"><strong>Sinopsis:</strong> {movie.overview}</p>
              </motion.div>
            );
          })
        }
      </div>
    </>
  );
};
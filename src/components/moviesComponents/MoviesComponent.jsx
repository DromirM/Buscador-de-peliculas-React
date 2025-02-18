import { useContext, useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Box } from "@mui/material";
import { BackgroundImageContext } from "../../context/BackgroundImageContext";
import { getBackgroundUrl } from "./backgroundPath";
import '../../styles/MoviesComponentStyle.css';

export const MoviesComponent = memo(({moviesData}) => {
  if (!moviesData?.results) return null;
  
  const [movies, setMovies] = useState([]);
  const {setPath} = useContext(BackgroundImageContext);

  useEffect(() => {
    if(moviesData?.results.length > 0){
      setMovies(moviesData.results);
      setPath(`https://image.tmdb.org/t/p/original/${getBackgroundUrl(moviesData.results)}`);
    } else{
      setMovies([]);//Si no se encontraron peliculas, limpio la variable/array de estado.
      setPath('/assets/images/defaultBackground.jpg');
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
                <label className="ratingLabel">
                  <strong>Puntaje:</strong> 
                  <div className="ratingContainerStyles">
                    <Rating 
                      name="half-rating-read" 
                      className="rating-component"
                      defaultValue={movie.vote_average} 
                      precision={0.1} 
                      max={10} 
                      readOnly 
                      icon={<StarIcon style={{ opacity: 1}} fontSize="inherit" />}
                      emptyIcon={<StarIcon style={{ opacity: 1}} fontSize="inherit" />}
                    />
                  </div>
                  <Box sx={{ ml: '2%'}} >{Number.parseFloat(movie.vote_average).toFixed(1)}</Box>
                </label>
                <p className="movie-description"><strong>Sinopsis:</strong> {movie.overview}</p>
              </motion.div>
            );
          })
        }
      </div>
    </>
  );
});
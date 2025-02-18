
export const getBackgroundUrl = (movies) => {
  //Funcion que dado el array de peliculas, retorna un fondo valido.
  for (let i = 0; i < movies.length; i++) {
    if(movies[i].backdrop_path){
      return movies[i].backdrop_path;
    }
  }
  
  return null;
}
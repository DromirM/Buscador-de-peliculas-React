import { useForm } from './hooks/useForm';
import { useFetch } from './hooks/useFetch';
import { useRef, useState, useEffect, useContext } from 'react';
import { MoviesComponent } from './components/moviesComponents/MoviesComponent';
import { ToastComponent } from './components/toast/ToastComponent';
import { ToastContext } from './context/ToastContext';
import { BackgroundImageContext } from './context/BackgroundImageContext';
import { motion } from "framer-motion";

export const BuscadorPeliculas = () => {
  //La clave aqui debe coincidir con el/los nombre/s del/los input.
  const initialForm = {
    inputSearch: ''
  }

  const api_key = import.meta.env.VITE_API_KEY;
  const urlBase = import.meta.env.VITE_BASE_URL;

  const {inputSearch, onInputChange, cleanInputs} = useForm(initialForm);
  const [url, setUrl] = useState('');
  const inputRef = useRef('');
  const {data, isLoading, error} = useFetch(url);
  const {showToast, setShowToast} = useContext(ToastContext);
  const {path, setPath} = useContext(BackgroundImageContext);
  
  const handleOnSubmit = (e) =>{
    e.preventDefault();
    
    if(inputSearch.trim() !== ''){
      setUrl(`${urlBase}?api_key=${api_key}&query=${encodeURIComponent(inputSearch)}&language=es-ES`);
      cleanInputs(initialForm);
    }
    inputRef.current.focus();
  };

  useEffect(() => {
    if(data?.results.length === 0){
      setShowToast(true); //Se muestra el Toast si no se encontraron resultados.
      setPath('/assets/images/defaultBackground.jpg'); //Restablesco el fondo de pantalla por defecto.
    } else if(showToast === true) {
      setShowToast(false); //Se oculta el Toast si se encontraron resultados.
    }
  }, [data])
  
  return (
    <>
      <motion.div initial={{opacity: 0}}  animate={{opacity: 1}}  transition={{duration: 1}} >
        <div className='background-image' style={{backgroundImage: `url(${path})`} } />
      </motion.div>
      <div className="mainMoviesContainer">
        <h1 className="title">Buscador de peliculas</h1>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            placeholder="Escribe el nombre de una pelicula"
            name="inputSearch"
            value={inputSearch}
            ref={inputRef}
            onChange={onInputChange}
          />
          <button type="submit">Buscar</button>
        </form>
        
        {isLoading && <p>Cargando...</p>}
        {error && <p>Se ha producido un al obtener los datos.</p>}
        {data?.results.length
          ? 
          <MoviesComponent moviesData={data} /> 
          : 
          showToast && <ToastComponent message='No se hallaron peliculas con ese nombre.' />
        }
      </div>
    </>
  );
};

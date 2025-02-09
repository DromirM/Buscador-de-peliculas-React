import { useForm } from './hooks/useForm';
import { useFetch } from './hooks/useFetch';
import { useRef, useState, useEffect, useContext } from 'react';
import { MoviesComponent } from './components/MoviesComponent';
import { ToastComponent } from './components/toast/ToastComponent';
import { ToastContext } from './context/ToastContext';

export const BuscadorPeliculas = () => {
  
  //La clave aqui debe coincidir con el/los nombre/s del/los input.
  const initialForm = {
    inputSearch: ''
  }

  const api_key = import.meta.env.VITE_API_KEY;
  const urlBase = import.meta.env.VITE_BASE_URL;

  const {inputSearch, formState, onInputChange, cleanInputs} = useForm(initialForm);
  const [url, setUrl] = useState('');
  const inputRef = useRef('');
  const {data, isLoading, error} = useFetch(url);
  const {showToast, setShowToast} = useContext(ToastContext);
  
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
      setShowToast(true); //Se muestra Toast si no se encontraron resultados.
    } else {
      setShowToast(false); //Se oculta Toast si se encontraron resultados.
    }
  }, [data])
  
  return (
    <>
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

        {data?.results && <MoviesComponent moviesData={data} />}
      </div>
      {showToast && <ToastComponent message='No se hallaron peliculas con ese nombre.' />}
    </>
  )
}

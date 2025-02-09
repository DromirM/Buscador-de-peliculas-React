import { useEffect, useState } from "react";

const generateState = (parameterData = null, parameterIsLoading = true, parameterError = null) =>({
  /*Expresión de objeto implícito*/
  data: parameterData,
  isLoading: parameterIsLoading,
  error: parameterError
});

export const useFetch = (url) => {
  const [state, setState] = useState(generateState);
  
  //Desestructuro el state.
  const {data, isLoading, error} = state;

  const getFetch = async (url) =>{
    //Funcion que realiza un fetch y setea los datos para su posterior retorno.

    if(!url){
      //Detenemos la ejecucion.
      setState(generateState(null, false, null));
      return;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setState(generateState(data, false, null));

    } catch (error) {
      setState(generateState(null, false, error)); //En caso de error.
    }
  };

  useEffect(() =>{
    //setState(generateState()); //Reinicio el estado antes empezar. (re-redenrizado extra)
    getFetch(url);
  }, [url]);

  return { data, isLoading, error }
}
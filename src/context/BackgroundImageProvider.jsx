import { useState } from "react";
import { BackgroundImageContext } from "./BackgroundImageContext";

export const BackgroundImageProvider = ({children}) => {
  const [path, setPath] = useState('url("")')

  return (
    <BackgroundImageContext.Provider value={{path, setPath}}>
      {children}
    </BackgroundImageContext.Provider>
  )
}

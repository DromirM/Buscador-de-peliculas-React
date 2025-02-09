import { ToastContext } from "./ToastContext";
import { useState } from "react";

export const ToastProvider = ({children}) => {

  const [showToast, setShowToast] = useState(false);

  return (
    <ToastContext.Provider value={{showToast, setShowToast}}>
      {children}
    </ToastContext.Provider>
  )
}
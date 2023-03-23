import React, { createContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';


export const VendersContext = createContext([])

function VenderContext({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [userId, setUser] = useState('');


  const [isLang, setIsLang] = useState(localStorage.getItem('langChange'));



  const toggle = () => setIsOpen(!isOpen);
  function LogOut() {
    localStorage.removeItem('token')
    localStorage.removeItem("IDUser");
    return <Navigate to="/auth/login" replace={true} />
  }

  const chnageLang = () => {
    if (!localStorage.getItem('langChange')) {
      setIsLang('en')
      return localStorage.setItem('langChange', 'en')
    } else {
      return localStorage.setItem('langChange', isLang)
    }
  }
  useEffect(() => {
    setUser(localStorage.getItem("IDUser"))
    chnageLang()
  }, [userId, isLang])


  return (
    <>
      <VendersContext.Provider value={{ isLang, setIsLang, isOpen, setIsOpen, toggle, LogOut, userId }}>
        {children}
      </VendersContext.Provider>
    </>
  )
}

export default VenderContext
import React, { createContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';


export const VendersContext = createContext([])

function VenderContext({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [userId, setUser] = useState('');
  const toggle = () => setIsOpen(!isOpen);
  function LogOut() {
    localStorage.removeItem('token')
    localStorage.removeItem("IDUser");
    return <Navigate to="/auth/login" replace={true} />
  }
 
  useEffect(() => {
    setUser(localStorage.getItem("IDUser"))
  }, [userId])


  return (
    <>
      <VendersContext.Provider value={{ isOpen, toggle, LogOut,userId }}>
        {children}
      </VendersContext.Provider>
    </>
  )
}

export default VenderContext
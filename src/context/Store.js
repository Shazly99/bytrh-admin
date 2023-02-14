import React, { createContext, useEffect, useState } from 'react'; 
import { Navigate } from 'react-router-dom';


export const VendersContext = createContext([])

function VenderContext({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  function LogOut() {
    localStorage.removeItem('token')
    // setUserData(null)
    return <Navigate to="/auth/login" replace={true} />
  } 
  useEffect(() => { 
  }, [])


  return (
    <> 
      <VendersContext.Provider value={{  isOpen, toggle,LogOut }}>
        {children}
      </VendersContext.Provider>
    </>
  )
}

export default VenderContext
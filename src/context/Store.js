import React, { createContext, useEffect, useState } from 'react'; 


export const VendersContext = createContext([])

function VenderContext({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen); 
  useEffect(() => { 
  }, [])


  return (
    <> 
      <VendersContext.Provider value={{  isOpen, toggle }}>
        {children}
      </VendersContext.Provider>
    </>
  )
}

export default VenderContext
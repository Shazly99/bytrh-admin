import React, { createContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { GetData ,apiheader} from '../utils/fetchData';


export const VendersContext = createContext([])

function VenderContext({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [userId, setUser] = useState('');
  const [userLocationMap, setLoctionMap] = useState(null);


  const [isLang, setIsLang] = useState(localStorage.getItem('langChange'));



  const toggle = () => setIsOpen(!isOpen);
  function LogOut() {
    localStorage.removeItem('token')
    localStorage.removeItem("IDUser");
    localStorage.removeItem("Role");
    return <Navigate to="/admin/login" replace={true} />
  }

  const chnageLang = () => {
    if (!localStorage.getItem('langChange')) {
      setIsLang('en')
      return localStorage.setItem('langChange', 'en')
    } else {
      return localStorage.setItem('langChange', isLang)
    }
  }
  const [roleAdmin, setRole] = useState(null);
  async function rolesList(newUser) {
    let data= await GetData(`https://bytrh.com/api/admin/roles`, apiheader)
    setRole(data.Response);
  }

  useEffect(() => {
    setUser(localStorage.getItem("IDUser"))
    chnageLang()
    rolesList()
  }, [userId, isLang])


  return (
    <>
      <VendersContext.Provider value={{ userLocationMap,
setLoctionMap,roleAdmin,isLang, setIsLang, isOpen, setIsOpen, toggle, LogOut, userId }}>
        {children}
      </VendersContext.Provider>
    </>
  )
}

export default VenderContext
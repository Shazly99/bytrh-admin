import React, { createContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { apiheader, GetData } from '../utils/fetchData';


export const VendersContext = createContext([])

function VenderContext({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [userId, setUser] = useState('');

  const [countries, setCountries] = useState(null);
  const [cities, setCities] = useState(null);
  const [areas, setAreas] = useState(null);


  // countries
  const getCountries = async () => {
    let   {Response}   = await GetData(`${process.env.REACT_APP_API_URL}/admin/countries`, apiheader)
    setCountries(Response.Countries);
  }
  // cities
  const getCities = async (id) => {
    let  {Response}   = await GetData(`${process.env.REACT_APP_API_URL}/admin/cities/${id}`, apiheader)
    setCities(Response.Countries) 
  }
  // areas
  const getAreas = async () => {
    let {Response} = await GetData(`${process.env.REACT_APP_API_URL}/admin/areas/1`, apiheader)
  }

  
  const toggle = () => setIsOpen(!isOpen);
  function LogOut() {
    localStorage.removeItem('token')
    localStorage.removeItem("IDUser");
    return <Navigate to="/auth/login" replace={true} />
  }

  useEffect(() => {
    setUser(localStorage.getItem("IDUser"))
  }, [userId])
  useEffect(() => {
    getCountries()
    getCities(1)
    getAreas()
  }, [])

  return (
    <>
      <VendersContext.Provider value={{getCities, isOpen, cities,setIsOpen, toggle, LogOut, userId ,countries}}>
        {children}
      </VendersContext.Provider>
    </>
  )
}

export default VenderContext
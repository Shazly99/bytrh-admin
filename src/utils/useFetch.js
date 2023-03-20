import { useEffect, useState } from 'react';
import { apiheader, GetData } from './fetchData';


const useFetch = () => {

    const [countries, setCountries] = useState(null);
    const [cities, setCities] = useState(null);
    const [areas, setAreas] = useState(null);
 

    // countries
    const getCountries = async () => {
        let { Response } = await GetData(`${process.env.REACT_APP_API_URL}/admin/countries`, apiheader)
        setCountries(Response.Countries);
    }

    // cities
    const getCities = async (id) => {
        let { Response } = await GetData(`${process.env.REACT_APP_API_URL}/admin/cities/${id}`, apiheader)
        setCities(Response.Countries)
    }

    // areas
    const getAreas = async (id) => {
        let { Response } = await GetData(`${process.env.REACT_APP_API_URL}/admin/areas/1`, apiheader)
        setAreas(Response.Countries)
    }



    useEffect(() => {
        getCountries()
        getCities(1)
        getAreas(1) 
    }, [])


    return {
        countries,
        cities,
        areas,
        getCities,
        getCountries, 
    }
}


export default useFetch;

import { useEffect, useState } from 'react';
import { apiheader, GetData } from './fetchData';
import { VendersContext } from '../context/Store';
import { useContext } from 'react';


const useFetch = () => {
    let { isLang } = useContext(VendersContext);

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
        let { Response } = await GetData(`${process.env.REACT_APP_API_URL}/admin/areas/${id}`, apiheader)
        setAreas(Response)
    }



    useEffect(() => {


        let timeOut = setTimeout(() => {
            getCountries()
            /* getCities()
            getAreas() */
        }, 200);
        return (() => {
            clearTimeout(timeOut);
        })
    }, [isLang])


    return {
        countries,
        cities,
        areas,
        getCities,
        getCountries,
        getAreas
    }
}


export default useFetch;

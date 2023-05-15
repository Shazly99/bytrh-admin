import { useEffect, useState } from 'react';
import { apiheader, PostData } from './fetchData';
import { VendersContext } from '../context/Store';
import { useContext } from 'react';


const useHome = () => {
    let { isLang } = useContext(VendersContext);


    const [today, setToday] = useState(null);
    const [week, setWeek] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);

    // today
    const HomePageByDay = async () => {
        let { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/home`, { FilterType: 'TODAY' }, apiheader)
        setToday(data.Response);
    }

    // week
    const HomePageByWeek = async (id) => {
        let { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/home`, { FilterType: 'WEEK' }, apiheader)
        setWeek(data.Response)
    }

    // month
    const HomePageByMonth = async (id) => {
        let { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/home`, { FilterType: 'MONTH' }, apiheader)
        setMonth(data.Response)
    }


    //  Year
    const HomePageByYear = async (id) => {
        let { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/home`, { FilterType: 'YEAR' }, apiheader)
        setYear(data.Response)
    }



    useEffect(() => {
        let timeOut = setTimeout(() => {
            HomePageByDay()
            HomePageByWeek()
            HomePageByMonth()
            HomePageByYear()
        }, 200);
        return (() => {
            clearTimeout(timeOut);
        })
    }, [isLang])


    return {
        today,
        week,
        month,
        year
    }
}


export default useHome;

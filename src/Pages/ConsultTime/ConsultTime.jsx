import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import Component from '../../constants/Component';
import Icons from '../../constants/Icons';
import { apiheader } from '../../utils/fetchData';
import './ConsultTime.scss';
import { VendersContext } from '../../context/Store';
import axios from 'axios';
import translateConsultTimes from './translateConsultTimes';
// import $ from 'jquery';
// import { AiFillCloseCircle } from 'react-icons/ai';


const ConsultTime = () => {


    const apiConsultTimes = `https://bytrh.com/api/admin/consult/timevalues`;

    const [fetchConsultTime, setFetchConsultTime] = useState([]);
    const [loading, setLoading] = useState(null);


    async function getConsultTime() {
        setLoading(true);
        await axios.get(apiConsultTimes, {},  apiheader )
        .then(res => {
            if (res.status === 200 && res.request.readyState === 4) {
                setFetchConsultTime(res.data.Response);
                setLoading(false);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    useEffect(() => {
        const timeOut = setTimeout(() => {
            getConsultTime();
        }, 500);
        return(() => {
            clearTimeout(timeOut);
        })
    }, [])


    let { isLang } = useContext(VendersContext);



    return (
        !loading ?
        <Container fluid>
            <div className="app__Users mb-3">
                <Component.ButtonBase title={translateConsultTimes[isLang]?.addBTN} bg={"primary"} icon={<Icons.Add size={21} color={'#ffffffb4'} />} path={`/consultTime/add`} />
            </div> 
            {Object.keys(fetchConsultTime).length > 0 ?
                <div className="bg-light py-5 px-3 rounded-4 shadow-sm">
    
                <div className={`row g-4 d-flex justify-content-start align-items-center`}>
                        {fetchConsultTime?.map((el , i) => (
                            <Component.SingleConsultTime key={i} item={el} getConsultTime={getConsultTime} />
                        ))}
                    </div>
                </div>
                :
                <div className="bg-light py-5 px-3 rounded-4 shadow-sm d-flex justify-content-center align-items-center">
                    <h3 className='mb-0' style={{fontWeight: '600'}}>{translateConsultTimes[isLang]?.cond0}</h3>
                </div>
            }

        </Container >
        :
        <Component.Loader />
    )
}

export default ConsultTime
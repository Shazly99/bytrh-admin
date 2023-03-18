import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import { apiheader } from '../../../utils/fetchData';
import './Doctor.scss';
// import $ from 'jquery';
// import { AiFillCloseCircle } from 'react-icons/ai';


const DoctorHours = () => {


    const { id } = useParams();
    const apiDoctorHours = `https://bytrh.com/api/admin/doctors/hours`;

    const [fetchDoctorHours, setFetchDoctorHours] = useState([]);
    // const [fetchHours, setFetchHours] = useState([]);
    const [loading, setLoading] = useState(null);

    async function getDoctorHours() {
        setLoading(true);
        await axios.post(apiDoctorHours, {
            IDDoctor: id,
            DoctorHourService: 'CONSULT'
        },  apiheader )
            .then(res => {
                if (res.status === 200 && res.request.readyState === 4) {
                    setFetchDoctorHours(res.data.Response);
                    setLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        getDoctorHours();
    }, [])





    return (
        !loading ?
        <Container fluid>
            <div className="app__addprodects">
                <Component.SubNav sub__nav={[{ name: "Doctors", path: '/doctors' }, { name: "Doctor Hours", path: `/doctors/doctorHours/${id}` }]} />
            </div >

            <div className="app__Users mb-3">
                <Component.ButtonBase title={"Add"} bg={"primary"} icon={<Icons.add size={21} color={'#ffffffb4'} />} path="/doctors/addDoctorHours" />
            </div>

            {Object.keys(fetchDoctorHours).length > 0 ?
                <div className="bg-light py-5 px-3 rounded-4 shadow-sm">
                    <ul className={`nav nav-pills mb-5 d-flex justify-content-sm-evenly ${Object.keys(fetchDoctorHours).length > 5 ? 'justify-content-lg-between' : 'justify-content-lg-start'} justify-content-start align-items-center`} id="pills-tab" role="tablist">
                        {fetchDoctorHours?.map((el , i) => (
                            el.DoctorHourStatus === "OPEN" ?
                            <li key={i} className={`nav-item my-1 ${Object.keys(fetchDoctorHours).length > 5 ? 'mx-0' : 'mx-4'}`} role="presentation">
                                <button className={`nav-link text-black mx-0 ${i === 0 ? 'active' : null}`} style={{fontWeight: '600' , fontSize: '18px'}} id={`pills-${el.DoctorHourDay}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${el.DoctorHourDay}`} type="button" role="tab" aria-controls={`pills-${el.DoctorHourDay}`} aria-selected="true" >{el.DoctorHourDay[0].toUpperCase() + el.DoctorHourDay.slice(1).toLowerCase()}</button>
                            </li>
                            :
                            <li key={i} className={`nav-item my-1 ${Object.keys(fetchDoctorHours).length > 5 ? 'mx-0' : 'mx-4'}`} role="presentation">
                                <button className={`nav-link text-black mx-2 bg-secondary bg-opacity-75`} style={{fontWeight: '600' , fontSize: '18px'}} id={`pills-${el.DoctorHourDay}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${el.DoctorHourDay}`} type="button" role="tab" aria-controls={`pills-${el.DoctorHourDay}`} aria-selected="true" disabled>{el.DoctorHourDay[0].toUpperCase() + el.DoctorHourDay.slice(1).toLowerCase()}</button>
                            </li>
                        ))}
                        
                    </ul>
    
                    <div className="tab-content" id="pills-tabContent">
                        {fetchDoctorHours?.map((el , i) => (
                            <div key={i} className={`tab-pane fade ${i === 0 ? 'show active' : null}`} id={`pills-${el.DoctorHourDay}`} role="tabpanel" aria-labelledby={`pills-${el.DoctorHourDay}-tab`} tabIndex="0">
                                    <div className={`row g-4 d-flex justify-content-start align-items-center`}>
                                        {el?.DoctorTime?.map((item , i) => (
                                            <Component.SingleHour key={i} DoctorTime={item} getDoctorHours={getDoctorHours} />
                                        ))}
                                    </div>
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className="bg-light py-5 px-3 rounded-4 shadow-sm d-flex justify-content-center align-items-center">
                    <h3 className='mb-0' style={{fontWeight: '600'}}>No Consultations..</h3>
                </div>
            }

        </Container >
        :
        <Component.Loader />
    )
}

export default DoctorHours
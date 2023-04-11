import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import { apiheader } from '../../../utils/fetchData';
import './Doctor.scss';
import { VendersContext } from '../../../context/Store';
// import $ from 'jquery';
// import { AiFillCloseCircle } from 'react-icons/ai';


const DoctorHours = () => {


    const { id } = useParams();
    const apiDoctorHours = `https://bytrh.com/api/admin/doctors/hours`;

    const [fetchDoctorHours, setFetchDoctorHours] = useState([]);
    const [fetchDoctorVisits, setFetchDoctorVisits] = useState([]);
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

    async function getDoctorVisits() {
        // setLoading(true);
        await axios.post(apiDoctorHours, {
            IDDoctor: id,
            DoctorHourService: 'VISIT'
        },  apiheader )
            .then(res => {
                if (res.status === 200 && res.request.readyState === 4) {
                    setFetchDoctorVisits(res.data.Response);
                    // setLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        let timeOut = setTimeout(() => {
            getDoctorHours();
            getDoctorVisits();
        }, 200);

        return(() => {
            clearTimeout(timeOut);
        })
    }, [])


    let { isLang } = useContext(VendersContext);



    return (
        !loading ?
        <Container fluid>
            <div className="app__addprodects">
                {isLang === 'ar' ?
                    <Component.SubNav sub__nav={[{ name: isLang === 'ar' ? 'أوقـات العمـل' : 'Doctor Hours', path: `/doctors/doctorHours/${id}` } , { name: isLang === 'ar' ? 'قائمة الدكاتـرة' : 'Doctors', path: '/doctors' }]} />
                    :
                    <Component.SubNav sub__nav={[{ name: isLang === 'ar' ? 'قائمة الدكاتـرة' : 'Doctors', path: '/doctors' }, { name: isLang === 'ar' ? 'أوقـات العمـل' : 'Doctor Hours', path: `/doctors/doctorHours/${id}` }]} />
                }
            </div > 
            <div className="app__Users mb-3">
                <Component.ButtonBase title={isLang === 'ar' ? 'إضـافـة' : 'Add'} bg={"primary"} icon={<Icons.Add size={21} color={'#ffffffb4'} />} path={`/doctors/addDoctorHours/${id}`} />
            </div>

            <ul className={`nav nav-pills mb-3 d-flex justify-content-sm-evenly justify-content-lg-start justify-content-start align-items-center`} id="pills-tab" role="tablist">
                    <li className={`nav-item my-1 mx-4`} role="presentation">
                        <button className={`nav-link text-black mx-0 active`} style={{fontWeight: '600' , fontSize: '18px'}} id={`pills-consult-tab`} data-bs-toggle="pill" data-bs-target={`#pills-consult`} type="button" role="tab" aria-controls={`pills-consult`} aria-selected="true">{isLang === 'ar' ? 'إستشـارات' : 'Consults'}</button>
                    </li>
                    <li className={`nav-item my-1 mx-4`} role="presentation">
                        <button className={`nav-link text-black mx-2`} style={{fontWeight: '600' , fontSize: '18px'}} id={`pills-visit-tab`} data-bs-toggle="pill" data-bs-target={`#pills-visit`} type="button" role="tab" aria-controls={`pills-visit`} aria-selected="true">{isLang === 'ar' ? 'زيـارات' : 'Visits'}</button>
                    </li>
            </ul>

            <div className="tab-content" id="pills-tabContent">
                <div className={`tab-pane fade show active`} id={`pills-consult`} role="tabpanel" aria-labelledby={`pills-consult-tab`} tabIndex="0">
                    <div className={`row g-4 d-flex justify-content-start align-items-center`}>
                        {Object.keys(fetchDoctorHours).length > 0 ?
                            <div className="bg-light py-5 px-3 rounded-4 shadow-sm">
                                <ul className={`nav nav-pills mb-5 d-flex justify-content-sm-evenly ${Object.keys(fetchDoctorHours).length > 5 ? 'justify-content-lg-between' : 'justify-content-lg-start'} justify-content-start align-items-center`} id="pills-tab" role="tablist">
                                    {fetchDoctorHours?.map((el , i) => (
                                        el.DoctorHourStatus === "OPEN" ?
                                        <li key={i} className={`nav-item my-1 ${Object.keys(fetchDoctorHours).length > 5 ? 'mx-0' : 'mx-4'}`} role="presentation">
                                            <button className={`nav-link text-black mx-0 ${i === 0 ? 'active' : null}`} style={{fontWeight: '600' , fontSize: '18px'}} id={`pills-consult-${el.DoctorHourDay}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-consult-${el.DoctorHourDay}`} type="button" role="tab" aria-controls={`pills-consult-${el.DoctorHourDay}`} aria-selected="true" >{el.DoctorHourDay[0].toUpperCase() + el.DoctorHourDay.slice(1).toLowerCase()}</button>
                                        </li>
                                        :
                                        <li key={i} className={`nav-item my-1 ${Object.keys(fetchDoctorHours).length > 5 ? 'mx-0' : 'mx-4'}`} role="presentation">
                                            <button className={`nav-link text-black mx-2 bg-secondary bg-opacity-75`} style={{fontWeight: '600' , fontSize: '18px'}} id={`pills-consult-${el.DoctorHourDay}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-consult-${el.DoctorHourDay}`} type="button" role="tab" aria-controls={`pills-consult-${el.DoctorHourDay}`} aria-selected="true" disabled>{el.DoctorHourDay[0].toUpperCase() + el.DoctorHourDay.slice(1).toLowerCase()}</button>
                                        </li>
                                    ))}
                                </ul>

                                <div className="tab-content">
                                    {fetchDoctorHours?.map((el , i) => (
                                        <div key={i} className={`tab-pane fade ${i === 0 ? 'show active' : null}`} id={`pills-consult-${el.DoctorHourDay}`} role="tabpanel" aria-labelledby={`pills-consult-${el.DoctorHourDay}-tab`} tabIndex="0">
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
                            <Component.DataNotFound />
                            // <div className="bg-light py-5 px-3 rounded-4 shadow-sm d-flex justify-content-center align-items-center">
                            //     <h3 className='mb-0' style={{fontWeight: '600'}}>{isLang === 'ar' ? 'لا توجد إستشـارات..' : 'No Consultations..'}</h3>
                            // </div>
                        }
                    </div>
                </div>
                <div className={`tab-pane fade`} id={`pills-visit`} role="tabpanel" aria-labelledby={`pills-visit-tab`} tabIndex="0">
                    <div className={`row g-4 d-flex justify-content-start align-items-center`}>
                        {Object.keys(fetchDoctorVisits).length > 0 ?
                            <div className="bg-light py-5 px-3 rounded-4 shadow-sm">
                                <ul className={`nav nav-pills mb-5 d-flex justify-content-sm-evenly ${Object.keys(fetchDoctorVisits).length > 5 ? 'justify-content-lg-between' : 'justify-content-lg-start'} justify-content-start align-items-center`} id="pills-tab" role="tablist">
                                    {fetchDoctorVisits?.map((el , i) => (
                                        el.DoctorHourStatus === "OPEN" ?
                                        <li key={i} className={`nav-item my-1 ${Object.keys(fetchDoctorVisits).length > 5 ? 'mx-0' : 'mx-4'}`} role="presentation">
                                            <button className={`nav-link text-black mx-0 ${i === 0 ? 'active' : null}`} style={{fontWeight: '600' , fontSize: '18px'}} id={`pills-visit-${el.DoctorHourDay}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-visit-${el.DoctorHourDay}`} type="button" role="tab" aria-controls={`pills-visit-${el.DoctorHourDay}`} aria-selected="true" >{el.DoctorHourDay[0].toUpperCase() + el.DoctorHourDay.slice(1).toLowerCase()}</button>
                                        </li>
                                        :
                                        <li key={i} className={`nav-item my-1 ${Object.keys(fetchDoctorVisits).length > 5 ? 'mx-0' : 'mx-4'}`} role="presentation">
                                            <button className={`nav-link text-black mx-2 bg-secondary bg-opacity-75`} style={{fontWeight: '600' , fontSize: '18px'}} id={`pills-visit-${el.DoctorHourDay}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-visit-${el.DoctorHourDay}`} type="button" role="tab" aria-controls={`pills-visit-${el.DoctorHourDay}`} aria-selected="true" disabled>{el.DoctorHourDay[0].toUpperCase() + el.DoctorHourDay.slice(1).toLowerCase()}</button>
                                        </li>
                                    ))}
                                </ul>

                                <div className="tab-content">
                                    {fetchDoctorVisits?.map((el , i) => (
                                        <div key={i} className={`tab-pane fade ${i === 0 ? 'show active' : null}`} id={`pills-visit-${el.DoctorHourDay}`} role="tabpanel" aria-labelledby={`pills-visit-${el.DoctorHourDay}-tab`} tabIndex="0">
                                                <div className={`row g-4 d-flex justify-content-start align-items-center`}>
                                                    {el?.DoctorTime?.map((item , i) => (
                                                        <Component.SingleHour key={i} DoctorTime={item} getDoctorHours={getDoctorVisits} />
                                                    ))}
                                                </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            :
                            <Component.DataNotFound />
                            // <div className="bg-light py-5 px-3 rounded-4 shadow-sm d-flex justify-content-center align-items-center">
                            //     <h3 className='mb-0' style={{fontWeight: '600'}}>{isLang === 'ar' ? 'لا توجد زيـارات..' : 'No Visits..'}</h3>
                            // </div>
                        }
                    </div>
                </div>
            </div>

        </Container >
        :
        <Component.Loader />
    )
}

export default DoctorHours
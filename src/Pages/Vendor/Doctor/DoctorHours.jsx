import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import { apiheader } from '../../../utils/fetchData';
import './Doctor.scss';
// import $ from 'jquery';
import { AiFillCloseCircle } from 'react-icons/ai';


const DoctorHours = () => {


    const { id } = useParams();
    const apiDoctorHours = `https://bytrh.com/api/admin/doctors/hours`;

    const [fetchDoctorHours, setFetchDoctorHours] = useState([]);
    // const [fetchHours, setFetchHours] = useState([]);
    const [loading, setLoading] = useState(false);

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
        <Container fluid>
            <div className="app__addprodects">
                <Component.SubNav sub__nav={[{ name: "Doctors", path: '/doctors' }, { name: "Doctor Hours", path: `/doctors/doctorHours/${id}` }]} />
            </div >

            <div className="app__Users mb-3">
                <Component.ButtonBase title={"Add"} bg={"primary"} icon={<Icons.add size={21} color={'#ffffffb4'} />} path="/doctors/addDoctorHours" />
            </div>

            <div className="bg-light py-5 px-3 rounded-4 shadow-sm">
                <ul className={`nav nav-pills mb-5 d-flex justify-content-sm-evenly ${Object.keys(fetchDoctorHours).length > 5 ? 'justify-content-lg-between' : 'justify-content-lg-start'} justify-content-start align-items-center`} id="pills-tab" role="tablist">
                    {fetchDoctorHours?.map((el , i) => (
                        el.DoctorHourStatus === "OPEN" ?
                        <li key={i} className={`nav-item ${Object.keys(fetchDoctorHours).length > 5 ? 'mx-0' : 'mx-4'}`} role="presentation">
                            <button className={`nav-link text-black mx-0 ${i === 0 ? 'active' : null}`} style={{fontWeight: '600' , fontSize: '18px'}} id={`pills-${el.DoctorHourDay}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${el.DoctorHourDay}`} type="button" role="tab" aria-controls={`pills-${el.DoctorHourDay}`} aria-selected="true" >{el.DoctorHourDay}</button>
                        </li>
                        :
                        <li key={i} className={`nav-item ${Object.keys(fetchDoctorHours).length > 5 ? 'mx-0' : 'mx-4'}`} role="presentation">
                            <button className={`nav-link text-black mx-0 bg-secondary bg-opacity-75`} style={{fontWeight: '600' , fontSize: '18px'}} id={`pills-${el.DoctorHourDay}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${el.DoctorHourDay}`} type="button" role="tab" aria-controls={`pills-${el.DoctorHourDay}`} aria-selected="true" disabled>{el.DoctorHourDay}</button>
                        </li>
                    ))}
                    
                    {/* <li className="nav-item mx-0" role="presentation">
                        <button className="nav-link text-black mx-0 active" style={{fontWeight: '600' , fontSize: '18px'}} id="pills-saturday-tab" data-bs-toggle="pill" data-bs-target="#pills-saturday" type="button" role="tab" aria-controls="pills-saturday" aria-selected="true">Saturday</button>
                    </li>
                    <li className="nav-item mx-0" role="presentation">
                        <button className="nav-link text-black mx-0" style={{fontWeight: '600' , fontSize: '18px'}} id="pills-sunday-tab" data-bs-toggle="pill" data-bs-target="#pills-sunday" type="button" role="tab" aria-controls="pills-sunday" aria-selected="false">Sunday</button>
                    </li>
                    <li className="nav-item mx-0" role="presentation">
                        <button className="nav-link text-black mx-0" style={{fontWeight: '600' , fontSize: '18px'}} id="pills-monday-tab" data-bs-toggle="pill" data-bs-target="#pills-monday" type="button" role="tab" aria-controls="pills-monday" aria-selected="false">Monday</button>
                    </li>
                    <li className="nav-item mx-0" role="presentation">
                        <button className="nav-link text-black mx-0" style={{fontWeight: '600' , fontSize: '18px'}} id="pills-tuesday-tab" data-bs-toggle="pill" data-bs-target="#pills-tuesday" type="button" role="tab" aria-controls="pills-tuesday" aria-selected="true">Tuesday</button>
                    </li>
                    <li className="nav-item mx-0" role="presentation">
                        <button className="nav-link text-black mx-0" style={{fontWeight: '600' , fontSize: '18px'}} id="pills-wednesday-tab" data-bs-toggle="pill" data-bs-target="#pills-wednesday" type="button" role="tab" aria-controls="pills-wednesday" aria-selected="false">Wednesday</button>
                    </li>
                    <li className="nav-item mx-0" role="presentation">
                        <button className="nav-link text-black mx-0" style={{fontWeight: '600' , fontSize: '18px'}} id="pills-thursday-tab" data-bs-toggle="pill" data-bs-target="#pills-thursday" type="button" role="tab" aria-controls="pills-thursday" aria-selected="false">Thursday</button>
                    </li>
                    <li className="nav-item mx-0" role="presentation">
                        <button className="nav-link text-black mx-0 bg-secondary bg-opacity-75" style={{fontWeight: '600' , fontSize: '18px'}} id="pills-friday-tab" data-bs-toggle="pill" data-bs-target="#pills-friday" type="button" role="tab" aria-controls="pills-friday" aria-selected="false" disabled>Friday</button>
                    </li> */}
                </ul>

                <div className="tab-content" id="pills-tabContent">
                    {fetchDoctorHours?.map((el , i) => (
                        <div key={i} className={`tab-pane fade ${i === 0 ? 'show active' : null}`} id={`pills-${el.DoctorHourDay}`} role="tabpanel" aria-labelledby={`pills-${el.DoctorHourDay}-tab`} tabIndex="0">
                                <div className="row g-4 d-flex justify-content-sm-start justify-content-center align-items-center">
                                    {el?.DoctorTime?.map((item , i) => (
                                        <Component.SingleHour key={i} DoctorTime={item} />
                                    ))}
                                </div>
                        </div>
                    ))}
                    {/* <div className="tab-pane fade show active" id="pills-saturday" role="tabpanel" aria-labelledby="pills-saturday-tab" tabIndex="0">
                        <div className="row g-4 d-flex justify-content-sm-start justify-content-center align-items-center">
                            <Component.SingleHour />
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-sunday" role="tabpanel" aria-labelledby="pills-sunday-tab" tabIndex="0">sunday</div>
                    <div className="tab-pane fade" id="pills-monday" role="tabpanel" aria-labelledby="pills-monday-tab" tabIndex="0">monday</div>
                    <div className="tab-pane fade" id="pills-tuesday" role="tabpanel" aria-labelledby="pills-tuesday-tab" tabIndex="0">tuesday</div>
                    <div className="tab-pane fade" id="pills-wednesday" role="tabpanel" aria-labelledby="pills-wednesday-tab" tabIndex="0">wednesday</div>
                    <div className="tab-pane fade" id="pills-thursday" role="tabpanel" aria-labelledby="pills-thursday-tab" tabIndex="0">thursday</div>
                    <div className="tab-pane fade" id="pills-friday" role="tabpanel" aria-labelledby="pills-friday-tab" tabIndex="0">friday</div> */}
                </div>
            </div>


        </Container >
    )
}

export default DoctorHours
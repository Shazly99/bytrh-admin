import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import { apiheader } from '../../../utils/fetchData';
import '../../Vendor/Doctor/Doctor.scss';
import { VendersContext } from '../../../context/Store';


const CenterHours = () => {


    const { id } = useParams();
    const apiCenterHours = `https://bytrh.com/api/admin/medicalcenter/hours`;

    const [fetchCenterHours, setFetchCenterHours] = useState([]);
    const [loading, setLoading] = useState(null);

    async function getCenterHours() {
        setLoading(true);
        await axios.post(apiCenterHours, {
            IDMedicalCenter: id,
        },  apiheader )
            .then(res => {
                if (res.status === 200 && res.request.readyState === 4) {
                    setFetchCenterHours(res.data.Response);
                    setLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }


    useEffect(() => {
        let timeOut = setTimeout(() => {
            getCenterHours();
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
                    <Component.SubNav sub__nav={[{ name: isLang === 'ar' ? 'أوقـات العمـل' : 'Medical Center Hours', path: `/medicalcenter/hours/${id}` } , { name: isLang === 'ar' ? 'قائمة المراكز الطبية' : 'Medical Centers', path: '/medicalcenter' }]} />
                    :
                    <Component.SubNav sub__nav={[{ name: isLang === 'ar' ? 'قائمة المراكز الطبية' : 'Medical Centers', path: '/medicalcenter' }, { name: isLang === 'ar' ? 'أوقـات العمـل' : 'Medical Center Hours', path: `/medicalcenter/hours/${id}` }]} />
                }
            </div > 
            <div className="app__Users mb-3">
                <Component.ButtonBase title={isLang === 'ar' ? 'إضـافـة' : 'Add'} bg={"primary"} icon={<Icons.Add size={21} color={'#ffffffb4'} />} path={`/medicalcenter/addHours/${id}`} />
            </div>

            <div className={`row g-4 d-flex justify-content-start align-items-center`}>
                {Object.keys(fetchCenterHours).length > 0 ?
                    <div className="bg-light py-5 px-3 rounded-4 shadow-sm">
                        <ul className={`nav nav-pills mb-5 d-flex justify-content-sm-evenly ${Object.keys(fetchCenterHours).length > 5 ? 'justify-content-lg-between' : 'justify-content-lg-start'} justify-content-start align-items-center`} id="pills-tab" role="tablist">
                            {fetchCenterHours?.map((el , i) => (
                                el.MedicalCenterHourStatus === "OPEN" ?
                                <li key={i} className={`nav-item my-1 ${Object.keys(fetchCenterHours).length > 5 ? 'mx-0' : 'mx-4'}`} role="presentation">
                                    <button className={`nav-link text-black mx-0 ${i === 0 ? 'active' : null}`} style={{fontWeight: '600' , fontSize: '18px'}} id={`pills-${el.MedicalCenterHourDay}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${el.MedicalCenterHourDay}`} type="button" role="tab" aria-controls={`pills-${el.MedicalCenterHourDay}`} aria-selected="true" >{el.MedicalCenterHourDay[0].toUpperCase() + el.MedicalCenterHourDay.slice(1).toLowerCase()}</button>
                                </li>
                                :
                                <li key={i} className={`nav-item my-1 ${Object.keys(fetchCenterHours).length > 5 ? 'mx-0' : 'mx-4'}`} role="presentation">
                                    <button className={`nav-link text-black mx-2 bg-secondary bg-opacity-75`} style={{fontWeight: '600' , fontSize: '18px'}} id={`pills-${el.MedicalCenterHourDay}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${el.MedicalCenterHourDay}`} type="button" role="tab" aria-controls={`pills-${el.MedicalCenterHourDay}`} aria-selected="true" disabled>{el.MedicalCenterHourDay[0].toUpperCase() + el.MedicalCenterHourDay.slice(1).toLowerCase()}</button>
                                </li>
                            ))}
                        </ul>

                        <div className="tab-content" id="pills-tabContent">
                            {fetchCenterHours?.map((el , i) => (
                                <div key={i} className={`tab-pane fade ${i === 0 ? 'show active' : null}`} id={`pills-${el.MedicalCenterHourDay}`} role="tabpanel" aria-labelledby={`pills-${el.MedicalCenterHourDay}-tab`} tabIndex="0">
                                        <div className={`row g-4 d-flex justify-content-start align-items-center`}>
                                            {el?.MedicalCenterTime?.map((item , i) => (
                                                <Component.CenterSingleHour key={i} MedicalCenterTime={item} getCenterHours={getCenterHours} />
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

        </Container >
        :
        <Component.Loader />
    )
}

export default CenterHours
import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import './Doctor.scss';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { apiheader } from '../../../utils/fetchData'; 
import Component from '../../../constants/Component';



const SingleHour = ({ DoctorTime, getDoctorHours }) => {


    const [showRemove, setShowRemove] = useState(false);
    const handleCloseRemove = () => setShowRemove(false);
    const handleShowRemove = () => setShowRemove(true);

    const apiRemoveHours = `https://bytrh.com/api/admin/doctors/hours/remove/`;

    const [messageRemove, setMessageRemove] = useState('');
    const [apiCodeRemove, setApiCodeRemove] = useState();
    const [loadingRemove, setLoadingRemove] = useState(false);

    const handleRemoveHour = async (id) => {
        setLoadingRemove(true);
        await axios.get(apiRemoveHours + id, {}, apiheader)
            .then(res => {
                if (res.data.Success === true) {
                    setApiCodeRemove(res.data.Success)
                    setMessageRemove(res.data.ApiMsg);
                    setLoadingRemove(false);
                    setTimeout(() => {
                        getDoctorHours()
                    }, 1000);
                }
                else {
                    setApiCodeRemove(res.data.Success)
                    setMessageRemove(res.data.ApiMsg);
                    setLoadingRemove(false);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }



    return (
        <div className="col-xl-2 col-lg-3 col-md-4 col-6">
            <div className="inf-time text-center py-4 px-3 rounded-3 shadow-sm position-relative" style={{ whiteSpace: 'nowrap', backgroundColor: '#F1F1F1', fontWeight: '600' }}>
                <h6 className='mb-0'>
                    {DoctorTime.DoctorStartHour.slice(0, 5)} {Number(DoctorTime.DoctorStartHour.slice(0, 2)) < 12 ? 'AM' : 'PM'} - {DoctorTime.DoctorEndHour.slice(0, 5)} {Number(DoctorTime.DoctorEndHour.slice(0, 2)) < 12 ? 'AM' : 'PM'}
                </h6>
                <AiFillCloseCircle className='position-absolute top-0 end-0 translate-middle-y h3 color-red' onClick={handleShowRemove} style={{ cursor: 'pointer' }} />
            </div>

            <Modal style={{ zIndex: '9999999999' }} show={showRemove} onHide={handleCloseRemove} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center w-100  '>
                        <h5 className='mb-0'>Warning Remove..</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Component.HandelDelete/>

                </Modal.Body>
                {messageRemove.length > 0 ? <p id="alertRemove" className={`alert ${apiCodeRemove === true ? 'alert-success' : 'alert-danger'} fs-6 py-2 my-2 w-50 text-center mx-auto`}>{messageRemove}</p> : ''}
                <Modal.Footer className='d-flex justify-content-center align-items-center'>

                    <div className='d-flex justify-content-center align-content-center'>
                        <div className='baseBtn pe-0 me-2'>
                            <Button onClick={() => {
                                handleRemoveHour(DoctorTime.IDDoctorHour)
                            }} variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                {loadingRemove ? <i className="fa fa-spinner fa-spin text-white fs-4"></i> : 'Confirm'}
                            </Button>
                        </div>

                        <div className='baseBtn ps-0'>
                            <Button onClick={handleCloseRemove} variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                Cancel
                            </Button>
                        </div>
                    </div>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SingleHour
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import LogoSvg from '../../assets/svg/LogoSvg'
import initialTranslation from "../Services/Translation.js";
import { toast } from 'react-hot-toast';
import { PostData, apiheader } from '../../utils/fetchData';
import { Dropdown, DropdownButton, Modal, Form, Row, Col, FormControl, Button } from 'react-bootstrap';
import { VendersContext } from '../../context/Store';
import initialTranslation2 from '../Vendor/Doctor/Withdraw/Translation'
import AdoptionRequests from './AdoptionRequests';

const ActionsRequests = ({ RequestType, idType, RequestStatus, RequestsList }) => {
    let { isLang } = useContext(VendersContext);

    const [translate, setTranslate] = useState(initialTranslation)
    const handelTranslate = () => setTranslate(initialTranslation)

    const handelRoute = (type, id) => {
        if (type === 'DOCTOR') {
            return `/doctors/doctorProfile/${id}`
        }
    }



    const handleActionSelect = async (id, action) => {
        if (action === "ACTIVE" || action === "INACTIVE" || action === 'PENDING') {
            await ServicesDataStatus(id, action).then((res) => {
                toast.success(<strong>{translate[isLang].toast.update}</strong>, {
                    duration: 4000,
                    position: 'bottom-center',
                    iconTheme: {
                        primary: '#3182CE',
                        secondary: '#fff',
                    },
                });
            })
            RequestsList()
        }
    };

    const ServicesDataStatus = async (id, action) => {
        return await PostData(`${process.env.REACT_APP_API_URL}/admin/services/status`, { IDService: id, ServiceStatus: action }, apiheader)
    }

    // withdrow status
    // ** display Reason 
    const [modalShowReason, setModalShowReason] = useState(false);
    const [modalIndexReason, setModalIndexReason] = useState(0);
    const handleModalCloseReason = () => setModalShowReason(false);
    // ToDo::change  status rejected
    const [modalShow, setModalShow] = React.useState(false);
    const [modalIndex, setModalIndex] = React.useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    let reasonRef = useRef()
    //!Modal 
    const handleModalClose = () => setModalShow(false)
    function handleModalOpen(index) {
        setModalIndex(index);
        setModalShow(true);
    }
    function handleModalOpenReason(index) {
        setModalIndexReason(index);
        setModalShowReason(true);
    }
    //!change withdraws reason to processed 
    const [modalShowProcessed, setModalShowProcessed] = React.useState(false);
    const [modalIndexProcessed, setModalIndexProcessed] = React.useState(0);
    const handleModalCloseProcessed = () => setModalShowProcessed(false)
    function handleModalOpenProcessed(index) {
        setModalIndexProcessed(index);
        setModalShowProcessed(true);
    }
    const handleActionSelect2 = async (id, action) => {
        if (action === "PROCESSED") {
            handleModalOpenProcessed(id)
        } else if (action === "REJECTED") {
            handleModalOpenReason(id)
        }
    };


    // reason rejected
    const reasonReject = async (idType, action) => {
        await doctorWithdrawRequestStatus({
            IDDoctorWithdraw: idType,
            WithdrawRejectReason: reasonRef.current.value,
            WithdrawStatus: action,
        }).then((res) => {
            if (res?.data?.Success === true) {
                toast.success(<strong>{initialTranslation[isLang]?.toast.update}</strong>, {
                    duration: 4000,
                    position: 'bottom-center',
                    iconTheme: {
                        primary: '#3182CE',
                        secondary: '#fff',
                    },
                });
                handleModalCloseReason()
            } else {
                toast.error(res?.data?.ApiMsg)
            }
        });
        await RequestsList();
    }
    // withdrow file send when status is processed
    const WithdrawFileProcessed = async (idType, action) => {
        console.log(
            {
                IDDoctorWithdraw: idType,
                WithdrawFilePath: selectedImage,
                WithdrawStatus: action,
            })

        // );
        await doctorWithdrawRequestStatus({
            IDDoctorWithdraw: idType,
            WithdrawFilePath: selectedImage,
            WithdrawStatus: action,
        }).then((res) => {
            if (res?.data?.Success === true) {
                toast.success(<strong>{initialTranslation[isLang]?.toast.update}</strong>, {
                    duration: 4000,
                    position: 'bottom-center',
                    iconTheme: {
                        primary: '#3182CE',
                        secondary: '#fff',
                    },
                });
                handleModalCloseProcessed()
            } else {
                toast.error(res?.data?.ApiMsg)
            }
        });
        await RequestsList()
    }
    const doctorWithdrawRequestStatus = async (status) => {
        return await PostData(`https://bytrh.com/api/admin/doctors/withdraws/status`, status, apiheader)
    }

    return (
        <>
            {
                RequestType === 'DOCTOR' &&
                <Link to={handelRoute(RequestType, idType)}  >
                    <LogoSvg.view className="logoSvg" style={{ width: 19 }} />
                </Link>
            }


            {
                RequestType === 'DOCTOR_SERVICE' &&
                <span>
                    <DropdownButton
                        id={`dropdown-${idType}`}
                        title={translate[isLang]?.Actions.action}
                        variant="outline-success"
                        onSelect={(eventKey) => handleActionSelect(idType, eventKey)}
                        className="DropdownButton "
                        drop={'down-centered'}
                    >
                        {
                            initialTranslation[isLang].FilterStatus?.filter?.((item) => item.value !== "All").map((status, index) => (
                                <React.Fragment key={index}>

                                    {
                                        RequestStatus === status.value ? '' :
                                            <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey={status.value}>{status.text !== "Pending" ? status.text : ''}</Dropdown.Item>
                                    }
                                </React.Fragment>
                            ))
                        }
                    </DropdownButton>
                </span>
            }


            {
                RequestType === 'DOCTOR_WITHDRAW' &&
                <span>
                    <DropdownButton
                        id={`dropdown-${idType}`}
                        title={initialTranslation2[isLang].ActionsNamebtn}
                        variant="outline-success"
                        onSelect={(eventKey) => handleActionSelect2(idType, eventKey)}
                        className="DropdownButton "
                    >
                        {
                            initialTranslation2[isLang]?.FilterStatus?.filter?.((item) => item.value !== "All").map((status, index) => (
                                <React.Fragment key={index}>
                                    {
                                        RequestStatus === status.value ? '' : <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey={status.value}>{status.text}</Dropdown.Item>
                                    }
                                </React.Fragment>
                            ))
                        }
                    </DropdownButton>
                </span>
            }
            {
                RequestType === 'ADOPTION' &&
                <AdoptionRequests
                    RequestStatus={RequestStatus}
                    RequestsList={() => RequestsList(1)}
                    idType={idType}
                />
            }


            <Modal
                show={modalShowReason && modalIndexReason === idType}
                onHide={handleModalCloseReason}
                centered
                dir={isLang === 'ar' ? 'rtl' : 'ltr'}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='  w-100 '>{isLang == "ar" ? 'سبب الرفض ' : 'Reject Reason'} </Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center align-items-center gap-1 flex-column" >
                    <textarea className="form-control" rows="5" ref={reasonRef} />
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center align-items-center">
                    <Button variant="danger" style={{ border: '#dc3545' }} onClick={() => reasonReject(idType, 'REJECTED')} >
                        {isLang == "ar" ? '   تحديد السبب ' : 'Set Reason'}
                    </Button>
                    <Button variant="outline-primary" onClick={handleModalCloseReason}>
                        {isLang == "ar" ? '   رجوع ' : 'Cancel '}
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal
                show={modalShowProcessed && modalIndexProcessed === idType}
                onHide={handleModalCloseProcessed}
                centered
                dir={isLang === 'ar' ? 'rtl' : 'ltr'}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='  w-100 '>
                        {isLang == "ar" ? '  سحب الملف   ' : 'ٍWithdraw File'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center align-items-center gap-1 flex-column" >
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12} className="mt-3">
                            <Form.Group>
                                <FormControl
                                    id="custom-file"
                                    type="file"
                                    label={selectedImage ? selectedImage.name : 'Choose file'}
                                    ref={fileInputRef}
                                    onChange={handleImageSelect}
                                    accept="image/* pdf/*"
                                />
                            </Form.Group>
                        </Col>
                        <Col xl={12} lg={12} md={12} sm={12} className="mt-3 d-flex justify-content-center">
                            <Form.Group>
                                <div className="mt-3  " style={{ width: "200px " }}>
                                    {selectedImage && (
                                        <img
                                            loading="lazy"
                                            src={URL.createObjectURL(selectedImage)}
                                            alt={selectedImage.name}
                                            className='rounded-3 w-100'
                                        />
                                    )}
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center align-items-center">
                    <Button className='btn__processed' style={{ border: '#66b9b1' }} onClick={() => WithdrawFileProcessed(idType, 'PROCESSED')} >

                        {isLang == "ar" ? '   تحديد الملف ' : 'Set Withdraw File'}

                    </Button>
                    <Button variant="outline-primary" onClick={handleModalCloseProcessed}>
                        {isLang == "ar" ? '   رجوع ' : 'Cancel '}

                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ActionsRequests

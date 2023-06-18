import React, { useRef, useState } from 'react'
import { DropdownButton, Dropdown, NavDropdown, Modal,Button } from 'react-bootstrap'
import { VendersContext } from '../../context/Store';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PostData, apiheader } from '../../utils/fetchData';
import { toast } from 'react-hot-toast';

const AdoptionRequests = ({ RequestStatus, idType, RequestsList }) => {
    let { isLang } = useContext(VendersContext);
    const [modalShow, setModalShow] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);
    let reasonRef = useRef()

    const handleActionSelect = async (id, action) => {
        if (action === "PENDING" ||
            action === "ACTIVE" ||
            action === "ADOPTED" ||
            action === "CANCELLED"
        ) {
            await userstatus({ IDAdoption: id, AdoptionStatus: action })
            await RequestsList()
        } else if (action === "REJECTED") {
            handleModalOpen(id)
        }
    };
    //!Modal 
    const handleModalClose = () => setModalShow(false);
    function handleModalOpen(index) {
        setModalIndex(index);
        setModalShow(true);
    }
    const reasonReject = async (id, action) => {
        await userstatus({
            IDAdoption: id,
            AdoptionStatus: action,
            AdoptionRejectReason: reasonRef.current.value,
        }).then((res) => {
            toast.success("Updated Successfully", {
                duration: 4000,
                position: "top-center",
                iconTheme: {
                    primary: "#0a0",
                    secondary: "#fff",
                },
            });
            setModalShow(false)
        });
        await RequestsList();

    }
    const userstatus = async (status) => {
        await PostData(`https://bytrh.com/api/admin/adoptions/status`, status, apiheader)

    }

    return (
        <>
            <DropdownButton
                id={`dropdown-${idType}`}
                title={isLang === 'ar' ? 'الإجراءات' : 'Actions'}
                variant="outline-success"
                onSelect={(eventKey) => handleActionSelect(idType, eventKey)}
                className="DropdownButton "
            >
                <Dropdown.Item eventKey="Edite" className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} as={Link} target='_blank' to={`/adoption/details/${idType}`}>
                    {isLang == 'ar' ? 'عرض بيانات' : 'Details'}
                </Dropdown.Item>
                <NavDropdown.Divider />
                {
                    RequestStatus === "PENDING" ?
                        <>
                            <Dropdown.Item eventKey="ACTIVE">
                                {isLang === 'ar' ? 'نشـط' : 'Active'}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="ADOPTED">
                                {isLang === 'ar' ? 'متبنـي' : 'Adopted'}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="CANCELLED">
                                {isLang === 'ar' ? 'ملغــي' : 'Cancelled'}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="REJECTED">
                                {isLang === 'ar' ? 'رفض' : 'Rejected'}
                            </Dropdown.Item>
                        </> :

                        RequestStatus === "ACTIVE" ?
                            <>
                                <Dropdown.Item eventKey="ADOPTED">
                                    {isLang === 'ar' ? 'متبنـي' : 'Adopted'}
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="CANCELLED">
                                    {isLang === 'ar' ? 'ملغــي' : 'Cancelled'}
                                </Dropdown.Item>
                            </> :

                            RequestStatus === "CANCELLED" ?
                                <>
                                    <Dropdown.Item eventKey="ACTIVE">
                                        {isLang === 'ar' ? 'نشـط' : 'Active'}
                                    </Dropdown.Item>
                                </> :

                                RequestStatus === "ADOPTED" ?
                                    <>
                                        <Dropdown.Item eventKey="ACTIVE">
                                            {isLang === 'ar' ? 'نشـط' : 'Active'}
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="CANCELLED">
                                            {isLang === 'ar' ? 'ملغــي' : 'Cancelled'}
                                        </Dropdown.Item>
                                    </> :

                                    RequestStatus === "REJECTED" ?
                                        <>
                                            <Dropdown.Item eventKey="ACTIVE">
                                                {isLang === 'ar' ? 'نشـط' : 'Active'}
                                            </Dropdown.Item>
                                        </> : ''
                }
            </DropdownButton>

            <Modal
                show={modalShow && modalIndex === idType}
                onHide={handleModalClose}
                centered
                dir={isLang === 'ar' ? 'rtl' : 'ltr'}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='  w-100 '> {isLang == "ar" ? 'سبب الرفض ' : 'Reject Reason'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center align-items-center gap-1 flex-column" >
                    <textarea className="form-control" rows="5" ref={reasonRef} />

                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center align-items-center">

                    <Button variant="danger" style={{ border: '#dc3545' }} onClick={() => reasonReject(idType, 'REJECTED')} >
                        {isLang == "ar" ? '   تحديد السبب ' : 'Set Reason'}

                    </Button>
                    <Button variant="outline-primary" onClick={handleModalClose}>
                        {isLang == "ar" ? '   رجوع ' : 'Cancel '}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default AdoptionRequests
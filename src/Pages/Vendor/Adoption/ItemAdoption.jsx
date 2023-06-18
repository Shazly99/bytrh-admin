import React, { useContext, useRef } from 'react';
import { Button, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { VendersContext } from '../../../context/Store';
import { PostData, apiheader } from '../../../utils/fetchData';


export default function ItemAdoption({ Reason, id, clientName, petName, petStrain, petPicture, cityName, cate, status, getTokenAdoption }) {



    const [modalShow, setModalShow] = React.useState(false);
    const [modalIndex, setModalIndex] = React.useState(0);
    let reasonRef = useRef()

    const handleActionSelect = async (id, action) => {
        if (action === "PENDING" ||
            action === "ACTIVE" ||
            action === "ADOPTED" ||
            action === "CANCELLED"
        ) {
            await userstatus({ IDAdoption: id, AdoptionStatus: action })
            await getTokenAdoption()
        } else if (action === "REJECTED") {
            handleModalOpen(id)
        }
    };
    // ** display Reason 
    const [modalShowReason, setModalShowReason] = React.useState(false);
    const [modalIndexReason, setModalIndexReason] = React.useState(0);
    const handleModalCloseReason = () => setModalShowReason(false);
    function handleModalOpenReason(index) {
        setModalIndexReason(index);
        setModalShowReason(true);
    }
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
        await getTokenAdoption();
    }
    const userstatus = async (status) => {
        await PostData(`https://bytrh.com/api/admin/adoptions/status`, status, apiheader)
    }

    let navigate = useNavigate();

    const goToAdoptionDetails = (id) => {
        navigate(`./details/${id}`);
    }



    let { isLang } = useContext(VendersContext);




    return (
        <>
            <tr>
                <td>
                    <div style={{ width: '250px', height: '150px' }}>
                        <img loading="lazy" src={petPicture} className='ro rounded-3 w-100 h-100 mx-auto' style={{ cursor: 'pointer' }} alt="pet-image" onClick={() => { goToAdoptionDetails(id) }} />
                    </div>
                </td>
                <td>
                    <div onClick={() => { goToAdoptionDetails(id) }} style={{ cursor: petName ? 'pointer' : 'default' }} >{petName ? petName : '_'}</div>
                </td>
                <td>
                    <div>{petStrain ? petStrain : '_'}</div>
                </td>
                <td>
                    <div>{cate ? cate : '_'}</div>
                </td>
                <td>
                    <div>{cityName ? cityName : '_'}</div>
                </td>
                <td>
                    <div>{clientName ? clientName : '_'}</div>
                </td>
                <td className='text-center '>
                    <span style={{ height: 'fit-content !important' }} className={`
                            ${status == 'PENDING' && 'txt_pending'} 
                            ${status == 'CANCELLED' && 'txt_cancel'}
                            ${status === 'REJECTED' && 'txt_rejected'} 
                            ${status == 'ADOPTED' && 'txt_blocked'}
                            ${status == 'ACTIVE' && 'txt_delivered'}  `} >
                        {isLang === 'en' && status && status[0].toUpperCase()}{isLang === 'en' && status && status.slice(1).toLowerCase()}

                        {isLang === 'ar' && status === 'ACTIVE' ? 'نشــط' : ''}
                        {isLang === 'ar' && status === 'PENDING' ? 'قيـد الإنتظـار' : ''}
                        {isLang === 'ar' && status === 'ADOPTED' ? 'متبنـي' : ''}
                        {isLang === 'ar' && status === 'CANCELLED' ? 'ملغــي' : ''}
                        {isLang === 'ar' && status === 'REJECTED' ? 'رفض' : ''}
                    </span>
                    {
                        Reason &&
                        <div className="app__reason">
                            <a onClick={() => handleModalOpenReason(id)} >  {isLang == "ar" ? '   الســبب ' : 'Reason '}</a>
                        </div>
                    }
                </td>

                <td className='text-center'>
                    <span>
                        <DropdownButton
                            id={`dropdown-${id}`}
                            title={isLang === 'ar' ? 'الإجراءات' : 'Actions'}
                            variant="outline-success"
                            onSelect={(eventKey) => handleActionSelect(id, eventKey)}
                            className="DropdownButton "
                        >
                            {
                                status === "PENDING" ?
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

                                    status === "ACTIVE" ?
                                        <>
                                            <Dropdown.Item eventKey="ADOPTED">
                                                {isLang === 'ar' ? 'متبنـي' : 'Adopted'}
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="CANCELLED">
                                                {isLang === 'ar' ? 'ملغــي' : 'Cancelled'}
                                            </Dropdown.Item>
                                        </> :

                                        status === "CANCELLED" ?
                                            <>
                                                <Dropdown.Item eventKey="ACTIVE">
                                                    {isLang === 'ar' ? 'نشـط' : 'Active'}
                                                </Dropdown.Item>
                                            </> :

                                            status === "ADOPTED" ?
                                                <>
                                                    <Dropdown.Item eventKey="ACTIVE">
                                                        {isLang === 'ar' ? 'نشـط' : 'Active'}
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="CANCELLED">
                                                        {isLang === 'ar' ? 'ملغــي' : 'Cancelled'}
                                                    </Dropdown.Item>
                                                </> :


                                                status === "REJECTED" ?
                                                    <>
                                                        <Dropdown.Item eventKey="ACTIVE">
                                                            {isLang === 'ar' ? 'نشـط' : 'Active'}
                                                        </Dropdown.Item>
                                                    </> : ''
                            }
                        </DropdownButton>
                    </span>

                </td>
                <Modal
                    show={modalShowReason && modalIndexReason === id}
                    onHide={handleModalCloseReason}
                    centered
                    dir={isLang === 'ar' ? 'rtl' : 'ltr'}
                >
                    <Modal.Header closeButton>
                        <Modal.Title className='  w-100 '>
                            {isLang == "ar" ? '   الســبب ' : 'Reason '}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex justify-content-center align-items-center gap-1 flex-column" >
                        <textarea className="form-control" rows="5" defaultValue={Reason} />

                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center align-items-center">

                        <Button onClick={handleModalCloseReason}    >
                            {isLang == "ar" ? '   رجوع ' : 'Cancel '}

                        </Button>
                    </Modal.Footer>
                </Modal>


                <Modal
                    show={modalShow && modalIndex === id}
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

                        <Button variant="danger" style={{ border: '#dc3545' }} onClick={() => reasonReject(id, 'REJECTED')} >
                            {isLang == "ar" ? '   تحديد السبب ' : 'Set Reason'}

                        </Button>
                        <Button variant="outline-primary" onClick={handleModalClose}>
                            {isLang == "ar" ? '   رجوع ' : 'Cancel '}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </tr>
        </>
    )
}

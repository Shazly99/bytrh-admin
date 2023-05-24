import React, { useContext, useRef, useState } from 'react';
import { Button, Dropdown, DropdownButton, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Component from '../../../constants/Component';
import { VendersContext } from '../../../context/Store';
import { PostData, apiheader } from '../../../utils/fetchData';


export default function ItemDoctor({ nameDoc, email, phone, country, type, balance, create, status, item, id, getTokenDoctors }) {


    let { isLang } = useContext(VendersContext);


    // const [idDoc, setId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleActionSelect = async (id, action) => {
        if (action === "PENDING") {
            await userstatus({ IDDoctor: id, DoctorStatus: action })
            await getTokenDoctors()
        } else if (action === "ACTIVE") {
            await userstatus({ IDDoctor: id, DoctorStatus: action })
            await getTokenDoctors()
        } else if (action === "OFFLINE") {
            await userstatus({ IDDoctor: id, DoctorStatus: action })
            await getTokenDoctors()
        } else if (action === "BLOCKED") {
            await userstatus({ IDDoctor: id, DoctorStatus: action })
            await getTokenDoctors()
        } else if (action === "DELETED") {
            // await userstatus({ IDDoctor: id, DoctorStatus: action })
            // await getTokenDoctors()
            handleShowRemove();
        }
        // else if (action === "balance") {
        //     setId(id)
        // }
    };
    // async function name() {
    //     await changeWallet({ IDDoctor: idDoc, Amount: changeBalance })
    //     await getTokenDoctors()
    // }


    const [showRemove, setShowRemove] = useState(false);
    const handleCloseRemove = () => setShowRemove(false);
    const handleShowRemove = () => setShowRemove(true);

    async function removeConfirm() {
        await userstatus({ IDDoctor: id, DoctorStatus: "DELETED" });
        await getTokenDoctors();
    }

    let changeBalance = useRef();
        const [messageBalance, setMessageBalance] = useState('');

    const changeWallet = async (el) => {
        if(changeBalance.current.value < 0) {
            if(isLang === 'ar') {
                setMessageBalance('غير مسموح بإضافة قيمة سالبة..')
            }
            else {
                setMessageBalance("It's not allowed to add a negative value..")
            }
        }
        if((balance - changeBalance.current.value) < 0 && el === 'lose') {
            if(isLang === 'ar') {
                setMessageBalance('غير مسموح ان يصبح الرصيد بالسـالب..')
            }
            else {
                setMessageBalance("The balance is not allowed to become negative..")
            }
        }
        else {
            await PostData(`https://bytrh.com/api/admin/doctors/wallet/add`, { 
                IDDoctor: id, 
                Amount: el === 'add' ? changeBalance.current.value : -changeBalance.current.value 
            }, apiheader)
            await getTokenDoctors();
            setMessageBalance('')
        }
    }

    const userstatus = async (status) => {
        await PostData(`https://bytrh.com/api/admin/doctors/status`, status, apiheader)
    }


    let navigate = useNavigate();

    const goToDoctorProfile = (id) => {
        navigate(`./doctorProfile/${id}`);
    }





    // const [messageRemove, setMessageRemove] = useState('');
    // const [apiCodeRemove, setApiCodeRemove] = useState('');
    // const [loadingRemove, setLoadingRemove] = useState(false);

    // async function removeConfirm(e) {

    //   setLoadingRemove(true);
    //     let { data } = await axios({
    //       method: 'get',
    //       url: `https://bytrh.com/api/admin/doctors/pricing/remove/${IDDoctorPricing}`,
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //         'Authorization': 'Bearer ' + localStorage.getItem('token'),
    //       },
    //     });

    //     setMessageRemove(data.ApiMsg);
    //     setLoadingRemove(false);

    //     if (data.Success === true) {
    //       setApiCodeRemove(data.Success);
    //       setTimeout(() => {
    //         setMessageRemove('');
    //         getDoctorData();
    //         handleCloseRemove();
    //       }, 2000);
    //     }

    //     else {
    //       setTimeout(() => {
    //         setMessageRemove('');
    //       }, 2000);
    //     }

    // }



    return (
        <>
            <tr>
                <td>
                    <div className='d-flex flex-column justify-content-center align-content-center' onClick={() => goToDoctorProfile(id)} style={{ gap: '0', cursor: 'pointer' }}>
                        <span className='ClientName'> {nameDoc} </span>
                        <span className='ClientPhone'> {phone} </span>
                    </div>
                </td>
                {/* <td>{email}</td> */}
                {/* <td>{phone}</td> */}
                <td>
                    <div> {country}   </div>
                </td>
                <td>
                    <div>
                        {type && type[0].toUpperCase()}{type.slice(1).toLowerCase()}
                    </div>
                </td>
                <td>
                    <div>{balance}</div>
                </td>
                <td className='text-center d-flex '>
                    <div>
                        <span style={{ height: 'fit-content !important' }} className={`
                                ${status === 'PENDING' && 'txt_pending'} 
                                ${status === 'NOT_VERIFIED' && 'txt_shipped'}
                                ${status === 'BLOCKED' && 'txt_blocked'}
                                ${status === 'ACTIVE' && 'txt_delivered'}
                                ${status === 'OFFLINE' && 'txt_rejected'}
                                ${status === 'OFFLINE' || status === 'INACTIVE' && 'txt_rejected'}`} >
                            {isLang === 'en' && status && status[0].toUpperCase()}{isLang === 'en' && status && status.slice(1).toLowerCase().replace('_', ' ')}
                            {isLang === 'ar' && status === 'ACTIVE' ? 'نشــط' : ''}
                            {isLang === 'ar' && status === 'PENDING' ? 'قيـد الإنتظـار' : ''}
                            {isLang === 'ar' && status === 'BLOCKED' ? 'محظــور' : ''}
                            {isLang === 'ar' && status === 'OFFLINE' ? 'مغلـق' : ''}
                            {isLang === 'ar' && status === 'INACTIVE' ? 'غير نشـط' : ''}
                            {isLang === 'ar' && status === 'NOT_VERIFIED' ? 'غير مثبـت' : ''}
                        </span>
                    </div>
                </td>
                <td>
                    <div
                        className="d-flex flex-column justify-content-center align-content-center"
                        style={{ gap: "0" }}
                    >
                        <span className="ClientName">
                            {" "}
                            {create.split(" ")[0]}{" "}
                        </span>
                        <span className="ClientPhone">
                            {" "}
                            {create.split(" ")[1]}
                        </span>
                    </div>
                 </td>
                <td>
                    <div>
                        <span>
                            <DropdownButton
                                id={`dropdown-${id}`}
                                title={isLang === 'ar' ? 'الإجراءات' : 'Actions'}
                                variant="outline-success"
                                onSelect={(eventKey) => handleActionSelect(id, eventKey)}
                                className="DropdownButton "
                            >
                                <Dropdown.Item as={Link} to={`/doctors/editDoctor/${id}`}>
                                    {isLang === 'ar' ? 'تعديـل' : 'Edit'}
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to={`/doctors/Service/list/${id}`}>
                                    {isLang === 'ar' ? 'خدمــات الدكتور' : 'Doctor Service'}
                                </Dropdown.Item>
                                {/* <Dropdown.Item as={Link} to={`/doctors/doctorFields/${id}`}>
                                    {isLang === 'ar' ? 'المجالات الطبيـة' : 'Medical Fields'}
                                </Dropdown.Item> */}
                                <Dropdown.Item as={Link} to={`/doctors/doctorCategory/${id}`}>
                                    {isLang === 'ar' ? 'التخصـص' : 'Specialization'}
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to={`/doctors/doctorHours/${id}`}>
                                    {isLang === 'ar' ? 'أوقـات العمـل' : 'Doctor Hours'}
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to={`/doctors/withdraw/${id}`}>
                                    {isLang === 'ar' ? '  طلبات سحب الطبيب' : 'Doctor Withdraw Requests'}
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="balance" onClick={handleShowModal}>
                                    {isLang === 'ar' ? 'ضبـط التوازن' : 'Set Balance'}
                                </Dropdown.Item>
                                <div className="w-100 bg-dark opacity-25" style={{ height: '1px' }}></div>
                                <Modal show={showModal} onHide={() => {
                                    handleCloseModal();
                                    setMessageBalance('');
                                }} centered dir={isLang === 'ar' ? 'rtl' : 'ltr'}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>
                                            {`${isLang === 'ar' ? `ضبـط التوازن ل ${nameDoc}` : `Set ${nameDoc} Balance`}`}
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Control type="number" defaultValue={balance} ref={changeBalance} />
                                    </Modal.Body>
                                    {messageBalance.length > 0 ? <p id="alertBalanse" className={`alert alert-danger fs-6 py-2 my-2 w-75 text-center mx-auto`}>{messageBalance}</p> : ''}
                                    <Modal.Footer className="d-flex justify-content-center align-items-center">
                                        {/* <Button variant="outline-primary" onClick={handleCloseModal}>
                                            {isLang === 'ar' ? 'رجـوع' : 'Cancel'}
                                        </Button> */}
                                        <Button variant="primary" onClick={() => {
                                                changeWallet('add');
                                        }}>
                                            {isLang === 'ar' ? 'زيادة التوازن' : 'Increase Balance'}
                                        </Button>
                                        <Button variant="primary" onClick={() => {
                                                changeWallet('lose');
                                        }}>
                                            {isLang === 'ar' ? 'تقليل التوازن' : 'Decrease Balance'}
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                {
                                    status === "ACTIVE" ? '' :
                                        <Dropdown.Item eventKey="ACTIVE">
                                            {isLang === 'ar' ? 'نشـط' : 'Active'}
                                        </Dropdown.Item>
                                }
                                {
                                    status === "OFFLINE" ? '' :
                                        <Dropdown.Item eventKey="OFFLINE">
                                            {isLang === 'ar' ? 'مغلـق' : 'Offline'}
                                        </Dropdown.Item>
                                }
                                {
                                    status === "BLOCKED" ? '' :
                                        <Dropdown.Item eventKey="BLOCKED">
                                            {isLang === 'ar' ? 'محظـور' : 'Blocked'}
                                        </Dropdown.Item>
                                }
                                <Dropdown.Item eventKey="DELETED">
                                    {isLang === 'ar' ? 'حـذف' : 'Deleted'}
                                </Dropdown.Item>

                                <Modal style={{ zIndex: '9999999999' }} show={showRemove} onHide={handleCloseRemove} centered dir={isLang === 'ar' ? 'rtl' : 'ltr'}>
                                    <Modal.Header closeButton>
                                        <Modal.Title className='text-center w-100  '>
                                            <h5 className='mb-0 text-warning'>
                                                {isLang === 'ar' ? 'تحذيـر..' : 'Warning Remove..'}
                                            </h5>
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Component.HandelDelete />

                                    </Modal.Body>
                                    {/* {messageRemove.length > 0 ? <p id="alertRemove" className={`alert ${apiCodeRemove === true ? 'alert-success' : 'alert-danger'} fs-6 py-2 my-2 w-50 text-center mx-auto`}>{messageRemove}</p> : ''} */}
                                    <Modal.Footer className='d-flex justify-content-center align-items-center'>

                                        <div className='d-flex justify-content-center align-content-center'>
                                            <div className='baseBtn pe-0 me-2'>
                                                <Button onClick={removeConfirm} variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                                    {/* {loadingRemove ? <i className="fa fa-spinner fa-spin text-white fs-4"></i> : 'Save'} */}
                                                    {isLang === 'ar' ? 'تأكيـد' : 'Confirm'}
                                                </Button>
                                            </div>

                                            <div className='baseBtn ps-0'>
                                                <Button onClick={handleCloseRemove} variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                                    {isLang === 'ar' ? 'رجـوع' : 'Cancel'}
                                                </Button>
                                            </div>
                                        </div>

                                    </Modal.Footer>
                                </Modal>

                            </DropdownButton>
                        </span>
                    </div>
                </td>
            </tr>
        </>
    )
}
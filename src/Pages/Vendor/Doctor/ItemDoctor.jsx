import React, { useRef, useState } from 'react';
// import { FiEdit3 } from 'react-icons/fi';
// import { AiOutlineDelete } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { DropdownButton, Dropdown, Modal, Form, Button } from 'react-bootstrap';
// import { useEffect } from 'react';
import { apiheader, PostData } from '../../../utils/fetchData';
import oops from '../../../assets/Images/doctor/Z.jfif';


export default function ItemDoctor({ nameDoc, email, phone, country, type, balance, create, status, item, id, getTokenDoctors }) {
    // const [data, setData] = useState({});
    const [showModal, setShowModal] = useState(false);
 
    const [idDoc, setId] = useState(null);
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

        } else if (action === "balance") {
            setId(id) 
        }
    };
    async function name() {
        await changeWallet({ IDDoctor: idDoc, Amount: changeBalance })
        await getTokenDoctors()
    }


    const [showRemove, setShowRemove] = useState(false);
    const handleCloseRemove = () => setShowRemove(false);
    const handleShowRemove = () => setShowRemove(true);

    async function removeConfirm() {
        await userstatus({ IDDoctor: id, DoctorStatus: "DELETED" });
        await getTokenDoctors();
    }

    let changeBalance = useRef()

    const changeWallet = async (wallet) => {
        let data = await PostData(`https://bytrh.com/api/admin/doctors/wallet/add`, {IDDoctor:id,Amount:changeBalance.current.value }, apiheader)
        await getTokenDoctors()
        console.log(data);
    }
    const userstatus = async (status) => {
        let { data } = await PostData(`https://bytrh.com/api/admin/doctors/status`, status, apiheader)
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
                <td className='text-center  d-flex '>
                    <div>
                        <span style={{ height: 'fit-content !important' }} className={`
                                          ${status == 'PENDING' && 'txt_pending'} 
                                          ${status == 'NOT_VERIFIED' && 'txt_shipped'}
                                          ${status == 'BLOCKED' && 'txt_blocked'}
                                          ${status == 'ACTIVE' && 'txt_delivered'}
                                          ${status == 'OFFLINE' && 'txt_rejected'}`} >
                            {status && status[0].toUpperCase()}{status.slice(1).toLowerCase()}
                        </span>
                    </div>
                </td>
                <td>
                    <div>{create}</div>
                </td>
                <td>
                    <div>
                        <span>
                            <DropdownButton
                                id={`dropdown-${id}`}
                                title="Actions"
                                variant="outline-success"
                                onSelect={(eventKey) => handleActionSelect(id, eventKey)}
                                className="DropdownButton "
                            >
                                <Dropdown.Item as={Link} to={`/doctors/editDoctor/${id}`}>
                                    Edit
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to={`/doctors/doctorFields/${id}`}>
                                    Doctor Fields
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to={`/doctors/doctorCategory/${id}`}>
                                    Doctor Animals Categories
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="balance" onClick={handleShowModal}>Set Balance</Dropdown.Item>
                                <Modal show={showModal} onHide={handleCloseModal} centered >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Set {nameDoc} Balance</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Control type="number" defaultValue={balance} ref={changeBalance} />
                                    </Modal.Body>
                                    <Modal.Footer className="d-flex justify-content-center align-items-center">
                                        <Button variant="outline-primary" onClick={handleCloseModal}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" style={{ border: '#FAAA40' }} onClick={changeWallet}>
                                            Set Balance
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                {
                                    status === "ACTIVE" ? '' : <Dropdown.Item eventKey="ACTIVE">Active</Dropdown.Item>
                                }
                                {
                                    status === "OFFLINE" ? '' : <Dropdown.Item eventKey="OFFLINE">Offline</Dropdown.Item>
                                }
                                {
                                    status === "BLOCKED" ? '' : <Dropdown.Item eventKey="BLOCKED">Blocked</Dropdown.Item>
                                }
                                <Dropdown.Item eventKey="DELETED">Deleted</Dropdown.Item>

                                <Modal style={{ zIndex: '9999999999' }} show={showRemove} onHide={handleCloseRemove} centered>
                                    <Modal.Header closeButton>
                                        <Modal.Title className='text-center w-100 text-warning'>
                                            <h5 className='mb-0'>Warning Remove..</h5>
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <img src={oops} className='w-50 d-block mx-auto' alt="oops" />
                                    </Modal.Body>
                                    {/* {messageRemove.length > 0 ? <p id="alertRemove" className={`alert ${apiCodeRemove === true ? 'alert-success' : 'alert-danger'} fs-6 py-2 my-2 w-50 text-center mx-auto`}>{messageRemove}</p> : ''} */}
                                    <Modal.Footer className='d-flex justify-content-center align-items-center'>
                                        {/* <Button className='btn btn-primary py-2 text-capitalize me-2' onClick={() => {
                                                removeConfirm()
                                        }}>
                                            Confirm
                                        </Button>
                                        <Button className='btn btn-primary py-2 px-3 text-capitalize' onClick={() => {
                                                handleCloseRemove();
                                            }}>
                                            Cancel
                                        </Button> */}

                                        <div className='d-flex justify-content-center align-content-center'>
                                            <div className='baseBtn pe-0 me-2'>
                                                <Button onClick={removeConfirm} variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                                    {/* {loadingRemove ? <i className="fa fa-spinner fa-spin text-white fs-4"></i> : 'Save'} */}
                                                    Confirm
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

                            </DropdownButton>
                        </span>
                    </div>
                </td>
                {/* <td>
                    <Link to={} className='me-3 '>
                        <AiOutlineDelete className='text-danger'/>
                    </Link>
                    <Link to={`/doctors/editDoctor/${id}`}>
                        <FiEdit3 className='main-color'/>
                    </Link>
                </td> */}
            </tr>
        </>
    )
}
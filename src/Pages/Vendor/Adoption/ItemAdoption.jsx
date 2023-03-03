import React, { useState } from 'react';
// import { FiEdit3 } from 'react-icons/fi';
// import { AiOutlineDelete } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { DropdownButton, Dropdown, Modal, Form, Button } from 'react-bootstrap';
// import { useEffect } from 'react';
import { apiheader, PostData } from '../../../utils/fetchData';


export default function ItemAdoption({ id , clientName , petName , petStrain , petPicture , cityName , cate , status , getTokenAdoption }) {


    // const [showModal, setShowModal] = useState(false);
    // const [changeBalance, setChangeBalance] = useState(null);

    // function handleChangeBalance(event) {
    //     setChangeBalance(parseInt(event.target.value) || null);
    // }
    // const [idDoc, setId] = useState(null);
    // const handleShowModal = () => setShowModal(true);
    // const handleCloseModal = () => setShowModal(false);
    // const handleActionSelect = async (id, action) => {
    //     if (action === "PENDING") {
    //         await userstatus({ IDDoctor: id, DoctorStatus: action })
    //         await getTokenDoctors()
    //     } else if (action === "ACTIVE") {
    //         await userstatus({ IDDoctor: id, DoctorStatus: action })
    //         await getTokenDoctors()
    //     } else if (action === "OFFLINE") {
    //         await userstatus({ IDDoctor: id, DoctorStatus: action })
    //         await getTokenDoctors()
    //     } else if (action === "BLOCKED") {
    //         await userstatus({ IDDoctor: id, DoctorStatus: action })
    //         await getTokenDoctors()
    //     } else if (action === "DELETED") {
    //         await userstatus({ IDDoctor: id, DoctorStatus: action })
    //         await getTokenDoctors()
    //     } else if (action === "balance") {
    //         setId(id)
    //         setChangeBalance(null)
    //     }
    // };
    // async function name() {
    //     await changeWallet({ IDDoctor: idDoc, Amount: changeBalance })
    //     await getTokenDoctors()
    // }


    // const changeWallet = async (wallet) => {
    //     let data = await PostData(`https://bytrh.com/api/admin/doctors/wallet/add`, wallet, apiheader)
    //     await getTokenDoctors()
    // }
    // const userstatus = async (status) => {
    //     let { data } = await PostData(`https://bytrh.com/api/admin/doctors/status`, status, apiheader)
    // }


    // let navigate = useNavigate();

    // const goToDoctorProfile = (id) => {
    //     navigate(`./doctorProfile/${id}`);
    // }



    return (
        <>
            <tr>
                {/* <td>
                    <div className='d-flex flex-column justify-content-center align-content-center' onClick={() => goToDoctorProfile(id)} style={{gap:'0' , cursor: 'pointer'}}>
                        <span className='ClientName'> {nameDoc} </span>
                        <span className='ClientPhone'> {phone} </span>
                    </div>
                </td> */}
                <td>
                    <img src={petPicture} className='mx-auto' style={{width: '200px' , height: '160px'}} alt="pet-image" />
                </td>
                <td>
                    <div>{petName}</div>
                </td>
                <td>
                    <div>{petStrain}</div>
                </td>
                <td>
                    <div>{cate}</div>
                </td>
                <td>
                    <div>{cityName}</div>
                </td>
                <td>
                    <div>{clientName}</div>
                </td>
                <td className='text-center '>
                    {/* <div className='bg-info h-100'> */}
                        <span style={{ height: 'fit-content !important' }} className={`
                                          ${status == 'PENDING' && 'txt_pending'} 
                                          ${status == 'NOT_VERIFIED' && 'txt_shipped'}
                                          ${status == 'BLOCKED' && 'txt_blocked'}
                                          ${status == 'ACTIVE' && 'txt_delivered'}
                                          ${status == 'OFFLINE' && 'txt_rejected'}`} >
                            {status.toLowerCase()}
                        </span>
                    {/* </div> */}
                </td>
                {/* <td>
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
                                <Dropdown.Item eventKey="balance" onClick={handleShowModal}>Balance check</Dropdown.Item>
                                <Modal show={showModal} onHide={handleCloseModal} centered >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add in wallet {name} </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Control type="number" value={changeBalance} onChange={handleChangeBalance} />
                                        <div className='d-flex justify-content-center align-items-center mt-3' style={{ gap: '15px' }}>
                                            <Button variant="outline-primary" onClick={() => setChangeBalance(changeBalance + 1)}>Balance add </Button>
                                            <Button variant="outline-primary" onClick={() => setChangeBalance(changeBalance - 1)}>Balance deduction</Button>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer className="d-flex justify-content-center align-items-center">
                                        <Button variant="outline-primary" onClick={handleCloseModal}>
                                            Cancel
                                        </Button>
                                        <Button eventKey="balance" variant="primary" onClick={name}>
                                            Save Changes
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

                            </DropdownButton>
                        </span>
                    </div>
                </td> */}
            </tr>
        </>
    )
}

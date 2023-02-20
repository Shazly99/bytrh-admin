import React, { useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { DropdownButton, Dropdown, Modal, Form, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { apiheader, PostData } from '../../../utils/fetchData';


export default function ItemDoctor({ nameDoc, email, phone, country, type, balance, status, item, id, getTokenDoctors }) {
    // const [data, setData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [changeBalance, setChangeBalance] = useState(null);

    function handleChangeBalance(event) {
        setChangeBalance(parseInt(event.target.value) || null);
    }
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
            await userstatus({ IDDoctor: id, DoctorStatus: action })
            await getTokenDoctors()
        } else if (action === "balance") {
            setId(id)
            setChangeBalance(null)
        }
    };
    async function name() {
        await changeWallet({ IDDoctor: idDoc, Amount: changeBalance })
        await getTokenDoctors()
    }


    const changeWallet = async (wallet) => {
        let data = await PostData(`https://bytrh.com/api/admin/doctors/wallet/add`, wallet, apiheader)
        await getTokenDoctors()
        console.log(data);
    }
    const userstatus = async (status) => {
        let { data } = await PostData(`https://bytrh.com/api/admin/doctors/status`, status, apiheader)
        console.log(data);
        console.log(status);
    }
    useEffect(() => {
    }, [])


    return (
        <>
            <tr>
                <td>
                    <div className='d-flex flex-column justify-content-center align-content-center' style={{gap:'0'}}>
                        <span className='ClientName'>  {nameDoc}    </span>
                        <span className='ClientPhone'> {phone} </span>
                    </div>
                </td>
                {/* <td>{email}</td> */}
                {/* <td>{phone}</td> */}
                <td>
                    <div> {country}   </div>
                </td>
                <td>
                    <div>{type}</div>
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
                            {status.toLowerCase()}
                        </span>
                    </div>
                </td>
                <td>
                    <div>
                        <span>
                            <DropdownButton
                                id={`dropdown-${id}`}
                                title="Action"
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
                                {/* <Dropdown.Item eventKey="PENDING" >Pending</Dropdown.Item> */}
                                {/* <Dropdown.Item eventKey="ACTIVE">Action</Dropdown.Item> */}
                                {/* <Dropdown.Item eventKey="INACTIVE">InAction</Dropdown.Item> */}
                                {
                                    status === "ACTIVE" ? '' : <Dropdown.Item eventKey="ACTIVE">Action</Dropdown.Item>
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
import React, { useState ,useRef} from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { DropdownButton, Dropdown, Modal, Form, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { apiheader, PostData } from '../../../utils/fetchData';
import { toast } from 'react-hot-toast';
import Icons from '../../../constants/Icons';


export default function ItemDoctor({ nameDoc, email, phone, country, type, balance, status, item, id, getTokenDoctors }) {
    // const [data, setData] = useState({});
    const [showModal, setShowModal] = useState(false); 
    let changeBalance = useRef()
 
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
        }
    };
 


    
    const changeWallet = async () => {
        await PostData(`https://bytrh.com/api/admin/doctors/wallet/add`, { IDDoctor: id, Amount: changeBalance.current.value }, apiheader).then((res) => {
          if (res.data.Success === true) {
            toast.success('wallet updated !', {
              duration: 4000,
              position: 'top-center',
              icon: <Icons.uploadItem color='#3182CE' size={20} />,
              iconTheme: {
                primary: '#0a0',
                secondary: '#fff',
              },
            }); 
            getTokenDoctors()
            handleCloseModal()
          } else {
            toast.error(res.data.ApiMsg)
          }
        }) 
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
                                <Dropdown.Item eventKey="balance" onClick={handleShowModal}>Balance check</Dropdown.Item>
                                <Modal show={showModal} onHide={handleCloseModal} centered >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add in wallet  </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Control type="number" defaultValue={balance} ref={changeBalance} /> 
                                    </Modal.Body>
                                    <Modal.Footer className="d-flex justify-content-center align-items-center">
                                        <Button variant="outline-primary" onClick={handleCloseModal}>
                                            Cancel
                                        </Button>
                                        <Button eventKey="balance" variant="primary" onClick={changeWallet}>
                                            Set Wellet
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                {/* <Dropdown.Item eventKey="PENDING" >Pending</Dropdown.Item> */}
                                {/* <Dropdown.Item eventKey="ACTIVE">Action</Dropdown.Item> */}
                                {/* <Dropdown.Item eventKey="INACTIVE">InAction</Dropdown.Item> */}
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
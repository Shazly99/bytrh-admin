import React, { useRef, useState, useEffect } from 'react'
// import data from './data.js';
import Icons from "../../../constants/Icons.js";
import { Table, DropdownButton, Dropdown, NavDropdown, Form } from "react-bootstrap";
import { apiheader, GetData, PostData } from '../../../utils/fetchData.js';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ClientTable = ({ usersList, userList }) => {
  const [showModal, setShowModal] = useState(false);
  const [changeBalance, setChangeBalance] = useState(0);

  let test = useRef()
  function handleChangeBalance(event) {
    console.log(test.current);
    setChangeBalance(parseInt(event.target.value) || 0);
  }


  const [id, setId] = useState(null);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  const handleActionSelect = async (id, action) => {
    if (action === "BLOCKED") {
      await userstatus({ IDClient: id, ClientStatus: action }).then((res) => {
        toast.success('Status up to date', {
          duration: 4000,
          position: 'top-center',  
          icon: <Icons.uploadItem color='#3182CE' size={25}/>, 
          iconTheme: {
            primary: '#0a0',
            secondary: '#fff',
          }, 
        });
      })
      await userList()
    } else if (action === "ACTIVE") {
      await userstatus({ IDClient: id, ClientStatus: action }).then((res) => {
        toast.success('Status up to date', {
          duration: 4000,
          position: 'top-center',  
          icon: <Icons.uploadItem color='#3182CE' size={25}/>, 
          iconTheme: {
            primary: '#0a0',
            secondary: '#fff',
          }, 
        });
      })
      await userList()
    } else if (action === "DELETED") {
      await userstatus({ IDClient: id, ClientStatus: action }).then((res) => {
        toast.success('Client is deleted', {
          duration: 4000,
          position: 'top-center',  
          icon: <Icons.bin color='#E20000' size={20}/>, 
          iconTheme: {
            primary: '#0a0',
            secondary: '#fff',
          }, 
        });
      })
      await userList()
    }
    else if (action === "INACTIVE") {
      await userstatus({ IDClient: id, ClientStatus: action }).then((res) => {
        toast.success('Status up to date', {
          duration: 4000,
          position: 'top-center',  
          icon: <Icons.uploadItem color='#3182CE' size={25}/>, 
          iconTheme: {
            primary: '#0a0',
            secondary: '#fff',
          }, 
        });
      })
      await userList()
    } else if (action === "reset") {
      await resetPassword(id)
      await userList()
    } else if (action === "balance") {
      setId(id)
      setChangeBalance(null)
    }
  };
  const userstatus = async (status) => {
    return await PostData(`https://bytrh.com/api/admin/clients/status`, status, apiheader)
  }

  // clients wallet api Balance
  async function detailsWallet() {
    await changeWallet({ IDClient: id, Amount: changeBalance })
    await userList()
  }
  const changeWallet = async (wallet) => {
    let data = await PostData(`https://bytrh.com/api/admin/clients/wallet/add`, wallet, apiheader)
    if (data.Success === true) {
      toast.error('Failed !');
    } else {
      toast.success('wallet updated !');

    }
    console.log(data);
  }

  // client reset Password api Balance
  const resetPassword = async (idClient) => {
    let data = await GetData(`https://bytrh.com/api/admin/clients/password/reset/${idClient}`, apiheader)

    if (data.Success === true) {
      toast.success('Password reset successfully!');
    } else {
      toast.error('password reset failed!');

    }
  }
  useEffect(() => {
  }, [usersList])



  return (
    <>

      <Table responsive={true} className='rounded-3 '>
        <thead>
          <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
            <th>User Name</th>
            <th>Register Date</th>
            <th>Country</th>
            <th>Login by</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {
            usersList?.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className='d-flex flex-column justify-content-center align-content-center' style={{ gap: '0' }}>
                    <span className='ClientName'>{item?.ClientName}</span>
                    <span className='ClientPhone'>{item?.ClientPhone}</span>
                  </div>
                </td>
                <td >
                  <div>
                    {item?.CreateDate.split(" ")[0]}
                  </div>
                </td>
                <td className='text-center'>
                  <div>
                    {item?.CountryName}
                  </div>
                </td>
                <td className='text-center'>
                  <div>
                    {
                      item?.LoginBy.split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ')
                    }
                  </div>
                </td>
                <td className='text-center'>
                  <div>
                    {item?.ClientBalance}
                  </div>
                </td>
                <td className='text-center  d-flex '>
                  <div>
                    <span style={{ height: 'fit-content !important' }} className={` 
                                        ${item.ClientStatus == 'ACTIVE' && 'txt_delivered'}
                                        ${item.ClientStatus == 'INACTIVE' && 'txt_rejected'}
                                        ${item.ClientStatus == 'BLOCKED' && 'txt_blocked'}
                                        `}
                    >
                      {item?.ClientStatus.toLowerCase()}
                    </span>
                  </div>
                </td>
                <td>
                  <div>
                    <span>
                      <DropdownButton
                        id={`dropdown-${item.IDClient}`}
                        title="Actions"
                        variant="outline-success"
                        onSelect={(eventKey) => handleActionSelect(item.IDClient, eventKey)}
                        className="DropdownButton "
                      >
                        <Dropdown.Item eventKey="reset">Reset password</Dropdown.Item>
                        <Dropdown.Item eventKey="balance" onClick={handleShowModal}>Balance check</Dropdown.Item>
                        <Modal show={showModal} onHide={handleCloseModal} centered >
                          <Modal.Header closeButton>
                            <Modal.Title>Add in wallet {item?.ClientName} </Modal.Title>
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
                            <Button eventKey="balance" variant="primary" onClick={detailsWallet}>
                              wallet updated
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        <Dropdown.Item eventKey="DELETED">Deleted</Dropdown.Item>
                        {
                          item?.ClientStatus === "ACTIVE" ? '' : <Dropdown.Item eventKey="ACTIVE">Active</Dropdown.Item>
                        }
                        {
                          item?.ClientStatus === "INACTIVE" ? '' : <Dropdown.Item eventKey="INACTIVE">InActive</Dropdown.Item>
                        }
                        {
                          item?.ClientStatus === "BLOCKED" ? '' : <Dropdown.Item eventKey="BLOCKED">Blocked</Dropdown.Item>
                        }
                      </DropdownButton>
                    </span>
                  </div>
                </td>

              </tr>
            ))
          }

        </tbody>

      </Table>



    </>
  )
}

export default ClientTable
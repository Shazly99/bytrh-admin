import React, { useEffect, useRef, useState } from 'react';
// import data from './data.js';
import { Dropdown, DropdownButton, Form, Table } from "react-bootstrap";
import { toast } from 'react-hot-toast';
import Icons from "../../../constants/Icons.js";
import { apiheader, GetData, PostData } from '../../../utils/fetchData.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useSkeletonTable from '../../../utils/useSkeletonTable.js';

const ClientTable = ({ usersList, userList, isLoading }) => {
  let {SkeletonTable} =useSkeletonTable();
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState({});
  let changeBalance = useRef()

  // !change client status
  const handleActionSelect = async (id, action) => {
    if (action === "BLOCKED" || action === "ACTIVE" || action === "INACTIVE") {
      await userstatus({ IDClient: id, ClientStatus: action }).then((res) => {
        toast.success('Updated Successfully', {
          duration: 4000,
          position: 'top-center',
          icon: <Icons.UploadItem color='#3182CE' size={20} />,
          iconTheme: {
            primary: '#0a0',
            secondary: '#fff',
          },
        });
      })
      await userList()
    } else if (action === "DELETED") {
      setSelectedUserId({ IDClient: id, ClientStatus: action });
      setShowDeleteModal(true);
    } else if (action === "reset") {
      await resetPassword(id)
      await userList()
    } else if (action === "balance") {
      setId(id)
    }
  };
  const userstatus = async (status) => {
    return await PostData(`https://bytrh.com/api/admin/clients/status`, status, apiheader)
  }
  const changeWallet = async () => {
    await PostData(`https://bytrh.com/api/admin/clients/wallet/add`, { IDClient: id, Amount: changeBalance.current.value }, apiheader).then((res) => {
      if (res.data.Success === true) {
        toast.success('wallet updated !', {
          duration: 4000,
          position: 'top-center',
          icon: <Icons.UploadItem color='#3182CE' size={20} />,
          iconTheme: {
            primary: '#0a0',
            secondary: '#fff',
          },
        });
        userList()
        handleCloseModal()
      } else {
        toast.error(res.data.ApiMsg)
      }
    })
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

  const handleDeleteUser = async () => {
    // Logic for deleting user with ID `selectedUserId`
    setShowDeleteModal(false);

    await userstatus(selectedUserId).then((res) => {
      toast.success('user has been deleted', {
        duration: 4000,
        position: 'top-center',
        icon: <Icons.Bin color='#E20000' size={17} />,
        iconTheme: {
          primary: '#0a0',
          secondary: '#fff',
        },
      });
    })
    await userList()
  }
  useEffect(() => {
   window.scrollTo(0, 0);
  }, [usersList]) 
  return (
    <>
      { isLoading ? <> 
        <Table responsive={true} className='rounded-3 '>
          <thead>
            <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
              <th>User Name</th>
              <th>Country</th>
              <th>Login by</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Register Date</th>
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
                                        ${item.ClientStatus === 'ACTIVE' && 'txt_delivered'}
                                        ${item.ClientStatus === 'INACTIVE' && 'txt_rejected'}
                                        ${item.ClientStatus === 'BLOCKED' && 'txt_blocked'}
                                        `}  >
                        {item?.ClientStatus.toLowerCase().charAt(0).toUpperCase() + item?.ClientStatus.slice(1).toLowerCase()}
                      </span>
                    </div>
                  </td>
                  <td >
                    <div>
                      {item?.CreateDate.split(" ")[0]}
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

                          <Dropdown.Item eventKey="balance" onClick={handleShowModal}>Set Balance</Dropdown.Item>

                          <Modal show={showModal} onHide={handleCloseModal} centered >
                            <Modal.Header closeButton>
                              <Modal.Title>Set {item?.ClientName} Balance</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form.Control type="number" defaultValue={item.ClientBalance} ref={changeBalance} />
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

                          <Dropdown.Item eventKey="DELETED">Deleted</Dropdown.Item>
                          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                            <Modal.Header closeButton>
                              <Modal.Title>Delete Client</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Are you sure you want to delete this client?
                            </Modal.Body>
                            <Modal.Footer className='  d-flex justify-content-center'>
                              <Button variant="outline-primary" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                              </Button>
                              <Button variant="danger" onClick={() => handleDeleteUser(item.IDUser)}>
                                Delete Now
                              </Button>
                            </Modal.Footer>
                          </Modal>
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
      </> : SkeletonTable()}

    </>
  )
}

export default ClientTable
import React, { useState } from 'react';
 import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect } from 'react';
import { Button, Dropdown, DropdownButton, Modal, Table } from "react-bootstrap";
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Icons from "../../../constants/Icons.js";
import { apiheader, PostData } from '../../../utils/fetchData.js';
import useSkeletonTable from '../../../utils/useSkeletonTable.js';

function UsersTable({ usersList, userList, isLoader }) {
    let { SkeletonTable } = useSkeletonTable();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState({});

    const handleActionSelect = async (id, action) => {
        if (action === "PENDING") {
            await userstatus({ IDUser: id, UserStatus: action }).then((res) => {
                toast.success('Updated Successfully', {
                    duration: 4000,
                    position: 'top-center',
                    icon: <Icons.UploadItem color='#3182CE' size={16} />,
                    iconTheme: {
                        primary: '#0a0',
                        secondary: '#fff',
                    },
                });
            })
            await userList()
        } else if (action === "ACTIVE") {
            await userstatus({ IDUser: id, UserStatus: action }).then((res) => {
                toast.success('Updated Successfully', {
                    duration: 4000,
                    position: 'top-center',
                    icon: <Icons.UploadItem color='#3182CE' size={25} />,
                    iconTheme: {
                        primary: '#0a0',
                        secondary: '#fff',
                    },
                });
            })
            await userList()
        } else if (action === "INACTIVE") {

            await userstatus({ IDUser: id, UserStatus: action }).then((res) => {
                toast.success('Updated Successfully', {
                    duration: 4000,
                    position: 'top-center',
                    icon: <Icons.UploadItem color='#3182CE' size={25} />,
                    iconTheme: {
                        primary: '#0a0',
                        secondary: '#fff',
                    },
                });
            })
            await userList()
        } else if (action === "DELETED") {
            setSelectedUserId({ IDUser: id, UserStatus: action });
            setShowDeleteModal(true);

        }
    };

    const userstatus = async (status) => {
        return await PostData(`https://bytrh.com/api/admin/users/status`, status, apiheader)
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
    }, [usersList, selectedUserId])



    return (
        <>
            {isLoader ? <>
                <Table responsive={true} className='rounded-3 '>
                    <thead>
                        <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>User State</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            usersList?.map((item, index) => (
                                <tr key={index}>

                                    <td >
                                        <div>
                                            {item?.UserName}
                                        </div>
                                    </td>
                                    <td >
                                        <div>
                                            {item?.UserEmail}
                                        </div>
                                    </td>
                                    <td>
                                        <div className='color-red'>
                                            {item?.UserPhone}
                                        </div>
                                    </td>
                                    <td className='text-center  d-flex '>
                                        <div>
                                            <span style={{ height: 'fit-content !important' }} className={`
                                          ${item.UserStatus === 'PENDING' && 'txt_pending'} 
                                          ${item.UserStatus === 'Shipped' && 'txt_shipped'}
                                          ${item.UserStatus === 'Out For Delivery' && 'txt_delivery'}
                                          ${item.UserStatus === 'ACTIVE' && 'txt_delivered'}
                                          ${item.UserStatus === 'INACTIVE' && 'txt_rejected'}`} >
                                                {item?.UserStatus.toLowerCase().charAt(0).toUpperCase() + item?.UserStatus.slice(1).toLowerCase()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className='text-center'>
                                        <div>
                                            {item?.RoleName}
                                        </div>
                                    </td>

                                    <td>
                                        <div>

                                            <span>
                                                <DropdownButton
                                                    id={`dropdown-${item.IDUser}`}
                                                    title="Actions"
                                                    variant="outline-success"
                                                    onSelect={(eventKey) => handleActionSelect(item.IDUser, eventKey)}
                                                    className="DropdownButton "
                                                >
                                                    <Dropdown.Item eventKey="Edite" as={Link} to={`/user/editUser/${item.IDUser}`}>
                                                        Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="DELETED">Deleted</Dropdown.Item>


                                                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Delete User</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <div>
                                                                <div className="expired-container">
                                                                    <Player
                                                                        className="expired-image"
                                                                        src="https://assets6.lottiefiles.com/packages/lf20_dqnvaulk.json"
                                                                        autoplay
                                                                        loop
                                                                    />
                                                                 </div>
                                                            </div>
                                                        </Modal.Body>
                                                        <Modal.Footer className='  d-flex justify-content-center'>
                                                            <Button variant="danger" onClick={() => handleDeleteUser(item.IDUser)}>
                                                                Delete
                                                            </Button>
                                                            <Button variant="outline-primary" onClick={() => setShowDeleteModal(false)}>
                                                                Cancel
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                    {
                                                        item?.UserStatus === "PENDING" ? '' : <Dropdown.Item eventKey="PENDING">Pending</Dropdown.Item>
                                                    }
                                                    {
                                                        item?.UserStatus === "ACTIVE" ? '' : <Dropdown.Item eventKey="ACTIVE">Active</Dropdown.Item>
                                                    }
                                                    {
                                                        item?.UserStatus === "INACTIVE" ? '' : <Dropdown.Item eventKey="INACTIVE">InActive</Dropdown.Item>
                                                    }
                                                    {/* {
                                                    item?.UserStatus === "BLOCKED" ? '' : <Dropdown.Item eventKey="BLOCKED">Blocked</Dropdown.Item>
                                                } */}
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

export default UsersTable

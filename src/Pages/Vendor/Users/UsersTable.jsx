import React, { useState } from 'react'
// import data from './data.js';
import Icons from "../../../constants/Icons.js";
import { useEffect } from 'react';
import { Table, DropdownButton, Dropdown, NavDropdown } from "react-bootstrap";
import { apiheader, PostData } from '../../../utils/fetchData.js';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

function UsersTable({ usersList, userList }) {
    // const [data, setData] = useState({});
    const handleActionSelect = async (id, action) => {
        if (action === "PENDING") {
            await userstatus({ IDUser: id, UserStatus: action }).then((res) => {
                toast.success('Status up to date', {
                    duration: 4000,
                    position: 'top-center',
                    icon: <Icons.uploadItem color='#3182CE' size={16} />,
                    iconTheme: {
                        primary: '#0a0',
                        secondary: '#fff',
                    },
                });
            })
            await userList()
        } else if (action === "ACTIVE") {
            await userstatus({ IDUser: id, UserStatus: action }).then((res) => {
                toast.success('Status up to date', {
                    duration: 4000,
                    position: 'top-center',
                    icon: <Icons.uploadItem color='#3182CE' size={25} />,
                    iconTheme: {
                        primary: '#0a0',
                        secondary: '#fff',
                    },
                });
            })
            await userList()
        } else if (action === "INACTIVE") {
            await userstatus({ IDUser: id, UserStatus: action }).then((res) => {
                toast.success('Status up to date', {
                    duration: 4000,
                    position: 'top-center',
                    icon: <Icons.uploadItem color='#3182CE' size={25} />,
                    iconTheme: {
                        primary: '#0a0',
                        secondary: '#fff',
                    },
                });
            })
            await userList()
        } else if (action === "DELETED") {
            await userstatus({ IDUser: id, UserStatus: action }).then((res) => {
                toast.success('Status up to date', {
                    duration: 4000,
                    position: 'top-center',
                    icon: <Icons.bin color='#E20000' size={17} />,
                    iconTheme: {
                        primary: '#0a0',
                        secondary: '#fff',
                    },
                });
            })
            await userList()
        }
    };

    const userstatus = async (status) => {
        let { data } = await PostData(`https://bytrh.com/api/admin/users/status`, status, apiheader)
        console.log(data);
    }
    useEffect(() => {
    }, [usersList])

    return (
        <>
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
                                          ${item.UserStatus == 'PENDING' && 'txt_pending'} 
                                          ${item.UserStatus == 'Shipped' && 'txt_shipped'}
                                          ${item.UserStatus == 'Out For Delivery' && 'txt_delivery'}
                                          ${item.UserStatus == 'ACTIVE' && 'txt_delivered'}
                                          ${item.UserStatus == 'INACTIVE' && 'txt_rejected'}`} >
                                            {item?.UserStatus.toLowerCase()}
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
                                                title="Action"
                                                variant="outline-success"
                                                onSelect={(eventKey) => handleActionSelect(item.IDUser, eventKey)}
                                                className="DropdownButton "
                                            >
                                                <Dropdown.Item eventKey="Edite" as={Link} to={`/user/editUser/${item.IDUser}`}>
                                                    Edit
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="DELETED">Deleted</Dropdown.Item>
                                                {/* <Dropdown.Item eventKey="PENDING" >Pending</Dropdown.Item> */}
                                                {/* <Dropdown.Item eventKey="ACTIVE">Action</Dropdown.Item> */}
                                                {/* <Dropdown.Item eventKey="INACTIVE">InAction</Dropdown.Item> */}
                                                {
                                                    item?.UserStatus === "PENDING" ? '' : <Dropdown.Item eventKey="PENDING">Pending</Dropdown.Item>
                                                }
                                                {
                                                    item?.UserStatus === "ACTIVE" ? '' : <Dropdown.Item eventKey="ACTIVE">Action</Dropdown.Item>
                                                }
                                                {
                                                    item?.UserStatus === "INACTIVE" ? '' : <Dropdown.Item eventKey="INACTIVE">InAction</Dropdown.Item>
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
        </>
    )
}

export default UsersTable

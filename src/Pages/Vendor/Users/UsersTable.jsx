import React, { useState } from 'react'
import data from './data.js';
import Icons from "../../../constants/Icons.js";
import { useEffect } from 'react';
import { Table, DropdownButton, Dropdown } from "react-bootstrap";
import { apiheader, PostData } from '../../../utils/fetchData.js';

function UsersTable({ usersList,userList }) {
    const [data, setData] = useState({});
    const handleActionSelect = async(id, action) => {
        if (action === "PENDING") { 
            await userstatus({ IDUser: id, UserStatus: action })
            await  userList()
        } else if (action === "ACTIVE") {
            await userstatus({ IDUser: id, UserStatus: action }) 
            await  userList()
        } else if (action === "INACTIVE") {
            await userstatus({ IDUser: id, UserStatus: action })
            await  userList() 
        } else if (action === "DELETED") {
            await userstatus({ IDUser: id, UserStatus: action }) 
            await  userList()
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
            <Table striped responsive={true} className='rounded-3 '>
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
                        usersList.map((item, index) => (
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
                                <td className='text-center'>
                                    <div>
                                        {item?.UserStatus}
                                    </div>
                                </td>
                                <td className='text-center'>
                                    <div>
                                        {item?.RoleName}
                                    </div>
                                </td>

                                <td>
                                    <DropdownButton
                                        id={`dropdown-${item.IDUser}`}
                                        title="Action"
                                        variant="outline-success"
                                        onSelect={(eventKey) => handleActionSelect(item.IDUser, eventKey)}
                                    >

                                        <Dropdown.Item eventKey="PENDING">Pending</Dropdown.Item>
                                        <Dropdown.Item eventKey="ACTIVE">Action</Dropdown.Item>
                                        <Dropdown.Item eventKey="INACTIVE">InAction</Dropdown.Item>
                                        <Dropdown.Item eventKey="DELETED">Deleted</Dropdown.Item>
                                        <Dropdown.Item eventKey="Edite">Edite</Dropdown.Item>
                                    </DropdownButton>
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

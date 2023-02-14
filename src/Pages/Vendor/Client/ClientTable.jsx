import React, { useState } from 'react'
// import data from './data.js';
import Icons from "../../../constants/Icons.js";
import { useEffect } from 'react';
import { Table, DropdownButton, Dropdown, NavDropdown } from "react-bootstrap";
import { apiheader, PostData } from '../../../utils/fetchData.js';
import { Link } from 'react-router-dom';



const ClientTable = ({ usersList, userList }) => {
  // const [data, setData] = useState({});
  const handleActionSelect = async (id, action) => {
    console.log(id);
    console.log(action);
    if (action === "BLOCKED") {
      await userstatus({ IDClient: id, ClientStatus: action })
      await userList()
    } else if (action === "ACTIVE") {
      await userstatus({ IDClient: id, ClientStatus: action })
      await userList()
    } else if (action === "DELETED") {
      await userstatus({ IDClient: id, ClientStatus: action })
      await userList()
    }
    else if (action === "INACTIVE") {
      await userstatus({ IDClient: id, ClientStatus: action })
      await userList()
    }
  };

  const userstatus = async (status) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/clients/status`, status, apiheader)
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
            <th>Country</th>
            {/* <th>Balance</th> */}
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {
            usersList?.map((item, index) => (
              <tr key={index}>
                <td >
                  <div>
                    {item?.ClientName}
                  </div>
                </td>
                <td >
                  <div>
                    {item?.ClientEmail}
                  </div>
                </td>
                <td>
                  <div className='color-red'>
                    {item?.ClientPhone}
                  </div>
                </td>
                <td className='text-center'>
                  <div>
                    {item?.CountryNameEn}
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
                        title="Action"
                        variant="outline-success"
                        onSelect={(eventKey) => handleActionSelect(item.IDClient, eventKey)}
                        className="DropdownButton "
                      >
               
                        <Dropdown.Item eventKey="DELETED">Deleted</Dropdown.Item> 
                        <Dropdown.Item eventKey="ACTIVE">Action</Dropdown.Item>
                        <Dropdown.Item eventKey="INACTIVE">InAction</Dropdown.Item>
                        <Dropdown.Item eventKey="BLOCKED">Blocked</Dropdown.Item>

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
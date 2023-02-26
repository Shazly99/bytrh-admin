import React from 'react'
import { Table, DropdownButton, Dropdown, NavDropdown } from "react-bootstrap";
import Component from '../../../constants/Component'
import Icons from '../../../constants/Icons'
import { GetData, PostData, apiheader } from './../../../utils/fetchData';
import { useEffect } from 'react';
import { useState } from 'react';
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ChatConsult = () => {
  const [consult, setConsultList] = useState(null)
  const [page, setPage] = useState(1);
  const [PagesNumber, setPagesNumber] = useState('')

  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;
  const handleChange = (event, value) => {
    setPage(value);
  };

  const consultList = async (page) => {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/consult`, { IDPage: page }, apiheader).then(({data})=>{
      setPagesNumber(data.Response.Pages);
      setConsultList(data.Response.Consults);
    }); 
  }
  const handleActionSelect = async (id, action) => {
    if (action === "End") {
      await GetData(`${process.env.REACT_APP_API_URL}/admin/consult/chat/end/${id}`,apiheader).then((res) => {
        toast.error('Chat has been ended');
      })
      await consultList(page)
    }
  }
  useEffect(() => {
    consultList(page)
  }, [page, PagesNumber])
  return (
    <>
      <div className="app__Users ">
        <div className="app__Users-table">

          <Table responsive={true} className='rounded-3 '>
            <thead>
              <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                <th>Client Info</th>
                <th>Doctor Info</th>
                <th>Consult Type</th>
                <th>Consult Amount</th>
                <th>Consult Status</th>
                <th>Action </th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {
                consult?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className='d-flex flex-column justify-content-center align-content-center' style={{ gap: '0' }}>
                        <span className='ClientName'>{item?.ClientName}</span>
                        <span className='ClientPhone'>{item?.ClientPhone}</span>
                      </div>
                    </td>

                    <td>
                      <div className='d-flex flex-column justify-content-center align-content-center' style={{ gap: '0' }}>
                        <span className='ClientName'>{item?.DoctorName}</span>
                        <span className='ClientPhone'>{item?.DoctorPhone}</span>
                      </div>
                    </td>


                    <td className='text-center  d-flex '>
                      <div>
                        <span style={{ height: 'fit-content !important' }} className={`
                                          ${item.ConsultType == 'NORMAL' && 'txt_pending'} 
                                          ${item.ConsultType == 'URGENT' && 'txt_shipped'}
                                          ${item.ConsultType == 'Out For Delivery' && 'txt_delivery'}
                                          ${item.ConsultType == 'ACTIVE' && 'txt_delivered'}
                                          ${item.ConsultType == 'INACTIVE' && 'txt_rejected'}`} >
                          {item?.ConsultType.toLowerCase()}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className='d-flex flex-column justify-content-center align-content-center' style={{ gap: '0' }}>
                        <span className='ClientName'>{item?.ConsultAmount}</span> 
                      </div>
                    </td>

                    <td className='text-center  d-flex '>
                      <div> 
                        <span style={{ height: 'fit-content !important' }} className={`
                                          ${item.ConsultStatus == 'PENDING' && 'txt_pending'} 
                                          ${item.ConsultStatus == 'ONGOING' && 'txt_delivered'} 
                                          ${item.ConsultStatus == 'ENDED' && 'txt_cancel'}
                                          ${item.ConsultStatus == 'EXPIRED' && 'txt_delivery'}
                                          ${item.ConsultStatus == 'CANCELLED' && 'txt_cancel'}
                                          ${item.ConsultStatus == 'NO_RESPONSE' && 'txt_pending'} 
                                          ${item.ConsultStatus == 'SKIPPED' && 'txt__status'} 
                                          ${item.ConsultStatus == 'REJECTED' && 'txt_rejected'}
                                          ${item.ConsultStatus == 'ACCEPTED' && 'txt_delivery'}`} >
                          {item?.ConsultStatus.toLowerCase()}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div>

                        <span>
                          <DropdownButton
                            id={`dropdown-${item.IDConsult}`}
                            title="Actions"
                            variant="outline-success"
                          onSelect={(eventKey) => handleActionSelect(item.IDConsult, eventKey)}
                            className="DropdownButton "
                            drop={'down-centered'}
                          > 
                            <Dropdown.Item eventKey="Edite" as={Link} to={`/chat/consult/details/${item.IDConsult}`}>  Counseling </Dropdown.Item>
                           
                            {item.ConsultStatus !== 'ENDED' &&
                          
                            <Dropdown.Item eventKey="End" as={Link}  > End Chat  </Dropdown.Item>
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
        </div>

      </div>
      <div className="pagination ">
        <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
          <Pagination count={pageCount} page={page} onChange={handleChange} />
        </Box> 
      </div>
    </>
  )
}

export default ChatConsult

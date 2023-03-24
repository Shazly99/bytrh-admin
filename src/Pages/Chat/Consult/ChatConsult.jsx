import React, { useContext } from 'react'
import { Table, DropdownButton, Dropdown, NavDropdown, Modal, Form, Button } from "react-bootstrap";
import Component from '../../../constants/Component'
import Icons from '../../../constants/Icons'
import { GetData, PostData, apiheader } from './../../../utils/fetchData';
import { useEffect } from 'react';
import { useState } from 'react';
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Complain from './Complain';
import useSkeletonTable from '../../../utils/useSkeletonTable';
import { VendersContext } from '../../../context/Store';

const ChatConsult = () => {
  const [consult, setConsultList] = useState(null)
  const [page, setPage] = useState(1);
  const [PagesNumber, setPagesNumber] = useState('')
  const [searchClient, setSearchClient] = useState('');
  const [searchDoctor, setSearchDoctot] = useState('');
  const [isLoader, setIsloader] = useState(false);
  let { SkeletonTable, SkeletonFilters, SkeletonSearchsingel } = useSkeletonTable();
  let { isLang } = useContext(VendersContext);
  //**Modal Complain */
  const [modalShow, setModalShow] = React.useState(false);
  const [modalIndex, setModalIndex] = React.useState(0);
  function handleModalClose() {
    setModalShow(false);
  }

  function handleModalOpen(index) {
    setModalIndex(index);
    setModalShow(true);
  }

  const [modalShowDoc, setModalShowDoc] = React.useState(false);
  const [modalIndexDoc, setModalIndexDoc] = React.useState(0);
  function handleModalCloseDoc() {
    setModalShowDoc(false);
  }

  function handleModalOpenDoc(index) {
    setModalIndexDoc(index);
    setModalShowDoc(true);
  }
  //**Modal Complain */
  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;
  const handleChange = (event, value) => setPage(value);

  const consultList = async (page) => {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/consult`, { IDPage: page }, apiheader).then(({ data }) => {
      setPagesNumber(data.Response.Pages);
      setConsultList(data.Response.Consults);
      const timeoutId = setTimeout(() => {
        setIsloader(true)
      }, 200);
      return () => clearTimeout(timeoutId);

    });
  }
  const handleActionSelect = async (id, action) => {
    if (action === "End") {
      await GetData(`${process.env.REACT_APP_API_URL}/admin/consult/chat/end/${id}`, apiheader).then((res) => {
        toast.error('Chat has been ended');
      })
      await consultList(page)
    }
  }

  // search and filter 

  const handleSearchClick = () => searchGetClient(searchClient)
  const handleSearchClick1 = () => searchByDoctor(searchDoctor)

  const handleInputChange = (event) => {
    if (event.target.value === '') {
      consultList(page)
    }
    setSearchClient(event.target.value);
  };
  const handleInputChange1 = (event) => {
    if (event.target.value === '') {
      consultList(page)
    }
    setSearchDoctot(event.target.value);
  };

  const searchGetClient = async (searchValue) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/consult`, { IDPage: page, ClientSearchKey: searchValue }, apiheader)
    setConsultList(data.Response.Consults)
    setPagesNumber(data.Response.Pages);

  }
  const searchByDoctor = async (searchValue1) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/consult`, { IDPage: page, DoctorSearchKey: searchValue1 }, apiheader)
    setConsultList(data.Response.Consults)
    setPagesNumber(data.Response.Pages);

  }

  // Filter
  const [selectedOption, setSelectedOption] = useState('All');

  const handleOptionChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    // filter your content based on the selected option 
    if (selectedValue === "ONGOING" || selectedValue === "ACCEPTED" || selectedValue === "REJECTED" || selectedValue === "SKIPPED" || selectedValue === "NO_RESPONSE" || selectedValue === "EXPIRED" || selectedValue === "ENDED" || selectedValue === "PENDING" || selectedValue === "CANCELLED") {
      let { data } = await PostData(`https://bytrh.com/api/admin/consult`, { IDPage: page, ConsultStatus: selectedValue }, apiheader)
      setConsultList(data.Response.Consults)
      setPagesNumber(data.Response.Pages);
    } else if (selectedValue === "All") {
      consultList()
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    consultList(page)
  }, [page])

  useEffect(() => {
  }, [page, PagesNumber])

  return (

    <>
      <div className="app__Users ">
        <div className="app__Users-table">
          <div className="search-container  " style={{ display: 'flex', gap: '15px' }}>
            {isLoader ? <>
              <div className={`${isLang === 'ar' ? ' search__groupAr  ' : 'search__group'}  `}>

                <input type="text" placeholder="Search by client....." name="search" value={searchClient} onChange={handleInputChange} />
                <button type="submit" onClick={handleSearchClick} >
                  <Icons.Search color='#fff' size={25} />
                </button>
              </div>
            </> : SkeletonSearchsingel(40, "100%")}
            {isLoader ? <>
              <div className={`${isLang === 'ar' ? ' search__groupAr  ' : 'search__group'}  `}>

                <input type="text" placeholder="Search by doctor....." name="search" value={searchDoctor} onChange={handleInputChange1} />
                <button type="submit"  >
                  <Icons.Search color='#fff' size={25} onClick={handleSearchClick1} />
                </button>
              </div>
            </> : SkeletonSearchsingel(40, "100%")}
            <div>

            </div>
          </div>
          <div className="app__addOrder-form ">
            {isLoader ? <>
              <h5 style={{ marginBottom: '15px', color: '#4A4A4A' }}>Filter by consult status :	</h5>
            </> :
              <div style={{ marginBottom: '15px' }}>
                {SkeletonFilters(19, '25%')}
              </div>
            }
            <div className='filter__group__stats row ' style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
              <label className='col active d-flex justify-content-center align-item-center m-0 p-0'>
                {isLoader ? <>
                  {
                    selectedOption === "All" ?
                      <input
                        type="radio"
                        name="filter"
                        value="All"
                        checked
                        onChange={handleOptionChange}
                        className={`inactive-radio form-check-input `}
                      /> :
                      <input
                        type="radio"
                        name="filter"
                        value="All"
                        checked={selectedOption === "All"}
                        onChange={handleOptionChange}
                        className={`inactive-radio form-check-input `}
                      />
                  }

                  All
                </> : SkeletonFilters(10, 90)}
              </label>

              <label className='col active'>
                {isLoader ? <>
                  <input
                    type="radio"
                    name="filter"
                    value="ONGOING"
                    checked={selectedOption === "ONGOING"}
                    onChange={handleOptionChange}
                    className="active-radio form-check-input"
                  />
                  Ongoing
                </> : SkeletonFilters(10, 90)}
              </label  >
              <label className='col active'>
                {isLoader ? <>
                  <input
                    type="radio"
                    name="filter"
                    value="ENDED"
                    checked={selectedOption === "ENDED"}
                    onChange={handleOptionChange}
                    className="inactive-radio form-check-input"

                  />
                  Ended
                </> : SkeletonFilters(10, 90)}
              </label>
              <label className='col active'>
                {isLoader ? <>
                  <input
                    type="radio"
                    name="filter"
                    value="PENDING"
                    checked={selectedOption === "PENDING"}
                    onChange={handleOptionChange}
                    className="active-radio form-check-input"

                  />
                  Pending
                </> : SkeletonFilters(10, 90)}
              </label>
              <label className='col active'>
                {isLoader ? <>
                  <input
                    type="radio"
                    name="filter"
                    value="CANCELLED"
                    checked={selectedOption === "CANCELLED"}
                    onChange={handleOptionChange}
                    className="active-radio form-check-input"

                  />
                  Cancelled
                </> : SkeletonFilters(10, 90)}
              </label>
              <label className='col active'>
                {isLoader ? <>
                  <input
                    type="radio"
                    name="filter"
                    value="EXPIRED"
                    checked={selectedOption === "EXPIRED"}
                    onChange={handleOptionChange}
                    className="active-radio form-check-input"

                  />
                  Expired
                </> : SkeletonFilters(10, 90)}
              </label>

              <label className='col active'>
                {isLoader ? <>
                  <input
                    type="radio"
                    name="filter"
                    value="SKIPPED"
                    checked={selectedOption === "SKIPPED"}
                    onChange={handleOptionChange}
                    className="active-radio form-check-input"

                  />
                  Skipped
                </> : SkeletonFilters(10, 90)}
              </label>
              <label className='col active'>
                {isLoader ? <>
                  <input
                    type="radio"
                    name="filter"
                    value="REJECTED"
                    checked={selectedOption === "REJECTED"}
                    onChange={handleOptionChange}
                    className="active-radio form-check-input"

                  />
                  Rejected
                </> : SkeletonFilters(10, 90)}
              </label>
              <label className='col active'>
                {isLoader ? <>
                  <input
                    type="radio"
                    name="filter"
                    value="ACCEPTED"
                    checked={selectedOption === "ACCEPTED"}
                    onChange={handleOptionChange}
                    className="active-radio form-check-input"

                  />
                  Accepted
                </> : SkeletonFilters(10, 90)}
              </label>
              <label className='col active'>
                {isLoader ? <>
                  <input
                    type="radio"
                    name="filter"
                    value="NO_RESPONSE"
                    checked={selectedOption === "NO_RESPONSE"}
                    onChange={handleOptionChange}
                    className="active-radio form-check-input"

                  />
                  No Response
                </> : SkeletonFilters(10, 90)}
              </label>
            </div>
          </div>
          {isLoader ? <>
            <Table responsive={true}  >
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
                      <td className={`${item.ClientComplainBody === "" ? '' : 'bgComplain'}`}>
                        
                          {
                            item.ClientComplainBody === "" ?
                            <div className='d-flex flex-column justify-content-center align-content-center' style={{ gap: '0' }}>
                              <span className='ClientName'>{item?.ClientName}</span> 
                              <span className='ClientPhone'>{item?.ClientPhone}</span>
                            </div>:
                              <div className='d-flex flex-column justify-content-center align-content-center'  style={{ gap: '0' , cursor: 'pointer' }} onClick={() => handleModalOpen(index)}>
                                <span className='ClientName ' >{item?.ClientName}</span>
                                <span className='ClientPhone'>{item?.ClientPhone}</span>
                              </div>
                          }
                    
                      </td>
                      <Complain
                        Complain={item?.ClientComplainBody}
                        Name={item?.ClientName}
                        index={index}
                        handleModalClose={handleModalClose}
                        modalShow={modalShow}
                        user={"Client : "}
                        modalIndex={modalIndex} />

                      <td className={`${item.DoctorComplainBody === "" ? '' : 'bgComplain'}`}>
                        <div className='d-flex flex-column justify-content-center align-content-center' style={{ gap: '0' }}>
                          {
                            item.DoctorComplainBody === "" ?
                              <span className='ClientName'>{item?.DoctorName}</span> :
                              <span className='ClientName ' style={{ cursor: 'pointer' }} onClick={() => handleModalOpenDoc(index)}>{item?.DoctorName}</span>
                          }
                          <span className='ClientPhone'>{item?.DoctorPhone}</span>
                        </div>
                      </td>
                      <Complain
                        Complain={item?.DoctorComplainBody}
                        Name={item?.DoctorName}
                        index={index}
                        handleModalClose={handleModalCloseDoc}
                        modalShow={modalShowDoc}
                        user={"Dr."}
                        modalIndex={modalIndexDoc} />


                      <td className='text-center  d-flex '>
                        <div>
                          <span style={{ height: 'fit-content  !important' }} className={`
                                            ${item.ConsultType == 'NORMAL' && 'txt_delivered'} 
                                            ${item.ConsultType == 'URGENT' && 'txt_rejected'}
                                            ${item.ConsultType == 'Out For Delivery' && 'txt_delivery'}
                                            ${item.ConsultType == 'ACTIVE' && 'txt_delivered'}
                                            ${item.ConsultType == 'INACTIVE' && 'txt_rejected'}`} >

                            {item?.ConsultType.toLowerCase().charAt(0).toUpperCase() + item?.ConsultType.slice(1).toLowerCase()}

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
                                            ${item.ConsultStatus == 'ENDED' && 'txt_rejected'}
                                            ${item.ConsultStatus == 'EXPIRED' && 'txt_delivery'}
                                            ${item.ConsultStatus == 'CANCELLED' && 'txt_cancel'}
                                            ${item.ConsultStatus == 'NO_RESPONSE' && 'txt_shipped'} 
                                            ${item.ConsultStatus == 'SKIPPED' && 'txt__status'} 
                                            ${item.ConsultStatus == 'REJECTED' && 'txt_rejected'}
                                            ${item.ConsultStatus == 'ACCEPTED' && 'txt_delivery'}`} >


                            {

                              item?.ConsultStatus.toLowerCase().charAt(0).toUpperCase() + item?.ConsultStatus.slice(1).toLowerCase() === 'No_response' ? 'No Response' :
                                item?.ConsultStatus.toLowerCase().charAt(0).toUpperCase() + item?.ConsultStatus.slice(1).toLowerCase()
                            }

                          </span>
                        </div>
                      </td>
                      <td>


                        {
                          item.ConsultStatus == 'ONGOING'
                          &&

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
                                <Dropdown.Item eventKey="Edite" as={Link} to={`/chat/consult/details/${item.IDConsult}`} target="_blank">  Chat </Dropdown.Item>
                                {item.ConsultStatus !== 'ENDED' &&
                                  <Dropdown.Item eventKey="End" as={Link}> End Chat  </Dropdown.Item>
                                }
                              </DropdownButton>
                            </span>
                          </div>

                        }
                        {
                          item.ConsultStatus == 'ENDED'
                          &&

                          <div>
                            <span>
                              <Button variant="outline-primary" className="DropdownButton " title="Chat" eventKey="Edite" as={Link} to={`/consult/chat/${item.IDConsult}`} target="_blank">  Chat </Button>
                            </span>
                          </div>

                        }
                      </td>
                    </tr>
                  ))
                }

              </tbody>

            </Table>
          </> :
            SkeletonTable()
          }
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

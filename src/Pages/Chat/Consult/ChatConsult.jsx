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
  const [searchClient, setSearchClient] = useState('');
  const [searchDoctor, setSearchDoctot] = useState('');

  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;
  const handleChange = (event, value) => setPage(value);

  const consultList = async (page) => {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/consult`, { IDPage: page }, apiheader).then(({ data }) => {
      setPagesNumber(data.Response.Pages);
      setConsultList(data.Response.Consults);
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
    let { data } = await PostData(`https://bytrh.com/api/admin/consult`, { ClientSearchKey: searchValue }, apiheader)
    setConsultList(data.Response.Consults)
  }
  const searchByDoctor = async (searchValue1) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/consult`, { DoctorSearchKey: searchValue1 }, apiheader)
    setConsultList(data.Response.Consults)
  }
  // Filter
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    // filter your content based on the selected option 
    if (selectedValue === "ONGOING") {
      let { data } = await PostData(`https://bytrh.com/api/admin/consult`, { ConsultStatus: selectedValue }, apiheader)
      setConsultList(data.Response.Consults)
    } else if (selectedValue === "ENDED") {
      let { data } = await PostData(`https://bytrh.com/api/admin/consult`, { ConsultStatus: selectedValue }, apiheader)
      setConsultList(data.Response.Consults)
    } else if (selectedValue === "PENDING") {
      let { data } = await PostData(`https://bytrh.com/api/admin/consult`, { ConsultStatus: selectedValue }, apiheader)
      setConsultList(data.Response.Consults)
    } else if (selectedValue === "CANCELLED") {
      let { data } = await PostData(`https://bytrh.com/api/admin/consult`, { ConsultStatus: selectedValue }, apiheader)
      setConsultList(data.Response.Consults)
    } else if (selectedValue === "EXPIRED") {
      let { data } = await PostData(`https://bytrh.com/api/admin/consult`, { ConsultStatus: selectedValue }, apiheader)
      setConsultList(data.Response.Consults)
    } else if (selectedValue === "NO_RESPONSE") {
      let { data } = await PostData(`https://bytrh.com/api/admin/consult`, { ConsultStatus: selectedValue }, apiheader)
      setConsultList(data.Response.Consults)
    } else if (selectedValue === "SKIPPED") {
      let { data } = await PostData(`https://bytrh.com/api/admin/consult`, { ConsultStatus: selectedValue }, apiheader)
      setConsultList(data.Response.Consults)
    } else if (selectedValue === "REJECTED") {
      let { data } = await PostData(`https://bytrh.com/api/admin/consult`, { ConsultStatus: selectedValue }, apiheader)
      setConsultList(data.Response.Consults)
    } else if (selectedValue === "ACCEPTED") {
      let { data } = await PostData(`https://bytrh.com/api/admin/consult`, { ConsultStatus: selectedValue }, apiheader)
      setConsultList(data.Response.Consults)
    } else if (selectedValue === "All") {
      consultList()
    }
  };
  useEffect(() => {
    consultList(page)
  }, [page, PagesNumber])
  const [startDate, setStartDate] = useState(new Date("2022-01-01"));
  const [endDate, setEndDate] = useState(new Date("2022-12-31"));
  const [filteredData, setFilteredData] = useState([]);

  const myData = [
    { id: 1, date: "2022-02-01" },
    { id: 2, date: "2022-03-15" },
    { id: 3, date: "2022-05-10" },
    { id: 4, date: "2022-09-30" },
    { id: 5, date: "2022-12-10" },
  ];

  const handleFilter = () => {
    const filtered = myData.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
    setFilteredData(filtered);
  };
  return (
    <>
      <div className="app__Users ">
        <div className="app__Users-table">
          <div className="search-container " style={{ display: 'flex', gap: '15px' }}>
            <div className='search__group'>
              <input type="text" placeholder="Search by client....." name="search" value={searchClient} onChange={handleInputChange} />
              <button type="submit" onClick={handleSearchClick} >
                <Icons.Search color='#fff' size={25} />
              </button>
            </div>

            <div className='search__group'>
              <input type="text" placeholder="Search by doctor....." name="search" value={searchDoctor} onChange={handleInputChange1} />
              <button type="submit"  >
                <Icons.Search color='#fff' size={25} onClick={handleSearchClick1} />
              </button>
            </div>
            <div>

            </div>
          </div>
          <h5 style={{ marginBottom: '15px', color: '#4A4A4A' }}>Filter by consult status :	</h5>
          <div className='filter__group__stats  ' style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
            <label className='active'>
              <input
                type="radio"
                name="filter"
                value="ONGOING"
                checked={selectedOption === "ONGOING"}
                onChange={handleOptionChange}
                className="active-radio form-check-input"

              />
              Ongoing
            </label>
            <label>
              <input
                type="radio"
                name="filter"
                value="ENDED"
                checked={selectedOption === "ENDED"}
                onChange={handleOptionChange}
                className="inactive-radio form-check-input"

              />
              Ended
            </label>
            <label className='active'>
              <input
                type="radio"
                name="filter"
                value="PENDING"
                checked={selectedOption === "PENDING"}
                onChange={handleOptionChange}
                className="active-radio form-check-input"

              />
              Pending
            </label>
            <label className='active'>
              <input
                type="radio"
                name="filter"
                value="CANCELLED"
                checked={selectedOption === "CANCELLED"}
                onChange={handleOptionChange}
                className="active-radio form-check-input"

              />
              Cancelled
            </label>
            <label className='active'>
              <input
                type="radio"
                name="filter"
                value="EXPIRED"
                checked={selectedOption === "EXPIRED"}
                onChange={handleOptionChange}
                className="active-radio form-check-input"

              />
              Expired
            </label>
            <label className='active'>
              <input
                type="radio"
                name="filter"
                value="NO_RESPONSE"
                checked={selectedOption === "NO_RESPONSE"}
                onChange={handleOptionChange}
                className="active-radio form-check-input"

              />
              No Response
            </label>
            <label className='active'>
              <input
                type="radio"
                name="filter"
                value="SKIPPED"
                checked={selectedOption === "SKIPPED"}
                onChange={handleOptionChange}
                className="active-radio form-check-input"

              />
              Skipped
            </label>
            <label className='active'>
              <input
                type="radio"
                name="filter"
                value="REJECTED"
                checked={selectedOption === "REJECTED"}
                onChange={handleOptionChange}
                className="active-radio form-check-input"

              />
              Rejected
            </label>
            <label className='active'>
              <input
                type="radio"
                name="filter"
                value="ACCEPTED"
                checked={selectedOption === "ACCEPTED"}
                onChange={handleOptionChange}
                className="active-radio form-check-input"

              />
              Accepted
            </label>
            <label>
              <input
                type="radio"
                name="filter"
                value="All"
                checked={selectedOption === "All"}
                onChange={handleOptionChange}
                className="inactive-radio form-check-input"
              />
              All
            </label>
          </div>
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
                                          ${item.ConsultType == 'NORMAL' && 'txt_delivered'} 
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
                                          ${item.ConsultStatus == 'ENDED' && 'txt_rejected'}
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

                    {item.ConsultStatus == 'ONGOING'
                      &&
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
                              <Dropdown.Item eventKey="Edite" as={Link} to={`/chat/consult/details/${item.IDConsult}`}>  Chat </Dropdown.Item>

                              {item.ConsultStatus !== 'ENDED' &&

                                <Dropdown.Item eventKey="End" as={Link}  > End Chat  </Dropdown.Item>
                              }
                            </DropdownButton>
                          </span>
                        </div>
                      </td>
                    }
                    {item.ConsultStatus == 'ENDED'
                      &&
                      <td>
                        <div>

                          <span>
                            <DropdownButton title="Chat" eventKey="Edite" as={Link} to={`/chat/consult/details/${item.IDConsult}`}>  Chat </DropdownButton>
                          </span>
                        </div>
                      </td>
                    }
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

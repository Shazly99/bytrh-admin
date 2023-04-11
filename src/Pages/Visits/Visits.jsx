import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import React from 'react';
import { Button, Col, Dropdown, DropdownButton, Form, Row, Table } from "react-bootstrap";

import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import LogoSvg from '../../assets/svg/LogoSvg';
import { VendersContext } from '../../context/Store';
import { apiheader, PostData } from '../../utils/fetchData';
import useSkeletonTable from '../../utils/useSkeletonTable';
import icons from './../../constants/Icons';
import initialTranslation from './Translation';
import ExcelSheet from "./ExcelSheet";
const Visits = () => {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslation)
  const handelTranslate = () => setTranslate(initialTranslation)
  const [animal, setAnimal] = useState(null)
  const [isLoader, setIsloader] = useState(false);
  let { SkeletonTable, SkeletonFilters, SkeletonSearchsingel } = useSkeletonTable();
  // to fixed problem because Pagination count need a number 
  const [page, setPage] = React.useState(1);
  const [PagesNumber, setPagesNumber] = React.useState('')


  const handleChange = (event, value) => {
    setPage(value);
  };
  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;

  // get visits
  const visits = async () => {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/visits`, { IDPage: page }, apiheader).then(({ data }) => {
      setAnimal(data.Response.Visits)
      setPagesNumber(data.Response.Pages);
      const timeoutId = setTimeout(() => {
        setIsloader(true)
      }, 0);
      return () => clearTimeout(timeoutId);
    }).catch((error) => {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        setTimeout(() => {
          visits();
        }, (retryAfter || 60) * 1000);
      }
    })
  }


  const handleActionSelect = async (id, action) => {
    console.log(action);
    console.log(id);
    if (action === "PENDING" || action === "ACCEPTED" || action === "CANCELLED" || action === "REJECTED" || action === "ONGOING" || action === "ENDED") {
      await visitsStatus({ IDVisit: id, VisitStatus: action }).then((res) => {
        toast.success('Updated Successfully', {
          duration: 4000,
          position: 'bottom-center',
          iconTheme: {
            primary: '#3182CE',
            secondary: '#fff',
          },
        });
      })
      await visits()
    }
  };
  const visitsStatus = async (data) => {
    return await PostData(`${process.env.REACT_APP_API_URL}/admin/visits/status`, data, apiheader)
  }

  // search and filter 
  const [searchClient, setSearchClient] = useState('');
  const [searchDoctor, setSearchDoctot] = useState('');
  const handleSearchClick = () => searchGetClient(searchClient)
  const handleSearchClick1 = () => searchByDoctor(searchDoctor)

  const handleInputChange = (event) => {
    if (event.target.value === '') {
      visits(page)
    }
    setSearchClient(event.target.value);
  };
  const handleInputChange1 = (event) => {
    if (event.target.value === '') {
      visits(page)
    }
    setSearchDoctot(event.target.value);
  };

  const searchGetClient = async (searchValue) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/visits`, { IDPage: page, ClientSearchKey: searchValue }, apiheader)
    setAnimal(null)
    setAnimal(data.Response.Visits)
    setPagesNumber(data.Response.Pages);
  }
  const searchByDoctor = async (searchValue1) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/visits`, { IDPage: page, DoctorSearchKey: searchValue1 }, apiheader)
    setAnimal(data.Response.Visits)
    setPagesNumber(data.Response.Pages);

  }

  // Filter
  const [selectedOption, setSelectedOption] = useState('All');

  const handleOptionChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    // filter your content based on the selected option 
    if (selectedValue === "ONGOING" ||
      selectedValue === "REJECTED" ||
      selectedValue === "SKIPPED" ||
      selectedValue === "NO_RESPONSE" ||
      selectedValue === "EXPIRED" ||
      selectedValue === "ENDED" || selectedValue === "PENDING" || selectedValue === "CANCELLED") {
      let { data } = await PostData(`https://bytrh.com/api/admin/visits`, { IDPage: page, VisitStatus: selectedValue }, apiheader)
      setAnimal(data.Response.Visits)
      setPagesNumber(data.Response.Pages);
    }/*  else if (selectedValue === "All") {
      visits(page)
    } */
  };
  // !Filter by  Visit Type
  const visitTypeRef = useRef(null);
  const handelVisitType = async () => {
    let visitType = visitTypeRef.current.value
    if (visitType === 'All') {
      visits(page)
    } else if (visitType === 'Visit Type') {
      return false
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/visits`, { IDPage: page, VisitType: visitType }, apiheader).then((res) => {
        if (res.status === 200 && res.request.readyState === 4) {
          setAnimal(res.data.Response.Visits);
          setPagesNumber(res.data.Response.Pages);
        }
      })
    }
  }
  // !Filter by start date and end date
  let startDate = useRef();
  let endDate = useRef();
  const handelDate =async () => {
    console.log(startDate.current.value);
    console.log(endDate.current.value);
    await axios.post(`${process.env.REACT_APP_API_URL}/admin/visits`, { IDPage: page, StartDate: startDate.current.value,EndDate:endDate.current.value }, apiheader).then((res) => {
      if (res.status === 200 && res.request.readyState === 4) {
        setAnimal(res.data.Response.Visits);
        setPagesNumber(res.data.Response.Pages);
      }
    })
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    // visits(page)
  }, [page, PagesNumber])
  useEffect(() => {
    // window.scrollTo(0, 0);
    visits(page)
    handelTranslate()
  }, [])
  return (
    <>

      <div className="app__Users ">
        <div className="app__Users-table">
          <div className="search-container  " style={{ display: 'flex', gap: '15px' }}>
            {isLoader ? <>
              <div className={`${isLang === 'ar' ? ' search__groupAr  ' : 'search__group'}  `}>
                <input type="text" placeholder={translate[isLang].placeholder.client} name="search" value={searchClient} onChange={handleInputChange} />
                <button type="submit" onClick={handleSearchClick} >
                  <icons.Search color='#fff' size={25} />
                </button>
              </div>
            </> : SkeletonSearchsingel(40, "100%")}
            {isLoader ? <>
              <div className={`${isLang === 'ar' ? ' search__groupAr  ' : 'search__group'}  `}>
                <input type="text" placeholder={translate[isLang].placeholder.doc} name="search" value={searchDoctor} onChange={handleInputChange1} />
                <button type="submit"  >
                  <icons.Search color='#fff' size={25} onClick={handleSearchClick1} />
                </button>
              </div>
            </> : SkeletonSearchsingel(40, "100%")}
            <div>

            </div>
          </div>
          <div className="app__addOrder-form ">
            <Row className="mb-3">
              <Col xl={5} lg={5} md={6} sm={12} >
                <Form.Control type="date" ref={startDate} className="w-100" />
              </Col>

              <Col xl={5} lg={5} md={6} sm={12} >

                <Form.Control type="date" ref={endDate} className="w-100" />
              </Col>
              <Col xl={2} lg={2} md={6} sm={12} >
                <Button variant="outline-primary" onClick={handelDate} className="w-100">Find Date</Button>
              </Col>
            </Row>


            <div className='filter__group__stats row ' style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px' }}>
              {
                translate[isLang]?.FilterStatus?.map((item, index) => (
                  <React.Fragment key={index}>
                    {isLoader ? <>
                      <label className='col active d-flex justify-content-center align-item-center m-0 p-0 '  >
                        <input
                          type="radio"
                          name="filter"
                          value={item.value}
                          checked={selectedOption === item.value}
                          onChange={handleOptionChange}
                          className="active-radio form-check-input"
                        />
                        {item.text}
                      </label>
                    </> : SkeletonFilters(10, 90)}
                  </React.Fragment>
                ))
              }
              <Col xl={2} lg={2} md={6} sm={12} className='mt-2' >
                {isLoader ? <>
                  <Form.Group controlId="formBasicEmail"  >
                    {/* <Form.Label  >Product Type </Form.Label> */}
                    <Form.Select aria-label="Default select example" ref={visitTypeRef} onClick={handelVisitType} >
                      <option selected disabled hidden value={'Visit Type'} > {translate[isLang]?.Actions.vistType}</option>
                      {
                        translate[isLang]?.filterVisitType?.map((item, index) => (
                          <option key={index} value={item.value}  >{item.text}</option>
                        ))
                      }
                    </Form.Select>
                  </Form.Group>
                </> : SkeletonFilters()}
              </Col>
            </div>
          </div>
          <div className="app__Users-table">
            <ExcelSheet/>
            {isLoader ? <>
              <Table responsive={true} className='rounded-3 '>
                <thead>
                  <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                    {
                      translate[isLang]?.TableHeader?.map((item, index) => (
                        <th key={index}>{item}</th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody className='text-center'>
                  {
                    animal?.map((item, index) => (
                      <tr key={index}>
                        <td >
                          <div className='d-flex flex-column justify-content-center align-content-center' style={{ gap: '0' }}>
                            <span className='ClientName'>{item?.ClientName}</span>
                            <span className='ClientPhone'>{item?.ClientPhone}</span>
                          </div>
                        </td>

                        <td >
                          <div className='d-flex flex-column justify-content-center align-content-center' style={{ gap: '0' }}>
                            <span className='ClientName'>{item?.MedicalCenterName}</span>
                            <span className='ClientPhone'>{item?.MedicalCenterPhone}</span>
                          </div>
                        </td>

                        <td >
                          <div className='d-flex flex-column justify-content-center align-content-center' style={{ gap: '0' }}>
                            <span className='ClientName'>{item?.DoctorName}</span>
                            <span className='ClientPhone'>{item?.DoctorPhone}</span>
                          </div>
                        </td>

                        <td >
                          <div>
                            <h6 className="mb-0  pe-2 color-red">
                              {item?.VisitTotalPrice} {translate[isLang]?.Actions.currency}
                            </h6>
                          </div>
                        </td>

                        <td >
                          <div>
                            <span style={{ height: 'fit-content !important' }}  >
                              {item?.VisitType.charAt(0).toUpperCase() + item?.VisitType.slice(1).toLowerCase()}
                            </span>
                          </div>
                        </td>

                        <td className='text-center  d-flex '>
                          <div>
                            <span style={{ height: 'fit-content !important' }} className={`
                                            ${item.VisitStatus === 'PENDING' && 'txt_pending'} 
                                            ${item.VisitStatus === 'ONGOING' && 'txt_delivered'} 
                                            ${item.VisitStatus === 'ENDED' && 'txt_rejected'}
                                            ${item.VisitStatus === 'EXPIRED' && 'txt_delivery'}
                                            ${item.VisitStatus === 'CANCELLED' && 'txt_cancel'}
                                            ${item.VisitStatus === 'NO_RESPONSE' && 'txt_shipped'} 
                                            ${item.VisitStatus === 'SKIPPED' && 'txt__status'} 
                                            ${item.VisitStatus === 'REJECTED' && 'txt_rejected'}
                                            ${item.VisitStatus === 'ACCEPTED' && 'txt_delivery'}`} >


                              {
                                translate[isLang].FilterStatus?.filter((itemfilter) => itemfilter.value === item?.VisitStatus)
                                  .map((status, index) => (
                                    <React.Fragment key={index}>
                                      {item?.VisitStatus === status.value ? status.text : ''}
                                    </React.Fragment>
                                  ))
                              }
                            </span>
                          </div>
                        </td>
                        <td>
                          <div
                            className="d-flex flex-column justify-content-center align-content-center"
                            style={{ gap: "0" }}
                          >
                            <span className="ClientName">
                              {" "}
                              {item?.VisitStartTime.split(" ")[0]}{" "}
                            </span>
                            <span className="ClientPhone">
                              {" "}
                              {item?.VisitStartTime.split(" ")[1]}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>
                              <DropdownButton
                                id={`dropdown-${item.IDVisit}`}
                                title={translate[isLang]?.Actions.action}
                                variant="outline-success"
                                onSelect={(eventKey) => handleActionSelect(item.IDVisit, eventKey)}
                                className="DropdownButton "
                                drop={'down-centered'}
                              >


                                {
                                  translate[isLang].FilterStatus?.filter?.((item) => item.value !== "All").map((status, index) => (
                                    <React.Fragment key={index}>
                                      {item?.VisitStatus === status.value ? '' : <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey={status.value}>{status.text}</Dropdown.Item>}
                                    </React.Fragment>
                                  ))
                                }
                              </DropdownButton>
                            </span>
                          </div>
                        </td>

                        <td>
                          <div>
                            <Link
                              to={`/visits/details/${item?.IDVisit}`}
                            >
                              <LogoSvg.view className="logoSvg" style={{ width: 19 }} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  }

                </tbody>

              </Table>
              <div className="pagination " dir="ltr">
                <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
                  <Pagination count={pageCount} page={page} onChange={handleChange} />
                </Box>
              </div>
            </> :
              SkeletonTable()
            }
          </div>
        </div>

      </div>


    </>
  )
}

export default Visits
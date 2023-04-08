import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Dropdown, DropdownButton, Form, Row, Table } from "react-bootstrap";
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import img from "../../../assets/Img";
import Icons from '../../../constants/Icons';
import { VendersContext } from '../../../context/Store';
import useSkeletonTable from '../../../utils/useSkeletonTable';
import { apiheader, GetData, PostData } from './../../../utils/fetchData';
import Complain from './Complain';
import initialTranslation from "./Translation";
import { useRef } from "react";

const ChatConsult = () => {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslation)
  const handelTranslate = () => {
    setTranslate(initialTranslation)
  }
  const [consult, setConsultList] = useState(null)
  const [page, setPage] = useState(1);
  const [PagesNumber, setPagesNumber] = useState('')
  const [searchClient, setSearchClient] = useState('');
  const [searchDoctor, setSearchDoctot] = useState('');
  const [isLoader, setIsloader] = useState(false);
  let { SkeletonTable, SkeletonFilters, SkeletonSearchsingel } = useSkeletonTable();

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
      }, 0);
      return () => clearTimeout(timeoutId);

    });
  }
  const handleActionSelect = async (id, action) => {
    if (action === "End") {
      await GetData(`${process.env.REACT_APP_API_URL}/admin/consult/chat/end/${id}`, apiheader).then((res) => {
        toast.success(<strong>{translate[isLang].toast.endChat}</strong>, {
          duration: 4000,
          position: 'bottom-center',
          iconTheme: {
            primary: '#E20000',
            secondary: '#fff',
          },
        });
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
    if (selectedValue === "ONGOING" || 
      selectedValue === "REJECTED" ||
      selectedValue === "SKIPPED" ||
      selectedValue === "NO_RESPONSE" ||
      selectedValue === "EXPIRED" ||
      selectedValue === "ENDED" || selectedValue === "PENDING" || selectedValue === "CANCELLED") {
      let { data } = await PostData(`https://bytrh.com/api/admin/consult`, { IDPage: page, ConsultStatus: selectedValue }, apiheader)
      setConsultList(data.Response.Consults)
      setPagesNumber(data.Response.Pages);
    } else if (selectedValue === "All") {
      consultList()
    }
  };
  // !Filter by start date and end date
  let startDate = useRef();
  let endDate = useRef();
  const handelDate =async () => {
    console.log(startDate.current.value);
    console.log(endDate.current.value);
    await PostData(`${process.env.REACT_APP_API_URL}/admin/consult`, { IDPage: page, StartDate: startDate.current.value,EndDate:endDate.current.value }, apiheader).then((res) => {
      if (res.status === 200 && res.request.readyState === 4) {
        setConsultList(res.data.Response.Consults);
        setPagesNumber(res.data.Response.Pages);
      }
    })
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    consultList(page)
    handelTranslate()
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

                <input type="text" placeholder={translate[isLang].placeholder.client} name="search" value={searchClient} onChange={handleInputChange} />
                <button type="submit" onClick={handleSearchClick} >
                  <Icons.Search color='#fff' size={25} />
                </button>
              </div>
            </> : SkeletonSearchsingel(40, "100%")}
            {isLoader ? <>
              <div className={`${isLang === 'ar' ? ' search__groupAr  ' : 'search__group'}  `}>
                <input type="text" placeholder={translate[isLang].placeholder.doc} name="search" value={searchDoctor} onChange={handleInputChange1} />
                <button type="submit"  >
                  <Icons.Search color='#fff' size={25} onClick={handleSearchClick1} />
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
            <div className='filter__group__stats row ' style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
              {
                translate[isLang]?.FilterStatus?.filter?.((item) => item.value !== "All")?.map((item, index) => (
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

            </div>
          </div>
          {isLoader ? <>
            <Table responsive={true}  >
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
                  consult?.map((item, index) => (
                    <tr key={index}>
                      <td className={`${item.ClientComplainBody === "" ? '' : 'bgComplain'}`}>

                        {
                          item.ClientComplainBody === "" ?
                            <div className='d-flex flex-column justify-content-center align-content-center' style={{ gap: '0' }}>
                              <span className='ClientName'>{item?.ClientName}</span>
                              <span className='ClientPhone'>{item?.ClientPhone}</span>
                            </div> :
                            <div className='d-flex flex-column justify-content-center align-content-center' style={{ gap: '0', cursor: 'pointer' }} onClick={() => handleModalOpen(index)}>
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
                        user={translate[isLang].complain.userClient}
                        modalIndex={modalIndex}
                        isLang={isLang}
                        translate={translate[isLang].complain}
                      />

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
                        user={translate[isLang].complain.userDr}
                        modalIndex={modalIndexDoc}
                        isLang={isLang}
                        translate={translate[isLang].complain}
                      />
                      <td className='text-center  d-flex '>
                        <div>
                          <span style={{ height: 'fit-content  !important' }} className={`
                                            ${item.ConsultType === 'NORMAL' && 'txt_delivered'} 
                                            ${item.ConsultType === 'URGENT' && 'txt_rejected'}   `} >
                            {translate[isLang].ConsultType && translate[isLang].ConsultType.map((status, index) => (
                              <React.Fragment key={index}>
                                {item?.ConsultType === status.value && status.text}
                              </React.Fragment>
                            ))}
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
                                            ${item.ConsultStatus === 'PENDING' && 'txt_pending'} 
                                            ${item.ConsultStatus === 'ONGOING' && 'txt_delivered'} 
                                            ${item.ConsultStatus === 'ENDED' && 'txt_rejected'}
                                            ${item.ConsultStatus === 'EXPIRED' && 'txt_delivery'}
                                            ${item.ConsultStatus === 'CANCELLED' && 'txt_cancel'}
                                            ${item.ConsultStatus === 'NO_RESPONSE' && 'txt_shipped'} 
                                            ${item.ConsultStatus === 'SKIPPED' && 'txt__status'} 
                                            ${item.ConsultStatus === 'REJECTED' && 'txt_rejected'}
                                            ${item.ConsultStatus === 'ACCEPTED' && 'txt_delivery'}`} >
                            {translate[isLang].FilterStatus && translate[isLang].FilterStatus.map((status, index) => (
                              <React.Fragment key={index}>
                                {item?.ConsultStatus === status.value && status.text}
                              </React.Fragment>
                            ))}

                          </span>
                        </div>
                      </td>
                      <td>
                        {
                          item.ConsultStatus === 'ONGOING'
                            ?
                            <div>
                              <span>
                                <DropdownButton
                                  id={`dropdown-${item.IDConsult}`}
                                  title={translate[isLang].Actions.action}
                                  variant="outline-success"
                                  onSelect={(eventkey) => handleActionSelect(item.IDConsult, eventkey)}
                                  className="DropdownButton "
                                  drop={'down-centered'}
                                >
                                  <Dropdown.Item eventkey="Edite" as={Link} to={`/chat/consult/details/${item.IDConsult}`} target="_blank">  {translate[isLang].Actions.chat} </Dropdown.Item>
                                  {item.ConsultStatus !== 'ENDED' &&
                                    <Dropdown.Item eventkey="End" as={Link}> {translate[isLang].Actions.endChat} </Dropdown.Item>
                                  }
                                </DropdownButton>
                              </span>
                            </div>
                            :
                            item.ConsultStatus === 'ENDED' ?
                              <div>
                                <span>
                                  <Button variant=" outline-sucess" className="DropdownButton outline-sucess outline-sucessChat" title="Chat" eventkey="Edite" as={Link} to={`/consult/chat/${item.IDConsult}`} target="_blank">  {translate[isLang].Actions.chat} </Button>
                                </span>
                              </div> :
                              <div>
                                <span>
                                  <Button disabled variant="outline-sucessdDisabled" className=" DropdownButton outline-sucessdDisabled" title="Don't have a conversation" eventkey="Edite" as={Link} to={`/consult/chat/${item.IDConsult}`} target="_blank">
                                    <img src={img.inView} alt="inview" />
                                  </Button>
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
      <div className="pagination " dir="ltr">
        <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
          <Pagination count={pageCount} page={page} onChange={handleChange} />
        </Box>
      </div>
    </>

  )
}

export default ChatConsult

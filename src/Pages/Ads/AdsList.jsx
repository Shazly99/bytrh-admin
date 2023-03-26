import { Player } from "@lottiefiles/react-lottie-player";
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment/moment';
import React, {useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Dropdown, DropdownButton, Form, Row, Table } from "react-bootstrap";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Img from '../../assets/Img';
import Component from '../../constants/Component';
import Icons from '../../constants/Icons';
import { apiheader, GetData } from '../../utils/fetchData';
import useFetch from '../../utils/useFetch';
import useSkeletonTable from "../../utils/useSkeletonTable";
import Modal from 'react-bootstrap/Modal';
import { VendersContext } from "../../context/Store";
import translateADS from './translateAds';



const AdsList = () => {
  let { isLang } = useContext(VendersContext);


  const [ads, setAds] = useState(null)
  const [page, setPage] = useState(1);
  const [PagesNumber, setPagesNumber] = useState('')
  const [isLoader, setIsloader] = useState(false);
  let { SkeletonTableImg } = useSkeletonTable();
  const [modalIndexEdit, setModalIndexEdit] = React.useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState({});
  const advertisements = _.debounce(async () => {
    setIsLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/advertisements`, { IDPage: page }, apiheader).then((res) => {
        if (res.status === 200 && res.request.readyState === 4) {
          setAds(res.data.Response.Advertisements);
          setPagesNumber(res.data.Response.Pages);
          setIsLoading(false);
          const timeoutId = setTimeout(() => {
            setIsloader(true)
          }, 0);
          return () => clearTimeout(timeoutId);
        }
      })
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        setTimeout(() => {
          advertisements();
        }, (retryAfter || 30) * 1000);
      }
    }
    setIsLoading(false);
  }, 1000);

  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleActionSelect = async (id, index) => {
    setShowDeleteModal(true);
    setSelectedUserId(id);
    setModalIndexEdit(index);
  };
 
  const handleDeleteUser = async (id) => {
    // Logic for deleting user with ID `selectedUserId`
    setShowDeleteModal(false);
    await GetData(`${process.env.REACT_APP_API_URL}/admin/advertisements/status/${selectedUserId}`, apiheader).then((res) => {
      toast.success('The ads has been removed', {
        duration: 4000,
        position: 'top-center',
        icon: <Icons.Bin color='#E20000' size={20} />,
        iconTheme: {
          primary: '#0a0',
          secondary: '#fff',
        },
      });
    })
    await advertisements()
  }


  // !Filter By Start Date And End Date
  const [dateRange, setDateRange] = useState({ startDate: new Date(), endDate: new Date() });
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  function handleSelect(range) {
    setDateRange({ startDate: range.startDate, endDate: range.endDate });
  }

  async function handleApply(event, picker) {
    const start = picker.startDate.toDate().toLocaleDateString('en-US');
    const end = picker.endDate.toDate().toLocaleDateString('en-US');
    setStartDate(moment(start, 'M/D/YYYY').format('YYYY-MM-DD'))
    setEndDate(moment(end, 'M/D/YYYY').format('YYYY-MM-DD'))
    let date = {
      IDPage: page,
      StartDate: moment(start, 'M/D/YYYY').format('YYYY-MM-DD'),
      EndDate: moment(end, 'M/D/YYYY').format('YYYY-MM-DD')
    };
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/advertisements`, date, apiheader).then((res) => {
        if (res.status === 200 && res.request.readyState === 4) {
          setAds(res.data.Response.Advertisements);
          setPagesNumber(res.data.Response.Pages);
          setIsLoading(false);
        }
      })
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        setTimeout(() => {
          advertisements();
        }, (retryAfter || 30) * 1000);
      }
    }
  }

  // !Filter by city name 
  let { countries, cities, getCities } = useFetch()
  const countriesRef = useRef(null);
  const handelSelectCountry = (event) => {
    const selectedCountryId = event.target.value;
    getCities(selectedCountryId)
  }
  const handelSelectCity = async () => {
    let city = countriesRef.current.value
    if (city === 'cities') {
      advertisements()
    } else {

      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/advertisements`, { IDPage: page, IDCity: city }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setAds(res.data.Response.Advertisements);
            setPagesNumber(res.data.Response.Pages);
            setIsLoading(false);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            advertisements();
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }

  // !Filter by Advertisement Service 
  const adsService = useRef(null);

  const handelAdvertisementService = async () => {
    let adsSer = adsService.current.value
    if (adsSer === 'ads') {
      advertisements()
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/advertisements`, { IDPage: page, AdvertisementService: adsSer }, apiheader).then((res) => {
        if (res.status === 200 && res.request.readyState === 4) {
          setAds(res.data.Response.Advertisements);
          setPagesNumber(res.data.Response.Pages);
        }
      })
    }
  }


  // !Filter by Advertisement Location 
  const adsLocation = useRef(null);

  const handelAdvertisementLocation = async () => {
    let ads = adsLocation.current.value
    if (ads === 'ads') {
      advertisements()
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/advertisements`, { IDPage: page, AdvertisementLocation: ads }, apiheader).then((res) => {
        if (res.status === 200 && res.request.readyState === 4) {
          setAds(res.data.Response.Advertisements);
          setPagesNumber(res.data.Response.Pages);
        }
      })
    }
  }


  useEffect(() => {
    advertisements();
    window.scrollTo(0, 0);
  }, [page]);




  return (

    <>
      <div className="app__Users ">
        <Component.ButtonBase title={translateADS[isLang]?.addBTN} bg={"primary"} icon={<Icons.Add size={21} color={'#ffffffb4'} />} path="/ads/add" />
        <div className="app__Users-table">
          <div className="search-container">
          <div className={`${isLang === 'ar' ? ' search__groupAr  ' : 'search__group'}  `}>
              <div className=' app__addOrder-form'>
                <div className="d-flex flex-column row justify-content-between">
                  <h5 style={{ marginBottom: '15px', color: '#4A4A4A' }} className='col'>{translateADS[isLang]?.labelFilterDate}</h5>
                  <div className='d-flex flex-row justify-content-between'>
                    <DateRangePicker
                      ranges={[dateRange]}
                      onChange={handleSelect}
                      onApply={handleApply}
                    >
                      <Button variant="outline-primary">{translateADS[isLang]?.buttonSelectDate}</Button>
                    </DateRangePicker>
                    {startDate && <p> <strong>{translateADS[isLang]?.startDate}</strong>{startDate} </p>}
                    {endDate && <p> <strong>{translateADS[isLang]?.endDate}</strong>{endDate} </p>}
                  </div>

                </div>
                <h5 style={{ marginTop: '15px', color: '#4A4A4A' }} className='col'>{translateADS[isLang]?.textFilterInputs}</h5>
                <Row className='d-flex flex-row justify-content-between'>
                  <Col className='w-100'>
                    <Form.Group controlId="formBasicEmail" onClick={handelSelectCountry}>
                      <Form.Label>{translateADS[isLang]?.labelCountry}</Form.Label>
                      <Form.Select aria-label="Default select example" >
                        <option>{translateADS[isLang]?.optionCountry}</option>
                        {
                          countries?.map((item, index) => (
                            <option key={index} value={item?.IDCountry}  >{item?.CountryName}</option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col className='w-100'>
                    <Form.Group controlId="formBasicEmail"   >
                      <Form.Label>{translateADS[isLang]?.labelCity}</Form.Label>
                      <Form.Select aria-label="Default select example" onClick={handelSelectCity} ref={countriesRef}>
                        <option>{translateADS[isLang]?.optionCity}</option>
                        {
                          cities?.map((item, index) => (
                            <option key={index} value={item?.IDCity}>{item?.CityName}</option>
                          ))
                        }
                      </Form.Select>

                    </Form.Group>
                  </Col>
                  <Col className='w-100'>
                    <Form.Group controlId="formBasicEmail"  >
                      <Form.Label  >{translateADS[isLang]?.labelAdvertisementLocation}</Form.Label>
                      <Form.Select aria-label="Default select example" ref={adsLocation} onClick={handelAdvertisementLocation} >
                        <option>{translateADS[isLang]?.optionAdvertisementLocation}</option>
                        {
                          ['HOME', 'PAGES', 'INNER_PAGES']?.map((item, index) => (
                            <option key={index} value={item}  >{item.charAt(0).toUpperCase() + item.slice(1).toLowerCase().replace('_', " ")}</option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col className='w-100'>
                    <Form.Group controlId="formBasicEmail"   >
                      <Form.Label  >{translateADS[isLang]?.labelAdvertisementService}</Form.Label>
                      <Form.Select aria-label="Default select example" ref={adsService} onClick={handelAdvertisementService} >
                        <option>{translateADS[isLang]?.optionAdvertisementService}</option>
                        {
                          ['NONE', 'URGENT_CONSULT', 'CONSULT', 'DOCTOR_BLOG', 'CLIENT_BLOG', 'ADOPTION']?.map((item, index) => (
                            <option key={index} value={item}>{item.charAt(0).toUpperCase() + item.slice(1).toLowerCase().replace('_', " ")}</option>
                          ))
                        }
                        {/* <option value="0">InActive</option> */}
                      </Form.Select>

                    </Form.Group>
                  </Col>

                </Row>

              </div>
            </div>
          </div>

          {isLoader ? <>
            <Table responsive={true} className='rounded-3 '>
              <thead>
                <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                  {translateADS[isLang]?.TableHeader?.map((el , i) => (
                      <th key={i}>{el}</th>
                  ))}
                </tr>
              </thead>

              <tbody className='text-center'>
                {
                  ads?.map((item, index) => (
                    <tr key={index}>
                      <td className='img'>
                        {
                          item?.AdvertisementImage ?
                            <img
                              loading="lazy"
                              src={item.AdvertisementImage} // use normal <img> attributes as props
                              className="w-100 rounded-2"
                              style={{maxHeight: '200px'}}
                            /> :

                            <img

                              loading="lazy"
                              src={Img.defaultImg} // use normal <img> attributes as props
                              className="w-100 rounded-2"
                              style={{maxHeight: '200px'}}
                            />

                        }
                        {/* <img src={item.AdvertisementImage} alt='example' className='w-100 rounded-2' /> */}
                      </td>
                      <td >
                        <div>
                          {item?.AdvertisementService.charAt(0).toUpperCase() + item?.AdvertisementService.slice(1).toLowerCase()}
                        </div>
                      </td>
                      <td >
                        <div>
                          {item?.AdvertisementStartDate?.split(" ")[0]}
                        </div>
                      </td>
                      <td >
                        <div>
                          {item?.AdvertisementEndDate?.split(" ")[0]}
                        </div>
                      </td>
                      <td >
                        <div>
                          {item?.AdvertisementLocation.charAt(0).toUpperCase() + item?.AdvertisementLocation.slice(1).toLowerCase()}
                        </div>
                      </td>



                      <td>
                        <div>
                          <span>
                            <DropdownButton
                              id={`dropdown-${item.IDAdvertisement}`}
                              title={translateADS[isLang]?.ActionsLabel}
                              variant="outline-success"
                              onSelect={(eventKey) => handleActionSelect(item.IDAdvertisement, index)}
                              className="DropdownButton "
                              drop={'down-centered'}
                            >
                              <Dropdown.Item eventKey="Edite" as={Link} to={`/ads/edit/${item.IDAdvertisement}`}>
                                {isLang === 'ar' ? 'تعديــل' : 'Edit'}
                              </Dropdown.Item>

                              <Dropdown.Item eventKey="DELETE"   >
                                {isLang === 'ar' ? 'حـذف' : 'Delete'}
                              </Dropdown.Item>


                              <Modal show={showDeleteModal && modalIndexEdit === index} onHide={() => setShowDeleteModal(false)} centered dir={isLang === 'ar' ? 'rtl' : 'ltr'}>
                                <Modal.Header closeButton>
                                  <Modal.Title>{translateADS[isLang]?.headerModalDel}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body> 
                                  <Component.HandelDelete/>
                                </Modal.Body>
                                <Modal.Footer className='  d-flex justify-content-center'>
                                  <Button variant="danger" style={{ border: '#dc3545' }} onClick={() => handleDeleteUser(item.IDUser)}>
                                    {translateADS[isLang]?.btnModalDel}                                  </Button>
                                  <Button variant="outline-primary" onClick={() => setShowDeleteModal(false)}>
                                    {translateADS[isLang]?.CancelBTN}
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </DropdownButton>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                }

              </tbody>

            </Table>
          </> : SkeletonTableImg()}

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

export default AdsList
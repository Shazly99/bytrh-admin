import { Pagination, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import axios from 'axios';
import _ from 'lodash';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Dropdown, DropdownButton, Form, Row, Table } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Img from '../../assets/Img';
import Component from '../../constants/Component';
import Icons from '../../constants/Icons';
import { VendersContext } from "../../context/Store";
import { GetData, apiheader } from '../../utils/fetchData';
import useFetch from '../../utils/useFetch';
import useSkeletonTable from "../../utils/useSkeletonTable";
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
  let startDate = useRef();
  let endDate = useRef();
  const handelDate = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/admin/advertisements`, { IDPage: page, StartDate: startDate.current.value, EndDate: endDate.current.value }, apiheader).then((res) => {
      if (res.status === 200 && res.request.readyState === 4) {
        setAds(res.data.Response.Advertisements);
        setPagesNumber(res.data.Response.Pages);
        setIsLoading(false);
      }
    })
  }


  // !Filter by city and country and area  
  let { countries, areas, cities, getCities, getAreas } = useFetch()
  const cityRef = useRef(null);
  const countryRef = useRef(null);
  const areaRef = useRef(null);
  const handelSelectCountry = async (event) => {
    // countryRef.current.value = 'Select Country';
    cityRef.current.value = 'Select city';
    areaRef.current.value = 'Select Area';
    adsService.current.value = 'choose a service';
    adsLocation.current.value = 'choose a location';

    const selectedCountryId = event.target.value;

    if (selectedCountryId === 'country') {
      advertisements(page)
    } else if (selectedCountryId === 'Select Country') {
      return false
    } else {
      getCities(selectedCountryId)
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/advertisements`, { IDPage: page, IDCountry: selectedCountryId }, apiheader).then((res) => {
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
  const handelSelectCity = async () => {
    // countryRef.current.value = 'Select Country';
    // cityRef.current.value = 'Select city';
    areaRef.current.value = 'Select Area';
    adsService.current.value = 'choose a service';
    adsLocation.current.value = 'choose a location';

    let city = cityRef.current.value
    if (city === 'cities') {
      advertisements(page)
    } else if (city === 'Select city') {
      return false
    } else {
      getAreas(city)
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
            advertisements(page);
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }
  const handelSelectArea = async () => {
    // countryRef.current.value = 'Select Country';
    // cityRef.current.value = 'Select city';
    // areaRef.current.value = 'Select Area';
    adsService.current.value = 'choose a service';
    adsLocation.current.value = 'choose a location';

    let city = areaRef.current.value
    if (city === 'Areas') {
      advertisements(page)
    } else if (city === 'Select Area') {
      return false
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/advertisements`, { IDPage: page, IDArea: city }, apiheader).then((res) => {
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
            advertisements(page);
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }

  // !Filter by Advertisement Service 
  const adsService = useRef(null);
  const handelAdvertisementService = async () => {
    countryRef.current.value = 'Select Country';
    cityRef.current.value = 'Select city';
    areaRef.current.value = 'Select Area';
    // adsService.current.value = 'choose a service';
    adsLocation.current.value = 'choose a location';
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
    countryRef.current.value = 'Select Country';
    cityRef.current.value = 'Select city';
    areaRef.current.value = 'Select Area';
    adsService.current.value = 'choose a service';
    // adsLocation.current.value = 'choose a location';
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
  }, [page, isLang]);


  const SkeletonFilter = () => {
    return (
      <div className="d-flex flex-column  gap-2 mt-2">
        <Skeleton variant='rounded' animation='wave' height={15} width={'60%'} />
        <Skeleton variant='rounded' animation='wave' height={26} width={'100%'} />
      </div>
    )
  }

  return (

    <>
      <div className="app__Users ">
        <div className="app__Users-table">
          {/* {isLoader ? <> */}
            <Component.ButtonBase title={translateADS[isLang]?.addBTN} bg={"primary"} icon={<Icons.Add size={21} color={'#ffffffb4'} />} path="/ads/add" />
   {/*        </> : <Skeleton variant='rounded' animation='pulse' height={50} width={150} />
          } */}
          <div className="search-container">
            <div className={`${isLang === 'ar' ? ' search__groupAr  w-100' : 'search__group w-100  '}  `}>
              <div className=' app__addOrder-form'>
                <div className="d-flex flex-column row justify-content-between">
                  <Row className="mb-3">
                    <Col xl={5} lg={5} md={6} sm={12} >
                      {isLoader ? <>
                        <Form.Control size="sm" type="date" ref={startDate} className="w-100 mt-2" />
                      </> : <Skeleton variant='rounded' animation='wave' height={26} width={'100%'} />
                      }
                    </Col>

                    <Col xl={5} lg={5} md={6} sm={12} >
                      {isLoader ? <>
                        <Form.Control size="sm" type="date" ref={endDate} className="w-100 mt-2" />
                      </> : <Skeleton variant='rounded' animation='wave' height={26} width={'100%'} />
                      }
                    </Col>

                    <Col xl={2} lg={2} md={6} sm={12} >
                      {isLoader ? <>
                        <Button size="sm" variant="outline-primary" onClick={handelDate} className="w-100 mt-2">{isLang === 'en' ? 'Search by date':'ابحث بالتاريخ'}</Button>
                      </> : <Skeleton variant='rounded' animation='wave' height={26} width={'100%'} />
                      }
                    </Col>
                  </Row>

                </div>
                <div className="d-flex flex-column row justify-content-between">

                  <Row className="mb-3 d-flex justify-content-between" >

                    <Col xl={2} lg={2} md={6} sm={12} className='mt-2' >
                      {isLoader ? <>
                        <Form.Group controlId="formBasicEmail" >
                          <Form.Select aria-label="Default select example" size="sm" onChange={handelSelectCountry} ref={countryRef} >
                            <option selected disabled hidden value={'Select Country'}>{translateADS[isLang]?.filter?.Country}  </option>
                            <option value={'country'} >{translateADS[isLang]?.filter?.allCountry}</option>
                            {
                              countries?.map((item, index) => (
                                <option key={index} value={item?.IDCountry}  >{item?.CountryName}</option>
                              ))
                            }
                          </Form.Select>
                        </Form.Group>
                      </> : SkeletonFilter()}
                    </Col>

                    <Col xl={2} lg={2} md={6} sm={12} className='mt-2'>
                      {isLoader ? <>
                        <Form.Group controlId="formBasicEmail"   >
                          <Form.Select aria-label="Default select example" size="sm" onChange={handelSelectCity} ref={cityRef}>
                            <option selected disabled hidden value={'Select city'}> {translateADS[isLang]?.filter?.city}  </option>
                            <option value={'cities'} >{translateADS[isLang]?.filter?.allCity}</option>
                            {
                              cities?.map((item, index) => (
                                <option key={index} value={item?.IDCity}>{item?.CityName}</option>
                              ))
                            }
                          </Form.Select>
                        </Form.Group>
                      </> : SkeletonFilter()}
                    </Col>

                    <Col xl={2} lg={2} md={6} sm={12} className='mt-2'>
                      {isLoader ? <>
                        <Form.Group controlId="formBasicEmail"   >
                          <Form.Select aria-label="Default select example" size="sm" onChange={handelSelectArea} ref={areaRef}>
                            <option selected disabled hidden value={'Select Area'}>  {translateADS[isLang]?.filter?.area}  </option>
                            <option value={'Areas'} > {translateADS[isLang]?.filter?.allarea} </option>
                            {
                              areas?.map((item, index) => (
                                <option key={index} value={item?.IDArea}>{item?.AreaName}</option>
                              ))
                            }
                          </Form.Select>
                        </Form.Group>
                      </> : SkeletonFilter()}
                    </Col>
                    <Col xl={2} lg={2} md={6} sm={12} className='  mt-2'>
                      {isLoader ? <>
                        <Form.Group controlId="formBasicEmail"  >

                          <Form.Select aria-label="Default select example" ref={adsLocation} size="sm" onChange={handelAdvertisementLocation} >
                            <option>{translateADS[isLang]?.optionAdvertisementLocation}</option>
                            {
                              translateADS[isLang]?.adsLocation?.map((item, index) => (
                                <option key={index} value={item.value}  >{item.text}</option>
                              ))
                            }
                          </Form.Select>
                        </Form.Group>
                      </> : SkeletonFilter()}
                    </Col>
                    <Col xl={2} lg={2} md={6} sm={12} className='  mt-2'>
                      {isLoader ? <>
                        <Form.Group controlId="formBasicEmail"   >
                          <Form.Select aria-label="Default select example" ref={adsService} size="sm" onChange={handelAdvertisementService} >
                            <option>{translateADS[isLang]?.optionAdvertisementService}</option>
                            {
                              translateADS[isLang]?.adsService?.map((item, index) => (
                                <option key={index} value={item.value}>{item.text}</option>
                              ))
                            }
                            {/* <option value="0">InActive</option> */}
                          </Form.Select>

                        </Form.Group>
                      </> : SkeletonFilter()}
                    </Col>

                  </Row>
                </div>

              </div>
            </div>
          </div>

          {isLoader ? <>
            <>
              {
                ads?.length > 0 ?
                  <Table responsive={true} className='rounded-3 '>
                    <thead>
                      <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                        {translateADS[isLang]?.TableHeader?.map((el, i) => (
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
                                    className=" rounded-2"
                                    width={'250px'}
                                    height={'150px'}
                                  /> :

                                  <img

                                    loading="lazy"
                                    src={Img.defaultImg} // use normal <img> attributes as props
                                    className=" rounded-2"
                                    width={'250px'}
                                    height={'150px'} />

                              }
                              {/* <img src={item.AdvertisementImage} alt='example' className='w-100 rounded-2' /> */}
                            </td>
                            <td >
                              <div>
                                {item?.AdvertisementService.charAt(0).toUpperCase() + item?.AdvertisementService.slice(1).toLowerCase().replace('_', " ")}

                              </div>
                            </td>
                            <td >
                              <div className="d-flex flex-column justify-content-center align-content-center" style={{ gap: "0" }}  >
                                <span className="ClientName">  {" "}    {item?.AdvertisementStartDate.split(" ")[0]}{" "}   </span>
                                <span className="ClientPhone">  {" "} {item?.AdvertisementStartDate.split(" ")[1]}  </span>
                              </div>
                            </td>
                            <td >
                              <div className="d-flex flex-column justify-content-center align-content-center" style={{ gap: "0" }}  >
                                <span className="ClientName">  {" "}    {item?.AdvertisementEndDate.split(" ")[0]}{" "}   </span>
                                <span className="ClientPhone">  {" "} {item?.AdvertisementEndDate.split(" ")[1]}  </span>
                              </div>
                            </td>
                            <td >
                              <div>
                                {item?.AdvertisementLocation.charAt(0).toUpperCase() + item?.AdvertisementLocation.slice(1).toLowerCase().replace('_', " ")}
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
                                        <Component.HandelDelete />
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
                  :
                  <Component.DataNotFound />
              }
            </>
          </> : SkeletonTableImg()}

        </div>

      </div>
      <div className="pagination " dir="ltr">
        {
          pageCount &&
          <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
            <Pagination count={pageCount} page={page} onChange={handleChange} />
          </Box>
        }
      </div>
    </>


  )
}

export default AdsList
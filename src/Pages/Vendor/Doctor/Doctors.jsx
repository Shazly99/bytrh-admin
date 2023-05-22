import { Pagination, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import axios from 'axios';
import $ from 'jquery';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Form, Row, Table, Container } from "react-bootstrap";
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import { VendersContext } from '../../../context/Store';
import { apiheader } from '../../../utils/fetchData';
import './Doctor.scss';
import ExcelSheet from './ExcelSheet';
import ItemDoctor from './ItemDoctor';
import useFetch from "../../../utils/useFetch";
import initialTranslation from "./Translation";


export default function Doctors() {

  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslation)
  const handelTranslate = () => {
    setTranslate(initialTranslation)
  }


  const URL_Doctors = `https://bytrh.com/api/admin/doctors`;

  const [pagesCountDoctors, setPagesCountDoctors] = useState(0);
  const [countDoctors, setCountDoctors] = useState(1);
  const [searchKeyDoctors, setSearchKeyDoctors] = useState(null);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [fetchDoctors, setFetchDoctors] = useState([]);

  async function getTokenDoctors() {
    setLoadingDoctors(true);
    await axios.post(URL_Doctors, {
      IDPage: countDoctors,
      // SearchKey: searchKeyDoctors
    }, apiheader)
      .then(res => {
        setFetchDoctors(res.data.Response.Doctors);
        setPagesCountDoctors(res.data.Response.Pages);
        setLoadingDoctors(false);
      })
      .catch((error) => {
      });
  }
  useEffect(() => {
    let timeOut = setTimeout(() => {
      getTokenDoctors();
      handelTranslate();
      $('html , body').animate({ scrollTop: 0 }, 100);
    }, 100);

    return (() => {
      clearTimeout(timeOut);
    })
  }, [pagesCountDoctors, countDoctors, isLang]);


  // useEffect(() => {
  //   if(loadingDoctors) {
  //     $('body').addClass('d-none');
  //     $('body').removeClass('d-block')
  //   }
  //   else {
  //     $('body').addClass('d-block');
  //     $('body').removeClass('d-none')
  //   }
  // }, [loadingDoctors]);


  const handleChange = (value) => {
    setCountDoctors(value);
  };

  // const [valueSearch, setValueSearch] = useState('')

  const handelSearch = () => {
    // setSearchKeyDoctors(valueSearch);
    setCountDoctors(1);
    setTimeout(() => {
      handelSearchEvent()
    }, 100);
  }

  const handelClickSearch = (e) => {
    if (e.keyCode === 13) {
      handelSearch();
    }
  }


  // filter
  const [selectedOption, setSelectedOption] = useState('All');

  const handleOptionChange = async (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);

    // filter your content based on the selected option 
    if (selectedValue === "ACTIVE" || selectedValue === "INACTIVE" || selectedValue === "BLOCKED" || selectedValue === "OFFLINE") {
      // setLoadingDoctors(true);
      await axios.post(URL_Doctors, {
        // IDPage: countDoctors,
        // SearchKey: searchKeyDoctors,
        DoctorStatus: selectedValue,
      }, apiheader)
        .then(res => {
          setFetchDoctors(res.data.Response.Doctors);
          setPagesCountDoctors(res.data.Response.Pages);
          // setLoadingDoctors(false);
        })
        .catch((error) => {
        });
    } else if (selectedValue === "All") {
      // setLoadingDoctors(true);
      await axios.post(URL_Doctors, {
        IDPage: countDoctors,
        // SearchKey: searchKeyDoctors
      }, apiheader)
        .then(res => {
          setFetchDoctors(res.data.Response.Doctors);
          setPagesCountDoctors(res.data.Response.Pages);
          // setLoadingDoctors(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  const handelSearchEvent = async () => {
    if (searchKeyDoctors === '' && selectedOption === 'All') {
      // setLoadingDoctors(true);
      await axios.post(URL_Doctors, {
        IDPage: countDoctors,
        // SearchKey: searchKeyDoctors
      }, apiheader)
        .then(res => {
          setFetchDoctors(res.data.Response.Doctors);
          setPagesCountDoctors(res.data.Response.Pages);
          // setLoadingDoctors(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      // setCountDoctors(1);
      // setLoadingDoctors(true);
      await axios.post(URL_Doctors, {
        IDPage: 1,
        SearchKey: searchKeyDoctors !== null && searchKeyDoctors !== undefined ? searchKeyDoctors : null,
        DoctorStatus: selectedOption !== "All" ? selectedOption : null,
      }, apiheader)
        .then(res => {
          setFetchDoctors(res.data.Response.Doctors);
          setPagesCountDoctors(res.data.Response.Pages);
          // setLoadingDoctors(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // useEffect(() => {
  //   let timeOut = setTimeout(() => {
  //     handelSearchEvent();
  //   }, 100);
  //   return(() => {
  //     clearTimeout(timeOut);
  //   })
  // }, [searchKeyDoctors , selectedOption]);



  const SkeletonFilter = () => {
    return (
      <div className="d-flex flex-column  gap-2 mt-2">
        <Skeleton variant='rounded' animation='wave' height={15} width={'60%'} />
        <Skeleton variant='rounded' animation='wave' height={26} width={'100%'} />
      </div>
    )
  }

  const SkeletonSearch = (w, h) => {
    return (
      <div className="d-flex gap-2">
        <Skeleton variant='rounded' animation='wave' height={w} width={h} />
      </div>
    )
  }



  // !Filter by city and country and area  
  let { countries, areas, cities, getCities, getAreas } = useFetch()
  const cityRef = useRef(null);
  const countryRef = useRef(null);
  const areaRef = useRef(null);
  const handelSelectCountry = async (event) => {
    cityRef.current.value = 'Select city';
    areaRef.current.value = 'Select Area';
    const selectedCountryId = event.target.value;
    if (selectedCountryId === 'country') {
      getTokenDoctors()
    } else if (selectedCountryId === 'Select Country') {
      return false
    } else {
      getCities(selectedCountryId)
      try {
        await axios.post(URL_Doctors, { IDPage: countDoctors, IDCountry: selectedCountryId }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setFetchDoctors(res.data.Response.Doctors);
            setPagesCountDoctors(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            getTokenDoctors();
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }

  const handelSelectCity = async () => {
    areaRef.current.value = 'Select Area';
    let city = cityRef.current.value
    if (city === 'cities') {
      getTokenDoctors()
    } else if (city === 'Select city') {
      return true
    } else {
      getAreas(city)
      try {
        await axios.post(URL_Doctors, { IDPage: countDoctors, IDCity: city }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setFetchDoctors(res.data.Response.Doctors);
            setPagesCountDoctors(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            getTokenDoctors();
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }

  const handelSelectArea = async () => {
    let city = areaRef.current.value
    if (city === 'Areas') {
      getTokenDoctors()
    } else if (city === 'Select Area') {
      return false
    } else {
      try {
        await axios.post(URL_Doctors, { IDPage: countDoctors, IDArea: city }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setFetchDoctors(res.data.Response.Doctors);
            setPagesCountDoctors(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            getTokenDoctors();
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }






  return (
    <>

      <Container fluid>
        <section className='app__doctor  position-relative'>
          <div className="app__Users ">
            <Component.ButtonBase title={isLang === 'ar' ? 'إضـافة' : 'Add'} bg={"primary"} icon={<Icons.Add size={21} color={'#ffffffb4'} />} path="/doctors/addDoctor" />
          </div>

          {loadingDoctors ?
            SkeletonSearch(40, "60%")
            :
            <div className="search-container">
              <div className={`${isLang === 'ar' ? ' search__groupAr  ' : 'search__group'}`}>
                {/* <div className='search__group'> */}
                <input
                  value={localStorage.getItem('searchDoctors') ? localStorage.getItem('searchDoctors') : ''}
                  onChange={(e) => {
                    localStorage.setItem('searchDoctors', e.target.value);
                    // setValueSearch(e.target.value);
                    setSearchKeyDoctors(e.target.value);
                  }}
                  onKeyDown={handelClickSearch}
                  type="text" placeholder={isLang === 'ar' ? 'البحث بالإسم أو رقم التليفون..' : 'Search by name or phone..'} name="search"
                />
                <button type="submit" onClick={() => {
                  // localStorage.removeItem('searchDoctors');
                  localStorage.setItem('searchDoctors', searchKeyDoctors);
                }}>
                  <Icons.Search onClick={handelSearch} color='#fff' size={25} />
                </button>
              </div>

              <div className='filter__group'>
                <label>
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
                  {isLang === 'ar' ? 'الكـل' : 'All'}
                </label>

                <label className='active'>
                  <input
                    type="radio"
                    name="filter"
                    value="ACTIVE"
                    checked={selectedOption === "ACTIVE"}
                    onChange={handleOptionChange}
                    className="active-radio form-check-input"
                  />
                  {isLang === 'ar' ? 'نشط' : 'Active'}
                </label>

                <label style={{ whiteSpace: 'nowrap' }}>
                  <input
                    type="radio"
                    name="filter"
                    value="INACTIVE"
                    checked={selectedOption === "INACTIVE"}
                    onChange={handleOptionChange}
                    className="inactive-radio form-check-input"
                  />
                  {isLang === 'ar' ? 'غير نشط' : 'InActive'}
                </label>

                <label>
                  <input
                    type="radio"
                    name="filter"
                    value="BLOCKED"
                    checked={selectedOption === "BLOCKED"}
                    onChange={handleOptionChange}
                    className="inactive-radio form-check-input"
                  />
                  {isLang === 'ar' ? 'محظور' : 'Blocked'}
                </label>

                <label>
                  <input
                    type="radio"
                    name="filter"
                    value="OFFLINE"
                    checked={selectedOption === "OFFLINE"}
                    onChange={handleOptionChange}
                    className="inactive-radio form-check-input"
                  />
                  {isLang === 'ar' ? 'مغلق' : 'Offline'}
                </label>
              </div>
            </div>
          }


          <div className=' app__addOrder-form '>
            <Row className='d-flex flex-row justify-content-between'>
              <Col xl={4} lg={4} md={6} sm={12} className='mt-2' >
                {!loadingDoctors ? <>
                  <Form.Group controlId="formBasicEmail" onChange={handelSelectCountry} ref={countryRef}>
                    <Form.Select size="sm" aria-label="Default select example" >
                      <option selected disabled hidden value={'Select Country'}>{translate[isLang]?.filter?.Country}  </option>
                      <option value={'country'} >{translate[isLang]?.filter?.allCountry}</option>

                      {
                        countries?.map((item, index) => (
                          <option key={index} value={item?.IDCountry}  >{item?.CountryName}</option>
                        ))
                      }
                    </Form.Select>
                  </Form.Group>
                </> : SkeletonFilter()}
              </Col>

              <Col xl={4} lg={4} md={6} sm={12} className='mt-2'>
                {!loadingDoctors ? <>
                  <Form.Group controlId="formBasicEmail"   >
                    <Form.Select size="sm" aria-label="Default select example" onChange={handelSelectCity} ref={cityRef}>
                      <option selected disabled hidden value={'Select city'}> {translate[isLang]?.filter?.city}  </option>

                      <option value={'cities'} >{translate[isLang]?.filter?.allCity}</option>

                      {
                        cities?.map((item, index) => (
                          <option key={index} value={item?.IDCity}>{item?.CityName}</option>
                        ))
                      }
                    </Form.Select>

                  </Form.Group>
                </> : SkeletonFilter()}
              </Col>

              <Col xl={4} lg={4} md={6} sm={12} className='mt-2'>
                {!loadingDoctors ? <>
                  <Form.Group controlId="formBasicEmail"   >
                    <Form.Select size="sm" aria-label="Default select example" onChange={handelSelectArea} ref={areaRef}>
                      <option selected disabled hidden value={'Select Area'}>  {translate[isLang]?.filter?.area}  </option>

                      <option value={'Areas'} > {translate[isLang]?.filter?.allarea} </option>

                      {
                        areas?.map((item, index) => (
                          <option key={index} value={item?.IDArea}>{item?.AreaName}</option>
                        ))
                      }
                    </Form.Select>

                  </Form.Group>
                </> : SkeletonFilter()}
              </Col>
            </Row>
          </div>


          <ExcelSheet fetchDoctors={fetchDoctors} />
          {loadingDoctors ?
            // <Loader />
            <Component.DataNotFound />
            :
            <div className="total-table">
              {Object.keys(fetchDoctors).length > 0 ?
                <>
                  <div className="app__Users-table  ">
                    <Table responsive={true} className='rounded-3 '>
                      <thead className="table-light bg-input">
                        <tr>
                          <th scope="col">{isLang === 'ar' ? 'الإسـم' : 'Name'}</th>
                          {/* <th scope="col">Email</th> */}
                          {/* <th scope="col">Mobile</th> */}
                          <th scope="col">{isLang === 'ar' ? 'الدولـة' : 'Country'}</th>
                          <th scope="col">{isLang === 'ar' ? 'النـوع' : 'Type'}</th>
                          <th scope="col">{isLang === 'ar' ? 'الرصيــد' : 'Balance'}</th>
                          <th scope="col">{isLang === 'ar' ? 'الحالـة' : 'Status'}</th>
                          <th scope="col">{isLang === 'ar' ? 'تاريخ التسجيـل' : 'Register Date'}</th>
                          <th scope="col">{isLang === 'ar' ? 'الإجراء' : 'Action'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fetchDoctors.map((item, i) => (
                          <ItemDoctor
                            key={i}
                            id={item.IDDoctor}
                            nameDoc={item.DoctorName}
                            email={item.DoctorEmail}
                            phone={item.DoctorPhone}
                            country={item.CountryNameEn}
                            type={item.DoctorType}
                            balance={item.DoctorBalance}
                            status={item.DoctorStatus}
                            create={item.CreateDate}
                            item={item}
                            getTokenDoctors={getTokenDoctors}
                          />
                        ))
                        }
                      </tbody>
                    </Table>
                  </div>

                  <div className="pagination mt-2" dir="ltr">
                    {
                      pagesCountDoctors &&
                      <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
                        <Pagination count={pagesCountDoctors} page={countDoctors} onChange={() => handleChange(countDoctors)} />
                      </Box>
                    }
                  </div>
                </>
                :
                <Component.DataNotFound />
                // <h2 className='text-center mt-fixed py-4'>
                //     {isLang === 'ar' ? 'القائمـة فارغـة..' : 'The list is Empty..'}
                // </h2>
              }
            </div>
          }

        </section>
      </Container>
    </>
  )
}


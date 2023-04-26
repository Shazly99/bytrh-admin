import { Pagination, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import _ from 'lodash';
import React, { useContext, useEffect, useState, useRef } from 'react';
import Component from '../../../constants/Component';
import Icons from "../../../constants/Icons.js";
import { VendersContext } from "../../../context/Store";
import { PostData } from '../../../utils/fetchData';
import { apiheader } from './../../../utils/fetchData';
import initialTranslate from './initialTranslate';
import ExcelSheet from "./ExcelSheet";
import useSkeletonTable from "../../../utils/useSkeletonTable";
import useFetch from "../../../utils/useFetch";
import { Form, Col, Row } from "react-bootstrap";
import axios from "axios";

const Clients = () => {
  let { SkeletonExcel } = useSkeletonTable();

  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslate)
  const handelTranslate = () => {
    setTranslate(initialTranslate)
  }
  const [page, setPage] = React.useState(1);
  const [usersList, setuserList] = React.useState([]);
  const [PagesNumber, setPagesNumber] = React.useState('')
  const [isLoader, setIsloader] = useState(false);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const userList = _.debounce(async (page) => {
    await PostData(`https://bytrh.com/api/admin/clients`, { IDPage: page }, apiheader).then(({ data }) => {
      setuserList(data.Response.Clients)
      setPagesNumber(data.Response.Pages);
      const timeoutId = setTimeout(() => {
        setIsloader(true)
      }, 0);
      return () => clearTimeout(timeoutId);
    })
  }, 1000)
  useEffect(() => {
    userList(page)
    window.scrollTo(0, 0);
    handelTranslate()
  }, [page, isLang])

  // to fixed problem because Pagination count need a number 
  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;

  const [searchValue, setSearchValue] = useState('');
  // search by click
  const handleSearchClick = () => {
    searchGetData(searchValue)
  };
  const handleInputChange = (event) => {
    if (event.target.value === '') {
      userList(page)
    }
    setSearchValue(event.target.value);
  };
  const searchGetData = _.debounce(async (searchValue) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/clients`, { IDPage: page, SearchKey: searchValue }, apiheader)
    setuserList(data.Response.Clients)
    setPagesNumber(data.Response.Pages);
  }, 3000)
  // !filter status
  const [selectedOption, setSelectedOption] = useState('All');
  const handleOptionChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // filter your content based on the selected option 
    if (selectedValue === "ACTIVE" || selectedValue === "INACTIVE" || selectedValue === "BLOCKED") {
      let { data } = await PostData(`https://bytrh.com/api/admin/clients`, { IDPage: page, ClientStatus: selectedValue }, apiheader)
      setuserList(data.Response.Clients)
      setPagesNumber(data.Response.Pages);
    } else if (selectedValue === "All") {
      userList()
    }
  };
  // !Filter by city and country and area  
  let { countries, areas, cities, getCities, getAreas } = useFetch()
  const cityRef = useRef(null);
  const countryRef = useRef(null);
  const areaRef = useRef(null);
  const handelSelectCountry = async (event) => {
    const selectedCountryId = event.target.value;
    if (selectedCountryId === 'country') {
      userList(page)
    } else if (selectedCountryId === 'Select Country') {
      return false
    } else {
      getCities(selectedCountryId)
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/clients`, { IDPage: page, IDCountry: selectedCountryId }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setuserList(res.data.Response.Clients)
            setPagesNumber(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            userList();
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }
  const handelSelectCity = async () => {
    let city = cityRef.current.value
    if (city === 'cities') {
      userList(page)
    } else if (city === 'Select city') {
      return false
    } else {
      getAreas(city)
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/clients`, { IDPage: page, IDCity: city }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setuserList(res.data.Response.Clients)
            setPagesNumber(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            userList(page);
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }
  const handelSelectArea = async () => {
    let city = areaRef.current.value
    if (city === 'Areas') {
      userList(page)
    } else if (city === 'Select Area') {
      return false
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/clients`, { IDPage: page, IDArea: city }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setuserList(res.data.Response.Clients)
            setPagesNumber(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            userList(page);
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }

  // !Filter by   Client login by  
  const loginByRef = useRef(null);
  const handelloginBy = async () => {
    let clientLoginBy = loginByRef.current.value
    if (clientLoginBy === 'All') {
      userList(page)
    } else if (clientLoginBy === 'Select Status') {
      return false
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/clients`, { IDPage: page, LoginBy: clientLoginBy }, apiheader).then((res) => {
        if (res.status === 200 && res.request.readyState === 4) {
          setuserList(res.data.Response.Clients)
          setPagesNumber(res.data.Response.Pages);
        }
      })
    }
  }
  useEffect(() => {
  }, [page, PagesNumber, selectedOption])

  const SkeletonSearch = (w, h) => {
    return (
      <Skeleton variant='rounded' animation='wave' height={w} width={h} />
    )
  }
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
        {/* <Component.ButtonBase onclick={test} title={"Add new Clients"} bg={"primary"} icon={<Icons.add />}  /> */}
        <div className="app__Users-table">
          <div className="search-container">
            {isLoader ? <>
              <div className={`${isLang === 'ar' ? ' search__groupAr  ' : 'search__group'}  `}>
                <input type="text" placeholder={translate[isLang]?.placeholder} name="search" value={searchValue} onChange={handleInputChange} />
                <button type="submit" onClick={handleSearchClick}>
                  <Icons.Search color='#fff' size={25} />
                </button>
              </div>
            </> : SkeletonSearch(40, "60%")}
            <div className='filter__group'>
              {
                translate[isLang]?.FilterStatus?.map((item, index) => (
                  <React.Fragment key={index}>
                    {isLoader ? <>
                      <label className='active' >
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
                    </> : SkeletonSearch(10, 90)}
                  </React.Fragment>
                ))
              }
            </div>
          </div>
          <div className=' app__addOrder-form '>
            <Row className='d-flex  flex-row justify-content-between'>
              <Col xl={3} lg={3} md={6} sm={12} className='mt-2' >
                {isLoader ? <>
                  <Form.Group controlId="formBasicEmail" onClick={handelSelectCountry} ref={countryRef}>
                    <Form.Select aria-label="Default select example" >
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

              <Col xl={3} lg={3} md={6} sm={12} className='mt-2'>
                {isLoader ? <>
                  <Form.Group controlId="formBasicEmail"   >
                    <Form.Select aria-label="Default select example" onClick={handelSelectCity} ref={cityRef}>
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

              <Col xl={3} lg={3} md={6} sm={12} className='mt-2'>
                {isLoader ? <>
                  <Form.Group controlId="formBasicEmail"   >
                    <Form.Select aria-label="Default select example" onClick={handelSelectArea} ref={areaRef}>
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

              <Col xl={3} lg={3} md={6} sm={12} className='mt-2'>

                {isLoader ? <>
                  <Form.Group controlId="formBasicEmail"  >
                    {/* <Form.Label  >  Product Status </Form.Label> */}
                    <Form.Select aria-label="Default select example" ref={loginByRef} onClick={handelloginBy} >
                      <option selected disabled hidden value={'Select Status'}> {translate[isLang]?.filter?.loginBy}</option>

                      {
                        translate[isLang]?.loginBy?.map((Status, index) => (
                          <>
                            <option key={index} value={Status.value}  >{Status.text}</option>
                          </>
                        ))
                      }
                    </Form.Select>
                  </Form.Group>
                </> : SkeletonFilter()}
              </Col>

            </Row>
          </div>
          {isLoader ? <>
            <ExcelSheet usersList={usersList} />
          </>
            : SkeletonExcel(40, "100%")}

          <Component.ClientTable
            isLoading={isLoader}
            toastTranslate={translate[isLang]?.toast}
            tabelTranslate={translate[isLang]?.TableHeader}
            actionsTranslate={translate[isLang]?.Actions}
            statusTranslate={translate[isLang]?.FilterStatus}
            usersList={usersList}
            userList={userList}
            currency={translate[isLang]?.currency}
          />
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

export default Clients

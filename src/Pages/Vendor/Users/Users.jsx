import { Pagination, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useContext, useEffect, useRef, useState } from 'react';
import Component from '../../../constants/Component';
import Icons from "../../../constants/Icons.js";
import { PostData } from '../../../utils/fetchData';
import useSkeletonTable from '../../../utils/useSkeletonTable';
import { apiheader } from './../../../utils/fetchData';
import './Users.scss';
import initialTranslate from './initialTranslate';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useFetch from "../../../utils/useFetch";
import axios from "axios";
import { Row, Col, Form, } from "react-bootstrap";
import { VendersContext } from "../../../context/Store";

const theme = createTheme({
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '$mainColor',
            color: '#FFFFFF',
          },
        },
      },
    },
  },
});

function Users() {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslate)
  const handelTranslate = () => {
    setTranslate(initialTranslate)
  }
  const [page, setPage] = useState(1);
  const [usersList, setuserList] = useState(null);
  const [PagesNumber, setPagesNumber] = useState('')
  const [isLoader, setIsloader] = useState(false);
  let { SkeletonSearch } = useSkeletonTable();
  const handleChange = (event, value) => {
    setPage(value);
  };


  const userList = async (page) => {
    try {
      await PostData(`${process.env.REACT_APP_API_URL}/admin/users`, { IDPage: page }, apiheader).then(({ data }) => {
        setuserList(data.Response.Users);
        setPagesNumber(data.Response.Pages);
        const timeoutId = setTimeout(() => {
          setIsloader(true)
        }, 0);
        return () => clearTimeout(timeoutId);
      });
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        setTimeout(() => {
          userList(page);
        }, (retryAfter || 1) * 1000);
      }
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    handelTranslate()
    const timeoutId = setTimeout(() => {
      userList(page)
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [page,isLang])
  // to fixed problem because Pagination count need a number 
  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;


  const [searchValue, setSearchValue] = React.useState('');
  const handleSearchClick = () => {
    searchGetData(searchValue)
  };
  const searchGetData = async (searchValue) => {
    let { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/users`, { IDPage: page, SearchKey: searchValue }, apiheader)
    setuserList(data.Response.Users)
    setPagesNumber(data.Response.Pages);
  }
  const handleInputChange = (event) => {
    if (event.target.value === '') {
      userList(page)
    }
    setSearchValue(event.target.value);
  };

  // filter readio btn
  // const [selectedOption, setSelectedOption] = useState('All');

  // const handleOptionChange = async (event) => {
  //   const selectedValue = event.target.value;
  //   setSelectedOption(selectedValue);
  //   // filter your content based on the selected option 
  //   if (selectedValue === "ACTIVE" || selectedValue === "INACTIVE" || selectedValue === "PENDING") {
  //     let { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/users`, { IDPage: page, UserStatus: selectedValue }, apiheader)
  //     setuserList(data.Response.Users)
  //     setPagesNumber(data.Response.Pages);
  //   } else if (selectedValue === "All") {
  //     userList()
  //   }
  // };

  // !Filter by city and country and area  
  let { countries, areas, cities, getCities, getAreas } = useFetch()
  const cityRef = useRef(null);
  const countryRef = useRef(null);
  const areaRef = useRef(null);
  const handelSelectCountry = async (event) => {
    cityRef.current.value = 'Select city';
    areaRef.current.value = 'Select Area';
    statusRef.current.value = 'Select Status';
    const selectedCountryId = event.target.value;
    if (selectedCountryId === 'country') {
      userList(page)
    } else if (selectedCountryId === 'Select Country') {
      return false
    } else {
      getCities(selectedCountryId)
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/users`, { IDPage: page, IDCountry: selectedCountryId }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setuserList(res.data.Response.Users)
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
    areaRef.current.value = 'Select Area';
    statusRef.current.value = 'Select Status';
    let city = cityRef.current.value
    if (city === 'cities') {
      userList(page)
    } else if (city === 'Select city') {
      return false
    } else {
      getAreas(city)
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/users`, { IDPage: page, IDCity: city }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setuserList(res.data.Response.Users)
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
    statusRef.current.value = 'Select Status';
    if (city === 'Areas') {
      userList(page)
    } else if (city === 'Select Area') {
      return false
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/users`, { IDPage: page, IDArea: city }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setuserList(res.data.Response.Users)
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
    // !Filter by   Users Status
    const statusRef = useRef(null);
    const handelanimalProductStatus = async () => {
      cityRef.current.value = 'Select city';
      areaRef.current.value = 'Select Area';
      countryRef.current.value = 'Select Country';
      
      let animalProductStatus = statusRef.current.value
      if (animalProductStatus === 'All') {
        userList(page)
      } else if (animalProductStatus === 'Select Status') {
        return false
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/users`, { IDPage: page, UserStatus: animalProductStatus }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setuserList(res.data.Response.Users)
            setPagesNumber(res.data.Response.Pages);
          }
        })
      }
    }
  useEffect(() => {
  }, [page, PagesNumber])
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
          <div className="search-container   ">

            <div className="search_and__btn   w-100">
              {isLoader ? <>
                <Component.ButtonBase title={translate[isLang].add[0].btn} bg={"primary"} icon={<Icons.Add size={21} color={'#ffffffb4'} />} path="/user/addUser" />

                <div className={`${isLang === 'ar' ? ' search__groupAr  ' : 'search__group'}  `}>
                  <input placeholder={translate[isLang]?.placeholder} type="text" name="search" value={searchValue} onChange={handleInputChange} />
                  <button type="submit" onClick={handleSearchClick}>
                    <Icons.Search color='#fff' size={25} />
                  </button >
                </div>
              </> : SkeletonSearch(40, "100%")}
            </div>
            {/* <div className='filter__group'>
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
                        {item.text }
                      </label>
                    </> : SkeletonSearch(10, 90)}
                  </React.Fragment>
                ))
              }
            </div> */}
          </div>
          <div className=' app__addOrder-form '>
            <Row className='d-flex  flex-row justify-content-between'>
              <Col xl={3} lg={3} md={6} sm={12} className='mt-2' >
                {isLoader ? <>
                  <Form.Group controlId="formBasicEmail" >
                    <Form.Select size="sm"  aria-label="Default select example" onChange={handelSelectCountry} ref={countryRef}>
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
                    <Form.Select size="sm"aria-label="Default select example" onChange={handelSelectCity} ref={cityRef}>
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
                    <Form.Select size="sm"aria-label="Default select example" onChange={handelSelectArea} ref={areaRef}>
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
                    <Form.Select size="sm" aria-label="Default select example" ref={statusRef} onChange={handelanimalProductStatus} >
                      <option selected disabled hidden value={'Select Status'}> {translate[isLang]?.filter?.status}</option> 
                      {
                        translate[isLang]?.FilterStatus?.map((Status, index) => (
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
          <Component.UsersTable isLoader={isLoader} toastTranslate={translate[isLang]?.toast} tabelTranslate={translate[isLang]?.TableHeader} actionsTranslate={translate[isLang]?.Actions} statusTranslate={translate[isLang]?.FilterStatus} usersList={usersList} userList={userList} />
        </div>

      </div>
      <div className="pagination " dir="ltr">
        {
          pageCount &&
          <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
            <ThemeProvider theme={theme}>
              <Pagination count={pageCount} page={page} onChange={handleChange} />
            </ThemeProvider>
          </Box>
        }
      </div>


    </>
  )
}

export default Users

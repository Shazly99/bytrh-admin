import { Pagination, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Dropdown, DropdownButton, NavDropdown, Col, Form, Row, Table } from "react-bootstrap";
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Component from '../../../../constants/Component';
import Icons from '../../../../constants/Icons';
import { apiheader, GetData, PostData } from '../../../../utils/fetchData';
import useSkeletonTable from '../../../../utils/useSkeletonTable';
import initialTranslation from "./Translation";
import useFetch from "../../../../utils/useFetch";
import axios from "axios";
import { VendersContext } from "../../../../context/Store";
const Areas = () => {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslation)
  const handelTranslate = () => setTranslate(initialTranslation)


  const [areasList, setAreas] = useState(null)
  const [page, setPage] = useState(1);
  const [PagesNumber, setPagesNumber] = useState('')
  const [searchValue, setSearchValue] = useState('');
  const [isLoader, setIsloader] = useState(false);
  let { SkeletonTable, SkeletonSearch, SkeletonFilters } = useSkeletonTable();


  const AreascList = async (page) => {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/location/areas`, { IDPage: page }, apiheader).then(({ data }) => {
      setAreas(data.Response.Areas)
      setPagesNumber(data.Response.Pages);
      const timeoutId = setTimeout(() => {
        setIsloader(true)
      }, 0);
      return () => clearTimeout(timeoutId);
    }).catch((error) => {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        setTimeout(() => {
          AreascList();
        }, (retryAfter || 60) * 1000);
      }
    })
  }

  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleActionSelect = async (id, action) => {
    if (action === "ACTIVE" || action === "INACTIVE") {
      await AreascategoriesStatus(id).then((res) => {
        toast.success(<strong>{translate[isLang].toast.update}</strong>, {
          duration: 4000,
          position: 'buttom-center',
          // icon: <Icons.UploadItem color='#3182CE' size={20} />,
          iconTheme: {
            primary: '#3182CE',
            secondary: '#fff',
          },
        });
      })
      await AreascList()
    }
  };
  const AreascategoriesStatus = async (id) => {
    return await GetData(`${process.env.REACT_APP_API_URL}/admin/location/areas/status/${id}`, apiheader)
  }

  // search and filter  
  const handleSearchClick = () => {
    searchGetData(searchValue)
  };

  const handleInputChange = (event) => {
    if (event.target.value === '') {
      AreascList(page)
    }
    setSearchValue(event.target.value);
  };

  const searchGetData = async (searchValue) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/location/areas`, { IDPage: page, SearchKey: searchValue }, apiheader)
    setAreas(data.Response.Areas)
    setPagesNumber(data.Response.Pages);

  }
  // filter
  const [selectedOption, setSelectedOption] = useState('All');

  const handleOptionChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    // filter your content based on the selected option 
    if (selectedValue === "ACTIVE" || selectedValue === "INACTIVE") {
      let { data } = await PostData(`https://bytrh.com/api/admin/location/areas`, { IDPage: page, AreaStatus: selectedValue }, apiheader)
      setAreas(data.Response.Areas)
      setPagesNumber(data.Response.Pages);
    } else if (selectedValue === "All") {
      AreascList()
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
      AreascList()
    } else if (selectedCountryId === 'Select Country') {
      return false
    } else {
      getCities(selectedCountryId)
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/location/areas`, { IDPage: page, IDCountry: selectedCountryId }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setAreas(res.data.Response.Areas) 
            setPagesNumber(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            AreascList();
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }
  const handelSelectCity = async () => {
    let city = cityRef.current.value
    if (city === 'cities') {
      AreascList()
    } else if (city === 'Select city') {
      return true
    } else {
      getAreas(city)
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/location/areas`, { IDPage: page, IDCity: city }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setAreas(res.data.Response.Areas)
            setPagesNumber(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            AreascList();
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  } 


  useEffect(() => {
    AreascList(page)
    window.scrollTo(0, 0);
    handelTranslate()
  }, [page])
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
          <div className="search-container">
            <div className="search_and__btn w-100">
              {isLoader ? <>
                <Component.ButtonBase title={translate[isLang]?.add?.btn} bg={"primary"} icon={<Icons.Add size={21} color={'#ffffffb4'} />} path="/location/areas/addareas" />
                <div className={`${isLang === 'ar' ? ' search__groupAr  ' : 'search__group'}  `}>

                  <input type="text" placeholder={translate[isLang].placeholder} name="search" value={searchValue} onChange={handleInputChange} />
                  <button type="submit" onClick={handleSearchClick}>
                    <Icons.Search color='#fff' size={25} />
                  </button>
                </div>
              </> : SkeletonSearch(40, "100%")}
            </div>

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
            <Row className='d-flex flex-row justify-content-between'>
              <Col xl={6} lg={6} md={6} sm={12} className='mt-2' >
                {isLoader ? <>
                  <Form.Group controlId="formBasicEmail" onClick={handelSelectCountry} ref={countryRef}>
                    <Form.Select aria-label="Default select example" >
                      <option selected disabled hidden value={'Select Country'}>{translate[isLang]?.filter?.Country}  </option>
                      <option value={'country'} >{translate[isLang]?.filter?.allCountry}</option>



                      {
                        countries?.map((item, index) => (
                          <option key={index} value={item?.IDCountry}  > 
                          {item?.CountryName?.charAt(0).toUpperCase() + item?.CountryName?.slice(1).toLowerCase()}
                          </option>
                        ))
                      }
                    </Form.Select>
                  </Form.Group>
                </> : SkeletonFilter()}
              </Col>

              <Col xl={6} lg={6} md={6} sm={12} className='mt-2'>
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
 

            </Row>
          </div>
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
                  areasList?.map((item, index) => (
                    <tr key={index}>
                      <td >
                        <div>
                          {item?.CountryName}
                        </div>
                      </td>

                      <td >
                        <div>
                          {item?.CityName}
                        </div>
                      </td>
                      <td >
                        <div>
                          {item?.AreaName}
                        </div>
                      </td>

                      <td >
                        <div>
                          <span style={{ height: 'fit-content !important' }} className={`  ${item?.AreaActive === 1 && 'txt_delivered'}  ${item?.AreaActive === 0 && 'txt_rejected'} `} >
                            {
                              translate[isLang].FilterStatus?.filter((itemfilter) => itemfilter.AreaActive === item?.AreaActive)
                                .map((status, index) => (
                                  <React.Fragment key={index}>
                                    {item?.AreaActive === status.AreaActive ? status.text : ''}
                                  </React.Fragment>
                                ))
                            }
                          </span>
                        </div>
                      </td>

                      <td>
                        <div>
                          <span>
                            <DropdownButton
                              id={`dropdown-${item.IDArea}`}
                              title={translate[isLang]?.Actions.action}
                              variant="outline-success"
                              onSelect={(eventKey) => handleActionSelect(item.IDArea, eventKey)}
                              className="DropdownButton "
                              drop={'down-centered'}
                            >
                              <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey="Edite" as={Link} to={`/location/areas/editareas/${item.IDArea}`}>
                                {translate[isLang]?.Actions.edit}
                              </Dropdown.Item>

                              <NavDropdown.Divider />

                              {
                                translate[isLang].FilterStatus?.filter?.((item) => item.value !== "All").map((status, index) => (
                                  <React.Fragment key={index}>
                                    {item?.AreaActive === status.AreaActive ? '' : item?.UserStatus === status.value ? '' : <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey={status.value}>{status.text}</Dropdown.Item>}
                                  </React.Fragment>
                                ))
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
          </> : SkeletonTable()}
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

export default Areas
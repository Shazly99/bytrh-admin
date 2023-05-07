import { Pagination, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Dropdown, DropdownButton, Form, NavDropdown, Row, Table } from "react-bootstrap";
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Component from '../../../../constants/Component';
import Icons from '../../../../constants/Icons';
import { VendersContext } from "../../../../context/Store";
import { GetData, PostData, apiheader } from '../../../../utils/fetchData';
import useFetch from "../../../../utils/useFetch";
import useSkeletonTable from '../../../../utils/useSkeletonTable';
import initialTranslation from "./Translation";

const Cities = () => {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslation)
  const handelTranslate = () => setTranslate(initialTranslation)
  let { countries  } = useFetch()

  const [Cities, setCities] = useState(null)
  const [page, setPage] = useState(1);
  const [PagesNumber, setPagesNumber] = useState('')
  const [searchValue, setSearchValue] = useState('');
  const [isLoader, setIsloader] = useState(false);
  let { SkeletonTable, SkeletonSearch  } = useSkeletonTable();

  const CitiescList = async (page) => {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/location/cities`, { IDPage: page }, apiheader).then(({ data }) => {
      setCities(data.Response.Cities)
      setPagesNumber(data.Response.Pages);
      const timeoutId = setTimeout(() => {
        setIsloader(true)
      }, 0);
      return () => clearTimeout(timeoutId);
    }).catch((error) => {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        setTimeout(() => {
          CitiescList();
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
      await CitiescategoriesStatus(id).then((res) => {
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
      await CitiescList()
    }
  };
  const CitiescategoriesStatus = async (id) => {
    return await GetData(`${process.env.REACT_APP_API_URL}/admin/location/cities/status/${id}`, apiheader)
  }


  // search and filter  
  const handleSearchClick = () => {
    searchGetData(searchValue)
  };

  const handleInputChange = (event) => {
    if (event.target.value === '') {
      CitiescList(page)
    }
    setSearchValue(event.target.value);
  };

  const searchGetData = async (searchValue) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/location/cities`, { IDPage: page, SearchKey: searchValue }, apiheader)
    setCities(data.Response.Cities)
    setPagesNumber(data.Response.Pages);
  }
  // filter
  const [selectedOption, setSelectedOption] = useState('All');

  const handleOptionChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    // filter your content based on the selected option 
    if (selectedValue === "ACTIVE" || selectedValue === "INACTIVE") {
      let { data } = await PostData(`https://bytrh.com/api/admin/location/cities`, { IDPage: page, CityStatus: selectedValue }, apiheader)
      setCities(data.Response.Cities)
      setPagesNumber(data.Response.Pages);
    } else if (selectedValue === "All") {
      CitiescList()
    }
  };
  const countryRef = useRef(null);

  const handelSelectCountry = async (event) => {
    const selectedCountryId = event.target.value;
    if (selectedCountryId === 'country') {
      CitiescList()
    } else if (selectedCountryId === 'Select Country') {
      return false
    } else {

      try {
        await axios.post(`https://bytrh.com/api/admin/location/cities`, { IDPage: page, IDCountry: selectedCountryId }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setCities(res.data.Response.Cities);
            setPagesNumber(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            CitiescList();
          }, (retryAfter || 30) * 1000);
        }
      }
    }

  }
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      CitiescList(page)
      window.scrollTo(0, 0);
    }, 200);
    return () => clearTimeout(timeoutId);

  }, [page,isLang])
  useEffect(() => {
    handelTranslate()
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
                <Component.ButtonBase title={translate[isLang].add.btn} bg={"primary"} icon={<Icons.Add size={21} color={'#ffffffb4'} />} path="/location/cities/addcity" />
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
                  <Form.Group controlId="formBasicEmail">
                    <Form.Select aria-label="Default select example"  size="sm" onChange={handelSelectCountry} ref={countryRef}>
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
                  Cities?.map((item, index) => (
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
                          <span style={{ height: 'fit-content !important' }} className={`  ${item?.CityActive === 1 && 'txt_delivered'}  ${item?.CityActive === 0 && 'txt_rejected'} `} >
                            {
                              translate[isLang].FilterStatus?.filter((itemfilter) => itemfilter.CityActive === item?.CityActive)
                                .map((status, index) => (
                                  <React.Fragment key={index}>
                                    {item?.CityActive === status.CityActive ? status.text : ''}
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
                              id={`dropdown-${item.IDCity}`}
                              title={translate[isLang]?.Actions.action}
                              variant="outline-success"
                              onSelect={(eventKey) => handleActionSelect(item.IDCity, eventKey)}
                              className="DropdownButton "
                              drop={'down-centered'}
                            >
                              <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey="Edite" as={Link} to={`/location/cities/editcity/${item.IDCity}`}>
                                {translate[isLang]?.Actions.edit}
                              </Dropdown.Item>
                              <NavDropdown.Divider />

                              {
                                translate[isLang].FilterStatus?.filter?.((item) => item.value !== "All").map((status, index) => (
                                  <React.Fragment key={index}>
                                    {item?.CityActive === status.CityActive ? '' : item?.UserStatus === status.value ? '' : <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey={status.value}>{status.text}</Dropdown.Item>}
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

export default Cities
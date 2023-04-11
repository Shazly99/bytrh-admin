import { Pagination, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Dropdown, DropdownButton, Form, Row, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Img from "../../../assets/Img";
import Component from "../../../constants/Component";
import Icons from "../../../constants/Icons";
import useFetch from "../../../utils/useFetch";
import useSkeletonTable from "../../../utils/useSkeletonTable";
import { apiheader, PostData } from '../../../utils/fetchData';

import initialTranslation from "./Translation";
import { VendersContext } from "../../../context/Store";
import ExcelSheet from "./ExcelSheet";
const DoctorFreeList = () => {

  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslation)
  const handelTranslate = () => {
    setTranslate(initialTranslation)
  }

  let { SkeletonTable } = useSkeletonTable();
  const [doctorFree, setDoctorFree] = useState([]);
  const [page, setPage] = useState(1);
  const [PagesNumber, setPagesNumber] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoader, setIsloader] = useState(false);
  // **pagination
  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;

  // **get DoctorsFree
  const DoctorsFree = async (page) => {
    await PostData(
      `${process.env.REACT_APP_API_URL}/admin/doctors/free`,
      { IDPage: page },
      apiheader
    ).then(({ data }) => {
      setDoctorFree(data.Response.Doctors);
      setPagesNumber(data.Response.Pages);
      const timeoutId = setTimeout(() => {
        setIsloader(true)
      }, 0);
      return () => clearTimeout(timeoutId);
    })
      .catch((error) => {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers["retry-after"];
          setTimeout(() => {
            DoctorsFree();
          }, (retryAfter || 60) * 1000);
        }
      });
  };

  // **pagination
  const handleChange = (event, value) => {
    setPage(value);
  };


  // ToDo :: Search bar
  const [searchValue, setSearchValue] = useState('');
  // search by click
  // const handleSearchClick = () => {
  // };
  const handleInputChange = (event) => {
    if (event.target.value === '') {
      DoctorsFree(page)
    }
    setSearchValue(event.target.value);
    searchGetData(event.target.value);
  };
  const searchGetData = async (searchValue) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/doctors/free`, { IDPage: page, SearchKey: searchValue }, apiheader)
    setDoctorFree(data.Response.Doctors);
    setPagesNumber(data.Response.Pages);
  }
  // !Filter by city and country and area  
  let { countries, areas, cities, getCities, getAreas } = useFetch()
  const cityRef = useRef(null);
  const countryRef = useRef(null);
  const areaRef = useRef(null);
  const handelSelectCountry = async (event) => {
    const selectedCountryId = event.target.value;
    if (selectedCountryId === 'country') {
      DoctorsFree()
    } else if (selectedCountryId === 'Select Country') {
      return false
    } else {
      getCities(selectedCountryId)
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/doctors/free`, { IDPage: page, IDCountry: selectedCountryId }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setDoctorFree(res.data.Response.Doctors);
            setPagesNumber(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            DoctorsFree();
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }
  const handelSelectCity = async () => {
    let city = cityRef.current.value
    if (city === 'cities') {
      DoctorsFree()
    } else if (city === 'Select city') {
      return true
    } else {
      getAreas(city)
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/doctors/free`, { IDPage: page, IDCity: city }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setDoctorFree(res.data.Response.Doctors);
            setPagesNumber(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            DoctorsFree();
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }
  const handelSelectArea = async () => {
    let city = areaRef.current.value
    if (city === 'Areas') {
      DoctorsFree()
    } else if (city === 'Select Area') {
      return false
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/doctors/free`, { IDPage: page, IDArea: city }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setDoctorFree(res.data.Response.Doctors);
            setPagesNumber(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            DoctorsFree();
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }





  useEffect(() => {
    DoctorsFree(page);
    window.scrollTo(0, 0);
    handelTranslate()
  }, [page, isLoader]);
  useEffect(() => { }, [page, PagesNumber]);
  const handleActionSelect = async (id) => {
 
      await CitiescategoriesStatus(id).then((res) => {
        toast.success('Request Doctor', {
          duration: 4000,
          position: 'buttom-center',
          // icon: <Icons.UploadItem color='#3182CE' size={20} />,
          iconTheme: {
            primary: '#3182CE',
            secondary: '#fff',
          },
        });
      })
      await DoctorsFree()
  
  };
  const CitiescategoriesStatus = async (id) => {
    return await PostData(`${process.env.REACT_APP_API_URL}/admin/doctors/free/request`,{IDDoctor:id}, apiheader)
  }
  const SkeletonSearch = (w, h) => {
    return (
      <div className="d-flex gap-2">
        <Skeleton variant='rounded' animation='wave' height={w} width={h} />
      </div>
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
  const SkeletonTables = (w) => {
    return (
      <div className="d-flex justify-content-center">
        <Skeleton variant='rounded' animation='wave' height={15} width={w} />
      </div>

    )
  }

  return (
    <>
      <div className="app__Users ">
        <div className="app__Users-table">
          <div className="search-container">
            <div className='  w-100'>

              {isLoader ? <>
                <div className={`${isLang === 'ar' ? ' search__groupAr  ' : 'search__group'}  `}>
                  <input type="text" placeholder={translate[isLang]?.placeholder} name="search" value={searchValue} onChange={handleInputChange} />
                  <button type="submit" >
                    <Icons.Search color='#fff' size={25} />
                  </button>
                </div>

              </> : SkeletonSearch(40, "60%")}
              <div className=' app__addOrder-form '>
                <Row className='d-flex flex-row justify-content-between'>
                  <Col xl={2} lg={2} md={6} sm={12} className='mt-2' >
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

                  <Col xl={2} lg={2} md={6} sm={12} className='mt-2'>
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

                  <Col xl={2} lg={2} md={6} sm={12} className='mt-2'>
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




                </Row>
              </div>
            </div>
          </div>
          <ExcelSheet/>
          {isLoader ? <>
            <>
              {
                doctorFree?.length > 0 ?
                  <Table responsive={true} className="rounded-3 ">
                    <thead>
                      <tr className="text-center  " style={{ background: "#F9F9F9" }} >
                        {
                          translate[isLang]?.TableHeader?.map((item, index) => (
                            <th key={index}>{item}</th>
                          ))
                        }

                      </tr>
                    </thead>
                    <tbody className="text-center">

                      {doctorFree?.map((item, index) => (
                        <tr key={index}>

                          <td>
                            <div
                              className="d-flex flex-column justify-content-center align-content-center"
                              style={{ gap: "0" }}
                            >
                              <span className="ClientName">
                                {item?.DoctorName}
                              </span>
                              <span className="ClientPhone">
                                {item?.DoctorPhone}
                              </span>
                            </div>
                          </td>

                          <td>
                            <div>{item?.CountryNameEn}</div>
                          </td>
                          <td>
                            <div>
                              {item?.DoctorType.charAt(0).toUpperCase() +
                                item?.DoctorType.slice(1).toLowerCase()}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <h6 className="mb-0  pe-2 color-red">
                                {item?.DoctorBalance} SAR
                              </h6>
                            </div>
                          </td>
                          <td>
                            <div className="blog__status">
                              <span
                                style={{ height: "fit-content  important" }}
                                className={`  ${item.DoctorStatus === "PENDING" &&
                                  "txt_pending"
                                  } ${item.DoctorStatus === "CANCELLED" &&
                                  "txt_rejected"
                                  }   ${item.DoctorStatus === "RESERVED" &&
                                  "txt_delivery"
                                  } ${item.DoctorStatus === "REJECTED" &&
                                  "txt_rejected"
                                  }   ${item.DoctorStatus === "SOLD" &&
                                  "txt__status"
                                  } ${item.DoctorStatus === "ACTIVE" &&
                                  "txt_delivered"
                                  }`}
                              >
                                {
                                  translate[isLang].FilterStatus?.filter((itemfilter) => itemfilter.value === item?.DoctorStatus)
                                    .map((status, index) => (
                                      <React.Fragment key={index}>
                                        {item?.DoctorStatus === status.value ? status.text : ''}
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
                                {item?.CreateDate.split(" ")[0]}{" "}
                              </span>
                              <span className="ClientPhone">
                                {" "}
                                {item?.CreateDate.split(" ")[1]}
                              </span>
                            </div>
                          </td>

                          <td>
                            <div>
                              <span> 
                                  <Button variant=" outline-sucess" className="DropdownButton outline-sucess outline-sucessChat" title="Rejected Doctor" onClick={() => handleActionSelect(item.IDDoctor, 'Reject')}> Request </Button>
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}

                    </tbody>
                  </Table>
                  :
                  <Component.DataNotFound />
              }
            </>
          </> : SkeletonTable()}


        </div>
      </div>
      <div className="pagination " dir="ltr">
        <Box
          sx={{
            margin: "auto",
            width: "fit-content",
            alignItems: "center",
          }}
        >
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChange}
          />
        </Box>
      </div>
    </>
  )
}

export default DoctorFreeList
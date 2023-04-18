import { Pagination, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Col, Dropdown, DropdownButton, Form, Row, Table } from "react-bootstrap";

import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import initialTranslation from "./Translation";
import Component from "../../../constants/Component";
import Icons from "../../../constants/Icons";
import img from "../../../assets/Img";
import useFetch from "../../../utils/useFetch";
import useSkeletonTable from "../../../utils/useSkeletonTable";
import { VendersContext } from "../../../context/Store";
import { apiheader, PostData } from "../../../utils/fetchData";
import ExcelSheet from "./ExcelSheet";
// import LogoSvg from "../../../assets/svg/LogoSvg";

const Centers = () => {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslation)
  const handelTranslate = () => {
    setTranslate(initialTranslation)
  }
  let { SkeletonTable ,SkeletonExcel} = useSkeletonTable();

  const [medicalCenter, setmedicalCenter] = useState([]);
  const [page, setPage] = useState(1);
  const [PagesNumber, setPagesNumber] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoader, setIsloader] = useState(false);
  // **pagination
  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;

  // **get medicalCenterList
  const medicalCenterList = async (page) => {
    await PostData(
      `${process.env.REACT_APP_API_URL}/admin/medicalcenter`,
      { IDPage: page },
      apiheader
    ).then(({ data }) => {
      setmedicalCenter(data.Response.MedicalCenters);
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
            medicalCenterList();
          }, (retryAfter || 60) * 1000);
        }
      });
  };

  // **pagination
  const handleChange = (event, value) => {
    setPage(value);
  };
  // ToDo::change Blogs status
  const handleActionSelect = async (id, action) => {
    if (
      action === "PENDING" ||
      action === "ACTIVE" ||
      action === "INACTIVE"
    ) {
      await ChangemedicalCenterListStatus({
        IDMedicalCenter: id,
        MedicalCenterStatus: action

      }).then((res) => {
        toast.success("Updated Successfully", {
          duration: 4000,
          position: "top-center",
          icon: <Icons.UploadItem color="#3182CE" size={20} />,
          iconTheme: {
            primary: "#0a0",
            secondary: "#fff",
          },
        });
      });
      await medicalCenterList();
    }
    await medicalCenterList();
  };
  const ChangemedicalCenterListStatus = async (blog) => {
    return await PostData(
      `${process.env.REACT_APP_API_URL}/admin/medicalcenter/status`,
      blog,
      apiheader
    );
  };

  // ToDo :: Search bar
  const [searchValue, setSearchValue] = useState('');
  // search by click
  // const handleSearchClick = () => {
  // };
  const handleInputChange = (event) => {
    if (event.target.value === '') {
      medicalCenterList(page)
    }
    setSearchValue(event.target.value);
    searchGetData(event.target.value);
  };
  const searchGetData = async (searchValue) => {

    let { data } = await PostData(`https://bytrh.com/api/admin/medicalcenter`, { IDPage: page, SearchKey: searchValue }, apiheader)
    setmedicalCenter(data.Response.MedicalCenters);
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
      medicalCenterList()
    } else if (selectedCountryId === 'Select Country') {
      return false
    } else {
      getCities(selectedCountryId)
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/medicalcenter`, { IDPage: page, IDCountry: selectedCountryId }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setmedicalCenter(res.data.Response.MedicalCenters);
            setPagesNumber(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            medicalCenterList();
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }
  const handelSelectCity = async () => {
    let city = cityRef.current.value
    if (city === 'cities') {
      medicalCenterList()
    } else if (city === 'Select city') {
      return false
    } else {
      getAreas(city)
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/medicalcenter`, { IDPage: page, IDCity: city }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setmedicalCenter(res.data.Response.MedicalCenters);
            setPagesNumber(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            medicalCenterList();
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }
  const handelSelectArea = async () => {
    let city = areaRef.current.value
    if (city === 'Areas') {
      medicalCenterList()
    } else if (city === 'Select Area') {
      return false
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/medicalcenter`, { IDPage: page, IDArea: city }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setmedicalCenter(res.data.Response.MedicalCenters);
            setPagesNumber(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            medicalCenterList();
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }
  // !Filter by  Medical Center Type
  const medicalCenterTypeRef = useRef(null);
  const handelMedicalCenterType = async () => {
    let MedicalCenterType = medicalCenterTypeRef.current.value
    if (MedicalCenterType === 'All') {
      medicalCenterList()
    } else if (MedicalCenterType === 'Select Product Type') {
      return false
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/medicalcenter`, { IDPage: page, MedicalCenterType: MedicalCenterType }, apiheader).then((res) => {
        if (res.status === 200 && res.request.readyState === 4) {
          setmedicalCenter(res.data.Response.MedicalCenters);
          setPagesNumber(res.data.Response.Pages);
        }
      })
    }
  }

  // !Filter by  Medical Center status
  const medicalCenterstatusRef = useRef(null);
  const handelMedicalstatus = async () => {
    let MedicalCenterType = medicalCenterstatusRef.current.value
    if (MedicalCenterType === 'All') {
      medicalCenterList()
    } else if (MedicalCenterType === 'Select Product Type') {
      return false
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/medicalcenter`, { IDPage: page, MedicalCenterStatus: MedicalCenterType }, apiheader).then((res) => {
        if (res.status === 200 && res.request.readyState === 4) {
          setmedicalCenter(res.data.Response.MedicalCenters);
          setPagesNumber(res.data.Response.Pages);
        }
      })
    }
  }
  useEffect(() => {
    medicalCenterList(page);
    window.scrollTo(0, 0);
    handelTranslate()
  }, [page, isLoader]);
  useEffect(() => { }, [page, PagesNumber]);
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
                <Row className='d-flex  flex-row justify-content-between'>
                  <Col xl={2} lg={2} md={6} sm={12} className='mt-2' >
                    {isLoader ? <>
                      <Form.Group controlId="formBasicEmail" onClick={handelSelectCountry} ref={countryRef}>
                        <Form.Select aria-label="Default select example" >
                          <option selected disabled hidden value={'Select Country'}>{translate[isLang]?.filter?.Country}  </option>
                          <option value={'country'} >{translate[isLang]?.filter?.allCountry}</option>
                          {
                            countries?.map((item, index) => (
                              <option key={index} value={item?.IDCountry}  >{item?.CountryName.charAt(0).toUpperCase() + item?.CountryName.slice(1).toLowerCase()}</option>
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


                  <Col xl={2} lg={2} md={6} sm={12} className='mt-2'>
                    {isLoader ? <>
                      <Form.Group controlId="formBasicEmail"   >
                        <Form.Select aria-label="Default select example" ref={medicalCenterTypeRef} onClick={handelMedicalCenterType} >
                          <option selected disabled hidden value={'Select Product Type'}> {translate[isLang]?.filter?.Product} </option>
                          {
                            translate[isLang]?.Filtertype?.map((item, index) => (
                              <option key={index} value={item.value}>{item?.text}</option>
                            ))
                          }
                        </Form.Select>
                      </Form.Group>
                    </> : SkeletonFilter()}
                  </Col>


                  <Col xl={2} lg={2} md={6} sm={12} className='mt-2'>
                    {isLoader ? <>
                      <Form.Group controlId="formBasicEmail"   >
                        <Form.Select aria-label="Default select example" ref={medicalCenterstatusRef} onClick={handelMedicalstatus} >
                          <option selected disabled hidden value={'Select Product Type'}> {translate[isLang]?.filter?.status} </option>
                          {
                            translate[isLang]?.FilterStatus?.map((item, index) => (
                              <option key={index} value={item.value}>{item?.text}</option>
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
          {isLoader ? <>
                <ExcelSheet />
            </>
                : SkeletonExcel(40, "100%")}
          {isLoader ? <>
            <>
              {
                medicalCenter?.length > 0 ?
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
                      {medicalCenter?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div style={{ maxWidth: "170px" }}>
                              {
                                item?.MedicalCenterPicture ?
                                  <img
                                    src={item?.MedicalCenterPicture}
                                    className="w-100 rounded-3"
                                    alt={item?.medicalCenterProductTypeName}
                                    loading="lazy"
                                  /> :
                                  <img src={img.defaultImg} alt={'Client tPicture'} loading='lazy' height={170} width='100%' className='w-100 rounded' />}

                            </div>
                          </td>
                          <td>
                            <div
                              className="d-flex flex-column justify-content-center align-content-center"
                              style={{ gap: "0" }}
                            >
                              <span className="ClientName">
                                {item?.MedicalCenterName}
                              </span>
                              <span className="ClientPhone">
                                {item?.MedicalCenterPhone}
                              </span>
                            </div>
                          </td>

                          <td>
                            <div>
                              {item?.MedicalCenterType.charAt(0).toUpperCase() +
                                item?.MedicalCenterType.slice(1).toLowerCase()}
                            </div>
                          </td>
                          <td>
                            <div className="blog__status">
                              <span
                                style={{ height: "fit-content  important" }}
                                className={`  ${item.MedicalCenterStatus === "PENDING" && "txt_pending"}  
                                               ${item.MedicalCenterStatus === "INACTIVE" && "txt_rejected"} 
                                                ${item.MedicalCenterStatus === "ACTIVE" && "txt_delivered"}`}
                              >
                                {
                                  translate[isLang].FilterStatus?.filter((itemfilter) => itemfilter.value === item?.MedicalCenterStatus)
                                    .map((status, index) => (
                                      <React.Fragment key={index}>
                                        {item?.MedicalCenterStatus === status.value ? status.text : ''}
                                      </React.Fragment>
                                    ))
                                }
                              </span>
                              <div className="delete">
                                <DropdownButton
                                  title={
                                    <img src={img.dropdown} alt="Img.dropdown" />
                                  }
                                  id="dropdown-menu"
                                  variant="outline-success"
                                  onClick={() => setShowDropdown(!showDropdown)}
                                  onSelect={(eventKey) =>
                                    handleActionSelect(
                                      item.IDMedicalCenter,
                                      eventKey
                                    )
                                  }
                                  className="DropdownButton "
                                  drop={"down-centered"}
                                >
                                  {
                                    translate[isLang]?.FilterStatus?.filter?.((item) => item.value !== "All")?.map((Status, index) => (
                                      <React.Fragment key={index}>
                                        {item?.MedicalCenterStatus === Status.value ? (
                                          ""
                                        ) : (
                                          <Dropdown.Item eventKey={Status.value} className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"}>
                                            {Status.text}
                                          </Dropdown.Item>
                                        )}
                                      </React.Fragment>
                                    ))
                                  }
                                </DropdownButton>
                              </div>
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
                              {item?.AreaName.charAt(0).toUpperCase() +
                                item?.AreaName.slice(1).toLowerCase()}
                            </div>
                          </td>
                          {/* 
                          <td>
                            <div>
                              <Link to={`/medicalcenter/profile/${item?.IDMedicalCenter}`}  >
                                <LogoSvg.view className="logoSvg" style={{ width: 19 }} />
                              </Link>
                            </div>
                          </td>

                          <td>
                            <div>
                              <Link to={`/medicalcenter/edit/${item?.IDMedicalCenter}`}  >
                                <LogoSvg.view className="logoSvg" style={{ width: 19 }} />
                              </Link>
                            </div>
                          </td> */}

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
                                  <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey="Edite" as={Link} to={`/medicalcenter/edit/${item?.IDMedicalCenter}`}>
                                    {translate[isLang]?.Actions.edit}
                                  </Dropdown.Item>

                                  <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey="Edite" as={Link} to={`/medicalcenter/profile/${item?.IDMedicalCenter}`}>
                                    {translate[isLang]?.Actions.view}
                                  </Dropdown.Item>


                                  <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey="Edite" as={Link} to={`/medicalcenter/add/${item?.IDMedicalCenter}`}>
                                    {translate[isLang]?.Actions.add}
                                  </Dropdown.Item>

                                  <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey="Edite" as={Link} to={`/medicalcenter/hours/${item?.IDMedicalCenter}`}>
                                    {translate[isLang]?.Actions.hour}
                                  </Dropdown.Item>

                                </DropdownButton>
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table> :
                  <Component.DataNotFound />
              }
            </>
          </> : SkeletonTable()}
        </div>
      </div>
      <div className="pagination ">
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

export default Centers

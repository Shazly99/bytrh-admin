import { Pagination, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Dropdown, DropdownButton, Form, Modal, Row, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Img from "../../assets/Img";
import Component from "../../constants/Component";
import Icons from "../../constants/Icons";
import { VendersContext } from "../../context/Store";
import useFetch from "../../utils/useFetch";
import useSkeletonTable from "../../utils/useSkeletonTable";
import { apiheader, PostData } from "./../../utils/fetchData";
import initialTranslation from "./Translation";
import ExcelSheet from "./ExcelSheet";

const Bidding = () => {

  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslation)
  const handelTranslate = () => {
    setTranslate(initialTranslation)
  }
  let { SkeletonTable, SkeletonExcel } = useSkeletonTable();

  const [animal, setAnimal] = useState([]);
  const [page, setPage] = useState(1);
  const [PagesNumber, setPagesNumber] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoader, setIsloader] = useState(false);
  // **pagination
  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;

  // **get store
  const store = async (page) => {
    await PostData(
      `${process.env.REACT_APP_API_URL}/admin/animalproducts`,
      { IDPage: page, AnimalProductService: 'BIDDING' },
      apiheader
    ).then(({ data }) => {
      setAnimal(data.Response.AnimalProducts);
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
            store();
          }, (retryAfter || 60) * 1000);
        }
      });
  };

  // **pagination
  const handleChange = (event, value) => {
    setPage(value);
  };
  // ** display Reason 
  const [modalShowReason, setModalShowReason] = React.useState(false);
  const [modalIndexReason, setModalIndexReason] = React.useState(0);
  const handleModalCloseReason = () => setModalShowReason(false);
  function handleModalOpenReason(index) {
    setModalIndexReason(index);
    setModalShowReason(true);
  }
  // ToDo::change Blogs status
  const [modalShow, setModalShow] = React.useState(false);
  const [modalIndex, setModalIndex] = React.useState(0);
  let reasonRef = useRef()
  const handleActionSelect = async (id, action) => {
    if (
      action === "PENDING" ||
      action === "ACTIVE" ||
      action === "CANCELLED" ||
      action === "SOLD" ||
      action === "RESERVED"
    ) {
      await ChangeStoreStatus({
        IDAnimalProduct: id,
        AnimalProductStatus: action
        , AnimalProductService: 'BIDDING'
      }).then((res) => {
        toast.success("Updated Successfully", {
          duration: 4000,
          position: "top-center",
          iconTheme: {
            primary: "#3182CE",
            secondary: "#fff",
          },
        });
      });
      await store();
    } else if (action === "REJECTED") {
      handleModalOpen(id)

    }
  };
  const ChangeStoreStatus = async (blog) => {
    return await PostData(
      `${process.env.REACT_APP_API_URL}/admin/animalproducts/status`,
      blog,
      apiheader
    );
  };
  const reasonReject = async (id, action) => {
    await ChangeStoreStatus({
      IDAnimalProduct: id,
      AnimalProductStatus: action,
      AnimalProductRejectReason: reasonRef.current.value,
      AnimalProductService: 'BIDDING'
    }).then((res) => {
      toast.success("Updated Successfully", {
        duration: 4000,
        position: "bottom-center",
        icon: <Icons.UploadItem color="#3182CE" size={20} />,
        iconTheme: {
          primary: "#0a0",
          secondary: "#fff",
        },
      });
      setModalShow(false)
    });
    await store();
  }
  //!Modal

  function handleModalClose() {
    setModalShow(false);
  }
  function handleModalOpen(index) {
    setModalIndex(index);
    setModalShow(true);
  }
  // ToDo :: Search bar
  const [searchValue, setSearchValue] = useState('');
  // search by click
  // const handleSearchClick = () => {
  // };
  const handleInputChange = (event) => {
    if (event.target.value === '') {
      store(page)
    }
    setSearchValue(event.target.value);
    searchGetData(event.target.value);
  };
  const searchGetData = async (searchValue) => {

    let { data } = await PostData(`https://bytrh.com/api/admin/animalproducts`, { IDPage: page, SearchKey: searchValue, AnimalProductService: 'BIDDING' }, apiheader)
    setAnimal(data.Response.AnimalProducts);
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
      store()
    } else if (selectedCountryId === 'Select Country') {
      return false
    } else {
      getCities(selectedCountryId)
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/animalproducts`, { IDPage: page, IDCountry: selectedCountryId, AnimalProductService: 'BIDDING' }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setAnimal(res.data.Response.AnimalProducts);
            setPagesNumber(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            store();
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }
  const handelSelectCity = async () => {
    let city = cityRef.current.value
    if (city === 'cities') {
      store()
    } else if (city === 'Select city') {
      return false
    } else {
      getAreas(city)
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/animalproducts`, { IDPage: page, IDCity: city, AnimalProductService: 'BIDDING' }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setAnimal(res.data.Response.AnimalProducts);
            setPagesNumber(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            store();
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }
  const handelSelectArea = async () => {
    let city = areaRef.current.value
    if (city === 'Areas') {
      store()
    } else if (city === 'Select Area') {
      return false
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/animalproducts`, { IDPage: page, IDArea: city, AnimalProductService: 'BIDDING' }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setAnimal(res.data.Response.AnimalProducts);
            setPagesNumber(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            store();
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }

  // !Filter by  AnimalProductType
  const animalProductType = useRef(null);
  const handelAdvertisement = async () => {
    let AnimalProductType = animalProductType.current.value
    if (AnimalProductType === 'All') {
      store()
    } else if (AnimalProductType === 'Select Product Type') {
      return false
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/animalproducts`, { IDPage: page, AnimalProductType: AnimalProductType, AnimalProductService: 'BIDDING' }, apiheader).then((res) => {
        if (res.status === 200 && res.request.readyState === 4) {
          setAnimal(res.data.Response.AnimalProducts);
          setPagesNumber(res.data.Response.Pages);
        }
      })
    }
  }

  // !Filter by  animal SubCategory 
  const animalSubCategoryRef = useRef();
  const [animalSubCategory, setAnimalSubCategory] = useState(null)
  const animalSubCategoryGet = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/admin/animalsubcategories/ajax`, {}, apiheader).then((res) => {
      if (res.status === 200 && res.request.readyState === 4) {
        setAnimalSubCategory(res.data.Response);
      }
    })
  }
  const handelanimalSubCategory = async () => {
    let AnimalProductType = animalSubCategoryRef.current.value
    if (AnimalProductType === 'All') {
      store()
    } else if (AnimalProductType === 'Select SubCategory') {
      return false
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/animalproducts`, { IDPage: page, IDAnimalSubCategory: AnimalProductType, AnimalProductService: 'BIDDING' }, apiheader).then((res) => {
        if (res.status === 200 && res.request.readyState === 4) {
          setAnimal(res.data.Response.AnimalProducts);
          setPagesNumber(res.data.Response.Pages);
        }
      })
    }
  }

  // !Filter by   Animal Product Status
  const statusRef = useRef(null);
  const handelanimalProductStatus = async () => {
    let animalProductStatus = statusRef.current.value
    if (animalProductStatus === 'All') {
      store()
    } else if (animalProductStatus === 'Select Status') {
      return false
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/animalproducts`, { IDPage: page, AnimalProductStatus: animalProductStatus, AnimalProductService: 'BIDDING' }, apiheader).then((res) => {
        if (res.status === 200 && res.request.readyState === 4) {
          setAnimal(res.data.Response.AnimalProducts);
          setPagesNumber(res.data.Response.Pages);
        }
      })
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    handelTranslate()
    const timeoutId = setTimeout(() => {
      store(page);
      animalSubCategoryGet()
    }, 200);
    return () => clearTimeout(timeoutId);

  }, [page, isLoader,isLang ]);
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

                  <Col xl={2} lg={2} md={6} sm={12} className='mt-2'>

                    {isLoader ? <>
                      <Form.Group controlId="formBasicEmail"  >
                        {/* <Form.Label  >Product Type </Form.Label> */}
                        <Form.Select aria-label="Default select example" ref={animalProductType} onClick={handelAdvertisement} >
                          <option selected disabled hidden value={'Select Product Type'}> {translate[isLang]?.filter?.Product} </option>
                          {
                            translate[isLang]?.Filtertype?.map((Status, index) => (
                              <>
                                <option key={index} value={Status.value}  >{Status.text}</option>
                              </>
                            ))
                          }
                        </Form.Select>
                      </Form.Group>
                    </> : SkeletonFilter()}
                  </Col>

                  <Col xl={2} lg={2} md={6} sm={12} className='mt-2'>

                    {isLoader ? <>
                      <Form.Group controlId="formBasicEmail"  >
                        {/* <Form.Label  >  Product Status </Form.Label> */}
                        <Form.Select aria-label="Default select example" ref={statusRef} onClick={handelanimalProductStatus} >
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

                  <Col xl={2} lg={2} md={6} sm={12} className='mt-2'>
                    {isLoader ? <>
                      <Form.Group controlId="formBasicEmail"  >
                        {/* <Form.Label  >  SubCategory </Form.Label> */}
                        <Form.Select aria-label="Default select example" ref={animalSubCategoryRef} onClick={handelanimalSubCategory} >
                          <option selected disabled hidden value={'Select SubCategory'}> {translate[isLang]?.filter?.SubCategory}</option>
                          <option value={'All'}  >{translate[isLang]?.filter?.allSubCategory}  </option>

                          {
                            animalSubCategory?.map((item, index) => (
                              <option key={index} value={item.IDAnimalSubCategory}  >{item?.AnimalSubCategoryName}</option>
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
                animal.length > 0 ?
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
                      {animal?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div  >
                              <img
                                src={item?.AnimalProductImage}
                                className=" rounded-3"
                                alt={item?.AnimalProductTypeName}
                                loading="lazy"
                                width={'150px'}
                                height={'100px'}
                              />
                            </div>
                          </td>
                          <td>
                            <div
                              className="d-flex flex-column justify-content-center align-content-center"
                              style={{ gap: "0" }}
                            >
                              <span className="ClientName">
                                {item?.ClientName}
                              </span>
                              <span className="ClientPhone">
                                {item?.ClientPhone}
                              </span>
                            </div>
                          </td>

                          <td>
                            <div>{item?.AnimalSubCategoryName}</div>
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <h6 className="mb-0  pe-2 color-red">
                                {item?.AnimalProductPrice}  {translate[isLang]?.Actions.currency}
                              </h6>
                            </div>
                          </td>
                          <td>
                            <div>
                              {item?.AnimalProductType.charAt(0).toUpperCase() +
                                item?.AnimalProductType.slice(1).toLowerCase()}
                            </div>
                          </td>
                          <td>
                            <div className="blog__status d-flex flex-column justify-content-center">
                              <div className='blog__status d-flex flex-row'>

                                <span
                                  style={{ height: "fit-content  important" }}
                                  className={`  ${item.AnimalProductStatus === "PENDING" &&
                                    "txt_pending"
                                    } ${item.AnimalProductStatus === "CANCELLED" &&
                                    "txt_rejected"
                                    }   ${item.AnimalProductStatus === "RESERVED" &&
                                    "txt_delivery"
                                    } ${item.AnimalProductStatus === "REJECTED" &&
                                    "txt_rejected"
                                    }   ${item.AnimalProductStatus === "SOLD" &&
                                    "txt__status"
                                    } ${item.AnimalProductStatus === "ACTIVE" &&
                                    "txt_delivered"
                                    }`}
                                >
                                  {
                                    translate[isLang].FilterStatus?.filter((itemfilter) => itemfilter.value === item?.AnimalProductStatus)
                                      .map((status, index) => (
                                        <React.Fragment key={index}>
                                          {item?.AnimalProductStatus === status.value ? status.text : ''}
                                        </React.Fragment>
                                      ))
                                  }
                                </span>
                                <div className="delete">
                                  <DropdownButton
                                    title={
                                      <img src={Img.dropdown} alt="Img.dropdown" />
                                    }
                                    id="dropdown-menu"
                                    variant="outline-success"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    onSelect={(eventKey) =>
                                      handleActionSelect(
                                        item.IDAnimalProduct,
                                        eventKey
                                      )
                                    }
                                    className="DropdownButton "
                                    drop={"down-centered"}
                                  >
                                    {
                                      translate[isLang]?.FilterStatus?.filter?.((item) => item.value !== "All")?.map((Status, index) => (
                                        <>
                                          {item?.AnimalProductStatus === Status.value ? (
                                            ""
                                          ) : (
                                            <Dropdown.Item eventKey={Status.value} className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"}>
                                              {Status.text}
                                            </Dropdown.Item>
                                          )}
                                        </>
                                      ))
                                    }
                                  </DropdownButton>
                                </div>
                              </div>
                              {
                                item?.AnimalProductRejectReason &&
                                <div className="app__reason">
                                  <a onClick={() => handleModalOpenReason(item?.IDAnimalProduct)} >Reason</a>
                                </div>
                              }
                            </div>
                          </td>

                          <Modal
                            show={modalShowReason && modalIndexReason === item.IDAnimalProduct}
                            onHide={handleModalCloseReason}
                            centered
                            dir={isLang === 'ar' ? 'rtl' : 'ltr'}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title className='  w-100 '>  Reason</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="d-flex justify-content-center align-items-center gap-1 flex-column" >
                              <textarea className="form-control" rows="5" defaultValue={item?.AnimalProductRejectReason} />

                            </Modal.Body>
                            <Modal.Footer className="d-flex justify-content-center align-items-center">

                              <Button onClick={handleModalCloseReason}    >
                                Cancel
                              </Button>
                            </Modal.Footer>
                          </Modal>

                          <Modal
                            show={modalShow && modalIndex === item.IDAnimalProduct}
                            onHide={handleModalClose}
                            centered
                            dir={isLang === 'ar' ? 'rtl' : 'ltr'}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title className='  w-100 '> Reject Reason</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="d-flex justify-content-center align-items-center gap-1 flex-column" >

                              <textarea className="form-control" rows="5" ref={reasonRef} />

                            </Modal.Body>
                            <Modal.Footer className="d-flex justify-content-center align-items-center">

                              <Button variant="danger" style={{ border: '#dc3545' }} onClick={() => reasonReject(item.IDAnimalProduct, 'REJECTED')} >
                                set  Reason
                              </Button>
                              <Button variant="outline-primary" onClick={handleModalClose}>
                                Cancel
                              </Button>
                            </Modal.Footer>
                          </Modal>
                          <td>
                            <div
                              className="d-flex flex-column justify-content-center align-content-center"
                              style={{ gap: "0" }}
                            >
                              <span className="ClientName">
                                {" "}
                                {item?.BiddingStartDate.split(" ")[0]}{" "}
                              </span>
                              <span className="ClientPhone">
                                {" "}
                                {item?.BiddingStartDate.split(" ")[1]}
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
                                {item?.BiddingEndDate.split(" ")[0]}{" "}
                              </span>
                              <span className="ClientPhone">
                                {" "}
                                {item?.BiddingEndDate.split(" ")[1]}
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
                              <Link
                                to={`/bidding/details/${item?.IDAnimalProduct}`}
                              >
                                <img src={Img.view} alt='img view' />
                              </Link>
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
      <div className="pagination " dir="ltr">
        {
          pageCount &&
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
        }
      </div>
    </>

  );
}

export default Bidding
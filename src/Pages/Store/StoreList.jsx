import { Pagination, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Col, Dropdown, DropdownButton, Form, Row, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Img from "../../assets/Img";
import Component from "../../constants/Component";
import Icons from "../../constants/Icons";
import useFetch from "../../utils/useFetch";
import useSkeletonTable from "../../utils/useSkeletonTable";
import { apiheader, PostData } from "./../../utils/fetchData";

const StoreList = () => {
    let { SkeletonTable } = useSkeletonTable();

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
            { IDPage: page },
            apiheader
        ).then(({ data }) => {
            setAnimal(data.Response.AnimalProducts);
            setPagesNumber(data.Response.Pages);
            const timeoutId = setTimeout(() => {
                setIsloader(true)
            }, 200);
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
    // ToDo::change Blogs status
    const handleActionSelect = async (id, action) => {
        if (
            action === "PENDING" ||
            action === "ACTIVE" ||
            action === "CANCELLED" ||
            action === "SOLD" ||
            action === "REJECTED" ||
            action === "RESERVED"
        ) {
            await ChangeStoreStatus({
                IDAnimalProduct: id,
                AnimalProductStatus: action,
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
            await store();
        }
        await store();
    };
    const ChangeStoreStatus = async (blog) => {
        return await PostData(
            `${process.env.REACT_APP_API_URL}/admin/animalproducts/status`,
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
            store(page)
        }
        setSearchValue(event.target.value);
        searchGetData(event.target.value);
    };
    const searchGetData = async (searchValue) => {

        let { data } = await PostData(`https://bytrh.com/api/admin/animalproducts`, { IDPage: page, SearchKey: searchValue }, apiheader)
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
                await axios.post(`${process.env.REACT_APP_API_URL}/admin/animalproducts`, { IDPage: page, IDCountry: selectedCountryId }, apiheader).then((res) => {
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
            return true
        } else {
            getAreas(city)
            try {
                await axios.post(`${process.env.REACT_APP_API_URL}/admin/animalproducts`, { IDPage: page, IDCity: city }, apiheader).then((res) => {
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
                await axios.post(`${process.env.REACT_APP_API_URL}/admin/animalproducts`, { IDPage: page, IDArea: city }, apiheader).then((res) => {
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
            await axios.post(`${process.env.REACT_APP_API_URL}/admin/animalproducts`, { IDPage: page, AnimalProductType: AnimalProductType }, apiheader).then((res) => {
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
            await axios.post(`${process.env.REACT_APP_API_URL}/admin/animalproducts`, { IDPage: page, IDAnimalSubCategory: AnimalProductType }, apiheader).then((res) => {
                if (res.status === 200 && res.request.readyState === 4) {
                    setAnimal(res.data.Response.AnimalProducts);
                    setPagesNumber(res.data.Response.Pages);
                }
            })
        }
    }

    // !Filter by    Animal Product Status
    const statusRef = useRef(null);
    const handelanimalProductStatus = async () => {
        let animalProductStatus = statusRef.current.value
        if (animalProductStatus === 'All') {
            store()
        } else if (animalProductStatus === 'Select Status') {
            return false
        } else {
            await axios.post(`${process.env.REACT_APP_API_URL}/admin/animalproducts`, { IDPage: page, AnimalProductStatus: animalProductStatus }, apiheader).then((res) => {
                if (res.status === 200 && res.request.readyState === 4) {
                    setAnimal(res.data.Response.AnimalProducts);
                    setPagesNumber(res.data.Response.Pages);
                }
            })
        }
    }

    useEffect(() => {
        store(page);
        animalSubCategoryGet()
        window.scrollTo(0, 0);
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
                        <div className='search__group w-100'>

                            {isLoader ? <>
                                <div className='search__group'>
                                    <input type="text" placeholder="Search by client name or email....." name="search" value={searchValue} onChange={handleInputChange} />
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
                                                    <option >Select Country</option>
                                                    <option value={'country'} >Countries</option>

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
                                                    <option >Select city</option>

                                                    <option value={'cities'} >Cities</option>

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
                                                    <option >Select Area</option>

                                                    <option value={'Areas'} >Areas</option>

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
                                                    <option >Select Product Type</option>

                                                    <option value={'All'}  >Animals Product Type</option>
                                                    {
                                                        ['SINGLE', 'GROUP']?.map((item, index) => (
                                                            <option key={index} value={item}  >{item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}</option>
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
                                                    <option >Select Status</option>

                                                    <option value={'All'}  > All Status</option>
                                                    {
                                                        ['PENDING', 'ACTIVE', 'CANCELLED', 'SOLD', 'REJECTED', 'RESERVED']?.map((item, index) => (
                                                            <option key={index} value={item}  >{item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}</option>
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
                                                    <option >Select SubCategory</option>
                                                    <option value={'All'}  >Animal SubCategory</option>
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
                        <>
                            {
                                animal.length > 0 ?
                                <Table responsive={true} className="rounded-3 ">
                                <thead>
                                    <tr className="text-center  " style={{ background: "#F9F9F9" }} >
                                        <th >  Product Image    </th>
                                        <th >Client Info  </th>
                                        <th > SubCategory    </th>
                                        <th > Price    </th>
                                        <th > Type  </th>
                                        <th > Status  </th>
                                        <th >Create Date  </th>
                                        <th >View  </th>

                                    </tr>
                                </thead>
                                <tbody className="text-center">
                         
                                                {animal?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div style={{ maxWidth: "170px" }}>
                                                                <img
                                                                    src={item?.AnimalProductImage}
                                                                    className="w-100 rounded-3"
                                                                    alt={item?.AnimalProductTypeName}
                                                                    loading="lazy"
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
                                                                    {item?.AnimalProductPrice} SAR
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
                                                            <div className="blog__status">
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
                                                                > {item?.AnimalProductStatus.charAt(0).toUpperCase() + item?.AnimalProductStatus.slice(1).toLowerCase()}
                                                                </span>
                                                                <div className="delete">
                                                                    <DropdownButton
                                                                        title={
                                                                            <img src={Img.dropdown} loading="lazy" alt={'img dropdown'} />
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
                                                                        {item?.AnimalProductStatus === "PENDING" ? (
                                                                            ""
                                                                        ) : (
                                                                            <Dropdown.Item eventKey="PENDING">
                                                                                Pending
                                                                            </Dropdown.Item>
                                                                        )}
                                                                        {item?.AnimalProductStatus === "ACTIVE" ? (
                                                                            ""
                                                                        ) : (
                                                                            <Dropdown.Item eventKey="ACTIVE">
                                                                                Active
                                                                            </Dropdown.Item>
                                                                        )}
                                                                        {item?.AnimalProductStatus === "CANCELLED" ? (
                                                                            ""
                                                                        ) : (
                                                                            <Dropdown.Item eventKey="CANCELLED">
                                                                                Cancelled
                                                                            </Dropdown.Item>
                                                                        )}
                                                                        {item?.AnimalProductStatus === "SOLD" ? (
                                                                            ""
                                                                        ) : (
                                                                            <Dropdown.Item eventKey="SOLD">
                                                                                Sold
                                                                            </Dropdown.Item>
                                                                        )}
                                                                        {item?.AnimalProductStatus === "REJECTED" ? (
                                                                            ""
                                                                        ) : (
                                                                            <Dropdown.Item eventKey="REJECTED">
                                                                                Rejected
                                                                            </Dropdown.Item>
                                                                        )}
                                                                        {item?.AnimalProductStatus === "RESERVED" ? (
                                                                            ""
                                                                        ) : (
                                                                            <Dropdown.Item eventKey="RESERVED">
                                                                                Reserved
                                                                            </Dropdown.Item>
                                                                        )}
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
                                                                <Link
                                                                    to={`/store/details/${item?.IDAnimalProduct}`}
                                                                >
                                                                    <img src={Img.view} loading="lazy" alt='img view' />
                                                                </Link>
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

    );
};

export default StoreList;

import { Pagination, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Dropdown, DropdownButton, Form, Row, Table, Modal, Button } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Img from "../../../assets/Img";
import Icons from '../../../constants/Icons';
import { VendersContext } from '../../../context/Store';
import { apiheader, PostData } from '../../../utils/fetchData';
import useSkeletonTable from '../../../utils/useSkeletonTable';
import initialTranslation from "./Translation";
import Component from "../../../constants/Component";
import ExcelSheet from "./ExcelSheet";
import axios from "axios";
import useFetch from "../../../utils/useFetch";

const BlogClient = () => {
    let { isLang } = useContext(VendersContext);
    const [translate, setTranslate] = useState(initialTranslation)
    const handelTranslate = () => {
        setTranslate(initialTranslation)
    }
    const animalRef = useRef();

    const [blogs, setBlogs] = useState(null)
    const [PagesNumber, setPagesNumber] = useState('')
    const [page, setPage] = useState(1);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoader, setIsloader] = useState(false);
    let { SkeletonTable, SkeletonSearchsingel, SkeletonFilterBlogs } = useSkeletonTable();

    const BlogsList = async () => {
        await PostData(`${process.env.REACT_APP_API_URL}/admin/clients/blogs`, { IDPage: page }, apiheader).then(({ data }) => {
            setBlogs(data.Response.ClientBlogs)
            setPagesNumber(data.Response.Pages);
            const timeoutId = setTimeout(() => {
                setIsloader(true)
            }, 0);
            return () => clearTimeout(timeoutId);
        }).catch((error) => {
            if (error.response && error.response.status === 429) {
                const retryAfter = error.response.headers['retry-after'];
                setTimeout(() => {
                    BlogsList();
                }, (retryAfter || 60) * 1000);
            }
        })
    }
    // !pagination
    const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;
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
        if (action === "PENDING" || action === "POSTED" || action === "REMOVED") {
            await ChangeBlogsStatus({ IDClientBlog: id, BlogStatus: action }).then((res) => {
                toast.success(<strong>{translate[isLang]?.blogDetails?.toastUpdate}</strong>, {
                    duration: 4000,
                    position: 'bottom-center',
                    // icon: <Icons.UploadItem color='#3182CE' size={20} />,
                    iconTheme: {
                        primary: '#3182CE',
                        secondary: '#fff',
                    },
                });
            })
            await BlogsList()
        }
        else if (action === "REJECTED") {
            handleModalOpen(id)

        }
    }
    //!Modal 
    function handleModalClose() {
        setModalShow(false);
    }
    function handleModalOpen(index) {

        setModalIndex(index);
        setModalShow(true);
    }
    const reasonReject = async (id, action) => {
        await ChangeBlogsStatus({
            IDClientBlog: id,
            BlogStatus: action,
            BlogRejectionReason: reasonRef.current.value,
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
            setModalShow(false)
        });
        await BlogsList();
    }
    const ChangeBlogsStatus = async (blog) => {
        return await PostData(`${process.env.REACT_APP_API_URL}/admin/clients/blogs/status`, blog, apiheader)
    }

    // **filter and search
    const [selectedOption, setSelectedOption] = useState('All');
    const [searchBlog, setSearchBlog] = useState('');
    const handleInputChange = (event) => {
        setSearchBlog(event.target.value);
        if (event.target.value === '') {
            BlogsList(page)
        }
    };
    const handleSearchClick = () => searchGetBlog(searchBlog)

    const searchGetBlog = async (searchValue) => {
        let { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/clients/blogs`, { IDPage: page, SearchKey: searchValue }, apiheader)
        setBlogs(data.Response.ClientBlogs)
        setPagesNumber(data.Response.Pages);

    }
    // ToDo::Filter radio btn Blogs status
    // const handleOptionChange = async (event) => {
    //     const selectedValue = event.target.value;
    //     setSelectedOption(selectedValue);
    //     if (selectedValue === "PENDING" || selectedValue === "REJECTED" || selectedValue === "POSTED" || selectedValue === "REMOVED") {
    //         let { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/clients/blogs`, { IDPage: page, BlogStatus: selectedValue }, apiheader)
    //         setBlogs(data.Response.ClientBlogs)
    //         setPagesNumber(data.Response.Pages);

    //     } else if (selectedValue === "All") {
    //         BlogsList()
    //     }
    // };
    // ToDo::Filter by ID Animal Category
    const [animal, setAnimal] = useState(null)

    const animalcategories = async () => {
        let { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/animalcategories`, { IDPage: page }, apiheader)
        setAnimal(data.Response.AnimalCategories)
    }

    const handelSelectAnimalCategory = async (event) => {
        const selectedCountryId = event.target.value;
        if (selectedCountryId === "All") {
            BlogsList()
        } else if (selectedCountryId === 'Select Category') {
            return false
        } else {
            await animalcategories()
            let { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/clients/blogs`, { IDPage: page, IDAnimalCategory: selectedCountryId }, apiheader)
            setBlogs(data.Response.ClientBlogs)
            setPagesNumber(data.Response.Pages);

        }
    }
    // !Filter by city and country and area  
    let { countries, areas, cities, getCities, getAreas } = useFetch()
    const cityRef = useRef(null);
    const countryRef = useRef(null);
    const areaRef = useRef(null);
    const handelSelectCountry = async (event) => {
        const selectedCountryId = event.target.value;
        if (selectedCountryId === 'country') {
            BlogsList(page)
        } else if (selectedCountryId === 'Select Country') {
            return false
        } else {
            getCities(selectedCountryId)
            try {
                await axios.post(`${process.env.REACT_APP_API_URL}/admin/clients/blogs`, { IDPage: page, IDCountry: selectedCountryId }, apiheader).then((res) => {
                    if (res.status === 200 && res.request.readyState === 4) {
                        setBlogs(res.data.Response.ClientBlogs)
                        setPagesNumber(res.data.Response.Pages);
                    }
                })
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    const retryAfter = error.response.headers['retry-after'];
                    setTimeout(() => {
                        BlogsList();
                    }, (retryAfter || 30) * 1000);
                }
            }
        }
    }
    const handelSelectCity = async () => {
        let city = cityRef.current.value
        if (city === 'cities') {
            BlogsList(page)
        } else if (city === 'Select city') {
            return false
        } else {
            getAreas(city)
            try {
                await axios.post(`${process.env.REACT_APP_API_URL}/admin/clients/blogs`, { IDPage: page, IDCity: city }, apiheader).then((res) => {
                    if (res.status === 200 && res.request.readyState === 4) {
                        setBlogs(res.data.Response.ClientBlogs)
                        setPagesNumber(res.data.Response.Pages);
                    }
                })
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    const retryAfter = error.response.headers['retry-after'];
                    setTimeout(() => {
                        BlogsList(page);
                    }, (retryAfter || 30) * 1000);
                }
            }
        }
    }
    const handelSelectArea = async () => {
        let city = areaRef.current.value
        if (city === 'Areas') {
            BlogsList(page)
        } else if (city === 'Select Area') {
            return false
        } else {
            try {
                await axios.post(`${process.env.REACT_APP_API_URL}/admin/clients/blogs`, { IDPage: page, IDArea: city }, apiheader).then((res) => {
                    if (res.status === 200 && res.request.readyState === 4) {
                        setBlogs(res.data.Response.ClientBlogs)
                        setPagesNumber(res.data.Response.Pages);
                    }
                })
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    const retryAfter = error.response.headers['retry-after'];
                    setTimeout(() => {
                        BlogsList(page);
                    }, (retryAfter || 30) * 1000);
                }
            }
        }
    }
    // ToDo::Filter dropdown Blogs status 
    const statusRef = useRef(null);
    const handelBlogsStatus = async () => {
        let BlogsStatus = statusRef.current.value
        if (BlogsStatus === 'All') {
            BlogsList(page)
        } else if (BlogsStatus === 'Select Status') {
            return false
        } else {
            await axios.post(`${process.env.REACT_APP_API_URL}/admin/clients/blogs`, { IDPage: page, BlogStatus: BlogsStatus }, apiheader).then((res) => {
                if (res.status === 200 && res.request.readyState === 4) {
                    setBlogs(res.data.Response.ClientBlogs)
                    setPagesNumber(res.data.Response.Pages);
                }
            })
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        handelTranslate()
        
        const timeoutId = setTimeout(() => {
            BlogsList(page)
            animalcategories()
        }, 100);
        return () => clearTimeout(timeoutId);
    
    }, [page,isLang])
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
                <div className="app__Users-table ">
                    <div className="search-container">
                        {isLoader ? <>
                            <div className={`${isLang === 'ar' ? ' search__groupAr  ' : 'search__group'}  `}>
                                <input type="text" placeholder={translate[isLang]?.placeholder} name="search" value={searchBlog} onChange={handleInputChange} />
                                <button type="submit" onClick={handleSearchClick}>
                                    <Icons.Search color='#fff' size={25} />
                                </button>
                            </div>
                        </> : SkeletonSearchsingel(40, "100%")}
                    </div>
                    <div className="app__addOrder-form  overflow-hidden">
                        {/* <Row> */}
                        {/*       <Col xl={6} lg={6} md={6} sm={12} xs={12} >
                                <div className='filter__group__stats row ' style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
                                    {
                                        translate[isLang]?.FilterStatus?.map((item, index) => (
                                            <React.Fragment key={index}>
                                                {isLoader ? <>
                                                    <label className='col active d-flex justify-content-center align-item-center m-0 p-0 '  >
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
                                                </> :
                                                    <label className='col active d-flex justify-content-center align-item-center m-0 p-0 '>

                                                        {SkeletonFilterBlogs(10, 90)}
                                                    </label>
                                                }

                                            </React.Fragment>
                                        ))
                                    }

                                </div>
                            </Col> */}
                        {/*  </Row> */}

                        <Row className='d-flex  flex-row justify-content-between'>
                            <Col xl={4} lg={4} md={6} sm={12} className='mt-2' >
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

                            <Col xl={4} lg={4} md={6} sm={12} className='mt-2'>
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

                            <Col xl={4} lg={4} md={6} sm={12} className='mt-2'>
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



                        <Row className="mt-2">
                            <Col xl={6} lg={6} md={6} sm={12} className='mt-2'>

                                {isLoader ? <>
                                    <Form.Group controlId="formBasicEmail"  >
                                        <Form.Select aria-label="Default select example" ref={statusRef} onClick={handelBlogsStatus} >
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
                            <Col xl={6} lg={6} md={6} sm={12} xs={12} className='mt-2' >
                                {isLoader ? <>
                                    <Form.Select aria-label="Default select example" ref={animalRef} onClick={handelSelectAnimalCategory}>
                                        <option selected disabled hidden value={'Select Category'}> {translate[isLang]?.filter?.Category}</option>
                                        <option value={'All'}  >{translate[isLang]?.filter?.allCategory}  </option>
                                        {
                                            animal?.map((item, index) => (
                                                <option key={index} value={item?.IDAnimalCategory}>{item?.AnimalCategoryName}</option>
                                            ))
                                        }
                                        {/* <option value="0">InActive</option> */}
                                    </Form.Select>
                                </> : SkeletonFilterBlogs()}


                            </Col>
                        </Row>
                    </div>
                    <ExcelSheet />
                    {isLoader ? <>
                        {
                            blogs?.length > 0 ?
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
                                            blogs?.map((item, index) => (
                                                <tr key={index}>

                                                    <td >
                                                        <div>
                                                            {item?.ClientName}
                                                        </div>
                                                    </td>

                                                    <td >
                                                        <div>
                                                            {item?.BlogTitle}
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div>
                                                            {item?.AnimalCategory}
                                                        </div>
                                                    </td>
                                                    <td >

                                                        <div className='blog__status d-flex flex-column justify-content-center '>
                                                            <div className='blog__status d-flex flex-row'>
                                                                <span style={{ height: 'fit-content !important' }} className={`
                                                                ${item.BlogStatus == 'PENDING' && 'txt_pending'} 
                                                                ${item.BlogStatus == 'REJECTED' && 'txt_rejected'} 
                                                                ${item.BlogStatus == 'POSTED' && 'txt_delivered'}
                                                                ${item.BlogStatus == 'REMOVED' && 'txt_cancel'}`} >
                                                                    {
                                                                        translate[isLang].FilterStatus?.filter((itemfilter) => itemfilter.value === item?.BlogStatus)
                                                                            .map((status, index) => (
                                                                                <React.Fragment key={index}>
                                                                                    {item?.BlogStatus === status.value ? status.text : ''}
                                                                                </React.Fragment>
                                                                            ))
                                                                    }
                                                                </span>
                                                                <div className="delete">
                                                                    <DropdownButton
                                                                        title={<Icons.dotes size={20} />}
                                                                        id="dropdown-menu"
                                                                        variant="outline-success"
                                                                        onClick={() => setShowDropdown(!showDropdown)}
                                                                        onSelect={(eventKey) => handleActionSelect(item.IDClientBlog, eventKey)}
                                                                        className="DropdownButton "
                                                                        drop={'down-centered'}
                                                                    >
                                                                        {
                                                                            item.BlogStatus === 'PENDING' &&
                                                                            <>
                                                                                <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey="POSTED">{translate[isLang].FilterStatus[3].text2}</Dropdown.Item>
                                                                                <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey="REJECTED">{translate[isLang].FilterStatus[2].text2}</Dropdown.Item>
                                                                            </>
                                                                        }
                                                                        {
                                                                            item.BlogStatus === 'REJECTED' &&
                                                                            <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey="POSTED">{translate[isLang].FilterStatus[3].text2}</Dropdown.Item>
                                                                        }
                                                                        {
                                                                            item.BlogStatus === 'REMOVED' &&
                                                                            <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey="POSTED">{translate[isLang].FilterStatus[3].text2}</Dropdown.Item>
                                                                        }
                                                                        {
                                                                            item.BlogStatus === 'POSTED' &&
                                                                            <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey="REMOVED">{translate[isLang].FilterStatus[4].text2}</Dropdown.Item>
                                                                        }



                                                                    </DropdownButton>

                                                                </div>
                                                            </div>
                                                            {
                                                                item?.BlogRejectionReason &&
                                                                <div className="app__reason">
                                                                    <a onClick={() => handleModalOpenReason(item?.IDClientBlog)} >Reason</a>
                                                                </div>
                                                            }
                                                        </div>
                                                    </td>
                                                    <Modal
                                                        show={modalShowReason && modalIndexReason === item.IDClientBlog}
                                                        onHide={handleModalCloseReason}
                                                        centered
                                                        dir={isLang === 'ar' ? 'rtl' : 'ltr'}
                                                    >
                                                        <Modal.Header closeButton>
                                                            <Modal.Title className='  w-100 '>  Reason</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body className="d-flex justify-content-center align-items-center gap-1 flex-column" >
                                                            <textarea className="form-control" rows="5" defaultValue={item?.BlogRejectionReason} />

                                                        </Modal.Body>
                                                        <Modal.Footer className="d-flex justify-content-center align-items-center">

                                                            <Button onClick={handleModalCloseReason}    >
                                                                Cancel
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                    <Modal
                                                        show={modalShow && modalIndex === item.IDClientBlog}
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

                                                            <Button variant="danger" style={{ border: '#dc3545' }} onClick={() => reasonReject(item.IDClientBlog, 'REJECTED')} >
                                                                Set Reason
                                                            </Button>
                                                            <Button variant="outline-primary" onClick={handleModalClose}>
                                                                Cancel
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>

                                                    <td >
                                                        <div>
                                                            <span   >
                                                                {item?.BlogVisibility.charAt(0).toUpperCase() + item?.BlogVisibility.slice(1).toLowerCase()}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className='d-flex justify-content-center align-item-center m-0 p-0 flex-column gap-0' >
                                                            <span   > {item?.BlogDate.split(' ')[0]}  </span>
                                                            <span className='ClientPhone'> {item?.BlogDate.split(' ')[1]}  </span>
                                                        </div>
                                                    </td>

                                                    <td >
                                                        <div className='d-flex' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                                            <div className=' d-flex justify-content-center align-item-center gap-3' >
                                                                <span><Icons.like size={19} color='#3182CE' /> </span><span>{item?.BlogLikes}</span>
                                                            </div>
                                                            <div className=' d-flex justify-content-center align-item-center gap-3' >
                                                                <span><Icons.comments size={19} color='#40AB45' /> </span><span>{item?.BlogComments}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div>
                                                            <Link to={`/blogs/client/details/${item?.IDClientBlog}`}>
                                                                <img src={Img.view} />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>

                                </Table> :
                                <Component.DataNotFound />
                        }
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

export default BlogClient

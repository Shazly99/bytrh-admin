import { Pagination, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import axios from 'axios';
import $ from 'jquery';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import { VendersContext } from '../../../context/Store';
import { apiheader } from '../../../utils/fetchData';
import useFetch from '../../../utils/useFetch';
import useSkeletonTable from '../../../utils/useSkeletonTable';
import ItemAdoption from '../Adoption/ItemAdoption';
import ExcelSheet from './ExcelSheet';
import initialTranslation from "./Translation";



export default function Adoption() {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslation)

  let { SkeletonExcel } = useSkeletonTable();

  const URL_Adoption = `https://bytrh.com/api/admin/adoptions`;

  const [pagesCountAdoption, setPagesCountAdoption] = useState(0);
  const [countAdoption, setCountAdoption] = useState(1);
  const [searchKeyAdoption, setSearchKeyAdoption] = useState(null);
  const [loadingAdoption, setLoadingAdoption] = useState(false)
  const [fetchAdoption, setFetchAdoption] = useState([])

  async function getTokenAdoption() {
    setLoadingAdoption(true);
    await axios.post(URL_Adoption, {
      IDPage: countAdoption,
      SearchKey: searchKeyAdoption
    }, apiheader)
      .then(res => {
        setFetchAdoption(res.data.Response.Adoptions);
        setPagesCountAdoption(res.data.Response.Pages);
        setLoadingAdoption(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }




  const handleChange = (event, value) => {
    setCountAdoption(value);
  };

  const [valueSearch, setValueSearch] = useState('')

  const handelSearch = () => {
    setSearchKeyAdoption(valueSearch);
    setCountAdoption(1);
  }

  const handelClickSearch = (e) => {
    if (e.keyCode === 13) {
      handelSearch();
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
    // Reset filters
    cityRef.current.value = 'Select city';
    areaRef.current.value = 'Select Area';
    countryRef.current.value = 'Select Country';
    statusRef.current.value = 'Select Status';
 

    let AnimalProductType = animalSubCategoryRef.current.value

    if (AnimalProductType === 'All') {
      getTokenAdoption()
    } else if (AnimalProductType === 'Select SubCategory') {
      return false
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/adoptions`, { IDPage: countAdoption, IDAnimalSubCategory: AnimalProductType }, apiheader).then((res) => {
        if (res.status === 200 && res.request.readyState === 4) {
          setFetchAdoption(res.data.Response.Adoptions);
          setPagesCountAdoption(res.data.Response.Pages);
        }
      })
    }
  }

  // !Filter by city and country and area  
  let { countries, areas, cities, getCities, getAreas } = useFetch()
  const cityRef = useRef(null);
  const countryRef = useRef(null);
  const areaRef = useRef(null);
  const handelSelectCountry = async (event) => {
    cityRef.current.value = 'Select city';
    areaRef.current.value = 'Select Area';
    statusRef.current.value = 'Select Status';
    animalSubCategoryRef.current.value = 'Select Category';

    let selectedCountryId = countryRef.current.value
    if (selectedCountryId === 'country') {
      getTokenAdoption()
    } else if (selectedCountryId === 'Select Country') {
      return false
    } else {
      getCities(selectedCountryId)
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/adoptions`, { IDPage: countAdoption, IDCountry: selectedCountryId }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setFetchAdoption(res.data.Response.Adoptions)
            setPagesCountAdoption(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            getTokenAdoption();
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }
  const handelSelectCity = async () => {
    areaRef.current.value = 'Select Area';
    statusRef.current.value = 'Select Status';
    animalSubCategoryRef.current.value = 'Select Category';

    let city = cityRef.current.value
    if (city === 'cities') {
      getTokenAdoption()
    } else if (city === 'Select city') {
      return false
    } else {
      getAreas(city)
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/adoptions`, { IDPage: countAdoption, IDCity: city }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setFetchAdoption(res.data.Response.Adoptions)
            setPagesCountAdoption(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            getTokenAdoption();
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }
  const handelSelectArea = async () => {
    statusRef.current.value = 'Select Status';
    animalSubCategoryRef.current.value = 'Select Category';

    let city = areaRef.current.value
    if (city === 'Areas') {
      getTokenAdoption()
    } else if (city === 'Select Area') {
      return false
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/adoptions`, { IDPage: countAdoption, IDArea: city }, apiheader).then((res) => {
          if (res.status === 200 && res.request.readyState === 4) {
            setFetchAdoption(res.data.Response.Adoptions)
            setPagesCountAdoption(res.data.Response.Pages);
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(() => {
            getTokenAdoption();
          }, (retryAfter || 30) * 1000);
        }
      }
    }
  }
  // ToDo::Filter dropdown Blogs status 
  const statusRef = useRef(null);
  const handelBlogsStatus = async () => {
    cityRef.current.value = 'Select city';
    areaRef.current.value = 'Select Area';
    countryRef.current.value = 'Select Country';
    animalSubCategoryRef.current.value = 'Select Category';

    let BlogsStatus = statusRef.current.value
    if (BlogsStatus === 'All') {
      getTokenAdoption()
    } else if (BlogsStatus === 'Select Status') {
      return false
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/adoptions`, { IDPage: countAdoption, AdoptionStatus: BlogsStatus }, apiheader).then((res) => {
        if (res.status === 200 && res.request.readyState === 4) {
          setFetchAdoption(res.data.Response.Adoptions)
          setPagesCountAdoption(res.data.Response.Pages);
        }
      })
    }
  }
  const SkeletonFilter = () => {
    return (
      <div className="d-flex flex-column  gap-2 mt-2">
        <Skeleton variant='rounded' animation='wave' height={15} width={'60%'} />
        <Skeleton variant='rounded' animation='wave' height={26} width={'100%'} />
      </div>
    )
  }
  useEffect(() => {
    $('html , body').animate({ scrollTop: 0 }, 100);
    let timeOut = setTimeout(() => {
      animalSubCategoryGet()
      getTokenAdoption();
    }, 100);

    return (() => {
      clearTimeout(timeOut);
    })
  }, [countAdoption, searchKeyAdoption, URL_Adoption, isLang]);

 

  return (
    <>

      <Container fluid>
        <section className='   app__doctor  position-relative'>
          <div className="search-container my-4">
            <div className={`${isLang === 'ar' ? ' search__groupAr  ' : 'search__group'}`}>
              <input
                value={localStorage.getItem('searchAdoption') ? localStorage.getItem('searchAdoption') : ''}
                onChange={(e) => {
                  localStorage.setItem('searchAdoption', e.target.value);
                  setValueSearch(e.target.value);
                }}
                onKeyDown={handelClickSearch}
                type="text" placeholder={isLang === 'ar' ? 'البحث بإسـم العميـل..' : 'Search by client name'} name="search" />
              <button type="submit" onClick={() => {
                localStorage.removeItem('searchAdoption');

              }}>
                <Icons.Search onClick={handelSearch} color='#fff' size={25} />
              </button>
            </div>
          </div>
          <div className="app__addOrder-form  overflow-hidden">
         
            <Row className='d-flex  flex-row justify-content-between'>
              <Col xl={2} lg={2} md={6} sm={12} className='mt-2' >
                {!loadingAdoption ? <>
                  <Form.Group controlId="formBasicEmail" >
                    <Form.Select aria-label="Default select example" size="sm" onChange={handelSelectCountry} ref={countryRef}>
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
                {!loadingAdoption ? <>
                  <Form.Group controlId="formBasicEmail"   >
                    <Form.Select aria-label="Default select example" size="sm" onChange={handelSelectCity} ref={cityRef}>
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
                {!loadingAdoption ? <>
                  <Form.Group controlId="formBasicEmail"   >
                    <Form.Select aria-label="Default select example" size="sm" onChange={handelSelectArea} ref={areaRef}>
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

                {!loadingAdoption ? <>
                  <Form.Group controlId="formBasicEmail"  >
                    <Form.Select aria-label="Default select example" ref={statusRef} size="sm" onChange={handelBlogsStatus} >
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
                {!loadingAdoption ? <>
                  <Form.Group controlId="formBasicEmail"  >
                    <Form.Select aria-label="Default select example" ref={animalSubCategoryRef} size="sm" onChange={handelanimalSubCategory} >
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



            <Row className="mt-2">
            </Row>
          </div>
          {loadingAdoption ?
            // <Loader />
            <Component.DataNotFound /> :
            <div className="total-table">

              {Object.keys(fetchAdoption).length > 0 ?
                <>
                  {!loadingAdoption ? <>
                    <ExcelSheet fetchAdoption={fetchAdoption} />
                  </>
                    : SkeletonExcel(40, "100%")}
                  <div className="app__Users-table  ">
                    <Table responsive={true} className='rounded-3 '>
                      <thead className="table-light bg-input">
                        <tr>
                          <th scope="col">{isLang === 'ar' ? 'صـورة الحيـوان' : 'Pet Image'}</th>
                          <th scope="col">{isLang === 'ar' ? 'اسـم الحيـوان' : 'Pet Name'}</th>
                          <th scope="col">{isLang === 'ar' ? 'السلالـة' : 'Pet Strain'}</th>
                          <th scope="col">{isLang === 'ar' ? 'الفئــة' : 'Category'}</th>
                          <th scope="col">{isLang === 'ar' ? 'المدينــة' : 'City'}</th>
                          <th scope="col">{isLang === 'ar' ? 'اســم العميــل' : 'Client Name'}</th>
                          <th scope="col">{isLang === 'ar' ? 'الحالــة' : 'Status'}</th>
                          <th scope="col">{isLang === 'ar' ? 'الإجـراء' : 'Action'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fetchAdoption.map((item, i) => (
                          <ItemAdoption
                            key={i}
                            id={item.IDAdoption}
                            clientName={item.ClientName}
                            petName={item.PetName}
                            petStrain={item.PetStrain}
                            petPicture={item.PetPicture}
                            cityName={item.CityName}
                            cate={item.AnimalSubCategoryName}
                            status={item.AdoptionStatus}
                            Reason={item?.AdoptionRejectReason}
                            getTokenAdoption={getTokenAdoption}
                          />
                        ))
                        }
                      </tbody>
                    </Table>
                  </div>

                  <div className="pagination mt-2" dir="ltr">
                    {
                      pagesCountAdoption &&
                      <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
                        <Pagination count={pagesCountAdoption} page={countAdoption} onChange={handleChange} />
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



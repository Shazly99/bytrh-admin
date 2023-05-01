import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Component from '../../constants/Component';
import { VendersContext } from '../../context/Store';
import { GetData, PostData, apiheader } from '../../utils/fetchData';
import useFetch from './../../utils/useFetch';
import translateADS from './translateAds';


const EditAds = () => {
  let { id } = useParams()
  let { isLang } = useContext(VendersContext);
  let navigate = useNavigate();

  // let { countries, cities, getCities } = useContext(VendersContext);
  let { countries, cities, areas, getCities, getAreas } = useFetch()

  //TODO:: start date end date use ref   
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const selectCity = useRef();
  const countryRef = useRef();
  const areaRef = useRef(null);

  const doctorRef = useRef(null);
  const AdsService = useRef(null);
  const AdsLocation = useRef(null);
  //** Doctor list
  const [data, setData] = useState({
    doctor: null,
    blog: null,
    blogDoc: null,
    adoption: null,
    animalproducts: null

  });
  const [displayLink, setdisplayLink] = useState(false);
  const [SelectService, setSelectService] = useState(null);

  const handelSelectService = async (event) => {
    const service = event.target.value;
    if (service === 'NONE') {
      setSelectService(service)
      setData({
        doctor: null,
        blog: null,
        blogDoc: null,
        adoption: null,
        animalproducts: null

      });
      setdisplayLink(false)

    } else if (service === 'URGENT_CONSULT' || service === 'CONSULT') {
      const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/doctors/ajax`, {}, apiheader);
      setData({
        doctor: data.Response,
        blog: null,
        blogDoc: null,
        adoption: null,
        animalproducts: null

      });
      setdisplayLink(true)

    } else if (service === 'CLIENT_BLOG') {
      const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/clients/blogs/ajax`, {}, apiheader);
      setData({
        doctor: null,
        blog: data.Response,
        blogDoc: null,
        adoption: null,
        animalproducts: null

      });
      setdisplayLink(true)

    } else if (service === 'DOCTOR_BLOG') {
      const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/doctors/blogs/ajax`, {}, apiheader);
      setData({
        doctor: null,
        blog: null,
        blogDoc: data.Response,
        adoption: null,
        animalproducts: null

      });
      setdisplayLink(true)

    } else if (service === 'ADOPTION') {
      const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/adoptions/ajax`, {}, apiheader);
      setData({
        doctor: null,
        blog: null,
        blogDoc: null,
        adoption: data.Response,
        animalproducts: null

      });
      setdisplayLink(true)

    } else if (service === 'SALE' || service === 'BIDDING') {
      const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/animalproducts/ajax`, { AnimalProductService: service }, apiheader);
      setData({
        doctor: null,
        blog: null,
        blogDoc: null,
        adoption: null,
        animalproducts: data.Response

      });
      setdisplayLink(true)
    }
  }
  const [editPage, setAdsDetail] = useState(null)
  // TODO:: select image
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  // TODO:: end image
  const handelSelectCountry = (event) => {
    const selectedCountryId = countryRef.current.value;
    getCities(selectedCountryId)
  }
  const adsDetail = async () => {
    let data = await GetData(`${process.env.REACT_APP_API_URL}/admin/advertisements/edit/page/${id}`, apiheader)
    console.log(data.Response);
    setAdsDetail(data.Response);
    getCities(data.Response.IDCountry)
    getAreas(data.Response.IDCity)
    if (data.Response.AdvertisementService !== "NONE") setdisplayLink(true)

    if (data.Response.AdvertisementService === 'DOCTOR_BLOG') {
      const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/doctors/blogs/ajax`, {}, apiheader);
      setData({
        doctor: null,
        blog: null,
        blogDoc: data.Response,
        adoption: null,
        animalproducts: null

      });

    } else if (data.Response.AdvertisementService === 'ADOPTION') {
      const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/adoptions/ajax`, {}, apiheader);
      setData({
        doctor: null,
        blog: null,
        blogDoc: null,
        adoption: data.Response,
        animalproducts: null

      });

    } else if (data.Response.AdvertisementService === 'URGENT_CONSULT' || data.Response.AdvertisementService === 'CONSULT') {
      const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/doctors/ajax`, {}, apiheader);
      setData({
        doctor: data.Response,
        blog: null,
        blogDoc: null,
        adoption: null,
        animalproducts: null

      });

    } else if (data.Response.AdvertisementService === 'CLIENT_BLOG') {
      const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/clients/blogs/ajax`, {}, apiheader);
      setData({
        doctor: null,
        blog: data.Response,
        blogDoc: null,
        adoption: null,
        animalproducts: null

      });

    } else if (data.Response.AdvertisementService === 'SALE' || data.Response.AdvertisementService === 'BIDDING') {
      const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/animalproducts/ajax`, { AnimalProductService: data.Response.AdvertisementService }, apiheader);
      setData({
        doctor: null,
        blog: null,
        blogDoc: null,
        adoption: null,
        animalproducts: data.Response

      });
      setdisplayLink(true)
    }
  }
  const submit = e => {
    e.preventDefault()
    if (SelectService === 'NONE') {
      adsedit({
        IDCity: selectCity.current.value,
        AdvertisementStartDate: startDateRef.current.value,
        AdvertisementEndDate: endDateRef.current.value,
        AdvertisementService: AdsService.current.value,
        AdvertisementLocation: AdsLocation.current.value,
        // IDLink: doctorRef.current.value,
        AdvertisementImage: selectedImage,
        IDAdvertisement: id
      })
    } else {
      adsedit({
        IDCity: selectCity.current.value,
        AdvertisementStartDate: startDateRef.current.value,
        AdvertisementEndDate: endDateRef.current.value,
        AdvertisementService: AdsService.current.value,
        AdvertisementLocation: AdsLocation.current.value,
        IDLink: doctorRef.current.value,
        AdvertisementImage: selectedImage,
        IDAdvertisement: id
      })
    }
  }
  const adsedit = async (editAds) => {
    let data = await PostData(`${process.env.REACT_APP_API_URL}/admin/advertisements/edit`, editAds, apiheader).then((res) => {

      if (res.data.Success === true) {
        toast.success('Ads data has been modified', {
          duration: 4000,
          position: 'bottom-center',
          /*  icon: <Icons.upload color='#40AB45' size={25} />, */
          iconTheme: {
            primary: '#40AB45',
            secondary: '#fff',
          },
        });
        setTimeout(() => {
          navigate('/ads');
        }, 2000);
      } else {
        toast.error(res.data.ApiMsg)
      }
    });
  }
 

  useEffect(() => {
    adsDetail()
    window.scrollTo(0, 0);
  }, [id])
  return (
    <>
      <Container fluid>
        <div className="app__addprodects">
          {isLang === 'ar' ?
            <Component.SubNav sub__nav={[{ name: "تعديـل الإعـلان", path: `/ads/edit/${id}` }, { name: "قائمـة الإعلانــات", path: '/ads' }]} />
            :
            <Component.SubNav sub__nav={[{ name: "Ads", path: '/ads' }, { name: "Edit Ads ", path: `/ads/edit/${id}` }]} />
          }
          <div className="app__addprodects__header ">
            <Component.BaseHeader h1={translateADS[isLang]?.LabelEditPage} />
            <div className="app__addOrder-form">
              <div className="app__addprodects-form">
                <form onSubmit={submit}>
                  <Row>
                    <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">
                      <Form.Group>
                        <Form.Label>{translateADS[isLang]?.labelImageInput}</Form.Label>
                        <FormControl
                          id="custom-file"
                          type="file"
                          label={selectedImage ? selectedImage.name : 'Choose file'}
                          ref={fileInputRef}
                          onChange={handleImageSelect}
                          accept="image/*"
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en d-flex justify-content-center">
                      <Form.Group>
                        <div className="mt-3  " style={{ width: "200px " }}>

                          {selectedImage ? (
                            <img
                              loading="lazy"
                              src={URL.createObjectURL(selectedImage)}
                              alt={selectedImage.name}
                              className='rounded-3 w-100'
                            />
                          ) :
                            <img
                              loading="lazy"
                              src={editPage?.AdvertisementImage}
                              className='rounded-3 w-100'
                            />
                          }
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                      <Form.Group controlId="formBasicEmail" className='mt-3'>
                        <Form.Label>{translateADS[isLang]?.labelCountryInput}</Form.Label>
                        <Form.Select aria-label="Default select example" onClick={handelSelectCountry} ref={countryRef}>
                          {
                            countries?.map((item, index) => (
                              <option key={index} value={item?.IDCountry} selected={editPage?.IDCountry === item?.IDCountry && item?.CountryName}  >{item?.CountryName}  </option>
                            ))
                          }
                        </Form.Select>
                      </Form.Group>

                      <Form.Group controlId="formBasicEmail" className='mt-3'>
                        <Form.Label>{translateADS[isLang]?.labelCityInput}</Form.Label>
                        <Form.Select aria-label="Default select example" ref={areaRef}>
                          <option >{translateADS[isLang]?.optionCity}</option>
                          {
                            areas?.map((item, index) => (
                              <option key={index} value={item?.IDArea} selected={editPage?.IDArea === item?.IDArea && item?.AreaName}>{item?.AreaName}</option>
                            ))
                          }
                        </Form.Select>

                      </Form.Group>

                      <Form.Group controlId="formBasicStartDate" className='mt-3'>
                        <Form.Label>{translateADS[isLang]?.labelStartInput}</Form.Label>
                        <InputGroup>
                          <FormControl type="date" ref={startDateRef} defaultValue={editPage?.AdvertisementStartDate?.split(" ")[0]} />
                        </InputGroup>
                      </Form.Group>

                      <Form.Group controlId="formBasicEmail" className='mt-3'>
                        <Form.Label>{translateADS[isLang]?.labelAdsServiceInput}</Form.Label>
                        <Form.Select aria-label="Default select example" ref={AdsService} onClick={handelSelectService}>
                          {
                            translateADS[isLang]?.adsService?.map((item, index) => (
                              <option key={index} value={item.value} selected={editPage?.AdvertisementService === item.value && item.text}  >{item.text}</option>
                            ))
                          }
                        </Form.Select>
                      </Form.Group>



                    </Col>

                    <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">
                      <Form.Group controlId="formBasicEmail" className='mt-3' >
                        <Form.Label>{translateADS[isLang]?.labelArea}</Form.Label>
                        <Form.Select aria-label="Default select example" ref={selectCity}>
                          {
                            cities?.map((item, index) => (
                              <option key={index} value={item?.IDCity} selected={editPage?.IDCity === item?.IDCity && item?.CityName} > {item?.CityName}</option>
                            ))
                          }
                        </Form.Select>

                      </Form.Group>
                      <Form.Group controlId="formBasicEmail" className='mt-3'>
                        <Form.Label>{translateADS[isLang]?.labelAdsLocationInput}</Form.Label>
                        <Form.Select aria-label="Default select example" ref={AdsLocation} >
                          {
                            translateADS[isLang]?.adsLocation?.map((item, index) => (
                              <option key={index} value={item.value} selected={editPage?.AdvertisementLocation === item && item} >{item.text}</option>
                            ))
                          }
                        </Form.Select>
                      </Form.Group>
                      <Form.Group controlId="formBasicStartDate" className='mt-3'>
                        <Form.Label>{translateADS[isLang]?.labelEndInput}</Form.Label>
                        <InputGroup>
                          <FormControl type="date" ref={endDateRef} defaultValue={editPage?.AdvertisementEndDate?.split(" ")[0]} />
                        </InputGroup>
                      </Form.Group>
                      {
                        displayLink &&
                        <Form.Group controlId="formBasicEmail" className='mt-3'>
                          <Form.Label>{translateADS[isLang]?.labelLinkInput}</Form.Label>
                          <Form.Select aria-label="Default select example" ref={doctorRef} >
                            {data.doctor?.map((item, index) => (<option key={index} value={item.IDDoctor} selected={editPage?.IDLink === item.IDDoctor && item.DoctorName} defaultValue={item.DoctorName}>{'  '}{item.DoctorName}</option>))}
                            {data.blog?.map((item, index) => (<option key={index} value={item.IDClientBlog} selected={editPage?.IDLink === item.IDClientBlog && item.ClientName} defaultValue={item.ClientName}> {item.BlogTitle}{' (  '}{item.ClientName}{' )  '}</option>))}
                            {data.blogDoc?.map((item, index) => (<option key={index} value={item.IDDoctorBlog} selected={editPage?.IDLink === item.IDDoctorBlog && item.DoctorName} defaultValue={item.ClientName}>{item.BlogTitle}{' (   '} {item.DoctorName}{' ) '} </option>))}
                            {data.adoption?.map((item, index) => (<option key={index} value={item.IDAdoption} selected={editPage?.IDLink === item.IDAdoption && item.PetName} defaultValue={item.PetName}> {item.PetStrain}{'/   '} {item.PetName}{' (  '} {item.ClientName}{' )  '}</option>))}
                            {data.animalproducts?.map((item, index) => (<option key={index} value={item.IDAnimalProduct} selected={editPage?.IDLink === item.IDAnimalProduct && item.AnimalSubCategoryName} defaultValue={item.AnimalSubCategoryName}> {item.AnimalSubCategoryName} {' (  '} {item.ClientName}{' )  '}</option>))}
                          </Form.Select>
                        </Form.Group>
                      }

                    </Col>

                    <div className='d-flex justify-content-center align-content-center my-5'>

                      <div className='baseBtn1'>
                        <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                          {translateADS[isLang]?.SaveBTN}
                        </Button>
                      </div>

                      <div className='baseBtn w-auto'>
                        <Link to={'/ads'}>
                          <Button variant={'primary'} className='d-flex align-items-center justify-content-center'>
                            {translateADS[isLang]?.CancelBTN}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Row>

                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default EditAds
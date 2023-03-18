import React, { useEffect, useState, useRef, useContext } from 'react'
import { Container, Row, Col, Button, InputGroup, Form, FormControl } from 'react-bootstrap';
import { toast } from 'react-hot-toast';

import { useNavigate, useParams, Link } from 'react-router-dom';
import Component from '../../constants/Component';
import Icons from '../../constants/Icons';
import { VendersContext } from '../../context/Store';
import { apiheader, GetData, PostData } from '../../utils/fetchData';
import useFetch from './../../utils/useFetch';

const EditAds = () => {
  let { id } = useParams()
  let navigate = useNavigate();

  // let { countries, cities, getCities } = useContext(VendersContext);
  let { countries, cities, getCities } = useFetch()

  //TODO:: start date end date use ref   
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const selectCity = useRef();
  const doctorRef = useRef(null);
  const AdsService = useRef(null);
  const AdsLocation = useRef(null);
  //** Doctor list
  const [data, setData] = useState({
    doctor: null,
    blog: null,
    blogDoc: null,
    adoption: null
  });

  const handelSelectService = async (event) => {
    const service = event.target.value;
    if (service === 'NONE') {
      setData({
        doctor: null,
        blog: null,
        blogDoc: null,
        adoption: null
      });
    } else if (service === 'URGENT_CONSULT' || service === 'CONSULT') {
      const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/doctors/ajax`, {}, apiheader);
      setData({
        doctor: data.Response,
        blog: null,
        blogDoc: null,
        adoption: null
      });
    } else if (service === 'CLIENT_BLOG') {
      const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/clients/blogs/ajax`, {}, apiheader);
      setData({
        doctor: null,
        blog: data.Response,
        blogDoc: null,
        adoption: null
      });
    } else if (service === 'DOCTOR_BLOG') {
      const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/doctors/blogs/ajax`, {}, apiheader);
      setData({
        doctor: null,
        blog: null,
        blogDoc: data.Response,
        adoption: null
      });
    } else if (service === 'ADOPTION') {
      const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/adoptions/ajax`, {}, apiheader);
      setData({
        doctor: null,
        blog: null,
        blogDoc: null,
        adoption: data.Response
      });
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
    const selectedCountryId = event.target.value;
    getCities(selectedCountryId)
  }
  const adsDetail = async () => {
    let data = await GetData(`${process.env.REACT_APP_API_URL}/admin/advertisements/edit/page/${id}`, apiheader)
    setAdsDetail(data.Response);
  }
  const submit = e => {
    e.preventDefault()
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
  const adsedit = async (editAds) => {
    let data = await PostData(`${process.env.REACT_APP_API_URL}/admin/advertisements/edit`, editAds, apiheader).then((res) => {

      if (res.data.Success === true) {
        toast.success('Ads data has been modified', {
          duration: 4000,
          position: 'top-center',
          icon: <Icons.upload color='#40AB45' size={25} />,
          iconTheme: {
            primary: '#0a0',
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
          <Component.SubNav sub__nav={[{ name: "Ads", path: '/ads' }, { name: "Edit Ads ", path: `/ads/edit/${id}` }]} />
          <div className="app__addprodects__header ">
            <Component.BaseHeader h1={'Add Ads'} />
            <div className="app__addOrder-form">
              <div className="app__addprodects-form">
                <form onSubmit={submit}>
                  <Row>
                    <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">
                      <Form.Group>
                        <Form.Label>Ads Image:</Form.Label>
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
                        <Form.Label>Country</Form.Label>
                        <Form.Select aria-label="Default select example" onClick={handelSelectCountry}>
                          {
                            countries?.map((item, index) => (
                              <option key={index} value={item?.IDCountry} selected={editPage?.IDCountry === item?.IDCountry && item?.CountryName}  >{item?.CountryName}  </option>
                            ))
                          }
                        </Form.Select>
                      </Form.Group>

                      <Form.Group controlId="formBasicStartDate" className='mt-3'>
                        <Form.Label>Start date:</Form.Label>
                        <InputGroup>
                          <FormControl type="date" ref={startDateRef} defaultValue={editPage?.AdvertisementStartDate?.split(" ")[0]} />
                        </InputGroup>
                      </Form.Group>


                      <Form.Group controlId="formBasicEmail" className='mt-3'>
                        <Form.Label>Ads Service</Form.Label>
                        <Form.Select aria-label="Default select example" ref={AdsService} onClick={handelSelectService}>
                          {
                            ['NONE', 'URGENT_CONSULT', 'CONSULT', 'CLIENT_BLOG', 'DOCTOR_BLOG', 'ADOPTION']?.map((item, index) => (
                              <option key={index} value={item} selected={editPage?.AdvertisementService === item && item}  >{item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}</option>
                            ))
                          }
                        </Form.Select>
                      </Form.Group>

                      <Form.Group controlId="formBasicEmail" className='mt-3'>
                        <Form.Label>Ads Location</Form.Label>
                        <Form.Select aria-label="Default select example" ref={AdsLocation} >
                          {
                            ['HOME', 'PAGES', 'INNER_PAGES']?.map((item, index) => (
                              <option key={index} value={item} selected={editPage?.AdvertisementLocation === item && item} >{item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}</option>
                            ))
                          }
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">
                      <Form.Group controlId="formBasicEmail" className='mt-3' >
                        <Form.Label>City</Form.Label>

                        <Form.Select aria-label="Default select example" ref={selectCity}>
                          {
                            cities?.map((item, index) => (
                              <option key={index} value={item?.IDCity} selected={editPage?.IDCity === item?.IDCity && item?.CityName} > {item?.CityName}</option>
                            ))
                          }
                        </Form.Select>

                      </Form.Group>

                      <Form.Group controlId="formBasicStartDate" className='mt-3'>
                        <Form.Label>Start date:</Form.Label>
                        <InputGroup>
                          <FormControl type="date" ref={endDateRef} defaultValue={editPage?.AdvertisementEndDate?.split(" ")[0]} />
                        </InputGroup>
                      </Form.Group>

                      <Form.Group controlId="formBasicEmail" className='mt-3'>
                        <Form.Label>ID Link  </Form.Label>
                        <Form.Select aria-label="Default select example" ref={doctorRef} >
                          {/* {
                            doctor?.map((item, index) => (
                              <option key={index} value={item.IDDoctor} selected={editPage?.IDLink === item.IDDoctor && item.DoctorName} defaultValue={item.DoctorName} >{item.DoctorName}</option>
                            ))
                          } */}

                          {data.doctor?.map((item, index) => (<option key={index} value={item.IDDoctor} selected={editPage?.IDLink === item.IDDoctor && item.DoctorName} defaultValue={item.DoctorName}>{'  '}{item.DoctorName}</option>))}
                          {data.blog?.map((item, index) => (<option key={index} value={item.IDClientBlog} selected={editPage?.IDLink === item.IDClientBlog && item.ClientName} defaultValue={item.ClientName}> {item.BlogTitle}{' (  '}{item.ClientName}{' )  '}</option>))}
                          {data.blogDoc?.map((item, index) => (<option key={index} value={item.IDDoctorBlog} selected={editPage?.IDLink === item.IDDoctorBlog && item.DoctorName} defaultValue={item.ClientName}>{item.BlogTitle}{' (   '} {item.DoctorName}{' ) '} </option>))}
                          {data.adoption?.map((item, index) => (<option key={index} value={item.IDAdoption} selected={editPage?.IDLink === item.IDAdoption && item.PetName} defaultValue={item.PetName}> {item.PetStrain}{'/   '} {item.PetName}{' (  '} {item.ClientName}{' )  '}</option>))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <div className='d-flex justify-content-center align-content-center my-5'>

                      <div className='baseBtn1'>
                        <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                          Save
                        </Button>
                      </div>

                      <div className='baseBtn'>
                        <Link to={'/ads'}>
                          <Button variant={'primary'} className='d-flex align-items-center justify-content-center'>
                          Cancel
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
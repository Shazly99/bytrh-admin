import React, { useContext, useRef, useState } from 'react'
import Component from '../../constants/Component'
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { VendersContext } from './../../context/Store';
import { Form } from 'react-bootstrap';
import { PostData, apiheader } from './../../utils/fetchData';
import { toast } from 'react-hot-toast';
import Icons from '../../constants/Icons';
import { useNavigate } from 'react-router-dom';
import useFetch from './../../utils/useFetch';
import { Link } from 'react-router-dom';
import translateADS from './translateAds';

const AddAds = () => {
  let navigate = useNavigate();

  let { countries, cities, getCities } = useFetch()
  const countriesRef = useRef(null);
  const doctorRef = useRef(null);
  const AdsService = useRef(null);
  const AdsLocation = useRef(null);

  //TODO:: start date end date use ref   
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  // TODO:: select image
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  // TODO:: end image

  // Select Country
  const handelSelectCountry = (event) => {
    const selectedCountryId = event.target.value;
    getCities(selectedCountryId)
  }

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

  const submit = e => {
    e.preventDefault()
    addNewAds({
      IDCity: countriesRef.current.value,
      AdvertisementStartDate: startDateRef.current.value,
      AdvertisementEndDate: endDateRef.current.value,
      AdvertisementService: AdsService.current.value,
      AdvertisementLocation: AdsLocation.current.value,
      IDLink: doctorRef.current.value,
      AdvertisementImage: selectedImage
    });
  }

  async function addNewAds(ads) {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/advertisements/add`, ads, apiheader).then((res) => {

      if (res.data.Success === true) {
        toast.success('New ads added successfully!', {
          duration: 4000,
          position: 'top-center',
          icon: <Icons.Added color='#40AB45' size={25} />,
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


  let { isLang } = useContext(VendersContext);



  return (
    <Container fluid>
      <div className="app__addprodects">
        {isLang === 'ar' ?
            <Component.SubNav sub__nav={[{ name: "إضافـة إعـلان جديـد", path: '/ads/add' } , { name: " قائمـة الإعلانـات", path: '/ads' }]} />
            :
            <Component.SubNav sub__nav={[{ name: " Ads", path: '/ads' }, { name: "Add New Ads ", path: '/ads/add' }]} />
        }
        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={translateADS[isLang]?.LabelAddPage} />
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
                        {selectedImage && (
                          <img
                          loading="lazy"
                            src={URL.createObjectURL(selectedImage)}
                            alt={selectedImage.name}
                            className='rounded-3 w-100'
                          />
                        )}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail" >
                      <Form.Label>{translateADS[isLang]?.labelCountryInput}</Form.Label>
                      <Form.Select aria-label="Default select example" onClick={handelSelectCountry}>
                        <option >{translateADS[isLang]?.optionCountry}</option>
                        {
                          countries?.map((item, index) => (
                            <option key={index} value={item?.IDCountry}  >{item?.CountryName}</option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formBasicStartDate" className='mt-3'>
                      <Form.Label>{translateADS[isLang]?.labelStartInput}</Form.Label>
                      <InputGroup>
                        <FormControl type="date" ref={startDateRef} />
                      </InputGroup>
                    </Form.Group>


                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                      <Form.Label>{translateADS[isLang]?.labelAdsServiceInput}</Form.Label>
                      <Form.Select aria-label="Default select example" ref={AdsService} onClick={handelSelectService}>
                        <option >{translateADS[isLang]?.optionAdvertisementService}</option>
                        {
                          ['NONE', 'URGENT_CONSULT', 'CONSULT', 'CLIENT_BLOG', 'DOCTOR_BLOG', 'ADOPTION']?.map((item, index) => (
                            <option key={index} value={item}   >{item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}</option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                      <Form.Label>{translateADS[isLang]?.labelAdsLocationInput}</Form.Label>
                      <Form.Select aria-label="Default select example" ref={AdsLocation} >
                        <option >{translateADS[isLang]?.optionAdvertisementLocation}</option>
                        {
                          ['HOME', 'PAGES', 'INNER_PAGES']?.map((item, index) => (
                            <option key={index} value={item}   >{item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}</option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail" >
                      <Form.Label>{translateADS[isLang]?.labelCityInput}</Form.Label>

                      <Form.Select aria-label="Default select example" ref={countriesRef}>
                        <option >{translateADS[isLang]?.optionCity}</option>
                        {
                          cities?.map((item, index) => (
                            <option key={index} value={item?.IDCity}>{item?.CityName}</option>
                          ))
                        }
                        {/* <option value="0">InActive</option> */}
                      </Form.Select>

                    </Form.Group>

                    <Form.Group controlId="formBasicEndDate" className='mt-3'>
                      <Form.Label>{translateADS[isLang]?.labelEndInput}</Form.Label>
                      <InputGroup>
                        <FormControl type="date" ref={endDateRef} />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                      <Form.Label>{translateADS[isLang]?.labelLinkInput}</Form.Label>
                      <Form.Select aria-label="Default select example" ref={doctorRef} >
                        <option >{translateADS[isLang]?.optionAdvertisementLink}</option>
                        {data.doctor?.map((item, index) => (<option key={index} value={item.IDDoctor}>{'  '}{item.DoctorName}</option>))}
                        {data.blog?.map((item, index) => (<option key={index} value={item.IDClientBlog}> {item.BlogTitle}{' (  '}{item.ClientName}{' )  '}</option>))}
                        {data.blogDoc?.map((item, index) => (<option key={index} value={item.IDDoctorBlog}>{item.BlogTitle}{' (   '} {item.DoctorName}{' ) '} </option>))}
                        {data.adoption?.map((item, index) => (<option key={index} value={item.IDAdoption}> {item.PetStrain}{'/   '} {item.PetName}{' (  '} {item.ClientName}{' )  '}</option>))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  {/* 
                  const [blogDoc, setBlogDoc] = useState(null)
  const [adoption, setAdoption] = useState(null) */}
                  <div className='d-flex justify-content-center align-content-center my-5'>

                    <div className='baseBtn1'>
                      <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                        {translateADS[isLang]?.SaveBTN}
                      </Button>
                    </div>

                    <div className='baseBtn'>
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
    </Container >
  )
}

export default AddAds

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Dropdown, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Component from '../../constants/Component';
import Icons from '../../constants/Icons';
import { VendersContext } from './../../context/Store';
import { PostData, apiheader } from './../../utils/fetchData';
import useFetch from './../../utils/useFetch';
import translateADS from './translateAds';

const AddAds = () => {
  let { isLang } = useContext(VendersContext);
  let navigate = useNavigate();

  let { countries, cities, areas, getCities, getAreas } = useFetch()
  const cityRef = useRef(null);
  const doctorRef = useRef(null);
  const AdsService = useRef(null);
  const AdsLocation = useRef(null);
  const areaRef = useRef(null);

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

  // Select Area
  const handelSelectArea = (event) => {
    const selectedCountryId = event.target.value;
    getAreas(selectedCountryId)
  }

  //** Doctor list
  const [data, setData] = useState({
    doctor: null,
    blog: null,
    blogDoc: null,
    adoption: null,
    sale: null,
    bidding: null
  });
  const [displayLink, setdisplayLink] = useState(false);
  const [displayLink1, setdisplayLink1] = useState(false);

  const handelSelectService = async (event) => {
    if (event && event.target) {
      const service = event.target.value;
      // rest of the function code...
      if (service === 'NONE') {
        setData({
          doctor: null,
          blog: null,
          blogDoc: null,
          adoption: null,
          animalproducts: null
        });
        setdisplayLink(false)
        setdisplayLink1(false)
  
      } else if (service === 'URGENT_CONSULT' || service === 'CONSULT') {
        const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/doctors/ajax`, {}, apiheader);
        setData({
          doctor: data.Response,
          blog: null,
          blogDoc: null,
          adoption: null,
          animalproducts: null
  
        });
        setdisplayLink1(true)
        setdisplayLink(false)
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
        setdisplayLink1(false)
  
      } else if (service === 'DOCTOR_BLOG') {
        const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/doctors/blogs/ajax`, {}, apiheader);
        setData({
          doctor: null,
          blog: null,
          blogDoc: data.Response,
          adoption: null
        });
        setdisplayLink(true)
        setdisplayLink1(false)
  
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
        setdisplayLink1(false)
  
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
        setdisplayLink1(false)
  
      }
    }
  }
  useEffect(() => {
    handelSelectService()
    return () => {
      handelSelectService()
    }
  }, [isLang])
  const [selectedItem, setSelectedItem] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const handleSelect = (eventKey, event) => {
    const selectedItem = data?.doctor?.find((item) => Number(item.IDDoctor) === Number(eventKey));
    setSelectedItem(selectedItem.DoctorName);
    doctorRef.current.value = selectedItem.IDDoctor
  };
  const filteredItems = data?.doctor?.filter((item) => item.DoctorName.toLowerCase().includes(searchTerm.toLowerCase()));



  const submit = e => {
    e.preventDefault() 
    addNewAds({
      IDCity: cityRef.current.value,
      IDArea: areaRef.current.value,
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
          position: 'bottom-center',
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



  return (
    <Container fluid>
      <div className="app__addprodects">
        {isLang === 'ar' ?
          <Component.SubNav sub__nav={[{ name: "إضافـة إعـلان جديـد", path: '/ads/add' }, { name: " قائمـة الإعلانـات", path: '/ads' }]} />
          :
          <Component.SubNav sub__nav={[{ name: " Ads", path: '/ads' }, { name: "Add New Ads ", path: '/ads/add' }]} />
        }
        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={translateADS[isLang]?.LabelAddPage} />
          <div className="app__addOrder-form">

            <div className="app__addprodects-form">
              <form onSubmit={submit}>
                <Row>
                  <Col xl={6} lg={6} md={6} sm={12} className="mt-3">
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
                  <Col xl={6} lg={6} md={6} sm={12} className="mt-3 d-flex justify-content-center">
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
                  <Col xl={6} lg={6} md={6} sm={12} className="mt-3">
                    <Form.Group controlId="formBasicEmail" >
                      <Form.Label>{translateADS[isLang]?.labelCountryInput}</Form.Label>
                      <Form.Select aria-label="Default select example" onChange={handelSelectCountry}>
                        <option >{translateADS[isLang]?.optionCountry}</option>
                        {
                          countries?.map((item, index) => (
                            <option key={index} value={item?.IDCountry}  >{item?.CountryName}</option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>
                  </Col>                
                   <Col xl={6} lg={6} md={6} sm={12} className="mt-3">
                    <Form.Group controlId="formBasicEmail"  >
                      <Form.Label>{translateADS[isLang]?.labelArea}</Form.Label>

                      <Form.Select aria-label="Default select example" onChange={handelSelectArea} ref={cityRef}>
                        <option >{translateADS[isLang]?.optionArea}</option>
                        {
                          cities?.map((item, index) => (
                            <option key={index} value={item?.IDCity}>{item?.CityName}</option>
                          ))
                        }
                        {/* <option value="0">InActive</option> */}
                      </Form.Select>

                    </Form.Group>
                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} className="mt-3">
                    <Form.Group controlId="formBasicEmail" >
                      <Form.Label>{translateADS[isLang]?.labelCityInput}</Form.Label>
                      <Form.Select aria-label="Default select example" ref={areaRef}>
                        <option >{translateADS[isLang]?.optionCity}</option>
                        {
                          areas?.map((item, index) => (
                            <option key={index} value={item?.IDArea}>{item?.AreaName}</option>
                          ))
                        }
                      </Form.Select>

                    </Form.Group>
                  </Col>               
                    <Col xl={6} lg={6} md={6} sm={12} className="mt-3">
                    <Form.Group controlId="formBasicEmail" >
                      <Form.Label>{translateADS[isLang]?.labelAdsLocationInput}</Form.Label>
                      <Form.Select aria-label="Default select example" ref={AdsLocation} >
                        <option >{translateADS[isLang]?.optionAdvertisementLocation}</option>
                        {
                          translateADS[isLang]?.adsLocation?.map((item, index) => (
                            <option key={index} value={item.value}   >{item.text}</option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} className="mt-3">
                    <Form.Group controlId="formBasicStartDate" >
                      <Form.Label>{translateADS[isLang]?.labelStartInput}</Form.Label>
                      <InputGroup>
                        <FormControl type="date" ref={startDateRef} />
                      </InputGroup>
                    </Form.Group>
                  </Col>                  
                  <Col xl={6} lg={6} md={6} sm={12} className="mt-3">
                    <Form.Group controlId="formBasicEndDate" >
                      <Form.Label>{translateADS[isLang]?.labelEndInput}</Form.Label>
                      <InputGroup>
                        <FormControl type="date" ref={endDateRef} />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} className="mt-3">
                    <Form.Group controlId="formBasicEmail" >
                      <Form.Label>{translateADS[isLang]?.labelAdsServiceInput}</Form.Label>
                      <Form.Select aria-label="Default select example" ref={AdsService} onChange={handelSelectService}>
                        <option >{translateADS[isLang]?.optionAdvertisementService}</option>
                        {
                          translateADS[isLang]?.adsService?.map((item, index) => (
                            <option key={index} value={item.value}   >{item.text}</option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>
                  </Col>


 
 

                  <Col xl={6} lg={6} md={6} sm={12} className="mt-3">
                    {
                      displayLink &&
                      <Form.Group controlId="formBasicEmail" >
                        <Form.Label>{translateADS[isLang]?.labelLinkInput}</Form.Label>
                        <Form.Select aria-label="Default select example" ref={doctorRef} >
                          {/* <option >{translateADS[isLang]?.optionAdvertisementLink}</option> */}
                          {/* {data.doctor?.map((item, index) => (<option key={index} value={item.IDDoctor}>{'  '}{item.DoctorName}</option>))} */}
                          {data.blog?.map((item, index) => (<option key={index} value={item.IDClientBlog}> {item.BlogTitle}{' (  '}{item.ClientName}{' )  '}</option>))}
                          {data.blogDoc?.map((item, index) => (<option key={index} value={item.IDDoctorBlog}>{item.BlogTitle}{' (   '} {item.DoctorName}{' ) '} </option>))}
                          {data.adoption?.map((item, index) => (<option key={index} value={item.IDAdoption}> {item.PetStrain}{'/   '} {item.PetName}{' (  '} {item.ClientName}{' )  '}</option>))}
                          {data.animalproducts?.map((item, index) => (<option key={index} value={item.IDAnimalProduct}> {item.AnimalSubCategoryName} {' (  '} {item.ClientName}{' )  '}</option>))}
                        </Form.Select>
                      </Form.Group>
                    }
                
              
                    {
                      displayLink1 &&
                      <Form.Group controlId="formBasicEmail" >
                        <Form.Label>{translateADS[isLang]?.labelLinkInput}</Form.Label>

                        <Dropdown onSelect={handleSelect} >
                          <Dropdown.Toggle
                            id="my-dropdown"
                            as={FormControl}
                            defaultValue={selectedItem}
                            type="text"
                            placeholder="Select an item"
                          />

                          <Dropdown.Menu style={{ width: '100%', maxHeight: '200px', overflowY: 'auto' }}>
                            <FormControl
                              id="my-dropdown"
                              autoFocus
                              className="filter__dropdown mx-3 my-2   "
                              placeholder="Type to filter..."
                              onChange={(e) => setSearchTerm(e.target.value)}
                              value={searchTerm}

                            />
                            {filteredItems?.map((item) => (
                              <Dropdown.Item
                                ref={doctorRef}
                                active={selectedItem === item.DoctorName}
                                key={item.IDDoctor}
                                eventKey={item.IDDoctor}>
                                {item.DoctorName}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
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
    </Container >
  )
}

export default AddAds

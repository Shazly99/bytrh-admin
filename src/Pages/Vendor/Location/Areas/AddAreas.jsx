import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Component from '../../../../constants/Component';
import Icons from '../../../../constants/Icons';
import { apiheader, PostData } from '../../../../utils/fetchData';
import useFetch from './../../../../utils/useFetch';


const AddAreas = () => {
  let navigate = useNavigate();
  // let { countries, cities, getCities } = useContext(VendersContext);
  let { countries, cities, getCities } = useFetch()

 
  const AreasNameEn = useRef();
  const AreasNameAr = useRef();
   const selectRef = useRef();
  const countriesRef = useRef(null);

  const handelSelectCountry = (event) => {
    const selectedCountryId = event.target.value;
     getCities(selectedCountryId)
  }
  const submit = e => {
    e.preventDefault()
     addNewAreas({
      AreaNameEn: AreasNameEn.current.value,
      AreaNameAr: AreasNameAr.current.value,
      AreaActive: selectRef.current.value,
      IDCity: countriesRef.current.value
    })
  }

  async function addNewAreas(Areas) {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/location/areas/add`, Areas, apiheader).then((res) => {

      if (res.data.Success === true) {
        toast.success('New Areas added successfully!', {
          duration: 4000,
          position: 'top-center',
          icon: <Icons.Added color='#40AB45' size={25} />,
          iconTheme: {
            primary: '#0a0',
            secondary: '#fff',
          },
        });
        setTimeout(() => {
          navigate('/location/areas');
        }, 2000);
      } else {
        toast.error(res.data.ApiMsg)
      }
    });
  }
  useEffect(() => {
    getCities(countriesRef.current.value)
    window.scrollTo(0, 0);
  }, [])

  return (
    <Container fluid>
      <div className="app__addprodects">
        <Component.SubNav sub__nav={[{ name: " Cities", path: '/location/areas' }, { name: "Add City ", path: '/location/areas/addareas' }]} /> 
        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={'Add New City'} />
          <div className="app__addOrder-form">
            <div className="app__addprodects-form">
              <form onSubmit={submit}>
                <Row>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en"> 
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>  Name (En)</Form.Label>
                      <Form.Control type="text" name='firstname' ref={AreasNameEn} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                      <Form.Label>Country</Form.Label>
                      <Form.Select aria-label="Default select example" onClick={handelSelectCountry}>
                        {/* <option>{countries[1].CountryName}</option> */}
                        {
                          countries?.map((item, index) => (
                            <option key={index} value={item?.IDCountry}  >{item?.CountryName}</option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                      <Form.Label>  Status</Form.Label>
                      <Form.Select aria-label="Default select example" ref={selectRef}>
                        <option>Status</option>
                        <option value="1">Active</option>
                        <option value="0">InActive</option>
                      </Form.Select>

                    </Form.Group>  
                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en"> 
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>  Name (Ar)</Form.Label>
                      <Form.Control type="text" name='firstname' ref={AreasNameAr} style={{ direction: 'rtl' }} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                      <Form.Label>City</Form.Label> 
                      <Form.Select aria-label="Default select example" ref={countriesRef}> 
                        {
                          cities?.map((item, index) => (
                            <option key={index} value={item?.IDCity}>{item?.CityName}</option>
                          ))
                        } 
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
                      <Link to={'/location/areas'}>
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
    </Container >
  )
}

export default AddAreas
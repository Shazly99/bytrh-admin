import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { apiheader, GetData, PostData } from '../../../../utils/fetchData';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import Component from '../../../../constants/Component';
import Icons from '../../../../constants/Icons';
import { VendersContext } from '../../../../context/Store';
import useFetch from './../../../../utils/useFetch';


const EditArea = () => {
  let { id } = useParams()
  // let { countries, cities,getCities } = useContext(VendersContext);
  let {countries, cities ,getCities} = useFetch()

  let navigate = useNavigate();
  const AreaNameEn = useRef();
  const AreaNameAr = useRef();
  const selectCity = useRef();

  const [editPage, setAreaDetail] = useState(null)
  
  const handelSelectCountry = (event) => {
    const selectedCountryId = event.target.value;
    console.log(selectedCountryId); 
    getCities(selectedCountryId)
  }

  const submit = e => {
    e.preventDefault()
    console.log(selectCity.current.value);
    editArea({
      AreaNameEn: AreaNameEn.current.value,
      AreaNameAr: AreaNameAr.current.value,
      IDCity: selectCity.current.value,
      IDArea: id
    })
  }

  async function editArea(Area) {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/location/areas/edit`, Area, apiheader).then((res) => {

      if (res.data.Success === true) {
        toast.success('Area has been updated!', {
          duration: 4000,
          position: 'top-center',
          icon: <Icons.Added color='#40AB45' size={20} />,
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

  const AreaDetail = async () => {
    let data = await GetData(`${process.env.REACT_APP_API_URL}/admin/location/areas/edit/page/${id}`, apiheader)
    setAreaDetail(data.Response);
    // console.log();
    getCities(data.Response?.IDCountry)
  }

  useEffect(() => {
    AreaDetail()
  }, [id])

  return (
    <Container fluid>
      <div className="app__addprodects">
        <Component.SubNav sub__nav={[{ name: "City", path: '/location/areas' }, { name: "Edit Area ", path: `/location/areas/editareas/${id}` }]} />
        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={'Edit Area'} />
          <div className="app__addOrder-form">
            <div className="app__addprodects-form">
              <form onSubmit={submit}>
                <Row>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Area Name (En)</Form.Label>
                      <Form.Control type="text" name='firstname' ref={AreaNameEn} defaultValue={editPage?.AreaNameEn} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                      <Form.Label>Country</Form.Label>
                      <Form.Select aria-label="Default select example"   onClick={handelSelectCountry}> 
                        {
                          countries?.map((item, index) => (
                            <option key={index} value={item?.IDCountry}  selected={editPage?.IDCountry === item?.IDCountry  && item?.CountryName }  >{item?.CountryName}  </option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>


                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Area Name (Ar)</Form.Label>
                      <Form.Control type="text" name='firstname' ref={AreaNameAr} defaultValue={editPage?.AreaNameAr} style={{ direction: 'rtl' }} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className='mt-3' >
                      <Form.Label>City</Form.Label>

                      <Form.Select aria-label="Default select example"  ref={selectCity}>  
                        {
                          cities?.map((item, index) => (
                            <option key={index} value={item?.IDCity}  selected={editPage?.IDCity === item?.IDCity && item?.CityName} > {item?.CityName }</option>
                          ))
                        }  
                      </Form.Select>

                    </Form.Group>

                  </Col>
                  <div className='d-flex justify-content-center align-content-center my-5'>
                    <div className='baseBtn'>
                      <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                        Update Area
                      </Button>
                    </div>
                  </div>
                </Row>

              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default EditArea
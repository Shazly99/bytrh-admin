import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { apiheader, GetData, PostData } from '../../../../utils/fetchData';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import Component from '../../../../constants/Component';
import Icons from '../../../../constants/Icons';
import { VendersContext } from '../../../../context/Store';
import useFetch from './../../../../utils/useFetch';


const EditCities = () => {
  // let { countries, cities } = useContext(VendersContext);
  let {countries, cities ,getCities} = useFetch()

  let { id } = useParams()
  let navigate = useNavigate();
  const CityNameEn = useRef();
  const CityNameAr = useRef();
  const selectCountry = useRef();

  const [editPage, setcityDetail] = useState(null)

  const submit = e => {
    e.preventDefault()
    editCity({
      CityNameEn: CityNameEn.current.value,
      CityNameAr: CityNameAr.current.value,
      IDCountry: selectCountry.current.value,
      IDCity: id
    })
  }

  async function editCity(city) {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/location/cities/edit`, city, apiheader).then((res) => {

      if (res.data.Success === true) {
        toast.success('city has been updated!', {
          duration: 4000,
          position: 'top-center',
          icon: <Icons.Added color='#40AB45' size={20} />,
          iconTheme: {
            primary: '#0a0',
            secondary: '#fff',
          },
        });
        setTimeout(() => {
          navigate('/location/cities');
        }, 2000);
      } else {
        toast.error(res.data.ApiMsg)
      }
    });
  }
  const cityDetail = async () => {
    let data = await GetData(`${process.env.REACT_APP_API_URL}/admin/location/cities/edit/page/${id}`, apiheader)
    setcityDetail(data.Response);
    console.log(data.Response);
  }
  useEffect(() => {
    cityDetail()
  }, [id])
  return (
    <Container fluid>
      <div className="app__addprodects">
        <Component.SubNav sub__nav={[{ name: "City", path: '/location/cities' }, { name: "Edit City ", path: `/location/cities/editcity/${id}` }]} />
        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={'Edit City'} />
          <div className="app__addOrder-form">
            <div className="app__addprodects-form">
              <form onSubmit={submit}>
                <Row>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Country Name (En)</Form.Label>
                      <Form.Control type="text" name='firstname' ref={CityNameEn} defaultValue={editPage?.CityNameEn} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                      <Form.Label>Countries </Form.Label>
                      <Form.Select aria-label="Default select example" ref={selectCountry} defaultValue="US">
                        <option>Country id</option>
                        {
                          countries?.map((item, index) => (
                            <option key={index} value={item?.IDCountry}  selected={editPage?.IDCountry === item?.IDCountry}>{item?.CountryName}</option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>
           

                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Country Name (Ar)</Form.Label>
                      <Form.Control type="text" name='firstname' ref={CityNameAr} defaultValue={editPage?.CityNameAr} style={{ direction: 'rtl' }} />
                    </Form.Group>


                  </Col>
                  <div className='d-flex justify-content-center align-content-center my-5'>

                    <div className='baseBtn1'>
                      <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                        Save
                      </Button>
                    </div>

                    <div className='baseBtn'>
                      <Link to={'/location/cities'}>
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
  )
}

export default EditCities
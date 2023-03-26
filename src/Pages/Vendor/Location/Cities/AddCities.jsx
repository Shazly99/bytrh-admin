import React, { useContext,useEffect,useState, useRef } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Component from '../../../../constants/Component';
import Icons from '../../../../constants/Icons';
import { VendersContext } from '../../../../context/Store';
import { apiheader, PostData } from '../../../../utils/fetchData';
import useFetch from './../../../../utils/useFetch';
import initialTranslation from "./Translation";

const AddCities = () => {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslation)
  const handelTranslate = () => setTranslate(initialTranslation)

  let { countries } = useFetch()

  let navigate = useNavigate();
  const CityNameEn = useRef();
  const CityNameAr = useRef();
  const CityCode = useRef();
  const selectRef = useRef();
  const countriesRef = useRef();

  const submit = e => {
    e.preventDefault()
    addNewCity({
      CityNameEn: CityNameEn.current.value,
      CityNameAr: CityNameAr.current.value,
      CityCode: '+' + CityCode.current.value,
      CityActive: 1,
      IDCountry: countriesRef.current.value
    })
  }

  async function addNewCity(city) {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/location/cities/add`, city, apiheader).then((res) => {

      if (res.data.Success === true) {
        toast.success('New city added successfully!', {
          duration: 4000,
          position: 'top-center',
          icon: <Icons.Added color='#40AB45' size={25} />,
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
  useEffect(() => {
    window.scrollTo(0, 0);
    handelTranslate()
  }, [])

  return (
    <Container fluid>
      <div className="app__addprodects">
        <Component.SubNav sub__nav={[{ name:  translate[isLang].add.nav1, path: '/location/cities' }, { name: translate[isLang].add.nav2, path: '/location/cities/addcity' }]} />

        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={translate[isLang].add.header}/>
          <div className="app__addOrder-form">
            <div className="app__addprodects-form">
              <form onSubmit={submit}>
                <Row>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>  {translate[isLang].add.Label1}</Form.Label>
                      <Form.Control type="text" name='firstname' ref={CityNameEn} />
                    </Form.Group>


                    {/* <Form.Group controlId="formBasicEmail"className='mt-3'>
                      <Form.Label>  Status</Form.Label> 
                      <Form.Select aria-label="Default select example" ref={selectRef}>
                        <option>Country Status</option>
                        <option value="1">Active</option>
                        <option value="0">InActive</option>
                      </Form.Select>

                    </Form.Group> */}
                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                      <Form.Label>   {translate[isLang].add.Label2}</Form.Label>
                      <Form.Control type="number" name='firstname' ref={CityCode} />
                    </Form.Group>


                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label> {translate[isLang].add.Label3}</Form.Label>
                      <Form.Control type="text" name='firstname' ref={CityNameAr} style={{ direction: 'rtl' }} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                      <Form.Label> {translate[isLang].add.Label4}</Form.Label>

                      <Form.Select aria-label="Default select example" ref={countriesRef}>
                        {/* <option>Country id</option> */}
                        <option value="" selected disabled hidden> Select Country</option>
                        {
                          countries?.map((item, index) => (
                            <option key={index} value={item?.IDCountry}>{item?.CountryName}</option>
                          ))
                        }
                        {/* <option value="0">InActive</option> */}
                      </Form.Select>

                    </Form.Group>
                  </Col>
                  <div className='d-flex justify-content-center align-content-center my-5'>

                    <div className='baseBtn1'>
                      <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                      {translate[isLang].add.save}

                      </Button>
                    </div>

                    <div className='baseBtn'>
                      <Link to={'/location/cities'}>
                        <Button variant={'primary'} className='d-flex align-items-center justify-content-center'>
                        {translate[isLang].add.cancel}

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
export default AddCities

import React, { useEffect,useContext, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Component from '../../../../constants/Component';
import Icons from '../../../../constants/Icons';
import { VendersContext } from '../../../../context/Store';
import { apiheader, GetData, PostData } from '../../../../utils/fetchData';
import useFetch from './../../../../utils/useFetch';
import initialTranslation from "./Translation";


const EditArea = () => {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslation)
  const handelTranslate = () => setTranslate(initialTranslation)
 
  let { id } = useParams()
   let { countries, cities, getCities } = useFetch()

  let navigate = useNavigate();
  const AreaNameEn = useRef();
  const AreaNameAr = useRef();
  const selectCity = useRef();

  const [editPage, setAreaDetail] = useState(null)

  const handelSelectCountry = (event) => {
    const selectedCountryId = event.target.value;
     getCities(selectedCountryId)
  }

  const submit = e => {
    e.preventDefault()
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
        toast.success(<strong>{translate[isLang].toast.edit}</strong>, {
          duration: 4000,
          position: 'bottom-center',
          icon: <Icons.Added color='#40AB45' size={20} />,
          iconTheme: {
            primary: '#40AB45',
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
     getCities(data.Response?.IDCountry)
  }

  useEffect(() => {
    AreaDetail()
     window.scrollTo(0, 0);
     handelTranslate()
  }, [id])

  return (
    <Container fluid>
      <div className="app__addprodects">
        <Component.SubNav sub__nav={[{ name: translate[isLang].edit.nav1, path: '/location/areas' }, { name: translate[isLang].edit.nav2, path: `/location/areas/editareas/${id}` }]} />
        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={translate[isLang].edit.header}/>
          <div className="app__addOrder-form">
            <div className="app__addprodects-form">
              <form onSubmit={submit}>
                <Row>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>  {translate[isLang].edit.Label1}</Form.Label>
                      <Form.Control type="text" name='firstname' ref={AreaNameEn} defaultValue={editPage?.AreaNameEn} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                      <Form.Label>{translate[isLang].edit.Label2}</Form.Label>
                      <Form.Select aria-label="Default select example" onClick={handelSelectCountry}>
                        {
                          countries?.map((item, index) => (
                            <option key={index} value={item?.IDCountry} selected={editPage?.IDCountry === item?.IDCountry && item?.CountryName}  >{item?.CountryName}  </option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>


                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label> {translate[isLang].edit.Label3}</Form.Label>
                      <Form.Control type="text" name='firstname' ref={AreaNameAr} defaultValue={editPage?.AreaNameAr} style={{ direction: 'rtl' }} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className='mt-3' >
                      <Form.Label>{translate[isLang].edit.Label4}</Form.Label>

                      <Form.Select aria-label="Default select example" ref={selectCity}>
                        {
                          cities?.map((item, index) => (
                            <option key={index} value={item?.IDCity} selected={editPage?.IDCity === item?.IDCity && item?.CityName} > {item?.CityName}</option>
                          ))
                        }
                      </Form.Select>

                    </Form.Group>

                  </Col>
                  <div className='d-flex justify-content-center align-content-center my-5'>

                    <div className='baseBtn1'>
                      <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                      {translate[isLang].edit.save}

                      </Button>
                    </div>

                    <div className='baseBtn w-auto'>
                      <Link to={'/location/areas'}>
                        <Button variant={'primary'} className='d-flex align-items-center justify-content-center'>
                        {translate[isLang].edit.cancel}                     
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

export default EditArea
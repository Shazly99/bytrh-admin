import React, { useEffect, useRef,useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { apiheader, GetData, PostData } from '../../../../utils/fetchData';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import Component from '../../../../constants/Component';
import Icons from '../../../../constants/Icons';
import { Link } from 'react-router-dom';
import initialTranslation from "./Translation";
import { VendersContext } from '../../../../context/Store';

const EditCountry = () => {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslation)
  const handelTranslate = () => setTranslate(initialTranslation)
 
  
  let { id } = useParams()
  let navigate = useNavigate();
  const CountryNameEn = useRef();
  const CountryNameAr = useRef();
  const CountryTimeZone = useRef();
  const CountryCode = useRef();
   const [editPage, setcountryDetail] = useState(null)

  const submit = e => {
    e.preventDefault()
    editCountry({
      CountryNameEn: CountryNameEn.current.value,
      CountryNameAr: CountryNameAr.current.value,
      CountryTimeZone: '+' + CountryTimeZone.current.value,
      CountryCode: CountryCode.current.value,
      IDCountry: id,
    })
  }

  async function editCountry(Country) {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/location/countries/edit`, Country, apiheader).then((res) => {

      if (res.data.Success === true) {
        toast.success(<strong>{translate[isLang].toast.edit}</strong>, {
          duration: 4000,
          position: 'bottom-center',
          icon: <Icons.Added color='#40AB45' size={25} />,
          iconTheme: {
            primary: '#40AB45',
            secondary: '#fff',
          },
        });
        setTimeout(() => {
          navigate('/location/Country');
        }, 2000);
      } else {
        toast.error(res.data.ApiMsg)
      }
    });
  }

  const countryDetail = async () => {
    let data = await GetData(`${process.env.REACT_APP_API_URL}/admin/location/countries/edit/page/${id}`, apiheader)
    setcountryDetail(data.Response);
   }
  useEffect(() => {
    countryDetail()
    handelTranslate()

  }, [id])
  return (
    <Container fluid>
      <div className="app__addprodects">
        <Component.SubNav sub__nav={[{ name: translate[isLang].edit.nav1, path: '/location/country' }, { name:translate[isLang].edit.nav2, path: `/location/country/editcountry/${id}` }]} />
        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={translate[isLang].edit.header} />
          <div className="app__addOrder-form">
            <div className="app__addprodects-form">
              <form onSubmit={submit}>
                <Row>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>{translate[isLang].edit.Label1}</Form.Label>
                      <Form.Control type="text" name='firstname' ref={CountryNameEn} defaultValue={editPage?.CountryNameEn} />
                    </Form.Group>


                    <Form.Group controlId="formBasicEmail" className='mt-2' >
                      <Form.Label>{translate[isLang].edit.Label2} </Form.Label>
                      <Form.Control type="text" name='firstname' ref={CountryTimeZone} defaultValue={editPage?.CountryTimeZone} />
                    </Form.Group>



                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>{translate[isLang].edit.Label3}</Form.Label>
                      <Form.Control type="text" name='firstname' ref={CountryNameAr} defaultValue={editPage?.CountryNameAr} style={{ direction: 'rtl' }} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className='mt-2'>
                      <Form.Label>  {translate[isLang].edit.Label4}</Form.Label>
                      <Form.Control type="text" name='firstname' ref={CountryCode} defaultValue={editPage?.CountryCode} />
                    </Form.Group>

                  </Col>
                  <div className='d-flex justify-content-center align-content-center my-5'>

                    <div className='baseBtn1'>
                      <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                      {translate[isLang].edit.save}
                      </Button>
                    </div>

                    <div className='baseBtn'>
                      <Link to={'/location/country'}>
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

export default EditCountry
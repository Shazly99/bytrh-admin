import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Component from '../../constants/Component';
import Icons from '../../constants/Icons';
import { VendersContext } from '../../context/Store';
import { GetData, PostData, apiheader } from '../../utils/fetchData';
import initialTranslation from "./Translation";

const EditService = () => {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslation)
  const handelTranslate = () => setTranslate(initialTranslation)
 
  
  let { id } = useParams()
  let navigate = useNavigate();
  const ServiceNameEn = useRef();
  const ServiceNameAr = useRef();

  const [editPage, setEditPage] = useState(null)

  const submit = e => {
    e.preventDefault()
    editService({
      ServiceNameEn: ServiceNameEn.current.value,
      ServiceNameAr: ServiceNameAr.current.value,
      IDService: id,
    })
  }

  async function editService(Service) {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/services/edit`, Service, apiheader).then((res) => {

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
          navigate('/dashboard/services');
        }, 2000);
      } else {
        toast.error(res.data.ApiMsg)
      }
    });
  }

  const serviceDetail = async () => {
    let data = await GetData(`${process.env.REACT_APP_API_URL}/admin/services/edit/page/${id}`, apiheader)
    setEditPage(data.Response);
  }

  useEffect(() => {
    let timeOut = setTimeout(() => {
      serviceDetail()
      handelTranslate()
    }, 200);
  
    return () => {
      clearTimeout(timeOut);
    }
  }, [id])
  
  return (
      <Container fluid>
        <div className="app__addprodects">
          <Component.SubNav sub__nav={[{ name: translate[isLang].edit.nav1, path: '/services' }, { name:translate[isLang].edit.nav2, path: `/services/edit/${id}` }]} />
          <div className="app__addprodects__header ">
            <Component.BaseHeader h1={translate[isLang].edit.header} />
            <div className="app__addOrder-form">
              <div className="app__addprodects-form">
                <form onSubmit={submit}>
                  <Row>
                    <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>{translate[isLang].edit.Label1}</Form.Label>
                        <Form.Control type="text" name='firstname' ref={ServiceNameEn} defaultValue={editPage?.ServiceNameEn} />
                      </Form.Group>

                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>{translate[isLang].edit.Label3}</Form.Label>
                        <Form.Control type="text" name='firstname' ref={ServiceNameAr} defaultValue={editPage?.ServiceNameAr} style={{ direction: 'rtl' }} />
                      </Form.Group>

                    </Col>
                    <div className='d-flex justify-content-center align-content-center my-5'>

                      <div className='baseBtn1'>
                        <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                        {translate[isLang].edit.save}
                        </Button>
                      </div>

                      <div className='baseBtn w-auto'>
                        <Link to={'/dashboard/services'}>
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

export default EditService
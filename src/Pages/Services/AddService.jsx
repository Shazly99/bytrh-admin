import React, { useRef,useContext,useEffect ,useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { apiheader, PostData } from '../../utils/fetchData';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import Component from '../../constants/Component';
import Icons from '../../constants/Icons';
import initialTranslation from "./Translation";
import { VendersContext } from '../../context/Store';


const AddService = () => {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslation)
  const handelTranslate = () => setTranslate(initialTranslation)

  let navigate = useNavigate();
  const serviceNameEn = useRef();
  const serviceNameAr = useRef();


  const submit = e => {
    e.preventDefault()
    addNewservice({
        ServiceNameEn: serviceNameEn.current.value,
        ServiceNameAr: serviceNameAr.current.value,
    })
  }

  async function addNewservice(service) {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/services/add`, service, apiheader).then((res) => {

      if (res.data.Success === true) {
        toast.success(<strong>{translate[isLang].toast.add}</strong>, {
          duration: 4000,
          position: 'bottom-center',
          icon: <Icons.Added color='#40AB45' size={25} />,
          iconTheme: {
            primary: '#0a0',
            secondary: '#fff',
          },
        });
        setTimeout(() => {
          navigate('/services');
        }, 2000);
      } else {
        toast.error(res.data.ApiMsg)
      }
    });
  }

  useEffect(() => {
    let timeOut = setTimeout(() => {
        handelTranslate()
    }, 200);
    return () => {
        clearTimeout(timeOut);
    }
  }, [isLang])
  
  
  return (
    <Container fluid>
      <div className="app__addprodects">
        <Component.SubNav sub__nav={[{ name: translate[isLang].add.nav1, path: '/services' }, { name: translate[isLang].add.nav2, path: '/services/add' }]} />
        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={translate[isLang].add.header} />
          <div className="app__addOrder-form">
            <div className="app__addprodects-form">
              <form onSubmit={submit}>
                <Row>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>  {translate[isLang].add.Label1}</Form.Label>
                      <Form.Control type="text" name='firstname' ref={serviceNameEn} />
                    </Form.Group>

                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>{translate[isLang].add.Label3}</Form.Label>
                      <Form.Control type="text" name='firstname' ref={serviceNameAr} style={{ direction: 'rtl' }} />
                    </Form.Group>

                  </Col>
                  <div className='d-flex justify-content-center align-content-center my-5'>

                    <div className='baseBtn1'>
                      <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                        {translate[isLang].add.save}
                      </Button>
                    </div>

                    <div className='baseBtn w-auto'>
                      <Link to={'/services'}>
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

export default AddService
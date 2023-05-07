import React, { useContext, useRef } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import { VendersContext } from "../../../context/Store";
import { PostData, apiheader } from '../../../utils/fetchData';
import translateBagging from './translateBagging';


const AddBagging = () => {
  let navigate = useNavigate();
  const baggingNameEn = useRef();
  const baggingNameAr = useRef();

  const submit = e => {
    e.preventDefault()
    addNewCategory({
      BaggingNameEn: baggingNameEn.current.value,
      BaggingNameAr: baggingNameAr.current.value,
    })
  }

  async function addNewCategory(bagging) {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/baggings/add`, bagging, apiheader).then((res) => {

      if (res.data.Success === true) {
        toast.success('New user added successfully!', {
          duration: 4000,
          position: 'top-center',
          icon: <Icons.Added color='#40AB45' size={25} />,
          iconTheme: {
            primary: '#0a0',
            secondary: '#fff',
          },
        });
        setTimeout(() => {
          navigate('/dashboard/animals/bagging');
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
            <Component.SubNav sub__nav={[{ name: "إضافـة اسـم تكييس", path: '/animals/bagging/addbagging' } , { name: "قائمـة التكييس", path: '/animals/bagging' }]} />
            :
            <Component.SubNav sub__nav={[{ name: "Baggings", path: '/animals/bagging' }, { name: "Add Bagging ", path: '/animals/bagging/addbagging' }]} />
        }
        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={translateBagging[isLang]?.LabelAddPage} />
          <div className="app__addOrder-form">
            <div className="app__addprodects-form">
              <form onSubmit={submit}>

                <Row>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>{translateBagging[isLang]?.LabelAddNameEN}</Form.Label>
                      <Form.Control type="text" name='firstname' ref={baggingNameEn} />
                    </Form.Group>

                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail" >
                      <Form.Label>{translateBagging[isLang]?.LabelAddNameAR}</Form.Label>
                      <Form.Control type="text" name='email' ref={baggingNameAr} style={{ direction: 'rtl' }} />
                    </Form.Group>

                  </Col>
                  <div className='d-flex justify-content-center align-content-center my-5'>

                    <div className='baseBtn1'>
                      <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                        {translateBagging[isLang]?.SaveBTN}
                      </Button>
                    </div>

                    <div className='baseBtn w-auto'>
                      <Link to={'/dashboard/animals/bagging'}>
                        <Button variant={'primary'} className='d-flex align-items-center justify-content-center'>
                          {translateBagging[isLang]?.CancelBTN}
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

export default AddBagging
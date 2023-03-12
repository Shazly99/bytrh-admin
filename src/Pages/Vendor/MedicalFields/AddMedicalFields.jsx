import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { apiheader, PostData } from '../../../utils/fetchData';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import { useEffect } from 'react';

const AddMedicalFields = () => {

  let navigate = useNavigate();
  const MedicalFieldNameAr = useRef();
  const MedicalFieldNameEn = useRef();

  const submit = e => {
    e.preventDefault()

    addNewMedicalFields({
      MedicalFieldNameEn: MedicalFieldNameEn.current.value,
      MedicalFieldNameAr: MedicalFieldNameAr.current.value,
    })
  }

  async function addNewMedicalFields(MedicalFields) {
     await PostData(`${process.env.REACT_APP_API_URL}/admin/medicalfields/add`, MedicalFields, apiheader).then((res) => {
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
          navigate('/medicalfields');
        }, 2000);
      } else {
        toast.error(res.data.ApiMsg)
      }
    }).catch((err) => {
     });
  }
  useEffect(() => {
  }, [])

  return (
    <>

      <Container fluid>
        <div className="app__addprodects">
          <Component.SubNav sub__nav={[{ name: " Medical Fields", path: '/medicalfields' }, { name: "Add Medical Field ", path: '/medicalfields/add' }]} />

          <div className="app__addprodects__header ">
            <Component.BaseHeader h1={'Add Medical Fields '} />
            <div className="app__addOrder-form">
              <div className="app__addprodects-form">
                <form onSubmit={submit}>
                  <Row>
                    <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>  Name (En)</Form.Label>
                        <Form.Control type="text" name='firstname' ref={MedicalFieldNameEn} />
                      </Form.Group>


                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>  Name (Ar)</Form.Label>
                        <Form.Control type="text" name='firstname' ref={MedicalFieldNameAr} style={{ direction: 'rtl' }} />
                      </Form.Group>

                    </Col>
                    <div className='d-flex justify-content-center align-content-center my-5'>

                      <div className='baseBtn1'>
                        <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                          Save
                        </Button>
                      </div>

                      <div className='baseBtn'>
                        <Link to={'/medicalfields'}>
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

    </>
  )
}

export default AddMedicalFields
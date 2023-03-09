import React, { useRef, useState } from 'react';
import Component from '../../../constants/Component'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { apiheader, PostData } from '../../../utils/fetchData';
import Icons from '../../../constants/Icons';
import { Col, Container, Row, Form, Button, FormControl } from 'react-bootstrap';


const AddAnimalsCutting = () => {
  let navigate = useNavigate();
  const cuttingsNameEn = useRef();
  const cuttingsNameAr = useRef();
 
  const submit = e => {
    e.preventDefault()
    addNewCategory({
      CuttingNameEn: cuttingsNameEn.current.value,
      CuttingNameAr: cuttingsNameAr.current.value,
    })
  }

  async function addNewCategory(category) {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/cuttings/add`, category, apiheader).then((res) => {

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
          navigate('/animals/cutting');
        }, 2000);
      } else {
        toast.error(res.data.ApiMsg)
      }
    });
  }
  return (
    <Container fluid>
    <div className="app__addprodects">
        <Component.SubNav sub__nav={[{ name: "Animal Categories", path: '/animals/cutting' }, { name: "Add Category ", path: '/animals/cutting/addcutting' }]} />
        <div className="app__addprodects__header ">
            <Component.BaseHeader h1={'Add Cutting Name   '} />
            <div className="app__addOrder-form">
                <div className="app__addprodects-form">
                    <form onSubmit={submit}>
         
                        <Row>
                            <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>  Name (En)</Form.Label>
                                    <Form.Control type="text" name='firstname' ref={cuttingsNameEn} />
                                </Form.Group>

                            </Col>
                            <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                                <Form.Group controlId="formBasicEmail" >
                                    <Form.Label> Name (Ar)</Form.Label>
                                    <Form.Control type="text" name='email' ref={cuttingsNameAr} style={{ direction: 'rtl' }} />
                                </Form.Group>

                            </Col>
                            <div className='d-flex justify-content-center align-content-center my-5'>

                                <div className='baseBtn1'>
                                    <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                        Save
                                    </Button>
                                </div>

                                <div className='baseBtn'>
                                    <Link to={'/animals/cutting'}>
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

export default AddAnimalsCutting
import React from 'react'
import Component from '../../../../constants/Component';
import { Col, FloatingLabel, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Icons from '../../../../constants/Icons';
import { Form } from 'react-bootstrap';

const AddUser = () => {
    return (
        <>


        
            <Container fluid>
                <div className="app_addOrder">
                    <Component.SubNav sub__nav={[{ name: "Sub Users", path: '/venderSubuser' }, { name: "Add Sub User", path: '/venderSubuser/addUser' }]} />
                    <Component.BaseHeader h1={'Add Sub user'} />
                    <div className="app__addOrder-form ">
                        <Form>
                            <Row>
                                <Col xl={6} lg={6} md={6} sm={12} className="app__addOrder-form-left">

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="email" />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail" className='mt-2' >
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="email" />
                                    </Form.Group>

                                    <div className="mt-2">
                                        <Form.Label>   Access Type</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Access Type</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </div>

                                </Col>

                                <Col xl={6} lg={6} md={6} sm={12} className="app__addOrder-form-right">

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail" className="mt-2">
                                        <Form.Label>Mobile</Form.Label>
                                        <Form.Control type="number" />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail" className="mt-2">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" />
                                    </Form.Group>

                                </Col>
                            </Row>
                            <div className='d-flex justify-content-center align-content-center my-5'>
                                <Component.ButtonBase title={"Add Sub User"} bg={"primary"} icon={<Icons.add />} path="/venderProducts/addProduct" />
                            </div>

                        </Form>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default AddUser

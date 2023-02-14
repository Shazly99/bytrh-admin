import React from 'react';
import { useState, useEffect } from "react";
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Component from '../../../../constants/Component';
import Icons from '../../../../constants/Icons';

import Form from 'react-bootstrap/Form';

const AddNewUser = () => {
    return (
        <>
            <Container fluid>
                <div className="app__addprodects">
                    <Component.SubNav sub__nav={[{ name: "Users", path: '/user' }, { name: "Add User", path: '/user/addUser' }]} />
                    <div className="app__addprodects__header ">
                        <Component.BaseHeader h1={'Add New Users'} />
                        <div className="app__addOrder-form">

                            <div className="app__addprodects-form">
                                <Form>
                                    <Row>
                                        <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Users Name (En)</Form.Label>
                                                <Form.Control type="email" />
                                            </Form.Group>

                                        </Col>
                                        <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Users Name (En)</Form.Label>
                                                <Form.Control type="email" />
                                            </Form.Group>

                                        </Col>
                                    </Row>
                                    <div className='d-flex justify-content-center align-content-center my-5'>
                                        <Component.ButtonBase title={"Add new Users"} bg={"primary"} icon={<Icons.add />} path="/venderUsers/addUsers" />
                                    </div>

                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default AddNewUser
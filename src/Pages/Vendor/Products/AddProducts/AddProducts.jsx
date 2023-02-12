import React from 'react';
// import { useState, useEffect } from "react";
import { Col, FloatingLabel, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Component from '../../../../constants/Component';
import Icons from '../../../../constants/Icons';

import Form from 'react-bootstrap/Form';

const AddProducts = () => {
    return (
        <>
            <Container fluid>
                <div className="app__addprodects">
                    <Component.SubNav sub__nav={[{ name: "Products", path: '/venderProducts' }, { name: "Add Product", path: '/venderProducts/addProduct' }]} />
                    <div className="app__addprodects__header ">
                        <Component.BaseHeader h1={'Add New Product'} />
                        <div className="app__addOrder-form">
                            <Component.BaseHeader h2={"Product Image/Video"} />
                            <div className="app__addprodects__header-images  ">
                                <Row>
                                    <Col xl={3} lg={3} md={6} sm={12}  >
                                        <div className="app__addprodects__img d-flex justify-content-center align-items-center">
                                            <Icons.upload size={30} />
                                            <a href="">Upload Image or Video</a>
                                        </div>
                                    </Col>
                                    <Col xl={3} lg={3} md={6} sm={12}  >
                                        <div className="app__addprodects__img d-flex justify-content-center align-items-center">
                                            <Icons.upload size={30} />
                                            <a href="">Upload Image or Video</a>
                                        </div>
                                    </Col>
                                    <Col xl={3} lg={3} md={6} sm={12}  >
                                        <div className="app__addprodects__img d-flex justify-content-center align-items-center">
                                            <Icons.upload size={30} />
                                            <a href="">Upload Image or Video</a>
                                        </div>
                                    </Col>
                                    <Col xl={3} lg={3} md={6} sm={12}  >
                                        <div className="app__addprodects__img d-flex justify-content-center align-items-center">
                                            <Icons.upload size={30} />
                                            <a href="">Upload Image or Video</a>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="app__addprodects-form">
                                <Form>
                                    <Row>
                                        <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Product Name (En)</Form.Label>
                                                <Form.Control type="email" />
                                            </Form.Group>

                                            <Form.Group className="mt-3" controlId="formBasicPassword">
                                                <Form.Label>Description (En)</Form.Label>
                                                <Form.Control as="textarea" style={{ height: '100px', resize: 'none' }} />
                                            </Form.Group>

                                            <div className="mt-3">
                                                <Form.Label>Product Category</Form.Label>
                                                <Form.Select aria-label="Default select example">
                                                    <option>Type of products</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </Form.Select>
                                            </div>

                                            <Form.Group className="mt-3" controlId="formBasicEmail">
                                                <Form.Label>Cost Price</Form.Label>
                                                <Form.Control type="number" />
                                            </Form.Group>

                                            <Form.Group className="mt-3" controlId="formBasicEmail">
                                                <Form.Label>Suggested Price</Form.Label>
                                                <Form.Control type="number" />
                                            </Form.Group>

                                            <Form.Group className="mt-3" controlId="formBasicEmail">
                                                <Form.Label>Barcode</Form.Label>
                                                <Form.Control type="number" />
                                            </Form.Group>

                                            <Form.Group className="mt-3" controlId="formBasicEmail">
                                                <Form.Label className='d-flex flex-row gap-1 '>
                                                    <span>Stock</span> <span style={{ opacity: 0.5 }}>(Products no)</span>
                                                </Form.Label>
                                                <Form.Control type="text" />
                                            </Form.Group>

                                            <Form.Group className="mt-3" controlId="formBasicEmail">
                                                <Form.Label>low Stock Alert</Form.Label>
                                                <Form.Control type="text" />
                                            </Form.Group>

                                        </Col>

                                        <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-ar">
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Product Name (ِAr)</Form.Label>
                                                <Form.Control type="text"  dir='rtl'/>
                                            </Form.Group>

                                            <Form.Group className="mt-3" controlId="formBasicPassword">
                                                <Form.Label>Description (Ar)</Form.Label>
                                                <Form.Control as="textarea" style={{ height: '100px', resize: 'none' }} dir='rtl'/>
                                            </Form.Group>
                                            <Form.Group className="mt-3" controlId="formBasicEmail">
                                                <Form.Label className='d-flex flex-row gap-1 '>
                                                    <span>Brand </span> <span style={{ opacity: 0.5 }}>(Optional)</span>
                                                </Form.Label>
                                                <Form.Control type="text" />
                                            </Form.Group>

                                            <Form.Group className="mt-3" controlId="formBasicEmail">
                                                <Form.Label>Selling Price</Form.Label>
                                                <Form.Control type="number" />
                                            </Form.Group>
                                            <Form.Group className="mt-3" controlId="formBasicEmail">
                                                <Form.Label> Weight</Form.Label>
                                                <Form.Control type="number" />
                                            </Form.Group>

                                            <Form.Group className="mt-3" controlId="formBasicEmail">
                                                <Form.Label> Sku</Form.Label>
                                                <Form.Control type="number" />
                                            </Form.Group>

                                            <Form.Group className="mt-3" controlId="formBasicEmail">
                                                <Form.Label> End Date</Form.Label>
                                                <Form.Control type="date" />
                                            </Form.Group>

                                            <Form.Group className="mt-3" controlId="formBasicEmail">
                                                <Form.Label>Alert End Date</Form.Label>
                                                <Form.Control type="date" />
                                            </Form.Group>


                                        </Col>
                                    </Row>
                                    <div className='d-flex justify-content-center align-content-center my-5'>
                                        <Component.ButtonBase title={"Add new product"} bg={"primary"} icon={<Icons.add />} path="/venderProducts/addProduct" />
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

export default AddProducts
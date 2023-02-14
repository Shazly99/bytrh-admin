import React, { useContext, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Component from '../../../constants/Component';
import { Col, FloatingLabel, Modal, Row } from 'react-bootstrap';
import './Profile.scss'
import { Button } from 'react-bootstrap/';
import axios from 'axios';
import { apiheader, GetData } from '../../../utils/fetchData';
import { VendersContext } from '../../../context/Store';

function Profile() {
  let { userId } = useContext(VendersContext);

  const [show, setShow] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userProfileGet = async () => {
    let resp = await GetData(`https://bytrh.com/api/admin/users/profile/${userId}`, apiheader);
    setUserProfile(resp.Response);
  }

  useEffect(() => {
    // console.log(localStorage.getItem("IDUser"));
    userProfileGet()
  }, [userProfile])
  useEffect(() => {
    // console.log(localStorage.getItem("IDUser"));

  }, [userProfile])

  return (
    <>
      <div className="app__profile px-2">
        <Component.BaseHeader h1={'Personal Information'} />
        <div className="app__addOrder-form ">
          <Form>
            <Row>
              <Col xl={6} lg={6} md={6} sm={12} className="app__addOrder-form-left">

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Full Name  </Form.Label>
                  <Form.Control type="text" value={userProfile?.UserName} disabled={true} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail" className='mt-2' >
                  <Form.Label> Mobile  </Form.Label>
                  <Form.Control value={userProfile?.UserPhone} disabled />
                </Form.Group>

                {/* <div className="mt-2">
                  <Form.Label>Country</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>Country </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div> */}

              </Col>

              <Col xl={6} lg={6} md={6} sm={12} className="app__addOrder-form-right">

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={userProfile?.UserEmail} disabled />
                </Form.Group>

                <Form.Group controlId="formBasicEmail" className="mt-2">
                  <Form.Label>User Rank</Form.Label>
                  <Form.Control type="text" value={userProfile?.UserRank} />
                </Form.Group>

                {/* <div className="mt-2">
                  <Form.Label>City</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>City </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div> */}
              </Col>
            </Row>
            <div className='d-flex justify-content-center align-content-center my-5'>
              <Component.ButtonBase title={"Update Information"} bg={"primary"} path="/venderProfile " onclick={handleShow} /> 
            </div>

          </Form>
        </div>

        <div className="pp__profile-model">
          {/* <a className='app__profile-model-a' onClick={handleShow}>
            Change Password
          </a> */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className=' d-flex justify-content-center align-items-center'>
              <Modal.Title className=' w-100 text-center' >Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center align-items-center  p-0 m-0 '>
              <Component.ButtonBase onclick={handleClose} title={'confirmation'} bg={'primary'} />
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default Profile
import React, { useRef } from 'react';
import { useState, useEffect } from "react";
import { Button, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Component from '../../../../constants/Component';
import Icons from '../../../../constants/Icons';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Form from 'react-bootstrap/Form';
import { apiheader, PostData } from '../../../../utils/fetchData';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const AddNewUser = () => {
    let navigate = useNavigate();

    const [data, setData] = useState({});

    const [phoneNumber, setPhoneNumber] = useState('');
    const [Country, setCountry] = useState({});
    const username = useRef();
    const email = useRef();
    const password = useRef();


    const onChangeHandler = (phone, country, e) => {
        console.log(phone);
        console.log(country);
        setPhoneNumber(phone)
        setCountry(country.dialCode)
    }

    const submit = e => {
        e.preventDefault()
        // setData({
        //     UserEmail: email.current.value,
        //     UserPassword: password.current.value,
        //     UserPhone: '+' + phoneNumber,
        //     UserPhoneFlag: '+' + Country,
        //     UserName: username.current.value,
        //     IDCity: 1
        // })
        console.log({
            UserEmail: email.current.value,
            UserPassword: password.current.value,
            UserPhone: '+' + phoneNumber,
            UserPhoneFlag: '+' + Country,
            UserName: username.current.value,
            IDCity: 1
        });
        addNewUser({
            UserEmail: email.current.value,
            UserPassword: password.current.value,
            UserPhone: '+' + phoneNumber,
            UserPhoneFlag: '+' + Country,
            UserName: username.current.value,
            IDCity: 1
        })
    }

    async function addNewUser(newUser) {
        await PostData(`https://bytrh.com/api/admin/users/add`, newUser, apiheader).then((res) => {
            console.log(res.data);
            if (res.data.Success === true) {
                toast.success('New user added successfully!', {
                    duration: 4000,
                    position: 'top-center',  
                    icon: <Icons.Added color='#40AB45' size={25}/>, 
                    iconTheme: {
                      primary: '#0a0',
                      secondary: '#fff',
                    }, 
                  });
                setTimeout(() => {
                    navigate('/user');
                }, 2000);
            }else{
                toast.error(res.data.ApiMsg)
            }
        });
    }

    useEffect(() => {
    }, [data, phoneNumber])

    return (
        <>
            <Container fluid>
                <div className="app__addprodects">
                    <Component.SubNav sub__nav={[{ name: "Users", path: '/user' }, { name: "Add User", path: '/user/addUser' }]} />
                    <div className="app__addprodects__header ">
                        <Component.BaseHeader h1={'Add New Users'} />
                        <div className="app__addOrder-form">
                            <div className="app__addprodects-form">
                                <form onSubmit={submit}>
                                    <Row>
                                        <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Users Name</Form.Label>
                                                <Form.Control type="text" name='firstname' ref={username} />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicEmail" className='mt-3'>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" name='email' ref={email} />
                                            </Form.Group>


                                            {/* <div className="mt-2">
                                                <Form.Label>City ID</Form.Label>
                                                <Form.Select aria-label="Default select example">
                                                    <option>Access City</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </Form.Select>
                                            </div> */}


                                        </Col>
                                        <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">
                                            <Form.Group controlId="formBasicEmail"  >
                                                <Form.Label>Mobile</Form.Label>
                                                <PhoneInput
                                                    country='sa'
                                                    // onlyCountries={['eg', 'sa']} 
                                                    preferredCountries={['eg', 'sa', "ae"]}
                                                    value={phoneNumber}
                                                    onChange={onChangeHandler}
                                                    enableSearch={true}
                                                    inputClass={'w-100'}
                                                    inputStyle={{ width: '300px' }}
                                                    searchPlaceholder="Country number..."
                                                    inputExtraProps={{
                                                        autoFocus: true,
                                                    }}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail" className='mt-3'>
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" ref={password} />
                                            </Form.Group>

                                        </Col>
                                        <div className='d-flex justify-content-center align-content-center my-5'>
                                            <div className='baseBtn'>
                                                <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                                    Add New User
                                                </Button>
                                            </div>
                                        </div>
                                    </Row>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default AddNewUser
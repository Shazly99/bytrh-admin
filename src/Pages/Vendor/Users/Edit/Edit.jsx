import { Container } from 'react-bootstrap'
import Component from '../../../../constants/Component'
import React, { useRef } from 'react';
import { useState, useEffect } from "react";
import { Button, Col, Row } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Form from 'react-bootstrap/Form';
import { apiheader, GetData, PostData } from '../../../../utils/fetchData';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Icons from '../../../../constants/Icons';

const Edit = () => {
    let navigate = useNavigate();

    let { id } = useParams()
    const [userData, setUserData] = useState({});

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
        /*        setData({
                   UserEmail: email.current.value,
                   UserPassword: password.current.value,
                   UserPhone: '+' + phoneNumber,
                   UserPhoneFlag: '+' + Country,
                   UserName: username.current.value,
                   IDCity: 1,
                   IDUser: id
               }) */
        // console.log({
        //     UserEmail: email.current.value,
        //     UserPassword: password.current.value,
        //     UserPhone: '+' + phoneNumber,
        //     UserPhoneFlag: '+' + Country,
        //     UserName: username.current.value,
        //     IDCity: 1
        // });
        addNewUser({
            UserEmail: email.current.value,
            UserPassword: password.current.value,
            UserPhone: '+' + phoneNumber,
            UserPhoneFlag: '+' + Country,
            UserName: username.current.value,
            IDCity: 1,
            IDUser: id
        }).then(res => {

        }).catch(err => {
            console.log(err);
        })
    }

    async function addNewUser(editUserData) {
        let {data} = await PostData(`https://bytrh.com/api/admin/users/edit`, editUserData, apiheader);
        console.log(data);
        if ( data.Success === true) {
            toast.success('User data has been updated!', {
                duration: 4000,
                position: 'top-center',
                icon: <Icons.Added color='#40AB45' size={25} />,
                iconTheme: {
                    primary: '#0a0',
                    secondary: '#fff',
                },
            });
            setTimeout(() => {
                navigate('/user');
            }, 2000);
        } else {
            toast.error( data.ApiMsg)
        }
    }

    const diplayUserData = async () => {
        let data = await GetData(`https://bytrh.com/api/admin/users/profile/${id}`, apiheader)
        setUserData(data.Response);

    }
    useEffect(() => {
        diplayUserData()
    }, [phoneNumber])
    return (
        <>
            <Container fluid>
                <div className="app__addprodects">
                    <Component.SubNav sub__nav={[{ name: "Users", path: '/user' }, { name: "Edit User", path: `/user/editUser/${id}` }]} />
                    <div className="app__addprodects__header ">
                        <Component.BaseHeader h1={'Edit User'} />
                        <div className="app__addOrder-form">
                            <div className="app__addprodects-form">
                                <form onSubmit={submit}>
                                    <Row>
                                        <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Users Name</Form.Label>
                                                <Form.Control type="text" name='firstname' ref={username} defaultValue={userData?.UserName} />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicEmail" className='mt-3'>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" name='email' ref={email} defaultValue={userData?.UserEmail} />
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
                                                    country={'+20'}
                                                    value={userData?.UserPhone}
                                                    // country='sa'
                                                    // onlyCountries={['eg', 'sa']} 
                                                    preferredCountries={['eg', 'sa', "ae"]}
                                                    // value={phoneNumber}
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
                                                <Form.Control type="password" ref={password} defaultValue={userData?.UserPassword} />
                                            </Form.Group>

                                        </Col>
                                        <div className='d-flex justify-content-center align-content-center my-5'>
                                            <div className='baseBtn'>
                                                <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                                    Update User
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

export default Edit

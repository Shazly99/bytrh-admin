import { Container } from 'react-bootstrap'
import Component from '../../../../constants/Component'
import React, { useContext, useRef } from 'react';
import { useState, useEffect } from "react";
import { Button, Col, Row } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Form from 'react-bootstrap/Form';
import { apiheader, GetData, PostData } from '../../../../utils/fetchData';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Icons from '../../../../constants/Icons';
import useFetch from '../../../../utils/useFetch';
import initialTranslate from './../initialTranslate';
import { VendersContext } from '../../../../context/Store';

const Edit = () => {
    let { isLang } = useContext(VendersContext);
    const [translate, setTranslate] = useState(initialTranslate)
    const handelTranslate = () => {
        setTranslate(initialTranslate)
    }
    let navigate = useNavigate();
    let { countries, cities, getCities } = useFetch()
    let { id } = useParams()
    const [userData, setUserData] = useState({});
    const selectCity = useRef();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [Country, setCountry] = useState('');
    const username = useRef();
    const email = useRef();
    const password = useRef();

    // const onChangeHandler = (phone, country, e) => {
    //     setPhoneNumber(phone)
    //     setCountry(country.dialCode)
    // }
    const handelSelectCountry = (event) => {
        const selectedCountryId = event.target.value;
        getCities(selectedCountryId)
    }
    const submit = e => {
        e.preventDefault()
        addNewUser({
            UserEmail: email.current.value,
            // UserPassword: password.current.value,
            UserPhone: phoneNumber,
            UserPhoneFlag: Country,
            UserName: username.current.value,
            IDCity: selectCity.current.value,
            IDUser: id
        }).then(res => {

        }).catch(err => {
        })
    }

    async function addNewUser(editUserData) {
        let { data } = await PostData(`https://bytrh.com/api/admin/users/edit`, editUserData, apiheader);

        if (data.Success === true) {
            toast.success(<strong>{translate[isLang].toast.edit}</strong>, {
                duration: 4000,
                position: 'bottom-center',
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
            toast.error(data.ApiMsg)
        }
    }

    const diplayUserData = async () => {
        let data = await GetData(`https://bytrh.com/api/admin/users/profile/${id}`, apiheader)
        setUserData(data.Response);
        getCities(data.Response.IDCountry)
        setCountry(data.Response.UserPhoneFlag)
        setPhoneNumber(data.Response.UserPhone)
        console.log(data);
    }
    useEffect(() => {
        diplayUserData()
        handelTranslate()
    }, [isLang])
    return (
        <>
            <Container fluid>
                <div className="app__addprodects">
                    <Component.SubNav sub__nav={[{ name: translate[isLang]?.edit[0]?.nav1, path: '/user' }, { name: translate[isLang]?.edit[0]?.nav2, path: `/user/editUser/${id}` }]} />
                    <div className="app__addprodects__header ">
                        <Component.BaseHeader h1={translate[isLang]?.edit[1]?.header} />
                        <div className="app__addOrder-form">
                            <div className="app__addprodects-form">
                                <form onSubmit={submit}>
                                    <Row>
                                        <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>{translate[isLang]?.edit[1]?.Label1}</Form.Label>
                                                <Form.Control type="text" name='firstname' ref={username} defaultValue={userData?.UserName} />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicEmail" className='mt-3'>
                                                <Form.Label>{translate[isLang]?.edit[1]?.Label2}</Form.Label>
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
                                            <Form.Group controlId="formBasicEmail" className='mt-3'>
                                                <Form.Label>{translate[isLang]?.edit[1]?.Label3}</Form.Label>
                                                <Form.Select aria-label="Default select example" onClick={handelSelectCountry}>
                                                    {
                                                        countries?.map((item, index) => (
                                                            <option key={index} value={item?.IDCountry} selected={userData?.IDCountry === item?.IDCountry && item?.CountryName}  >{item?.CountryName}  </option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">
                                            <Form.Group controlId="formBasicEmail"  >
                                                <Form.Label>{translate[isLang]?.edit[1]?.Label4}</Form.Label>
                                                <div dir='ltr'>
                                                    <PhoneInput  
                                                        value={userData?.UserPhone}
                                                        preferredCountries={['eg', 'sa', "ae"]} 
                                                        enableSearch={true}
                                                        inputClass={'w-100'}
                                                        inputStyle={{ width: '300px' }}
                                                        searchPlaceholder="Country number..."
                                                        inputExtraProps={{
                                                            autoFocus: true,
                                                        }}
                                                        inputProps={{
                                                            name: 'UserPhone',
                                                            required: true,
                                                            id: 'UserPhone',
                                                            value: phoneNumber 
                                                        }}
                                                        onChange={(UserPhone, UserPhoneFlag, e) => {
                                                            setPhoneNumber(`+${UserPhone}`)
                                                            setCountry(`+${UserPhoneFlag.dialCode}`)
                                                        }}
                                                    />
                                                </div>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail" className='mt-3'>
                                                <Form.Label>{translate[isLang]?.edit[1]?.Label5}</Form.Label>
                                                <Form.Control type="password" ref={password} defaultValue={userData?.UserPassword} />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail" className='mt-3' >
                                                <Form.Label>{translate[isLang]?.edit[1]?.Label6}</Form.Label>

                                                <Form.Select aria-label="Default select example" ref={selectCity}>
                                                    {
                                                        cities?.map((item, index) => (
                                                            <option key={index} value={item?.IDCity} selected={userData?.IDCity === item?.IDCity && item?.CityName} > {item?.CityName}</option>
                                                        ))
                                                    }
                                                </Form.Select>

                                            </Form.Group>
                                        </Col>


                                        <div className='d-flex justify-content-center align-content-center my-5'>

                                            <div className='baseBtn1'>
                                                <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                                    {translate[isLang]?.edit[2]?.save}

                                                </Button>
                                            </div>

                                            <div className='baseBtn'>
                                                <Link to={'/user'}>
                                                    <Button variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                                        {translate[isLang]?.edit[2]?.cancel}

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
        </>
    )
}

export default Edit

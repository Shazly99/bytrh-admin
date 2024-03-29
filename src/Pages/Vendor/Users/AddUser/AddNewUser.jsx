import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import Component from '../../../../constants/Component';
import Icons from '../../../../constants/Icons';
import { VendersContext } from '../../../../context/Store';
import { GetData, PostData, apiheader } from '../../../../utils/fetchData';
import useFetch from '../../../../utils/useFetch';
import initialTranslate from '../initialTranslate';

const AddNewUser = () => {
    let { isLang } = useContext(VendersContext);
    const [translate, setTranslate] = useState(initialTranslate)
    const handelTranslate = () => {
        setTranslate(initialTranslate)
    }
    let navigate = useNavigate();
    const [role, setRole] = useState(null);
    const countriesRef = useRef(null);
    const ruleRef = useRef(null);

    let { countries, cities, getCities } = useFetch()

    const [phoneNumber, setPhoneNumber] = useState('');
    const [Country, setCountry] = useState({});
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const handelSelectCountry = (event) => {
        const selectedCountryId = event.target.value;
        getCities(selectedCountryId)
    }


    const onChangeHandler = (phone, country, e) => {
        setPhoneNumber(phone)
        setCountry(country.dialCode)
    }

    const submit = e => {
        e.preventDefault()
        if (localStorage.getItem('Role') === '1') {
            addNewUser({
                UserEmail: email.current.value,
                UserPassword: password.current.value,
                UserPhone: '+' + phoneNumber,
                UserPhoneFlag: '+' + Country,
                UserName: username.current.value,
                IDRole: ruleRef.current.value,
                IDCity: countriesRef.current.value
            })
        } else if (localStorage.getItem('Role') === '2') {
            addNewUser({
                UserEmail: email.current.value,
                UserPassword: password.current.value,
                UserPhone: '+' + phoneNumber,
                UserPhoneFlag: '+' + Country,
                UserName: username.current.value,
                IDRole: 'Medical Center',
                IDCity: countriesRef.current.value
            })
        }
    }

    async function addNewUser(newUser) {
        await PostData(`https://bytrh.com/api/admin/users/add`, newUser, apiheader).then((res) => {

            if (res.data.Success === true) {
                toast.success(<strong>{translate[isLang].toast.add}</strong>, {
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
                toast.error(res.data.ApiMsg)
            }
        });
    }

    async function rolesList(newUser) {
        let data = await GetData(`https://bytrh.com/api/admin/roles`, apiheader)
        setRole(data.Response);
    }


    useEffect(() => {
        handelTranslate()

        rolesList()
    }, [])
    useEffect(() => {
    }, [phoneNumber, isLang])

    return (
        <>
            <Container fluid>
                <div className="app__addprodects">
                    <Component.SubNav sub__nav={[{ name: translate[isLang]?.add[1]?.nav1, path: '/user' }, { name: translate[isLang]?.add[1]?.nav2, path: '/user/addUser' }]} />
                    <div className="app__addprodects__header ">
                        <Component.BaseHeader h1={translate[isLang]?.add[2]?.header} />
                        <div className="app__addOrder-form">
                            <div className="app__addprodects-form">
                                <form onSubmit={submit}>
                                    <Row>
                                        <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>{translate[isLang]?.add[2]?.Label1}</Form.Label>
                                                <Form.Control type="text" name='firstname' ref={username} />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicEmail" className='mt-3'>
                                                <Form.Label>{translate[isLang]?.add[2]?.Label2}</Form.Label>
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


                                            <Form.Group controlId="formBasicEmail" className='mt-3'>
                                                <Form.Label>{translate[isLang]?.add[2]?.Label3}</Form.Label>
                                                <Form.Select aria-label="Default select example" onClick={handelSelectCountry}>
                                                    {/* <option>{countries[1].CountryName}</option> */}
                                                    {
                                                        countries?.map((item, index) => (
                                                            <option key={index} value={item?.IDCountry}  >{item?.CountryName}</option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                            {
                                                localStorage.getItem('Role') === '1' &&

                                                <Form.Group controlId="formBasicEmail" className='mt-3'>
                                                    <Form.Label>{translate[isLang]?.roule.name} </Form.Label>
                                                    <Form.Select aria-label="Default select example" ref={ruleRef}  >
                                                        {/* <option>{countries[1].CountryName}</option> */}
                                                        {
                                                            role?.map((item, index) => (
                                                                <option key={index} value={item?.IDRole}  >{item?.RoleName}</option>
                                                            ))
                                                        }
                                                    </Form.Select>
                                                </Form.Group>
                                            }
                                        </Col>
                                        <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">
                                            <Form.Group controlId="formBasicEmail"  >
                                                <Form.Label  >{translate[isLang]?.add[2]?.Label4}</Form.Label>
                                                <div dir='ltr'>
                                                    <PhoneInput
                                                        country='sa'
                                                        // onlyCountries={['eg', 'sa']} 
                                                        preferredCountries={['eg', 'sa', "ae"]}
                                                        searchPlaceholder={isLang === 'ar' ? 'الرقم الكودي الدولـة..' : 'Country number...'}

                                                        value={phoneNumber}
                                                        onChange={onChangeHandler}
                                                        enableSearch={true}
                                                        inputClass={'w-100'}
                                                        inputStyle={{ width: '300px' }}
                                                        inputExtraProps={{
                                                            autoFocus: true,

                                                        }}
                                                    />
                                                </div>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail" className='mt-3'>
                                                <Form.Label>{translate[isLang]?.add[2]?.Label5}</Form.Label>
                                                <Form.Control type="password" ref={password} />
                                            </Form.Group>


                                            <Form.Group controlId="formBasicEmail" className='mt-3'>
                                                <Form.Label>{translate[isLang]?.add[2]?.Label6}</Form.Label>
                                                <Form.Select aria-label="Default select example" ref={countriesRef}>

                                                    {
                                                        cities?.map((item, index) => (
                                                            <option key={index} value={item?.IDCity}>{item?.CityName}</option>
                                                        ))
                                                    }
                                                    {/* <option value="0">InActive</option> */}
                                                </Form.Select>

                                            </Form.Group>
                                        </Col>
                                        <div className='d-flex justify-content-center align-content-center my-5'>

                                            <div className='baseBtn1'>
                                                <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                                    {translate[isLang]?.add[3]?.save}
                                                </Button>
                                            </div>

                                            <div className='baseBtn w-auto'>
                                                <Link to={'/user'}>
                                                    <Button variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                                        {translate[isLang]?.add[3]?.cancel}
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

export default AddNewUser
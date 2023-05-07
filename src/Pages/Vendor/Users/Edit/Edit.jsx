import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Component from '../../../../constants/Component';
import Icons from '../../../../constants/Icons';
import { VendersContext } from '../../../../context/Store';
import { GetData, PostData, apiheader } from '../../../../utils/fetchData';
import useFetch from '../../../../utils/useFetch';
import initialTranslate from './../initialTranslate';

const Edit = () => {
    let { isLang } = useContext(VendersContext);
    const [translate, setTranslate] = useState(initialTranslate)
    const handelTranslate = () => {
        setTranslate(initialTranslate)
    }
    let navigate = useNavigate();
    const [role, setRole] = useState(null);

    let { countries, cities, getCities } = useFetch()
    let { id } = useParams()
    const [userData, setUserData] = useState({});
    const selectCity = useRef();
    const ruleRef = useRef(null);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [Country, setCountry] = useState('');
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handelSelectCountry = (event) => {
        const selectedCountryId = event.target.value;
        getCities(selectedCountryId)
    }
    async function rolesList() {
        let data = await GetData(`https://bytrh.com/api/admin/roles`, apiheader)
        setRole(data.Response);
    }
    const submit = e => {
        e.preventDefault()
        if (localStorage.getItem('Role') === '1') {
            addNewUser({
                UserEmail: email.current.value,
                UserPhone: phoneNumber,
                UserPhoneFlag: Country,
                UserName: username.current.value,
                IDCity: selectCity.current.value,
                IDRole: ruleRef.current.value,
                IDUser: id
            })
        } else if (localStorage.getItem('Role') === '2') {
            addNewUser({
                UserEmail: email.current.value,
                UserPhone: phoneNumber,
                UserPhoneFlag: Country,
                UserName: username.current.value,
                IDCity: selectCity.current.value,
                IDRole: 'Medical Center',
                IDUser: id
            })
        }
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
                navigate('/dashboard/user');
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
    }




    const updateData = e => {
        updatePassword({
            UserPassword: password.current.value,
            IDUser: id
        })
         
    }


    const updatePassword = async (password) => {
        let { data } = await PostData(`https://bytrh.com/api/admin/users/edit`, password, apiheader)
        if (data.Success === true) {
            toast.success(<strong>{translate[isLang].toast.updatePassword}</strong>, {
                duration: 4000,
                position: 'bottom-center',
                icon: <Icons.Added color='#40AB45' size={25} />,
                iconTheme: {
                    primary: '#0a0',
                    secondary: '#fff',
                },
            });
            handleClose()
        } else {
            toast.error(data.ApiMsg)
        }
    }
    useEffect(() => {
        diplayUserData()
        handelTranslate()
        rolesList()
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



                                            {
                                                localStorage.getItem('Role') === '1' &&

                                                <Form.Group controlId="formBasicEmail" className='mt-3'>
                                                    <Form.Label>{translate[isLang]?.roule.name} </Form.Label>
                                                    <Form.Select aria-label="Default select example" ref={ruleRef}  >
                                                        {/* <option>{countries[1].CountryName}</option> */}
                                                        {
                                                            role?.map((item, index) => (
                                                                <option key={index} value={item?.IDRole} selected={userData?.IDRole === item?.IDRole && item?.RoleName}  >{item?.RoleName}</option>
                                                            ))
                                                        }
                                                    </Form.Select>
                                                </Form.Group>
                                            }




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
                                                <Form.Label>{translate[isLang]?.edit[1]?.Label3}</Form.Label>
                                                <Form.Select aria-label="Default select example" onClick={handelSelectCountry}>
                                                    {
                                                        countries?.map((item, index) => (
                                                            <option key={index} value={item?.IDCountry} selected={userData?.IDCountry === item?.IDCountry && item?.CountryName}  >{item?.CountryName}  </option>
                                                        ))
                                                    }
                                                </Form.Select>
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

                                            <div className='baseBtn w-auto'>
                                                <Link to={'/dashboard/user'}>
                                                    <Button variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                                        {translate[isLang]?.edit[2]?.cancel}

                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Row>
                                </form>
                                <div className="pp__profile-model">
                                    <a className='app__profile-model-a' onClick={handleShow}>
                                        Change Password
                                    </a>
                                    <Modal show={show} onHide={handleClose} centered>
                                        <Modal.Header closeButton className=' d-flex justify-content-center align-items-center'>
                                            <Modal.Title className=' w-100 text-center' >Change Password</Modal.Title>
                                        </Modal.Header>
                                        <form onSubmit={updatePassword}>
                                            <Modal.Body>
                                                <Form.Group controlId="formBasicEmail" className='mt-3'>
                                                    <Form.Label>{translate[isLang]?.edit[1]?.Label5}</Form.Label>
                                                    <Form.Control type="password" ref={password} />
                                                </Form.Group>
                                            </Modal.Body>
                                            <Modal.Footer className='d-flex justify-content-center align-items-center  p-0 m-0 '>
                                                <div className='baseBtn1'>
                                                    <Button onClick={updateData} variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                                        update password
                                                    </Button>
                                                </div>


                                            </Modal.Footer>
                                        </form>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Edit

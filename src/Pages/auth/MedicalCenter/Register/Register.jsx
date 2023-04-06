import CircularProgress from '@mui/material/CircularProgress';
import React, { useContext, useRef, useState } from 'react';
import { Container, Col, Row, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LogoSvg from '../../../../assets/svg/LogoSvg';
import "./SignUp.scss";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import useFetch from '../../../../utils/useFetch';
import { toast } from 'react-hot-toast';
import { apiheader, PostData } from '../../../../utils/fetchData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Player } from '@lottiefiles/react-lottie-player';
import MapModal from '../../../../GoogleMap/MapModal';
import { VendersContext } from '../../../../context/Store';


const Register = () => {
    const [show, setShow] = useState(false);
    let { userLocationMap } = useContext(VendersContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [medicalcenterType, setmedicalcenterType] = useState('');
    const [idArea, setIdArea] = useState(null);
    const MedicalCenterEmailRef = useRef();
    const MedicalCenterNameRef = useRef();
    const MedicalCenterAddressRef = useRef();
    const passwordRef = useRef();

    // !Add  city and country and area  
    let { countries, areas, cities, getCities, getAreas } = useFetch()
    const handelSelectCountry = e => getCities(e.target.value)
    const handelSelectCity = e => getAreas(e.target.value)

    const handelMedicalCenterType = e => setmedicalcenterType(e.target.value)
    const handelSelectArea = async (event) => {
        const selectedCountryId = event.target.value;
        setIdArea(selectedCountryId);
    }

    const [loademail, setLoadEmail] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [Country, setCountry] = useState({});
    const onChangeHandler = (phone, country, e) => {
        setPhoneNumber(phone)
        setCountry(country.dialCode)
    }
    let navigate = useNavigate();
    // TODO:: select image
    // const [selectedImage, setSelectedImage] = useState('../../../../assets/Images/300-21.jpg');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    const SignIn = e => {
        e.preventDefault()
        setLoadEmail(true);
        addNewAccount({
            MedicalCenterType: medicalcenterType,
            IDArea: idArea,
            MedicalCenterName: MedicalCenterNameRef.current.value,
            MedicalCenterAddress: MedicalCenterAddressRef.current.value,
            MedicalCenterEmail: MedicalCenterEmailRef.current.value,
            MedicalCenterPhone: '+' + phoneNumber,
            MedicalCenterPhoneCode: '+' + Country,
            MedicalCenterLat: userLocationMap?.lat,
            MedicalCenterLong: userLocationMap?.lng,
            MedicalCenterPicture: selectedImage,
            UserPassword: passwordRef.current.value
        })
    }

    // const [isValid, setIsValid] = useState(false);
    async function addNewAccount(data) {
        await PostData(`${process.env.REACT_APP_API_URL}/admin/medicalcenter/register`, data, apiheader).then((res) => {
            setLoadEmail(false);
            if (res.data.Success === true) {
                localStorage.setItem("token", res.data.Response.AccessToken.accessToken);
                localStorage.setItem("IDUser", res.data.Response.IDUser);
                localStorage.setItem("Role", res.data.Response.IDRole);
                localStorage.setItem("idmc", res.data.Response.IDMedicalCenter);
                toast.success(res.data.ApiMsg);
                setTimeout(() => {
                    navigate(`/mcprofile`);
                }, 1500);
            } else {
                toast.error(res.data.ApiMsg)
            }
        });
    }
    return (
        <div className="app__login">
            <Container fluid >
                <Row>
                    <div className='  sign-in-container  d-flex justify-content-center  align-content-center '>
                        <div className='app__login-left  w-75    py-4  '>
                            <label className='Sign__Up-header'>Sign Up</label>
                            <div className="Sign__Up-form" >
                                <form className='app__login ' onSubmit={SignIn}>
                                    <Row className='Medical_Center_Picture_Form gy-md-0 gy-4'>



                                        <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en d-flex justify-content-center">
                                            <Form.Group  >
                                                <div className="mt-3 " style={{ position: 'relative', marginBottom: '30px' }}>
                                                    {selectedImage ? (
                                                        <img
                                                            loading="lazy"
                                                            src={URL.createObjectURL(selectedImage)}
                                                            alt={selectedImage.name}
                                                            className=' rounded-circle mx-auto '
                                                            style={{ border: '6px solid #fff', width: '190px', height: '172' }}
                                                        />
                                                    ) :
                                                        <div className="expired-container">
                                                            <Player
                                                                className="expired-image"
                                                                src="https://assets1.lottiefiles.com/packages/lf20_v7nRH3.json"
                                                                autoplay
                                                                loop
                                                            />
                                                        </div>
                                                    }
                                                    <div style={{ position: 'absolute', right: '5px', bottom: '0px' }}>
                                                        <input type="file" id="file-input" accept="image/*" onChange={handleImageSelect} style={{ display: 'none' }} />
                                                        <label htmlFor="file-input" className="btn__porfile  " style={{ pointerEvents: 'all' }}>

                                                            <LogoSvg.AddImage />
                                                        </label>
                                                    </div>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={6} lg={6} md={6} sm={12}>
                                            <div className="email ">
                                                <label htmlFor="UserName" >Medical center name</label>
                                                <input
                                                    ref={MedicalCenterNameRef}
                                                    id="UserName"
                                                    name="UserName"
                                                    type="text"
                                                    placeholder="Medical center name"
                                                    className={`  py-2 form-control border-0   shadow-lg`} />
                                            </div>
                                        </Col>
                                        <Col xl={6} lg={6} md={6} sm={12}>
                                            <div className="email ">
                                                <label htmlFor="Address">Medical center address</label>
                                                <input
                                                    ref={MedicalCenterAddressRef}

                                                    id="Address"
                                                    name="Address"
                                                    type="text"
                                                    className={`  py-2 form-control border-0   shadow-lg`}
                                                    placeholder='Medical center address'
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={6} lg={6} md={6} sm={12}>
                                            <div className="email ">
                                                <Form.Label  >Phone</Form.Label>
                                                <div dir='ltr'>
                                                    <PhoneInput
                                                        country='sa'
                                                        // onlyCountries={['eg', 'sa']} 
                                                        preferredCountries={['eg', 'sa', "ae"]}
                                                        value={phoneNumber}
                                                        onChange={onChangeHandler}
                                                        enableSearch={true}
                                                        inputClass={'w-100'}
                                                        inputStyle={{ width: '300px', background: '#fff', paddingLeft: '49px' }}
                                                        searchPlaceholder="Country number..."
                                                        inputExtraProps={{
                                                            autoFocus: true,

                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xl={6} lg={6} md={6} sm={12}>
                                            <div className="email ">
                                                <label htmlFor="email">Medical center email</label>
                                                <input
                                                    ref={MedicalCenterEmailRef}
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    className={`  py-2 form-control border-0   shadow-lg`}
                                                    placeholder='Medical center email'
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={6} lg={6} md={6} sm={12}>
                                            <div className="email " onClick={handelSelectCountry} >
                                                <Form.Label htmlFor='country'>Select Country</Form.Label>
                                                <Form.Select aria-label="Default select example" name='country' id='country'>
                                                    <option>Select Country </option>
                                                    {
                                                        countries?.map((item, index) => (
                                                            <option key={index} value={item?.IDCountry}  >{item?.CountryName}</option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            </div>
                                        </Col>

                                        <Col xl={6} lg={6} md={6} sm={12}>
                                            <div className="email " onClick={handelSelectCity}  >
                                                <Form.Label htmlFor='city'>Select City</Form.Label>
                                                <Form.Select aria-label="Default select example" name='city' id='city'>
                                                    <option>Select city </option>
                                                    {
                                                        cities?.map((item, index) => (
                                                            <option key={index} value={item?.IDCity}>{item?.CityName}</option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={6} lg={6} md={6} sm={12}>
                                            <div className="email " onClick={handelSelectArea} >
                                                <Form.Label htmlFor='area' >Select Area</Form.Label>
                                                <Form.Select aria-label="Default select example" name='area' id='area'>
                                                    <option>Select Area </option>
                                                    {
                                                        areas?.map((item, index) => (
                                                            <option key={index} value={item?.IDArea}>{item?.AreaName}</option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            </div>
                                        </Col>

                                        <Col xl={6} lg={6} md={6} sm={12}>
                                            <div className="email " onClick={handelMedicalCenterType} >
                                                <Form.Label htmlFor='medicalType'>Select Medical Type</Form.Label>
                                                <Form.Select aria-label="Default select example" name='medicalType' id='medicalType'>
                                                    <option >Select Medical Type </option>
                                                    {
                                                        ['CENTER', 'CLINIC']?.map((Status, index) => (
                                                            <option key={index} value={Status}  >{Status.charAt(0).toUpperCase() + Status.slice(1).toLowerCase()}</option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            </div>
                                        </Col>

                                    </Row>
                                    <Row>

                                        <Col xl={6} lg={6} md={6} sm={12}>
                                            <div className="email ">
                                                <label htmlFor="Password">Password</label>
                                                <input
                                                    ref={passwordRef}
                                                    id="Password"
                                                    name="Password"
                                                    type="password"
                                                    className={`  py-2 form-control border-0   shadow-lg`}
                                                    placeholder='Password'
                                                />
                                            </div>
                                        </Col>
                                        <Col xl={6} lg={6} md={6} sm={12}>
                                            <div className="email " onClick={handelMedicalCenterType} >

                                                <Form.Label htmlFor='medicalType'>Select Loction</Form.Label>
                                                <Button variant="primary" onClick={handleShow}>
                                                    Open Google Map
                                                </Button>
                                            </div>


                                            <Modal show={show} onHide={handleClose} size="lg"
                                                aria-labelledby="contained-modal-title-vcenter"
                                                centered>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Google Map</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>

                                                    <MapModal />
                                                    {
                                                        userLocationMap?.lat &&
                                                        <h4 className=' Sign__Up-header text-dark mt-2 mb-2' >
                                                            Geographic coordinate
                                                        </h4>
                                                    }
                                                    <span>(  {userLocationMap?.lat}</span>
                                                    {"  -  "}
                                                    <span>{userLocationMap?.lng} )</span>
                                                </Modal.Body>
                                                <Modal.Footer>

                                                    <Button variant="primary" onClick={handleClose}>
                                                        Close Map
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </Col>
                                    </Row>
                                    <div className='anther_way_toLgoin mt-3 ' style={{ width: 'fit-content' }} onClick={() => navigate('/medicalcenter/login')} >Do you have an account?</div>
                                    <div className='w-100  d-flex align-items-center justify-content-center'>
                                        <button className={`  app__login-btn mt-4  mb-5`} type='submit'>
                                            {loademail ? <CircularProgress size={18} className={'customProgress'} /> :
                                                <LogoSvg.ArrowRight className='app__login-btn-icons ' />
                                            }
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                </Row>
            </Container>
        </div>
    )
}

export default Register

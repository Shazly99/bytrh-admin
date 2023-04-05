import CircularProgress from '@mui/material/CircularProgress';
import React, { useRef, useState } from 'react';
import { Container, Col, Row, Form, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LogoSvg from '../../../../assets/svg/LogoSvg';
// import "../Login/login.scss";
import "./SignUp.scss";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import useFetch from '../../../../utils/useFetch';
import { toast } from 'react-hot-toast';
import { apiheader, PostData } from '../../../../utils/fetchData';
import defaultImg from '../../../../assets/Images/300-21.jpg'


const Register = () => {
    const [medicalcenterType, setmedicalcenterType] = useState('');
    const [idArea, setIdArea] = useState(null);
    const MedicalCenterEmailRef = useRef();
    const MedicalCenterNameRef = useRef();
    const MedicalCenterAddressRef = useRef();
    const letRef = useRef();
    const longRef = useRef();
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
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    const SignIn = e => {
        e.preventDefault()
        setLoadEmail(true);
        addNewAccount({
            MedicalCenterType: medicalcenterType,
            // MedicalCenterPicture: selectedImage,
            IDArea: idArea,
            MedicalCenterName: MedicalCenterNameRef.current.value,
            MedicalCenterAddress: MedicalCenterAddressRef.current.value,
            MedicalCenterEmail: MedicalCenterEmailRef.current.value,
            MedicalCenterPhone: '+' + phoneNumber,
            MedicalCenterPhoneCode: '+' + Country,
            MedicalCenterLat: letRef.current.value,
            MedicalCenterLong: longRef.current.value,
            MedicalCenterPicture: selectedImage,
            UserPassword: passwordRef.current.value
        })
    }

    // const [isValid, setIsValid] = useState(false);
    async function addNewAccount(data) {
        await PostData(`${process.env.REACT_APP_API_URL}/admin/medicalcenter/register`, data, apiheader).then((res) => {
            setLoadEmail(false);
            if (res.data.Success === true) {
                localStorage.setItem("token" , res.data.Response.AccessToken.accessToken);
                localStorage.setItem("IDUser" , res.data.Response.IDUser); 
                localStorage.setItem("Role" , res.data.Response.IDRole); 
                localStorage.setItem("IDMC", res.data.Response.IDMedicalCenter);
                toast.success(res.data.ApiMsg);
                setTimeout(() => {
                    // navigate('/profile');
                    navigate('/');
                }, 2000);
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
                        <div className='app__login-left  w-75 '>
                            <label className='Sign__Up-header'>Sign Up</label>
                            <div className="w-75" >
                                <form className='app__login ' onSubmit={SignIn}>
                                    <Row className='Medical_Center_Picture_Form gy-md-0 gy-4'>
                                        <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">
                                            <Form.Group className='Medical_Center_Picture'>
                                                <Form.Label htmlFor='custom-file'>  Medical Center Picture</Form.Label>
                                                <FormControl
                                                    id="custom-file"
                                                    type="file"
                                                    label={selectedImage ? selectedImage.name : 'Choose file'}
                                                    ref={fileInputRef}
                                                    onChange={handleImageSelect}
                                                    accept="image/*"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en d-flex justify-content-center">
                                            <Form.Group>
                                                <div className="mt-3 " style={{ width: "200px " }}>
                                                    {selectedImage ? (
                                                        <img
                                                            loading="lazy"
                                                            src={URL.createObjectURL(selectedImage)}
                                                            alt={selectedImage.name}
                                                            className=' rounded-circle mx-auto'
                                                        />
                                                    ) : 
                                                        <img
                                                            loading="lazy"
                                                            src={defaultImg}
                                                            alt={'medical-center'}
                                                            className=' rounded-circle mx-auto'
                                                        />
                                                    }
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
                                                <Form.Label  htmlFor='country'>Select Country</Form.Label>
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
                                                <Form.Label  htmlFor='city'>Select City</Form.Label>
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
                                                <Form.Label  htmlFor='medicalType'>Select Medical Type</Form.Label>
                                                <Form.Select aria-label="Default select example" name='medicalType' id='medicalType'>
                                                    <option >Select Medical Type </option>
                                                    {
                                                        ['CENTER', 'CLINIC']?.map((Status, index) => (
                                                            <option key={index} value={Status}  >{Status}</option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            </div>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col xl={6} lg={6} md={6} sm={12}>
                                            <div className="email ">
                                                <label htmlFor="lat" >Latitude</label>
                                                <input
                                                    ref={letRef}
                                                    id="lat"
                                                    name="lat"
                                                    type="text"
                                                    placeholder="Latitude.."
                                                    className={`  py-2 form-control border-0   shadow-lg`} />
                                            </div>
                                        </Col>
                                        <Col xl={6} lg={6} md={6} sm={12}>
                                            <div className="email ">
                                                <label htmlFor="long">Longitude</label>
                                                <input
                                                    ref={longRef}
                                                    id="long"
                                                    name="long"
                                                    type="text"
                                                    className={`  py-2 form-control border-0   shadow-lg`}
                                                    placeholder="Longitude.."
                                                />
                                            </div>
                                        </Col>

                                        <Col xl={6} lg={6} md={6} sm={12}>
                                            <div className="email ">
                                                <label htmlFor="Password">Password</label>
                                                <input
                                                    ref={passwordRef}
                                                    id="Password"
                                                    name="Password"
                                                    type="password"
                                                    className={`  py-2 form-control border-0   shadow-lg`}
                                                    placeholder='Medical center address'
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className='anther_way_toLgoin ' onClick={() => navigate('/medicalcenter/login')} >Do you have an account?</div>
                                    <div className='w-100  d-flex align-items-center justify-content-center'>
                                        <button className={`  app__login-btn mt-3 `} type='submit'>
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

import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Img from '../../../assets/Img';
import LogoSvg from '../../../assets/svg/LogoSvg';
import "./login.scss";
import CircularProgress from '@mui/material/CircularProgress';


let validationSchemaPhone = Yup.object().shape({
    UserName: Yup.string().required('Mobile phone is required')/* .matches(/^\+\d{12,14}$/, 'Mobile phone must be between 1 and 14 digits') */,
    Password: Yup.string().required('Password is required').min(3, 'Password must be at least 3 characters long').max(10, 'Password must be at most 10 characters long'),
});

let validationSchemaEmail = Yup.object().shape({
    UserName: Yup.string().email('Invalid email address').required('Email is required'),
    Password: Yup.string().required('Password is required').min(3, 'Password must be at least 3 characters long').max(10, 'Password must be at most 10 characters long'),
});

const Login = () => {
    const [anthorWay, setAnthorWay] = useState(false)
  const [loademail, setLoadEmail] = useState(false);
  const [loadPassword, setloadPassword] = useState(false);

    let navigate = useNavigate();
    const formikPhoneNumber = useFormik({
        initialValues: {
            UserName: '',
            Password: ''
        },
        validationSchema: validationSchemaPhone,
        onSubmit: async (values) => {
            if (values) {
                setloadPassword(true)
                let { data } = await axios.post(`https://bytrh.com/api/admin/login`, values);
                if (data.Success === true) {
                    setTimeout(() => {
                        setloadPassword(false)
                    }, 1500);
                    localStorage.setItem("token", data.Response.AccessToken);
                    localStorage.setItem("IDUser", data.Response.IDUser);  
                    localStorage.setItem("UserName", data.Response.UserName); 
                    localStorage.setItem("Role", data.Response.IDRole);
                    localStorage.setItem("idmc", data.Response.IDMedicalCenter);
                    toast.success(data.ApiMsg);
                    setTimeout(() => {
                        navigate('/');
                    }, 1500);
                } else {
                    setTimeout(() => {
                        setloadPassword(false)
                    }, 1500);
                    toast.error(data.ApiMsg);
                }
            }
        }
    });

    const formik = useFormik({
        initialValues: {
            UserName: '',
            Password: ''
        },
        validationSchema: validationSchemaEmail,
        onSubmit: async (values) => {
            if (values) {
                setLoadEmail(true)
               
                let { data } = await axios.post(`https://bytrh.com/api/admin/login`, values);
                if (data.Success === true) {
                    setTimeout(() => {
                        setLoadEmail(false)
                    }, 1500);
                    localStorage.setItem("token", data.Response.AccessToken);
                    localStorage.setItem("IDUser", data.Response.IDUser);
                    localStorage.setItem("Role", data.Response.IDRole); 
                    localStorage.setItem("UserName", data.Response.UserName); 
                    localStorage.setItem("idmc", data.Response.IDMedicalCenter);

                    toast.success(data.ApiMsg);
                    navigate('/');
                } else {
                    setTimeout(() => {
                        setLoadEmail(false)
                    }, 1500);
                    toast.error(data.ApiMsg);

                }
            }
        }
    });

    const [isValid, setIsValid] = useState(false);
    useEffect(() => {
        // Check if all fields in formik are valid
        const isValidForm = Object.values(formik.errors).every((val) => !val);
        setIsValid(isValidForm);
    }, [formik.errors]);

    const [isValidPass, setIsValidPass] = useState(false);
    useEffect(() => {
        // Check if all fields in formik are valid
        const isValidFormpass = Object.values(formikPhoneNumber.errors).every((val) => !val);
        setIsValidPass(isValidFormpass);
    }, [formikPhoneNumber.errors]);
    return (
        <>
            <div className="app__login">
                <Container fluid >
                    <Row>
                        <Col xl={6} lg={6} xd={6} sm={12} className='vh-100'>
                            <div className='app__login-left  vh-100   '>
                                <img loading="lazy" src={Img.loginBg} alt="Login page background" />
                                {/* <Component.BaseHeader h1={'Bytrh'} colorW="logoBaytrh" /> */}
                                <div className="w-75" >
                                    {
                                        anthorWay ?
                                            <form className='login__form' onSubmit={formikPhoneNumber.handleSubmit}>
                                                <div className="email ">
                                                    <label htmlFor="UserName" >Phone number</label>
                                                    <input
                                                        id="UserName"
                                                        name="UserName"
                                                        type="text"
                                                        onChange={formikPhoneNumber.handleChange}
                                                        value={formikPhoneNumber.values.UserName}
                                                        placeholder='Phone number'
                                                        className={`  py-2 form-control       border-0   shadow-lg`} />
                                                    {formikPhoneNumber.errors.UserName ? <span className='error__handel' >{formikPhoneNumber.errors.UserName}</span> : null}
                                                </div>
                                                <div className="email ">
                                                    <label htmlFor="Password">Password</label>
                                                    <input
                                                        id="Password"
                                                        name="Password"
                                                        type="password"
                                                        onChange={formikPhoneNumber.handleChange}
                                                        value={formikPhoneNumber.values.Password}
                                                        placeholder='Password'
                                                        className={`  py-2 form-control border-0   shadow-lg`}
                                                    />
                                                    {formikPhoneNumber.errors.Password ? <span className='error__handel'>{formikPhoneNumber.errors.Password}</span> : null}
                                                </div>
                                                <div className='anther_way_toLgoin  ' onClick={() => setAnthorWay(!anthorWay)} >Sign In by email?</div>
                                                <div className='w-100  d-flex align-items-center justify-content-center'>
                                                <button disabled={!isValidPass} className={`${!isValidPass ? 'app__login-btn opisity ' : 'app__login-btn opisity1'} mt-3 `} type='submit'>
                                                        {loadPassword ? <CircularProgress size={18} className={'customProgress'} />  :
                                                            <LogoSvg.ArrowRight className='app__login-btn-icons ' />
                                                        }
                                                    </button>
                                                </div>
                                            </form> :
                                            <form className='login__form' onSubmit={formik.handleSubmit}>
                                                <div className="email ">
                                                    <label htmlFor="UserName" >Email</label>
                                                    <input
                                                        id="UserName"
                                                        name="UserName"
                                                        type="email"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.UserName}
                                                        placeholder="Email"
                                                        className={`  py-2 form-control border-0   shadow-lg`} />

                                                    {formik.errors.UserName ? <span className='error__handel' >{formik.errors.UserName}</span> : null}
                                                </div>
                                                <div className="email ">
                                                    <label htmlFor="Password">Password</label>
                                                    <input
                                                        id="Password"
                                                        name="Password"
                                                        type="password"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.Password}
                                                        className={`  py-2 form-control border-0   shadow-lg`}
                                                        placeholder='Password'
                                                    />
                                                    {formik.errors.Password ? <span className='error__handel'>{formik.errors.Password}</span> : null}
                                                </div>
                                                <div className='anther_way_toLgoin ' onClick={() => setAnthorWay(!anthorWay)} > Sign In by phone number?</div>
                                                <div className='w-100  d-flex align-items-center justify-content-center'>
                                                    <button disabled={!isValid} className={`${!isValid ? 'app__login-btn opisity ' : 'app__login-btn opisity1'} mt-3 `} type='submit'>
                                                        {loademail ? <CircularProgress size={18} className={'customProgress'} /> :
                                                            <LogoSvg.ArrowRight className='app__login-btn-icons ' />
                                                        }
                                                    </button>
                                                </div>
                                            </form>
                                    }
                                </div>
                            </div>
                        </Col>
                        <Col xl={6} lg={6} xd={6} sm={12} className='avatar'>
                            <img loading="lazy" src={Img.avatar} alt='backgroung sign in bytrh' />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Login

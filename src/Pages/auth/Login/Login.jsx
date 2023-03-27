import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Img from '../../../assets/Img';
import "./login.scss";


let validationSchemaPhone= Yup.object().shape({
    UserName: Yup.string().required('Mobile phone is required')/* .matches(/^\+\d{12,14}$/, 'Mobile phone must be between 1 and 14 digits') */,
    Password: Yup.string().required('Password is required').min(3, 'Password must be at least 3 characters long').max(10, 'Password must be at most 10 characters long'),
});

let validationSchemaEmail = Yup.object().shape({
    UserName: Yup.string().email('Invalid email address').required('Email is required'),
    Password: Yup.string().required('Password is required').min(3, 'Password must be at least 3 characters long').max(10, 'Password must be at most 10 characters long'),
});

const Login = () => {
    const [anthorWay, setAnthorWay] = useState(false)
    let navigate = useNavigate();
    const formikPhoneNumber = useFormik({
        initialValues: {
            UserName: '',
            Password: ''
        },
        validationSchema:validationSchemaPhone,
        onSubmit: async (values) => {
             if (values) {
                let { data } = await axios.post(`https://bytrh.com/api/admin/login`, values);
                console.log(data);
                if (data.Success === true) { 
                    localStorage.setItem("token", data.Response.AccessToken);
                    localStorage.setItem("IDUser", data.Response.IDUser);
                    toast.success(data.ApiMsg);
                    navigate('/');
                } else {
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
        validationSchema:validationSchemaEmail,
        onSubmit: async (values) => {
             if (values) {
                let { data } = await axios.post(`https://bytrh.com/api/admin/login`, values);
                 if (data.Success === true) {
                     localStorage.setItem("token", data.Response.AccessToken);
                    localStorage.setItem("IDUser", data.Response.IDUser);

                    toast.success(data.ApiMsg);
                    navigate('/');
                } else {
                     toast.error(data.ApiMsg);
                }
            }
        }
    });
    return (
        <>
            <div className="app__login">
                <Container fluid >
                    <Row>
                        <Col xl={6} lg={6} xd={6} sm={12} className='vh-100'>
                            <div className='app__login-left  vh-100   '>
                                <img loading="lazy"src={Img.loginBg} alt="Login page background"  />
                                {/* <Component.BaseHeader h1={'Bytrh'} colorW="logoBaytrh" /> */}
                                <div className="w-75" >
                                    {
                                        anthorWay ?
                                            <form onSubmit={formikPhoneNumber.handleSubmit}>
                                                <div className="email ">
                                                    <label htmlFor="UserName" >Phone Number</label>
                                                    <input
                                                        id="UserName"
                                                        name="UserName"
                                                        type="text"
                                                        onChange={formikPhoneNumber.handleChange}
                                                        value={ formikPhoneNumber.values.UserName}
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
                                                        className={`  py-2 form-control border-0   shadow-lg`}
                                                    />
                                                    {formikPhoneNumber.errors.Password ? <span className='error__handel'>{formikPhoneNumber.errors.Password}</span> : null}
                                                </div>
                                                <button className='app__login-btn mt-3' type='submit'>Login</button>
                                                <button className='anther_way_toLgoin  ' onClick={() => setAnthorWay(!anthorWay)} >Do you want to log in with email?</button>
                                            </form>   :
                                            <form onSubmit={formik.handleSubmit}>
                                                <div className="email ">
                                                    <label htmlFor="UserName" >Email</label>
                                                    <input
                                                        id="UserName"
                                                        name="UserName"
                                                        type="email"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.UserName}
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
                                                    /> 
                                                    {formik.errors.Password ? <span className='error__handel'>{formik.errors.Password}</span> : null}
                                                </div>
                                                <button className='app__login-btn mt-3' type='submit'>Login</button>
                                                <button className='anther_way_toLgoin ' onClick={() => setAnthorWay(!anthorWay)} >Do you want to log in with phone number?</button>
                                            </form>
                                    }
                                </div>
                            </div>
                        </Col> 
                        <Col xl={6} lg={6} xd={6} sm={12} className='avatar'>
                            <img loading="lazy"src={Img.avatar} alt='backgroung sign in bytrh' />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Login

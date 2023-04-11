import React, { useEffect, useState, useContext,useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'; 
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Container, Form } from 'react-bootstrap';
import Component from '../../../constants/Component';
import { apiheader } from './../../../utils/fetchData';
import { Button } from 'react-bootstrap/';
import { VendersContext } from '../../../context/Store';
import CircularProgress from '@mui/material/CircularProgress';
import useFetch from '../../../utils/useFetch';

 


const EditDoctor = ({ fetchCountriesBytra }) => {
  const { id } = useParams();
  let { countries, cities, getCities } = useFetch()
  const selectCity = useRef();

  const apiInfos = `https://bytrh.com/api/admin/doctors/edit/${id}`;
  const [userData, setUserData] = useState({});

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  // const [picture, setPicture] = useState([]);
  // const [license, setLicense] = useState([]);
  // const [expire, setExpire] = useState('');

  async function getDoctorData() {
    await axios.get(apiInfos, apiheader)
      .then(res => {
        if (res.status === 200 && res.request.readyState === 4) {
          setName(res.data.Response.UserName);
          setEmail(res.data.Response.UserEmail);
          setPhone(res.data.Response.UserPhone);
          setCountryCode(res.data.Response.UserPhoneFlag);
          setCountry(res.data.Response.IDCountry);
          setCity(res.data.Response.IDCity);
          setUserData(res.data.Response);
          getCities(res.data.Response.IDCountry)
         }
      })
      .catch(err => {
        console.log(err);
      })
  }
 
  useEffect(() => {
    let timeOut = setTimeout(() => {
      getDoctorData();
    }, 200);

    return(() => {
      clearTimeout(timeOut);
    })
  }, [])
 


  // get cities Bytra



  useEffect(() => {
    getDoctorData();
  }, [])




  // let navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [loadind, setLoadind] = useState(false);

  const [apiCode, setApiCode] = useState(null);


  async function updateForm(e) {

    e.preventDefault();
    setLoadind(true);
    // if(confirm === user.DoctorPassword) {
    let { data } = await axios({
      method: 'post',
      url: `https://bytrh.com/api/admin/doctors/edit`,
      // data: {...user , DoctorPhoneFlag , DoctorPhone},
      data: {
        IDDoctor: id,
        DoctorName: name,
        DoctorEmail: email,
        DoctorPhone: phone,
        DoctorPhoneFlag: countryCode,
        IDCity: selectCity.current.value,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    });

    setMessage(data.ApiMsg);
    setLoadind(false);

    if (data.Success === true) {
      setApiCode(data.Success);
      setTimeout(() => {
        // navigate('/doctors');
        window.history.go(-1);
      }, 1500);
    }

  }


  let { isLang } = useContext(VendersContext);



  return (
    <>
      <Container fluid>
        <div className="app__addprodects">
          {isLang === 'ar' ?
            <Component.SubNav sub__nav={[{ name: "تعديـل", path: `/doctors/editDoctor/${id}` }, { name: "قائمـة الأطبـاء", path: '/doctors' }]} />
            :
            <Component.SubNav sub__nav={[{ name: "Doctors", path: '/doctors' }, { name: "Edit Doctor", path: `/doctors/editDoctor/${id}` }]} />
          }
          <div className="app__addprodects__header ">
            <Component.BaseHeader h1={isLang === 'ar' ? 'تعديـل بيانـات الطبيـب' : 'Edit Doctor information'} />
            <div className="app__addOrder-form">
              <div className="app__addprodects-form">
                <form onSubmit={updateForm}>
                  <div className="row d-flex justify-content-center justify-content-md-start align-items-center g-4">

                    <div className="col-md-6">
                      <div className="group-add">
                        <label className="fs-5  " htmlFor="DoctorName">{isLang === 'ar' ? 'الأســم' : 'Name'}</label>
                        <div className="input-group">
                          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='form-control mx-auto py-2' required name="DoctorName" id="DoctorName" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="group-add">
                        <label className="fs-5  " htmlFor="DoctorEmail">{isLang === 'ar' ? 'البريـد الإلكترونـي' : 'Email'}</label>
                        <div className="input-group">
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='form-control mx-auto py-2' required name="DoctorEmail" id="DoctorEmail" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="group-add">
                        <label className="fs-5  " htmlFor="DoctorPhone">{isLang === 'ar' ? 'رقـم التليفـون' : 'Phone'}</label>
                        <div className="input-group">
                          <PhoneInput
                            value={countryCode}
                            preferredCountries={['eg', 'sa', 'ae']}
                            enableSearch={true}
                            searchPlaceholder={isLang === 'ar' ? 'الرقم الكودي الدولـة..' : 'Country number...'}
                            inputClass={'form-control mx-auto w-100 py-3'}
                            inputStyle={{ width: '100%' }}
                            inputProps={{
                              name: 'DoctorPhone',
                              required: true,
                              id: isLang === 'ar' ? 'DoctorPhone2' : 'DoctorPhone',
                              value: phone
                              // autoFocus: true
                            }}
                            onChange={(DoctorPhone, DoctorPhoneFlag, e) => {
                              setPhone(`+${DoctorPhone}`)
                              setCountryCode(`+${DoctorPhoneFlag.dialCode}`)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="group-add">
                        <label className="fs-5  " htmlFor="IDCountry">{isLang === 'ar' ? 'البلـد' : 'Country'}</label>
                        <div className="input-group">
                          <select value={country} onChange={(e) => {
                            setCountry(e.target.value);
                            getCities(e.target.value);
                          }} className='w-100 form-control mx-auto py-2 px-2' required name="IDCountry" id="IDCountry">
                            {/* <option>choose your country</option> */}
                            {fetchCountriesBytra.map((item, i) => (
                              <option key={i} value={item.IDCountry} >{item.CountryName}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <Form.Group controlId="formBasicEmail" className='mt-3' >
                        <Form.Label> City</Form.Label>

                        <Form.Select aria-label="Default select example" ref={selectCity}>
                          {
                            cities?.map((item, index) => (
                              <option key={index} value={item?.IDCity} selected={userData?.IDCity === item?.IDCity && item?.CityName} > {item?.CityName}</option>
                            ))
                          }
                        </Form.Select>

                      </Form.Group>
                    </div>
                    {/* <div className="col-md-6">
                            <div className="group-add">
                                <label className="fs-5  " htmlFor="DoctorLicense">Doctor License</label>
                                <div className="input-group">
                                    <input onChange={getUserData} type="file" accept="image/*" className='form-control mx-auto py-2' required name="DoctorLicense" id="DoctorLicense" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="group-add">
                                <label className="fs-5  " htmlFor="DoctorLicenseExpiry">License Expiry Date</label>
                                <div className="input-group">
                                    <input onChange={getUserData} type="date" className='bg-transparent mx-auto py-2' required name="DoctorLicenseExpiry" id="DoctorLicenseExpiry" />
                                </div>
                            </div>
                        </div> */}
                  </div>

                  {message.length > 0 ? <p id="alertSave" className={`alert ${apiCode === true ? 'alert-success' : 'alert-danger'} fs-6 py-2 mb-0 mt-3 w-50 text-center mx-auto`}>{message}</p> : ''}

                  {/* <div className="submitAdd-buttons mt-4 d-flex justify-content-center align-items-center">
                    <Button type='submit' className="btn black-btn p-2 me-4">{loadind ? <i className="fa fa-spinner fa-spin text-white fs-4"></i> : 'Save'}</Button>
                    
                    <Component.ButtonBase title={"Cancel"} bg={"primary"} path="/doctors " />
                  </div> */}

                  <div className='d-flex justify-content-center align-content-center mt-4'>
                    <div className='baseBtn'>
                      <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                        {loadind ? <CircularProgress size={27} style={{ color: '#fff' }} /> :
                          isLang === 'ar' ? 'حفـظ' : 'Save'
                        }
                      </Button>
                    </div>

                    <div className='baseBtn'>
                      <Link to={'/doctors'}>
                        <Button variant={'primary'} className='d-flex align-items-center justify-content-center'>
                          {isLang === 'ar' ? 'رجـوع' : 'Cancel'}
                        </Button>
                      </Link>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default EditDoctor
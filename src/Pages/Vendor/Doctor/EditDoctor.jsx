import React, { useEffect, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaBars } from 'react-icons/fa';
// import { BsSearch } from 'react-icons/bs'; 
import { useContext } from 'react';
// import { langContext } from '../context/store';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Container } from 'react-bootstrap';
import Component from '../../../constants/Component';
import { apiheader } from './../../../utils/fetchData';
import { Callbacks } from 'jquery';
import { Button } from 'react-bootstrap/';

const EditDoctor = ({ getTokenDoctors, fetchCountriesBytra }) => {
  const { id } = useParams();
  const apiInfos = `https://bytrh.com/api/admin/doctors/edit/${id}`;

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
    await axios.get(apiInfos,  apiheader )
      .then(res => {
        if (res.status === 200 && res.request.readyState === 4) {
          setName(res.data.Response.UserName);
          setEmail(res.data.Response.UserEmail);
          setPhone(res.data.Response.UserPhone);
          setCountryCode(res.data.Response.UserPhoneFlag);
          setCountry(res.data.Response.IDCountry);
          setCity(res.data.Response.IDCity); 
          getCitiesBytra(res.data.Response.IDCity);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  useEffect(() => {
    getDoctorData();
  }, [])


  // get cities Bytra
  const [fetchCitiesBytra, setFetchCitiesBytra] = useState([]);
  async function getCitiesBytra(idcountry) {
    await axios.get(`https://bytrh.com/api/doctor/cities/${idcountry}`)
      .then(res => {
        if (res.status === 200 && res.request.readyState === 4) {
          setFetchCitiesBytra(res.data.Response.Countries);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  // useEffect(() => {
  //   // getCitiesBytra(country);
  // }, [country])




  let navigate = useNavigate();

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
        IDCity: city,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYnl0cmguY29tXC9hcGlcL2FkbWluXC9sb2dpbiIsImlhdCI6MTY3NjI3MzI4NSwiZXhwIjozNTQyNTEzMjg1LCJuYmYiOjE2NzYyNzMyODUsImp0aSI6InV6QURwTVV5b1BhWndFTlQiLCJzdWIiOjEsInBydiI6ImZkOWU0ZjkyODg3OWNjMWEwZWM5MGFjMzA5ZjdhZWY2MDJkYTY0NzkifQ.-ebAjkSFDE2naB5X-yxF5YDGmz15dey8QtSf3APbWaU',
      },
    });

    setMessage(data.ApiMsg);
    setLoadind(false);

    if (data.Success === true) {
      setApiCode(data.Success);
      setTimeout(() => {
        getTokenDoctors();
        navigate('/doctors');
      }, 2000);
    }

  }





  return (
    <>
      <Container fluid>
        <div className="app__addprodects">
          <Component.SubNav sub__nav={[{ name: "Doctors", path: '/doctors' }, { name: "Edit  doctor", path: `/doctors/editDoctor/${id}` }]} />

          <div className="app__addprodects__header ">
            <Component.BaseHeader h1={'Edit Doctor information'} />
            <div className="app__addOrder-form">
              <div className="app__addprodects-form">
                <form onSubmit={updateForm}>
                  <div className="row d-flex justify-content-center justify-content-md-start align-items-center g-4">

                    <div className="col-md-6">
                      <div className="group-add">
                        <label className="fs-5  " htmlFor="DoctorName">Name</label>
                        <div className="input-group">
                          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='form-control mx-auto py-2' required name="DoctorName" id="DoctorName" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="group-add">
                        <label className="fs-5  " htmlFor="DoctorEmail">Email</label>
                        <div className="input-group">
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='form-control mx-auto py-2' required name="DoctorEmail" id="DoctorEmail" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="group-add">
                        <label className="fs-5  " htmlFor="DoctorPhone">phone</label>
                        <div className="input-group">
                          <PhoneInput
                            country={countryCode}
                            preferredCountries={['eg', 'sa', 'ae']}
                            enableSearch={true}
                            searchPlaceholder='Country number...'
                            inputClass={'form-control mx-auto w-100 py-3'}
                            inputProps={{
                              name: 'DoctorPhone',
                              required: true,
                              id: 'DoctorPhone',
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
                        <label className="fs-5  " htmlFor="IDCountry">Country</label>
                        <div className="input-group">
                          <select value={country} onChange={(e) => {
                            setCountry(e.target.value);
                            getCitiesBytra(e.target.value);
                          }} className='w-100 form-control mx-auto py-2 px-2' required name="IDCountry" id="IDCountry">
                            <option>choose your country</option>
                            {fetchCountriesBytra.map((item, i) => (
                              <option key={i} value={item.IDCountry} >{item.CountryName}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="group-add">
                        <label className="fs-5  " htmlFor="IDCity">City</label>
                        <div className="input-group">
                          <select value={city} onChange={(e) => {
                            setCity(e.target.value);
                          }} className='w-100 form-control mx-auto py-2 px-2' required name="IDCity" id="IDCity">
                            <option>choose your city</option>
                            {fetchCitiesBytra && fetchCitiesBytra.map((item, i) => (
                              <option key={i} value={item.IDCity} >{item.CityName}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-md-6">
                            <div className="group-add">
                                <label className="fs-5  " htmlFor="DoctorLicense">Doctor License</label>
                                <div className="input-group">
                                    <input onChange={getUserData} type="file" accept='png , jpg' className='form-control mx-auto py-2' required name="DoctorLicense" id="DoctorLicense" />
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

                  <div className="submitAdd-buttons mt-4 d-flex justify-content-center align-items-center">
                    <Button type='submit' className="btn black-btn p-2 me-4">{loadind ? <i className="fa fa-spinner fa-spin text-white fs-4"></i> : 'Save'}</Button>
                    
                    <Component.ButtonBase title={"Cancel"} bg={"primary"} path="/doctors " />
                    
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
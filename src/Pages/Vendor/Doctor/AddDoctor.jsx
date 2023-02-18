import React, {   useState } from 'react';
import $ from 'jquery';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {  Container } from 'react-bootstrap';
import Component from '../../../constants/Component';


function AddDoctor({ getTokenDoctors, fetchCountriesBytra }) {
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

  let navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [loadind, setLoadind] = useState(false);

  const [apiCode, setApiCode] = useState(null);
  const showHidePass = () => {
    if ($('.password .input-group i').hasClass('fa-eye-slash')) {
      $('.password .input-group i').removeClass('fa-eye-slash');
      $('.password .input-group i').addClass('fa-eye');
      $('.password .input-group input').attr('type', 'password');
    }
    else {
      $('.password .input-group i').removeClass('fa-eye');
      $('.password .input-group i').addClass('fa-eye-slash');
      $('.password .input-group input').attr('type', 'text');
    }
  }

  const showHideRePass = () => {
    if ($('.repaassword .input-group i').hasClass('fa-eye-slash')) {
      $('.repaassword .input-group i').removeClass('fa-eye-slash');
      $('.repaassword .input-group i').addClass('fa-eye');
      $('.repaassword .input-group input').attr('type', 'password');
    }
    else {
      $('.repaassword .input-group i').removeClass('fa-eye');
      $('.repaassword .input-group i').addClass('fa-eye-slash');
      $('.repaassword .input-group input').attr('type', 'text');
    }
  }

  const [DoctorPhone, setDoctorPhone] = useState('');
  const [DoctorPhoneFlag, setDoctorPhoneFlag] = useState('966');
  const [user, setUser] = useState({
    DoctorName: '',
    DoctorEmail: '',
    DoctorPassword: '',
    DoctorPicture: [],
    DoctorLicense: [],
    DoctorLicenseExpiry: '',
    IDCity: ''
  });

  const getUserData = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    if (e.target.name === 'DoctorPicture' || e.target.name === 'DoctorLicense') {
      myUser[e.target.name] = e.target.files[0];
    }
    else {
      myUser[e.target.name] = e.target.value;
    }
    setUser(myUser)
  }


  const [confirm, setConfirm] = useState('');

  function getConfirm(e) {
    e.target.name = e.target.value;
    setConfirm(e.target.value)
  }


  async function registerAddForm(e) {

    e.preventDefault();
    setLoadind(true);
    if (confirm === user.DoctorPassword) {
      let { data } = await axios({
        method: 'post',
        url: `https://bytrh.com/api/admin/doctors/add`,
        data: { ...user, DoctorPhoneFlag, DoctorPhone },
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
    else if (confirm !== user.UserPassword) {
      setMessage('password does not match..');
      setLoadind(false);
    }

  }

  return (
    <Container fluid>
      <div className="app__addprodects">
        <Component.SubNav sub__nav={[{ name: "Doctors", path: '/doctors' }, { name: "Add  doctor", path: '/doctors/addDoctor' }]} />
        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={'Add new doctor'} />
          <div className="app__addOrder-form">
            <div className="app__addprodects-form">
              <form onSubmit={registerAddForm}>
                <div className="row d-flex justify-content-center justify-content-md-start align-items-center g-4">

                  <div className="col-md-6">

                    <div className="group-add">
                      <label className="fs-5 " htmlFor="DoctorName">Name</label>
                      <div className="input-group">
                        <input onChange={getUserData} type="text" className='bg-transparent form-control  mx-auto py-2 w-100' required name="DoctorName" id="DoctorName" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="group-add">
                      <label className="fs-5 " htmlFor="DoctorEmail">Email</label>
                      <div className="input-group">
                        <input onChange={getUserData} type="email" className='bg-transparent form-control mx-auto py-2 w-100' required name="DoctorEmail" id="DoctorEmail" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="group-add">
                      <label className="fs-5 " htmlFor="DoctorPhone">Mobile</label>
                      <div className="input-group">
                        {/* <input onChange={getUserData} type="tel" className='bg-transparent mx-auto' required name="DoctorPhone" id="DoctorPhone" /> */}
                        <PhoneInput
                          country={'sa'}
                          preferredCountries={['eg', 'sa', 'ae']}
                          enableSearch={true}
                          searchPlaceholder='Country number...'
                          inputClass={'bg-transparent mx-auto w-100 py-3'}
                          inputProps={{
                            name: 'DoctorPhone',
                            required: true,
                            id: 'DoctorPhone',
                            // autoFocus: true
                          }}

                          onChange={(DoctorPhone, DoctorPhoneFlag, e) => {
                            setDoctorPhone(`+${DoctorPhone}`)
                            setDoctorPhoneFlag(`+${DoctorPhoneFlag.dialCode}`)
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="group-add">
                      <label className="fs-5 " htmlFor="DoctorPicture">Picture (optional)</label>
                      <div className="input-group">
                        <input onChange={getUserData} type="file" accept='png , jpg' className='bg-transparent form-control mx-auto py-2' name="DoctorPicture" id="DoctorPicture" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="group-add">
                      <label className="fs-5 " htmlFor="IDCountry">Country</label>
                      <div className="input-group">
                        <select onChange={(e) => {
                          getCitiesBytra(e.target.value);
                        }} className='w-100 bg-transparent mx-auto py-2 px-2' required name="IDCountry" id="IDCountry">
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
                      <label className="fs-5 " htmlFor="IDCity">City</label>
                      <div className="input-group">
                        <select onChange={getUserData} className='w-100 bg-transparent mx-auto py-2 px-2' required name="IDCity" id="IDCity">
                          <option>choose your city</option>
                          {fetchCitiesBytra && fetchCitiesBytra.map((item, i) => (
                            <option key={i} value={item.IDCity} >{item.CityName}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="group-add">
                      <label className="fs-5 " htmlFor="DoctorLicense">Doctor License</label>
                      <div className="input-group">
                        <input onChange={getUserData} type="file" accept='png , jpg' className='bg-transparent form-control mx-auto py-2' required name="DoctorLicense" id="DoctorLicense" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="group-add">
                      <label className="fs-5 " htmlFor="DoctorLicenseExpiry">License Expiry Date</label>
                      <div className="input-group">
                        <input onChange={getUserData} type="date" className='bg-transparent mx-auto py-2 form-control' required name="DoctorLicenseExpiry" id="DoctorLicenseExpiry" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="group-add password">
                      <label className="fs-5 " htmlFor="DoctorPassword">Password</label>
                      <div className="input-group">
                        <input onChange={getUserData} type="password" className='bg-transparent mx-auto py-2 form-control' required name="DoctorPassword" id="DoctorPassword" />
                        <i className="fa-regular fa-eye" onClick={showHidePass}></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="group-add repaassword">
                      <label className="fs-5 " htmlFor="repass-user">Confirm</label>
                      <div className="input-group">
                        <input type="password" onChange={getConfirm} className='bg-transparent mx-auto py-2 form-control' required name="repass-user" id="repass-user" />
                        <i className="fa-regular fa-eye" onClick={showHideRePass}></i>
                      </div>
                    </div>
                  </div>
                </div>

                {message.length > 0 ? <p id="alertSave" className={`alert ${apiCode === true ? 'alert-success' : 'alert-danger'} fs-6 py-2 mb-0 mt-3 w-50 text-center mx-auto`}>{message}</p> : ''}

                <div className="submitAdd-buttons mt-4 d-flex justify-content-center align-items-center">
    {/*               <Button type='submit' className="btn black-btn p-2 me-4">{loadind ? <i className="fa fa-spinner fa-spin text-white fs-4"></i> : 'Save'}</Button>
     */}
                  <Component.ButtonBase title={"Save"} bg={"primary"}    />
                  <Component.ButtonBase title={"Cancel"} bg={"primary"}   path="/doctors " />

                </div>

              </form>
            </div>
          </div>
        </div>
      </div >
    </Container >
  )
}

export default AddDoctor
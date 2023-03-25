import React, { useState , useContext } from 'react';
import $ from 'jquery';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Button, Container } from 'react-bootstrap';
import Component from '../../../constants/Component';
import { VendersContext } from '../../../context/Store';

// import { apiheader } from './../../../utils/fetchData';


function AddDoctor({ fetchCountriesBytra }) {
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
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });

      setMessage(data.ApiMsg);
      setLoadind(false);

      if (data.Success === true) {
        setApiCode(data.Success);
        setTimeout(() => {
          navigate('/doctors');
        }, 1500);
      }

    }
    else if (confirm !== user.UserPassword) {
      setMessage('password does not match..');
      setLoadind(false);
    }

  }


  let { isLang } = useContext(VendersContext);



  return (
    <Container fluid>
      <div className="app__addprodects">
          {isLang === 'ar' ?
            <Component.SubNav sub__nav={[{ name: isLang === 'ar' ? 'إضـافة طبيـب' : 'Add Doctor', path: '/doctors/addDoctor' } , { name: isLang === 'ar' ? 'قائمـة الأطبـاء' : 'Doctors', path: '/doctors' }]} />
            :
            <Component.SubNav sub__nav={[{ name: "Doctors", path: '/doctors' }, { name: "Add Doctor", path: '/doctors/addDoctor' }]} />
          }
        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={isLang === 'ar' ? 'إضافـة طبيـب جديد' : 'Add new doctor'} />
          <div className="app__addOrder-form">
            <div className="app__addprodects-form">
              <form onSubmit={registerAddForm}>
                <div className="row d-flex justify-content-center justify-content-md-start align-items-center g-4">

                  <div className="col-md-6">
                    <div className="group-add">
                      <label className="fs-5 " htmlFor="DoctorName">{isLang === 'ar' ? 'الإسـم' : 'Name'}</label>
                      <div className="input-group">
                        <input onChange={getUserData} type="text" className='bg-transparent form-control  mx-auto py-2 w-100' required name="DoctorName" id="DoctorName" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="group-add">
                      <label className="fs-5 " htmlFor="DoctorEmail">{isLang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                      <div className="input-group">
                        <input onChange={getUserData} type="email" className='bg-transparent form-control mx-auto py-2 w-100' required name="DoctorEmail" id="DoctorEmail" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="group-add">
                      <label className="fs-5 " htmlFor="DoctorPhone">{isLang === 'ar' ? 'رقم التليفـون' : 'Mobile'}</label>
                      <div className="input-group">
                        {/* <input onChange={getUserData} type="tel" className='bg-transparent mx-auto' required name="DoctorPhone" id="DoctorPhone" /> */}
                        <PhoneInput
                          country={'sa'}
                          preferredCountries={['eg', 'sa', 'ae']}
                          enableSearch={true}
                          searchPlaceholder={isLang === 'ar' ? 'الرقم الكودي الدولـة..' : 'Country number...'}
                          inputClass={'bg-transparent mx-auto w-100 py-3'}
                          inputProps={{
                            name: 'DoctorPhone',
                            required: true,
                            id: isLang === 'ar' ? 'DoctorPhone2' : 'DoctorPhone',
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
                      <label className="fs-5 " htmlFor="DoctorPicture">{isLang === 'ar' ? 'الصورة (اختيـاري)' : 'Picture (optional)'}</label>
                      <div className="input-group">
                        <input onChange={getUserData} type="file" accept='png , jpg' className='bg-transparent form-control mx-auto py-2' name="DoctorPicture" id="DoctorPicture" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="group-add">
                      <label className="fs-5 " htmlFor="IDCountry">{isLang === 'ar' ? 'البلـد' : 'Country'}</label>
                      <div className="input-group">
                        <select onChange={(e) => {
                          getCitiesBytra(e.target.value);
                        }} className='w-100 bg-transparent mx-auto py-2 px-2' required name="IDCountry" id="IDCountry">
                          <option>{isLang === 'ar' ? 'اختر البلـد' : 'choose your country'}</option>
                          {fetchCountriesBytra.map((item, i) => (
                            <option key={i} value={item.IDCountry} >{item.CountryName}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="group-add">
                      <label className="fs-5 " htmlFor="IDCity">{isLang === 'ar' ? 'المدينـة' : 'City'}</label>
                      <div className="input-group">
                        <select onChange={getUserData} className='w-100 bg-transparent mx-auto py-2 px-2' required name="IDCity" id="IDCity">
                          <option>{isLang === 'ar' ? 'اختر المدينـة' : 'choose your city'}</option>
                          {fetchCitiesBytra && fetchCitiesBytra.map((item, i) => (
                            <option key={i} value={item.IDCity} >{item.CityName}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="group-add">
                      <label className="fs-5 " htmlFor="DoctorLicense">{isLang === 'ar' ? 'رخصـة الطبيـب' : 'Doctor License'}</label>
                      <div className="input-group">
                        <input onChange={getUserData} type="file" accept='png , jpg' className='bg-transparent form-control mx-auto py-2' required name="DoctorLicense" id="DoctorLicense" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="group-add">
                      <label className="fs-5 " htmlFor="DoctorLicenseExpiry">{isLang === 'ar' ? 'تاريخ انتهـاء الرخصـة' : 'License Expiry Date'}</label>
                      <div className="input-group">
                        <input onChange={getUserData} type="date" className='bg-transparent mx-auto py-2 form-control' required name="DoctorLicenseExpiry" id="DoctorLicenseExpiry" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="group-add password">
                      <label className="fs-5 " htmlFor="DoctorPassword">{isLang === 'ar' ? 'كلمة المرور' : 'Password'}</label>
                      <div className="input-group">
                        <input onChange={getUserData} type="password" className='bg-transparent mx-auto py-2 form-control' required name="DoctorPassword" id="DoctorPassword" />
                        <i className="fa-regular fa-eye" onClick={showHidePass}></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="group-add repaassword">
                      <label className="fs-5 " htmlFor="repass-user">{isLang === 'ar' ? 'تأكيـد كلمـة المرور' : 'Confirm'}</label>
                      <div className="input-group">
                        <input type="password" onChange={getConfirm} className='bg-transparent mx-auto py-2 form-control' required name="repass-user" id="repass-user" />
                        <i className="fa-regular fa-eye" onClick={showHideRePass}></i>
                      </div>
                    </div>
                  </div>
                </div>

                {message.length > 0 ? <p id="alertSave" className={`alert ${apiCode === true ? 'alert-success' : 'alert-danger'} fs-6 py-2 mb-0 mt-3 w-50 text-center mx-auto`}>{message}</p> : ''}

                {/* <div className="submitAdd-buttons mt-4 d-flex justify-content-center align-items-center">
                  <Button type='submit' className="btn black-btn p-2 me-4">{loadind ? <i className="fa fa-spinner fa-spin text-white fs-4"></i> : 'Save'}</Button>

                  <Component.ButtonBase title={"Cancel"} bg={"primary"} path="/doctors " />
                  </div> */}

                  <div className='d-flex justify-content-center align-content-center mt-4'>
                      <div className='baseBtn'>
                          <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                              {loadind ? <i className="fa fa-spinner fa-spin text-white fs-4"></i> : 
                                isLang === 'ar' ? 'حفـظ' : 'Save'
                              }
                          </Button>
                      </div>

                      <div className='baseBtn'>
                          <Link to={'/doctors'}>
                              <Button  variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                  {isLang === 'ar' ? 'رجـوع' : 'Cancel'}
                              </Button>
                          </Link>
                      </div>
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
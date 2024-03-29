import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap/';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link, useParams } from 'react-router-dom';
import Component from '../../../constants/Component';
import { VendersContext } from '../../../context/Store';
import useFetch from '../../../utils/useFetch';
import { apiheader } from './../../../utils/fetchData';

 


const EditDoctor = ( ) => {
  let { isLang } = useContext(VendersContext);
  const { id } = useParams();
  let {countries, areas,cities, getCities ,getAreas} = useFetch()
  const selectCity = useRef();
  const areaRef = useRef(null);

  const apiInfos = `https://bytrh.com/api/admin/doctors/edit/${id}`;
  const [userData, setUserData] = useState({});

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [country, setCountry] = useState(''); 

  let [photoSend, setPhotoSend] = useState([]);
  let [imgProfile, setImgProfile] = useState('');

  async function getDoctorData() {
    await axios.get(apiInfos, apiheader)
      .then(res => {
        if (res.status === 200 && res.request.readyState === 4) {
          setImgProfile(res.data.Response.DoctorPicture)
          setName(res.data.Response.UserName);
          setEmail(res.data.Response.UserEmail);
          setPhone(res.data.Response.UserPhone);
          setCountryCode(res.data.Response.UserPhoneFlag);
          setCountry(res.data.Response.IDCountry);
          // setCity(res.data.Response.IDCity);
          setUserData(res.data.Response);
          getCities(res.data.Response.IDCountry)
          getAreas(res.data.Response.IDCity)
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
  }, [isLang])





  // let navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [loadind, setLoadind] = useState(false);

  const [apiCode, setApiCode] = useState(null);


  async function updateForm(e) {

    e.preventDefault();
    setLoadind(true);
    
    let obj1 = {
        IDDoctor: id,
        DoctorPicture: photoSend,
        DoctorName: name,
        DoctorEmail: email,
        DoctorPhone: phone,
        DoctorPhoneFlag: countryCode,
        IDCity: selectCity.current.value,
        IDArea: areaRef.current.value,
    };

    let obj2 = {
        IDDoctor: id,
        DoctorName: name,
        DoctorEmail: email,
        DoctorPhone: phone,
        DoctorPhoneFlag: countryCode,
        IDCity: selectCity.current.value,
        IDArea: areaRef.current.value,
    };

    let { data } = await axios({
      method: 'post',
      url: `https://bytrh.com/api/admin/doctors/edit`,
      data: photoSend.length === 0 ? obj2 : obj1,
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

  const pass = useRef();

  const confirm = useRef();

  const [messagePass, setMessagePass] = useState('');

  const [loadindPass, setLoadindPass] = useState(false);

  const [apiCodePass, setApiCodePass] = useState(null);


  async function updatePassword(e) {

    e.preventDefault();
    setLoadindPass(true);
    if(confirm.current.value === pass.current.value) {
      let { data } = await axios({
        method: 'post',
        url: `https://bytrh.com/api/admin/doctors/edit`,
        data: {
          IDDoctor: id,
          DoctorPassword: pass.current.value,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });

      setMessagePass(data.ApiMsg);
      setLoadindPass(false);

      if (data.Success === true) {
        setApiCodePass(data.Success);
        setTimeout(() => {
          // navigate('/doctors');
          window.history.go(-1);
        }, 1500);
      }
    }

    else {
      setMessagePass('password does not match..');
      setLoadindPass(false);
    }

  }



  const handleImageSelect = (el) => {
    setImgProfile(URL.createObjectURL(el));
  };


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

                      <div className="row d-flex flex-column-reverse flex-md-row justify-content-center justify-content-md-start align-items-center g-4">
                          <div className="col-md-6">
                            <div className="group-add">
                              <label className="fs-5  " htmlFor="doctorImage">{isLang === 'ar' ? 'صـورة الطبيب' : "Doctor's Image"}</label>
                              <div className="input-group">
                                <input type="file" accept='image/*' onChange={(e) => {
                                  handleImageSelect(e.target.files[0])
                                  setPhotoSend(e.target.files[0])
                                }} className='form-control mx-auto py-2' name="doctorImage" id="doctorImage" />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                              <div className="mt-3 mx-auto" style={{ width: "200px " }}>
                                  <img
                                      loading="lazy"
                                      src={imgProfile}
                                      alt={`${name} ${isLang === 'ar' ? 'صورة' : 'picture'}`}
                                      className=' rounded-3 mx-auto w-100 '
                                    />
                              </div>
                          </div>
                      </div>

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
                        <label className="fs-5  " htmlFor="DoctorPhone">{isLang === 'ar' ? 'رقـم الهاتــف' : 'Phone'}</label>
                        <div className="input-group"dir='ltr'>
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
                            {countries?.map((item, i) => (
                              <option key={i} value={item.IDCountry} >{item.CountryName}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <Form.Group controlId="formBasicArea" className='mt-3' >
                        <Form.Label>{isLang === 'ar' ? 'المنطقة' : 'Area'} </Form.Label>

                        <Form.Select aria-label="Default select example" ref={selectCity}>
                          {
                            cities?.map((item, index) => (
                              <option key={index} value={item?.IDCity} selected={userData?.IDCity === item?.IDCity && item?.CityName} > {item?.CityName}</option>
                            ))
                          }
                        </Form.Select>

                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group controlId="formBasicCity" className='mt-3' >
                         <Form.Label>{isLang === 'ar' ? 'المدينــة' : 'City'} </Form.Label>

                        <Form.Select aria-label="Default select example" ref={areaRef}>
                          {
                            areas?.map((item, index) => (
                              <option key={index} value={item?.IDArea} selected={userData?.IDArea === item?.IDArea && item?.AreaName}>{item?.AreaName}</option>

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

                  <div className='d-flex justify-content-center align-content-center gap-3 mt-4'>
                    <div className='baseBtn1'>
                      <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                        {loadind ? <CircularProgress size={27} style={{ color: '#fff' }} /> :
                          isLang === 'ar' ? 'حفـظ' : 'Save'
                        }
                      </Button>
                    </div>

                    <div className='baseBtn w-auto'>
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

          <div className="app__addprodects__header">
            <Component.BaseHeader h1={isLang === 'ar' ? 'تعديـل كلمة السـر' : 'Edit the password'} />
            <div className="app__addOrder-form">
              <div className="app__addprodects-form">
                <form onSubmit={updatePassword}>
                  <div className="row d-flex justify-content-center justify-content-md-start align-items-center g-4">

                    <div className="col-md-6">
                      <div className="group-add">
                        <label className="fs-5" htmlFor="DoctorPass">{isLang === 'ar' ? 'كلمة الســر الجديدة' : 'New Password'}</label>
                        <div className="input-group">
                          <input type="password" ref={pass} className='form-control mx-auto py-2' name="DoctorPass" id="DoctorPass" placeholder={isLang === 'ar' ? 'إضافة كلمة سر جديدة' : 'add a new password'} required />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="group-add">
                        <label className="fs-5" htmlFor="ConfirmPass">{isLang === 'ar' ? 'تأكيد كلمة الســر' : 'Confirm the password'}</label>
                        <div className="input-group">
                          <input type="password" ref={confirm} className='form-control mx-auto py-2' name="ConfirmPass" id="ConfirmPass" placeholder={isLang === 'ar' ? 'تأكيد كلمة السر' : 'confirm the password'} required />
                        </div>
                      </div>
                    </div>
                  </div>

                  {messagePass.length > 0 ? <p id="alertSave" className={`alert ${apiCodePass === true ? 'alert-success' : 'alert-danger'} fs-6 py-2 mb-0 mt-3 w-50 text-center mx-auto`}>{messagePass}</p> : ''}

                  <div className='d-flex justify-content-center align-content-center mt-4'>
                    <div className='baseBtn1'>
                      <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                        {loadindPass ? <CircularProgress size={27} style={{ color: '#fff' }} /> :
                          isLang === 'ar' ? 'حفــظ' : 'Save'
                        }
                      </Button>
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
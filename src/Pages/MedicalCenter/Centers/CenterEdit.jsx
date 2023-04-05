import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'; 
import '../../Vendor/Doctor/Doctor.scss'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Container } from 'react-bootstrap';
 
 import { Button } from 'react-bootstrap/';
 import CircularProgress from '@mui/material/CircularProgress';
import Component from '../../../constants/Component';
import { GetData, apiheader } from '../../../utils/fetchData';
import { VendersContext } from '../../../context/Store';
import useFetch from '../../../utils/useFetch';
 
const CenterEdit = () => {
    let { id } = useParams()
 

   
  
    let [nameData, setNameData] = useState('');
    let [addressData, setAddressData] = useState('');
    let [emailData, setEmailData] = useState('');
    let [phone, setPhone] = useState('');
    let [countryCode, setCountryCode] = useState('');
    let [countryData, setCountryData] = useState('');
    let [cityData, setCityData] = useState('');
    let [areaData, setAreaData] = useState('');
    let [medicalTypeData, setMedicalTypeData] = useState('');
    let [latData, setLatData] = useState('');
    let [longData, setLongData] = useState('');
    let [photoSend, setPhotoSend] = useState([]);
    let [imgProfile, setImgProfile] = useState('');
    let [isLoading, setIsLoading] = useState(false);
  
    // let [fetchData, setFetchData] = useState([]);
  
  
    async function getMedicalData() {
      setIsLoading(true);
       let data = await GetData(`https://bytrh.com/api/admin/medicalcenter/profile/${id}`, apiheader)

      console.log(data)
      if(data.Success === true) {
        const { MedicalCenterName , MedicalCenterAddress , MedicalCenterEmail , MedicalCenterPhone , MedicalCenterPhoneCode , IDCountry , IDCity , IDArea , MedicalCenterType , MedicalCenterLat , MedicalCenterLong , MedicalCenterPicture} = data.Response ;
        setTimeout(() => {
          setNameData(MedicalCenterName);
          setAddressData(MedicalCenterAddress);
          setEmailData(MedicalCenterEmail);
          setPhone(MedicalCenterPhone);
          setCountryCode(MedicalCenterPhoneCode);
          setCountryData(IDCountry);
          setCityData(IDCity);
          setAreaData(IDArea);
          getCitiesBytra(IDCountry);
          getAreasBytra(IDCity);
          setMedicalTypeData(MedicalCenterType);
          setLatData(MedicalCenterLat);
          setLongData(MedicalCenterLong);
          setImgProfile(MedicalCenterPicture);
          setIsLoading(false);
        }, 100);
      }
      else {
        console.log(data.ApiMsg);
      }
    }
  
    useEffect(() => {
        getMedicalData();
       
    }, [id]); 
  
  
    const handleImageSelect = (el) => {
      setImgProfile(URL.createObjectURL(el));
    };
    let { countries  } = useFetch()
  
  
    // get cities Bytra
    const [fetchCitiesBytra, setFetchCitiesBytra] = useState([]);
    async function getCitiesBytra(el) {
      await axios.get(`https://bytrh.com/api/doctor/cities/${el}`)
        .then(res => {
          if (res.status === 200 && res.request.readyState === 4) {
            setFetchCitiesBytra(res.data.Response.Countries);
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  
  
    // get areas Bytra
    const [fetchAreasBytra, setFetchAreasBytra] = useState([]);
    async function getAreasBytra(el) {
      await axios.get(`https://bytrh.com/api/doctor/areas/${el}`)
        .then(res => {
          if (res.status === 200 && res.request.readyState === 4) {
            setFetchAreasBytra(res.data.Response);
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  
  
    const medicalTypes = {
        "ar" : {
          Types: [
            'مركــز',
            'عيــادة'
          ]
        },
        "en" : {
          Types: [
            'Center',
            'Clinic'
          ]
        }
    }
  
  
  
  
    // let navigate = useNavigate();
  
    const [message, setMessage] = useState('');
  
    const [loadind, setLoadind] = useState(false);
  
    const [apiCode, setApiCode] = useState(null);
  
  
    async function updateForm(e) {
  
      e.preventDefault();
      setLoadind(true);
  
      let obj1 = {
        IDMedicalCenter: id,
        MedicalCenterName: nameData,
        MedicalCenterAddress: addressData,
        MedicalCenterEmail: emailData,
        MedicalCenterPhone: phone,
        MedicalCenterPhoneCode: countryCode,
        IDArea: areaData,
        MedicalCenterType: medicalTypeData,
        MedicalCenterLat: latData,
        MedicalCenterLong: longData,
        MedicalCenterPicture: photoSend,
      };
  
      let obj2 = {
        IDMedicalCenter: id,
        MedicalCenterName: nameData,
        MedicalCenterAddress: addressData,
        MedicalCenterEmail: emailData,
        MedicalCenterPhone: phone,
        MedicalCenterPhoneCode: countryCode,
        IDArea: areaData,
        MedicalCenterType: medicalTypeData,
        MedicalCenterLat: latData,
        MedicalCenterLong: longData,
      };
  
      let { data } = await axios({
        method: 'post',
        url: `https://bytrh.com/api/admin/medicalcenter/edit`,
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
          // window.history.go(-1);
          setApiCode(null);
          setMessage('');
          getMedicalData();
        }, 1500);
      }
  
    }
  
  
    let { isLang } = useContext(VendersContext);
    
  
    return (
      <>
     
          <Container fluid>
            <div className="app__addprodects">
  
              <div className="app__addprodects__header ">
                <Component.BaseHeader h1={isLang === 'ar' ? 'بيانـات المركز الطبي' : 'M.C information'} />
                <div className="app__addOrder-form">
                  <div className="app__addprodects-form">
                    <form onSubmit={updateForm}>
                      <div className="row d-flex justify-content-center justify-content-md-start align-items-center g-4">
  
                        <div className="row d-flex flex-column-reverse flex-md-row justify-content-center justify-content-md-start align-items-center g-4">
                            <div className="col-md-6">
                              <div className="group-add">
                                <label className="fs-5  " htmlFor="MCImage">{isLang === 'ar' ? 'صـورة المركز الطبي' : 'Image Medical Center'}</label>
                                <div className="input-group">
                                  <input type="file" accept='image/*' onChange={(e) => {
                                    handleImageSelect(e.target.files[0])
                                    setPhotoSend(e.target.files[0])
                                  }} className='form-control mx-auto py-2' name="MCImage" id="MCImage" />
                                </div>
                              </div>
                            </div>
  
                            <div className="col-md-6">
                                <div className="mt-3 mx-auto" style={{ width: "200px " }}>
                                    <img
                                        loading="lazy"
                                        src={imgProfile}
                                        alt={'medical-center'}
                                        className=' rounded-circle mx-auto '
                                        style={{height: '150px' , width: '150px'}}
                                    />
                                </div>
                            </div>
                        </div>
  
                        <div className="col-md-6">
                          <div className="group-add">
                            <label className="fs-5  " htmlFor="MCName">{isLang === 'ar' ? 'اســم المركز الطبي' : 'Name Medical Center'}</label>
                            <div className="input-group">
                              <input type="text" value={nameData} onChange={(e) => setNameData(e.target.value)}  className='form-control mx-auto py-2' required name="MCName" id="MCName" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="group-add">
                            <label className="fs-5  " htmlFor="MCEmail">{isLang === 'ar' ? 'البريـد الإلكترونـي' : 'Email Medical Center'}</label>
                            <div className="input-group">
                              <input type="email" value={emailData} onChange={(e) => setEmailData(e.target.value)} className='form-control mx-auto py-2' required name="MCEmail" id="MCEmail" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="group-add">
                            <label className="fs-5  " htmlFor="MCAddress">{isLang === 'ar' ? 'عنـوان المركـز الطبي' : 'Address Medical Center'}</label>
                            <div className="input-group">
                              <input type="text" value={addressData} onChange={(e) => setAddressData(e.target.value)} className='form-control mx-auto py-2' required name="MCAddress" id="MCAddress" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="group-add">
                            <label className="fs-5  " htmlFor="MCPhone">{isLang === 'ar' ? 'رقـم التليفـون' : 'Phone Medical Center'}</label>
                            <div className="input-group">
                              <PhoneInput
                                value={countryCode}
                                preferredCountries={['eg', 'sa', 'ae']}
                                enableSearch={true}
                                searchPlaceholder={isLang === 'ar' ? 'الرقم الكودي الدولـة..' : 'Country number...'}
                                inputClass={'form-control mx-auto w-100 py-3'}
                                inputStyle={{width:'100%'}}
                                inputProps={{
                                  name: 'MCPhone',
                                  required: true,
                                  id: isLang === 'ar' ? 'DoctorPhone2' : 'DoctorPhone',
                                  value: phone,
                                  // autoFocus: true
                                }}
                                onChange={(MCPhone, MCPhoneFlag, e) => {
                                  setPhone(`+${MCPhone}`)
                                  setCountryCode(`+${MCPhoneFlag.dialCode}`)
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="group-add">
                            <label className="fs-5  " htmlFor="IDCountry">{isLang === 'ar' ? 'البلـد' : 'Country'}</label>
                            <div className="input-group">
                              <select 
                                defaultValue={countryData} 
                                onChange={(e) => {
                                  setCountryData(e.target.value);
                                  getCitiesBytra(e.target.value);
                                }} 
                                className='w-100 form-control mx-auto py-2 px-2' required name="IDCountry" id="IDCountry"
                              >
                                {countries && countries.filter((el => el?.IDCountry === countryData)).map((item, i) => (
                                  <option key={i} value={item?.IDCountry} >{item?.CountryName}</option>
                                ))}
                                {countries && countries.filter((el => el?.IDCountry !== countryData)).map((item, i) => (
                                  <option key={i} value={item?.IDCountry} >{item?.CountryName}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="group-add">
                            <label className="fs-5  " htmlFor="IDCity">{isLang === 'ar' ? 'المدينـة' : 'City'}</label>
                            <div className="input-group">
                              <select 
                                defaultValue={cityData} 
                                onChange={(e) => {
                                  setCityData(e.target.value);
                                  getAreasBytra(e.target.value);
                                }} 
                                className='w-100 form-control mx-auto py-2 px-2' required name="IDCity" id="IDCity"
                              >
                                {fetchCitiesBytra && fetchCitiesBytra.filter((el => el?.IDCity === cityData)).map((item, i) => (
                                  <option key={i} value={item?.IDCity} >{item?.CityName}</option>
                                ))}
                                {fetchCitiesBytra && fetchCitiesBytra.filter((el => el.IDCity !== cityData)).map((item, i) => (
                                  <option key={i} value={item?.IDCity} >{item?.CityName}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="group-add">
                            <label className="fs-5  " htmlFor="IDArea">{isLang === 'ar' ? 'المنطقــة' : 'Area'}</label>
                            <div className="input-group">
                              <select 
                                defaultValue={areaData}
                                onChange={(e) => {
                                    setAreaData(e.target.value);
                                }}
                                className='w-100 form-control mx-auto py-2 px-2' required name="IDArea" id="IDArea"
                              >
                                {fetchAreasBytra && fetchAreasBytra.filter((el => el?.IDArea === areaData)).map((item, i) => (
                                  <option key={i} value={item?.IDArea} >{item?.AreaName}</option>
                                ))}
                                {fetchAreasBytra && fetchAreasBytra.filter((el => el?.IDArea !== areaData)).map((item, i) => (
                                  <option key={i} value={item?.IDArea} >{item?.AreaName}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="group-add">
                            <label className="fs-5  " htmlFor="MCType">{isLang === 'ar' ? 'نـوع المركز الطبـي' : 'Medical Type'}</label>
                            <div className="input-group">
                              <select 
                                defaultValue={medicalTypeData}
                                onChange={(e) => {
                                  setMedicalTypeData(e.target.value)
                                }}
                                className='w-100 form-control mx-auto py-2 px-2' required name="MCType" id="MCType"
                              >
                                { medicalTypes[isLang]?.Types?.filter((el => el?.toUpperCase() === medicalTypeData)).map((item, i) => (
                                  <option key={i} value={item?.toUpperCase()} >{item}</option>
                                ))}
                                { medicalTypes[isLang]?.Types?.filter((el => el.toUpperCase() !== medicalTypeData)).map((item, i) => (
                                  <option key={i} value={item.toUpperCase()} >{item}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="group-add">
                            <label className="fs-5  " htmlFor="MCLat">{isLang === 'ar' ? 'خط العـرض' : 'Latitude'}</label>
                            <div className="input-group">
                              <input type="number" value={latData} onChange={(e) => {
                                setLatData(e.target.value)
                              }} className='form-control mx-auto py-2' required name="MCLat" id="MCLat" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="group-add">
                            <label className="fs-5  " htmlFor="MCLong">{isLang === 'ar' ? 'خط الطـول' : 'Longitude'}</label>
                            <div className="input-group">
                              <input type="number" value={longData} onChange={(e) => {
                                setLongData(e.target.value)
                              }} className='form-control mx-auto py-2' required name="MCLong" id="MCLong" />
                            </div>
                          </div>
                        </div>
  
                      </div>
  
                      {message.length > 0 ? <p id="alertSave" className={`alert ${apiCode === true ? 'alert-success' : 'alert-danger'} fs-6 py-2 mb-0 mt-3 w-50 text-center mx-auto`}>{message}</p> : ''}
  
                      <div className='d-flex justify-content-center align-content-center mt-4'>
                          <div className='baseBtn'>
                              <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                  {loadind ? <CircularProgress size={27} style={{color: '#fff'}} /> : 
                                    isLang === 'ar' ? 'حفـظ' : 'Save'
                                  }
                              </Button>
                          </div>
  
                          <div className='baseBtn'>
                              <Link to={'/medicalcenter'}>
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
            </div>
          </Container>
        
      </>
    )
}

export default CenterEdit

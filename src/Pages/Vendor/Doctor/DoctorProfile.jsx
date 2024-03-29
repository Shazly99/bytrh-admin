import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BiMessageRoundedAdd } from 'react-icons/bi';
import { FiEdit3 } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../../Components/Shared/Loader/Loader';
import { VendersContext } from '../../../context/Store';
import Component from './../../../constants/Component';
import { PostData, apiheader } from '../../../utils/fetchData';
import img from '../../../assets/Img';



export default function DoctorProfile() {

  let { isLang } = useContext(VendersContext);

  let { id } = useParams();
  const apiDoctoProfile = `https://bytrh.com/api/admin/doctors/profile/${id}`;

  const [fetchDoctor, setFetchDoctor] = useState([]);
  const [fetchDoctorLicense, setFetchDoctorLicense] = useState([]);
  const [fetchDoctorMedicalFields, setFetchDoctorMedicalFields] = useState([]);
  const [fetchDoctorAnimalCategories, setFetchDoctorAnimalCategories] = useState([]);
  const [fetchDoctorPricing, setFetchDoctorPricing] = useState(null);
  const [DoctorDocument, setDoctorDocuments] = useState([]);
  const [NextDoctorID, setNextDoctorID] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getDoctorData() {
    setLoading(true);
    await axios.get(apiDoctoProfile, apiheader)
      .then(res => {
        console.log(res.data.Response.NextDoctorID);
        if (res.status === 200 && res.request.readyState === 4) {
          setDoctorDocuments(res.data.Response.DoctorDocuments);
          setFetchDoctor(res.data.Response);
          setFetchDoctorLicense(res.data.Response.DoctorLicense);
          setFetchDoctorPricing(res.data.Response.DoctorPricing);
          setFetchDoctorAnimalCategories(res.data.Response.AnimalCategories);
          setFetchDoctorMedicalFields(res.data.Response.MedicalFields);
          setNextDoctorID(res.data.Response.NextDoctorID)
          setLoading(false);
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

    return (() => {
      clearTimeout(timeOut);
    })
  }, [isLang, NextDoctorID])


  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const [messageAdd, setMessageAdd] = useState('');
  const [apiCodeAdd, setApiCodeAdd] = useState('');
  const [loadingAdd, setLoadingAdd] = useState(false);

  const [doctorAdd, setDoctorAdd] = useState({
    IDDoctor: id,
    Amount: '',
    DoctorServiceLevel: '',
    DoctorPricingService: '',
  });

  const getDoctorAddData = (e) => {
    let myDoctor = { ...doctorAdd };
    myDoctor[e.target.name] = e.target.value;
    setDoctorAdd(myDoctor)
  }

  async function registerAddForm(e) {
    e.preventDefault();
    setLoadingAdd(true);
    let { data } = await axios({
      method: 'post',
      url: `https://bytrh.com/api/admin/doctors/pricing/add`,
      data: doctorAdd,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    });

    setMessageAdd(data.ApiMsg);
    setLoadingAdd(false);

    if (data.Success === true) {
      setApiCodeAdd(data.Success);
      setTimeout(() => {
        setMessageAdd('');
        getDoctorData();
        handleCloseAdd();
      }, 2000);
    }

    else {
      setTimeout(() => {
        setMessageAdd('');
      }, 2000);
    }

  }


  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const [messageEdit, setMessageEdit] = useState('');
  const [apiCodeEdit, setApiCodeEdit] = useState('');
  const [loadingEdit, setLoadingEdit] = useState(false);

  const [IDDoctorPricing, setIDDoctorPricing] = useState('');
  const [amountEdit, setAmountEdit] = useState('');
  const [doctorServiceLevelEdit, setDoctorServiceLevelEdit] = useState('');

  async function registerEditForm(e) {
    e.preventDefault();
    setLoadingEdit(true);
    let { data } = await axios({
      method: 'post',
      url: `https://bytrh.com/api/admin/doctors/pricing/edit`,
      data: {
        IDDoctorPricing: IDDoctorPricing,
        Amount: amountEdit,
        DoctorServiceLevel: doctorServiceLevelEdit
      },
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    });

    setMessageEdit(data.ApiMsg);
    setLoadingEdit(false);

    if (data.Success === true) {
      setApiCodeEdit(data.Success);
      setTimeout(() => {
        setMessageEdit('');
        getDoctorData();
        handleCloseEdit();
      }, 2000);
    }

    else {
      setTimeout(() => {
        setMessageEdit('');
      }, 2000);
    }

  }


  const [showRemove, setShowRemove] = useState(false);
  const handleCloseRemove = () => setShowRemove(false);
  const handleShowRemove = () => setShowRemove(true);
  const [messageRemove, setMessageRemove] = useState('');
  const [apiCodeRemove, setApiCodeRemove] = useState('');
  const [loadingRemove, setLoadingRemove] = useState(false);

  async function removeConfirm(e) {
    setLoadingRemove(true);
    let { data } = await axios({
      method: 'get',
      url: `https://bytrh.com/api/admin/doctors/pricing/remove/${IDDoctorPricing}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    });
    console.log(data);
    setMessageRemove(data.ApiMsg);
    setLoadingRemove(false);

    if (data.Success === true) {

      setApiCodeRemove(data.Success);
      setTimeout(() => {
        setMessageRemove('');
        getDoctorData();
        handleCloseRemove();
      }, 2000);
    }

    else {
      setTimeout(() => {
        setMessageRemove('');
      }, 2000);
    }

  }


  const myStatus = useRef();

  const handleStatusSelect = async () => {
    if (myStatus.current.value === "PENDING") {
      await doctorStatus({ IDDoctor: id, DoctorStatus: myStatus.current.value })
      await getDoctorData()
    } else if (myStatus.current.value === "ACTIVE") {
      await doctorStatus({ IDDoctor: id, DoctorStatus: myStatus.current.value })
      await getDoctorData()
    } else if (myStatus.current.value === "OFFLINE") {
      await doctorStatus({ IDDoctor: id, DoctorStatus: myStatus.current.value })
      await getDoctorData()
    } else if (myStatus.current.value === "BLOCKED") {
      await doctorStatus({ IDDoctor: id, DoctorStatus: myStatus.current.value })
      await getDoctorData()
    } else if (myStatus.current.value === "INACTIVE") {
      await doctorStatus({ IDDoctor: id, DoctorStatus: myStatus.current.value })
      await getDoctorData()
    } else if (myStatus.current.value === "NOT_VERIFIED") {
      await doctorStatus({ IDDoctor: id, DoctorStatus: myStatus.current.value })
      await getDoctorData()
    }
  };


  const doctorStatus = async (status) => {
    await PostData(`https://bytrh.com/api/admin/doctors/status`, status, apiheader)
  }


  return (
    <>

      {!loading ?
        <div className="container-fluid py-2">

          <div className="d-flex justify-content-between align-items-center ">

            {isLang === 'ar' ?
              <Component.SubNav sub__nav={[
                { name: 'قائمـة الأطبـاء', path: `/doctors` },
                { name: 'صفحـة الطبيـب الشخصيـة', path: `/doctors/doctorProfile/${id}` }
              ]} />
              :
              <Component.SubNav sub__nav={[
                { name: 'Doctors', path: `/doctors` },
                { name: 'Doctor Profile', path: `/doctors/doctorProfile/${id}` },
                // { name: '', path: `/doctors/doctorProfile/${}` }
              ]} />
            }
            {
              NextDoctorID &&
              <Link className='NextDoctor ' to={`/doctors/doctorProfile/${NextDoctorID}`} target="_blank">
                {isLang === 'en' ? 'Next Profile' : 'الملف الشخصي التالي'}
              </Link>
            }

          </div>
          <div className="row gx-lg-4 gx-0 gy-lg-0 gy-4 d-flex justify-content-lg-start justify-content-center mt-2 mb-4">

            <div className="col-lg-10">
              <div className="doc-info position-relative bg-light shadow-sm rounded-3 p-2 h-100">
                <div className="row gx-md-4 gx-2 gy-md-0 gy-3 d-flex align-items-center">
                  <div className="col-md-4">
                    <div className="img-doc">
                      {
                        fetchDoctor.DoctorPicture?
                        <img src={fetchDoctor.DoctorPicture} className='d-block rounded-3 mx-auto' style={{ objectFit: 'fill', height: '280px' }} loading='lazy' alt="doctor" />:
                        <img 
                          loading="lazy"
                          src={img.defaultImg} // use normal <img> attributes as props
                          className=" rounded-2"
                          width={'250px'}
                          height={'150px'} /> 
                      } 
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="personal-info position-relative">

                      <div className="row d-flex align-items-center">
                        <div className="col-6">
                          <div className='group'>
                            <small className='my-0 text-black-50' style={{ fontWeight: '500' }}>{isLang === 'ar' ? 'الإسـم' : 'Name'}:</small>
                            <h6 className='mb-2 text-black' style={{ fontWeight: '700', wordWrap: 'break-word' }}>{fetchDoctor.DoctorName}</h6>
                          </div>
                        </div>

                        <div className="col-6">
                          <div className='group'>
                            <small className='my-0 text-black-50' style={{ fontWeight: '500' }}>{isLang === 'ar' ? 'رقـم التليفـون' : 'Mobile Number'}:</small>
                            <h6 className='mb-2 text-black' style={{ fontWeight: '700', wordWrap: 'break-word' }}>{fetchDoctor.DoctorPhone}</h6>
                          </div>
                        </div>

                        <div className="col-6">
                          <div className='group'>
                            <small className='my-0 text-black-50' style={{ fontWeight: '500' }}>{isLang === 'ar' ? 'البريد الإلكتروني' : 'Email'}:</small>
                            <h6 className='mb-2 mb-lg-3 text-black' style={{ fontWeight: '700', wordWrap: 'break-word' }}>{fetchDoctor.DoctorEmail}</h6>
                          </div>
                        </div>

                        <div className="col-6">
                          <div className='group'>
                            <small className='my-0 text-black-50' style={{ fontWeight: '500' }}>{isLang === 'ar' ? 'الرصيـد' : 'Balance'}:</small>
                            <h6 className='mb-2 mb-lg-3 text-black' style={{ fontWeight: '700', wordWrap: 'break-word' }}>{fetchDoctor.DoctorBalance} {isLang === 'ar' ? 'ريال' : 'SAR'}</h6>
                          </div>
                        </div>

                        <div className="col-6">
                          <div className='group'>
                            <small className='my-0 text-black-50' style={{ fontWeight: '500' }}>{isLang === 'ar' ? 'التصنيـف' : 'Type'}:</small>
                            <h6 className='mb-2 mb-lg-3 text-black' style={{ fontWeight: '700', wordWrap: 'break-word' }}>{fetchDoctor.DoctorType}</h6>
                          </div>
                        </div>

                        {fetchDoctor.MedicalCenterName &&
                          <div className="col-6">
                            <div className='group'>
                              <small className='my-0 text-black-50' style={{ fontWeight: '500' }}>{isLang === 'ar' ? 'المركز الطبي' : 'Medical Center'}:</small>
                              <h6 className='mb-2 mb-lg-3 text-black' style={{ fontWeight: '700', wordWrap: 'break-word' }}>{fetchDoctor.MedicalCenterName}</h6>
                            </div>
                          </div>
                        }

                        <div className="col-6">
                          <div className='group d-flex align-items-center'>
                            <div>
                              <small className='my-0 text-black-50 d-block' style={{ fontWeight: '500' }}>{isLang === 'ar' ? 'الحالـة' : 'Status'}:</small>
                              <small className={`mb-2 mb-lg-3
                                    ${fetchDoctor.DoctorStatus === 'PENDING' && 'txt_pending_doctor'} 
                                    ${fetchDoctor.DoctorStatus === 'NOT_VERIFIED' && 'txt_shipped_doctor'}
                                    ${fetchDoctor.DoctorStatus === 'BLOCKED' && 'txt_blocked_doctor'}
                                    ${fetchDoctor.DoctorStatus === 'ACTIVE' && 'txt_delivered_doctor'}
                                    ${fetchDoctor.DoctorStatus === 'OFFLINE' && 'txt_rejected_doctor'}
                                    ${fetchDoctor.DoctorStatus === 'INACTIVE' && 'txt_rejected_doctor'}`}
                                style={{ fontWeight: '700', wordWrap: 'break-word' }}>
                                {isLang === 'en' && fetchDoctor.DoctorStatus && fetchDoctor.DoctorStatus[0].toUpperCase()}{isLang === 'en' && fetchDoctor.DoctorStatus && fetchDoctor.DoctorStatus.slice(1).toLowerCase().replace('_', ' ')}
                                {isLang === 'ar' && fetchDoctor.DoctorStatus === 'ACTIVE' ? 'نشــط' : ''}
                                {isLang === 'ar' && fetchDoctor.DoctorStatus === 'PENDING' ? 'قيـد الإنتظـار' : ''}
                                {isLang === 'ar' && fetchDoctor.DoctorStatus === 'BLOCKED' ? 'محظــور' : ''}
                                {isLang === 'ar' && fetchDoctor.DoctorStatus === 'OFFLINE' ? 'مغلـق' : ''}
                                {isLang === 'ar' && fetchDoctor.DoctorStatus === 'INACTIVE' ? 'غير نشـط' : ''}
                                {isLang === 'ar' && fetchDoctor.DoctorStatus === 'NOT_VERIFIED' ? 'غير مثبـت' : ''}
                              </small>
                            </div>
                            <div className={`spw ${isLang === 'ar' ? 'me-3' : 'ms-3'}`}>
                              <select name="status" id="status" defaultValue={fetchDoctor.DoctorStatus} ref={myStatus} onChange={handleStatusSelect} className='form-select px-4 py-1'>
                                <option value="ACTIVE">{isLang === 'ar' ? 'نشــط' : 'Active'}</option>
                                <option value="PENDING">{isLang === 'ar' ? 'قيـد الإنتظـار' : 'Pending'}</option>
                                <option value="BLOCKED">{isLang === 'ar' ? 'محظــور' : 'Blocked'}</option>
                                <option value="OFFLINE">{isLang === 'ar' ? 'مغلـق' : 'Offline'}</option>
                                <option value="INACTIVE">{isLang === 'ar' ? 'غير نشـط' : 'Inactive'}</option>
                                <option value="NOT_VERIFIED">{isLang === 'ar' ? 'غير مثبـت' : 'Not verified'}</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="col-6">
                          <div className='group'>
                            <small className='my-0 text-black-50' style={{ fontWeight: '500' }}>{isLang === 'ar' ? 'الدولـة' : 'Country'}:</small>
                            <h6 className='mb-2 mb-lg-3 text-black' style={{ fontWeight: '700', wordWrap: 'break-word' }}>{fetchDoctor.Country}</h6>
                          </div>
                        </div>

                        <div className="col-6">
                          <div className='group'>
                            <small className='my-0 text-black-50' style={{ fontWeight: '500' }}>{isLang === 'ar' ? 'المنطقـة' : 'Area'}:</small>
                            <h6 className='mb-2 mb-lg-3 text-black' style={{ fontWeight: '700', wordWrap: 'break-word' }}>{fetchDoctor.City}</h6>
                          </div>
                        </div>

                        <div className="col-6">
                          <div className='group'>
                            <small className='my-0 text-black-50' style={{ fontWeight: '500' }}>{isLang === 'ar' ? 'المدينـة' : 'City'}:</small>
                            <h6 className='mb-2 mb-lg-3 text-black' style={{ fontWeight: '700', wordWrap: 'break-word' }}>{fetchDoctor.Area}</h6>
                          </div>
                        </div>

                      </div>

                      <Link to={`../editDoctor/${id}`} className='text-decoration-underline secondColor' style={{ fontWeight: '500', cursor: 'pointer' }}>{isLang === 'ar' ? 'تغيير كلمة السر' : 'Change Password'}</Link>

                    </div>
                  </div>
                </div>
                <Link to={`../editDoctor/${id}`} className={`personal-info-edit position-absolute top-0 ${isLang === 'ar' ? 'start-0' : 'end-0'} secondColor`} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  <FiEdit3 className='me-1' />
                  <small className='my-0' style={{ fontWeight: '500' }}>{isLang === 'ar' ? 'تعديـل' : 'Edit'}</small>
                </Link>
              </div>
            </div>

            {/* <div className="col-lg-5">
              <div className="license bg-light shadow-sm rounded-3 p-2 h-100">
                <h6 className='mb-2 fw-bold'>

                  {isLang === 'ar' ? 'الرخصـة المهنيـة' : 'Profissional License'}
                </h6>
                <img src={fetchDoctorLicense.DoctorDocumentPath} className='img-fluid d-block rounded-3' loading='lazy' alt="license" />
                <div className="d-flex mt-3">
                  <small className='my-0 text-black-50 me-1' style={{ fontWeight: '500' }}>
                    {isLang === 'ar' ? 'تاريخ إنتهاء الصلاحيـة' : 'Expire Date'}:
                  </small>
                  <h6 className='my-0 text-black' style={{ fontWeight: '700', wordWrap: 'break-word' }}>{fetchDoctorLicense.DoctorDocumentExpireDate}</h6>
                </div>
              </div>
            </div> */}

          </div>

          <div className="row gx-xl-4 gx-0 gy-xl-0 gy-4 d-flex justify-content-xl-start justify-content-center">

            <div className="col-xl-8">
              <div className="doc-info bg-light shadow-sm rounded-3 p-2 h-100">
                <h6 className='mb-sm-3 mb-4 fw-bold color-red'>
                  {isLang === 'ar' ? 'أسعـار الخدمـات' : 'Services Prices'}
                </h6>
                <div className="row gx-sm-4 gx-0 gy-4 d-flex justify-content-sm-start justify-content-center">

                  {fetchDoctorPricing?.map((price, i) => (
                    <div key={i} className="col-sm-6">

                      {price.IDDoctorPricing ?
                        <>
                          <Modal style={{ zIndex: '9999999999' }} show={showEdit} onHide={handleCloseEdit} centered dir={isLang === 'ar' ? 'rtl' : 'ltr'}>
                            <Modal.Header closeButton>
                              <Modal.Title className='text-center w-100'>
                                <h5 className='mb-0'>
                                  {isLang === 'ar' ? 'تعديـل السعـر' : 'Edit Price'}
                                </h5>
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <form onSubmit={registerEditForm}>

                                <div className="group-add">
                                  <label className="fs-6 " htmlFor="AmountEdit">
                                    {isLang === 'ar' ? 'المبلغ المدفـوع' : 'Amount'}
                                  </label>
                                  <div className="input-group">
                                    <input value={amountEdit} onChange={(e) => setAmountEdit(e.target.value)} type="number" className='bg-transparent form-control mx-auto py-2 w-100' required name="AmountEdit" id="AmountEdit" />
                                  </div>
                                </div>

                                <div className="group-add">
                                  <label className="fs-6 " htmlFor="DoctorServiceLevelEdit">
                                    {isLang === 'ar' ? 'مستـوي الخدمة بالدقائق' : 'Doctor Service Level / in minutes'}
                                  </label>
                                  <div className="input-group">
                                    <input value={doctorServiceLevelEdit} onChange={(e) => setDoctorServiceLevelEdit(e.target.value)} type="number" className='bg-transparent form-control mx-auto py-2 w-100' required name="DoctorServiceLevelEdit" id="DoctorServiceLevelEdit" />
                                  </div>
                                </div>

                                {messageEdit.length > 0 ? <p id="alertEdit" className={`alert ${apiCodeEdit === true ? 'alert-success' : 'alert-danger'} fs-6 py-2 mb-0 mt-3 w-50 text-center mx-auto`}>{messageEdit}</p> : ''}


                                <div className='d-flex justify-content-center align-content-center mt-4'>
                                  <div className={`baseBtn ${isLang === 'ar' ? 'ps-0 ms-2' : 'pe-0 me-2'}`}>
                                    <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                      {loadingEdit ? <CircularProgress size={27} style={{ color: '#fff' }} /> :
                                        isLang === 'ar' ? 'حفـظ' : 'Save'}
                                    </Button>
                                  </div>

                                  <div className={`baseBtn ${isLang === 'ar' ? 'pe-0' : 'ps-0'}`}>
                                    <Button onClick={handleCloseEdit} variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                      {isLang === 'ar' ? 'رجـوع' : 'Cancel'}
                                    </Button>
                                  </div>
                                </div>

                              </form>
                            </Modal.Body>
                          </Modal>

                          <Modal style={{ zIndex: '9999999999' }} show={showRemove} onHide={handleCloseRemove} centered dir={isLang === 'ar' ? 'rtl' : 'ltr'}>
                            <Modal.Header closeButton>
                              <Modal.Title className='text-center w-100  '>
                                <h5 className='mb-0'>
                                  {isLang === 'ar' ? 'تحذيـر..' : 'Warning Remove..'}
                                </h5>
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Component.HandelDelete />
                            </Modal.Body>
                            {messageRemove.length > 0 ? <p id="alertRemove" className={`alert ${apiCodeRemove === true ? 'alert-success' : 'alert-danger'} fs-6 py-2 my-2 w-50 text-center mx-auto`}>{messageRemove}</p> : ''}
                            <Modal.Footer className='d-flex justify-content-center align-items-center'>

                              <div className='d-flex justify-content-center align-content-center'>
                                <div className={`baseBtn ${isLang === 'ar' ? 'ps-0 ms-2' : 'pe-0 me-2'}`}>
                                  <Button onClick={removeConfirm} variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                    {loadingRemove ? <CircularProgress size={27} style={{ color: '#fff' }} /> :
                                      isLang === 'ar' ? 'تأكيـد' : 'Confirm'}
                                  </Button>
                                </div>

                                <div className={`baseBtn ${isLang === 'ar' ? 'pe-0' : 'ps-0'}`}>
                                  <Button onClick={handleCloseRemove} variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                    {isLang === 'ar' ? 'رجـوع' : 'Cancel'}
                                  </Button>
                                </div>
                              </div>

                            </Modal.Footer>
                          </Modal>
                        </>
                        :
                        <Modal style={{ zIndex: '9999999999' }} show={showAdd} onHide={handleCloseAdd} centered dir={isLang === 'ar' ? 'rtl' : 'ltr'}>
                          <Modal.Header closeButton>
                            <Modal.Title className='text-center w-100'>
                              <h5 className='mb-0'>
                                {isLang === 'ar' ? 'إضافـة سعـر' : 'Add Price'}
                              </h5>
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form onSubmit={registerAddForm}>

                              <div className="group-add">
                                <label className="fs-6 " htmlFor="Amount">
                                  {isLang === 'ar' ? 'المبلغ المستحـق' : 'Amount'}
                                </label>
                                <div className="input-group">
                                  <input onChange={getDoctorAddData} type="number" className='bg-transparent form-control  mx-auto py-2 w-100' required placeholder={isLang === 'ar' ? 'ادخل المبلغ المستحق' : 'enter an amount..'} name="Amount" id="Amount" />
                                </div>
                              </div>

                              <div className="group-add">
                                <label className="fs-6 " htmlFor="DoctorServiceLevel">
                                  {isLang === 'ar' ? 'مستوي الخدمـة' : 'Doctor Service Level / in minutes'}
                                </label>
                                <div className="input-group">
                                  <input onChange={getDoctorAddData} type="number" className='bg-transparent form-control mx-auto py-2 w-100' required placeholder={isLang === 'ar' ? 'ادخل مستوي الخدمة' : 'enter a level in minutes..'} name="DoctorServiceLevel" id="DoctorServiceLevel" />
                                </div>
                              </div>

                              <div className="group-add">
                                <label className="fs-6 " htmlFor="DoctorPricingService">
                                  {isLang === 'ar' ? 'الخدمـة' : 'Service'}
                                </label>
                                <div className="input-group">
                                  <select onChange={getDoctorAddData} className='w-100 bg-transparent mx-auto py-2 px-2' required name="DoctorPricingService" id="DoctorPricingService">
                                    <option>
                                      {isLang === 'ar' ? 'اختر الخدمـة' : 'choose a service'}
                                    </option>
                                    <option value='CONSULT'>
                                      {isLang === 'ar' ? 'استشــارة' : 'Consult'}
                                    </option>
                                    <option value='URGENT_CONSULT' >
                                      {isLang === 'ar' ? 'استشــارة عاجلـة' : 'Urgent Consult'}
                                    </option>
                                    <option value='VISIT'>
                                      {isLang === 'ar' ? 'زيـارة' : 'Visit'}
                                    </option>
                                    <option value='HOME_VISIT' >
                                      {isLang === 'ar' ? 'زيـارة منزليـة' : 'Home Visit'}
                                    </option>
                                  </select>
                                </div>
                              </div>

                              {messageAdd.length > 0 ? <p id="alertAdd" className={`alert ${apiCodeAdd === true ? 'alert-success' : 'alert-danger'} fs-6 py-2 mb-0 mt-3 w-50 text-center mx-auto`}>{messageAdd}</p> : ''}

                              <div className='d-flex justify-content-center align-content-center mt-4'>
                                <div className={`baseBtn ${isLang === 'ar' ? 'ps-0 ms-2' : 'pe-0 me-2'}`}>
                                  <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                    {loadingAdd ? <CircularProgress size={27} style={{ color: '#fff' }} /> :
                                      isLang === 'ar' ? 'حفـظ' : 'Save'}
                                  </Button>
                                </div>

                                <div className={`baseBtn ${isLang === 'ar' ? 'pe-0' : 'ps-0'}`}>
                                  <Button onClick={handleCloseAdd} variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                    {isLang === 'ar' ? 'رجـوع' : 'Cancel'}
                                  </Button>
                                </div>
                              </div>

                            </form>
                          </Modal.Body>

                        </Modal>
                      }



                      <div className="price position-relative">
                        <h6 className='mb-3'>{`${price.DoctorPricingService[0].toUpperCase() + price.DoctorPricingService.slice(1).toLowerCase()}`.replace('_', ' ')}</h6>
                        <div className="service-level d-flex justify-content-between mb-2">
                          <h6 className='mb-1'>{isLang === 'ar' ? 'مستـوي الخدمـة' : 'Service Level'} <span className='text-black-50' style={{ fontSize: '12px' }}>({isLang === 'ar' ? 'تبدأ من' : 'start from'})</span> :</h6>
                          <h6 className={`mb-0 fw-bold ${isLang === 'ar' ? 'ps-2' : 'pe-2'} color-red`}>{price.DoctorServiceLevel} {isLang === 'ar' ? 'ريـال' : 'SAR'}</h6>
                        </div>
                        <div className="service-level d-flex justify-content-between">
                          <h6 className='mb-1'>{isLang === 'ar' ? 'المبلغ المستحـق' : 'Amount'} :</h6>
                          <h6 className={`mb-0 fw-bold ${isLang === 'ar' ? 'ps-2' : 'pe-2'} color-red`}>{price.DoctorPricing} {isLang === 'ar' ? 'ريـال' : 'SAR'}</h6>
                        </div>

                        {price.IDDoctorPricing ? <button className='btn btn-danger mt-2 d-block mx-sm-auto' onClick={() => {
                          handleShowRemove();
                          setIDDoctorPricing(price.IDDoctorPricing)
                        }}>
                          {isLang === 'ar' ? 'حـذف السعـر' : 'Remove Price'}
                        </button> : ''}

                        {price.IDDoctorPricing ?
                          <div className="personal-info-edit position-absolute top-0 secondColor" onClick={() => {
                            handleShowEdit();
                            setIDDoctorPricing(price.IDDoctorPricing);
                            setAmountEdit(price.DoctorPricing);
                            setDoctorServiceLevelEdit(price.DoctorServiceLevel);
                          }} style={{ cursor: 'pointer', whiteSpace: 'nowrap', right: isLang === 'ar' ? 'auto' : '10px', left: isLang === 'ar' ? '10px' : 'auto' }}>
                            <FiEdit3 className={isLang === 'ar' ? 'ms-1' : 'me-1'} />
                            <small className='my-0' style={{ fontWeight: '500' }}>
                              {isLang === 'ar' ? 'تعديـل' : 'Edit'}
                            </small>
                          </div>
                          :
                          <div className="personal-info-edit position-absolute top-0 secondColor" onClick={handleShowAdd} style={{ cursor: 'pointer', whiteSpace: 'nowrap', right: isLang === 'ar' ? 'auto' : '10px', left: isLang === 'ar' ? '10px' : 'auto' }}>
                            <BiMessageRoundedAdd className={isLang === 'ar' ? 'ms-1' : 'me-1'} />
                            <small className='my-0' style={{ fontWeight: '500' }}>
                              {isLang === 'ar' ? 'إضـافـة' : 'Add'}
                            </small>
                          </div>
                        }

                      </div>

                    </div>
                  ))}

                </div>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="doc-info bg-light shadow-sm rounded-3 p-2 h-100">
                <h6 className='mb-sm-3 mb-4 fw-bold color-red'>{isLang === 'ar' ? 'التخصصـات الطبيـة' : 'Medical Specialties'}</h6>
                <div className="row gx-sm-4 gx-0 gy-sm-0 gy-4 d-flex justify-content-sm-start justify-content-center">
                  {/* <div className="col-sm-6">
                    <div className="price position-relative">
                      <h6 className='mb-3'>
                        {isLang === 'ar' ? 'المجالات الطبيـة' : 'Medical Fields'}
                      </h6>

                      {fetchDoctorMedicalFields.map((field, i) => (
                        <h6 key={i} className='mb-2 color-red'>{field.MedicalFieldName}</h6>
                      ))}

                      <Link to={`../doctorfields/${id}`} className="personal-info-edit position-absolute top-0  secondColor" style={{ cursor: 'pointer', whiteSpace: 'nowrap', right: isLang === 'ar' ? 'auto' : '10px', left: isLang === 'ar' ? '10px' : 'auto' }}>
                        <FiEdit3 className={isLang === 'ar' ? 'ms-1' : 'me-1'} />
                        <small className='my-0' style={{ fontWeight: '500' }}>
                          {isLang === 'ar' ? 'تعديـل' : 'Edit'}
                        </small>
                      </Link>
                    </div>
                  </div> */}
                  <div className="col-12">
                    <div className="price position-relative">
                      <h6 className='mb-3 '>
                        {isLang === 'ar' ? 'الأقسـام' : 'Categories'}
                      </h6>

                      {fetchDoctorAnimalCategories?.map((cate, i) => (
                        <h6 key={i} className='mb-2 color-red'>{cate.AnimalCategoryName}</h6>
                      ))}

                      <Link to={`../doctorCategory/${id}`} className="personal-info-edit position-absolute top-0 secondColor" style={{ cursor: 'pointer', whiteSpace: 'nowrap', right: isLang === 'ar' ? 'auto' : '10px', left: isLang === 'ar' ? '10px' : 'auto' }}>
                        <FiEdit3 className={isLang === 'ar' ? 'ms-1' : 'me-1'} />
                        <small className='my-0' style={{ fontWeight: '500' }}>
                          {isLang === 'ar' ? 'تعديـل' : 'Edit'}
                        </small>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pe-2 ">
              <Component.DoctorDocuments DoctorDocument={DoctorDocument} id={id} />
            </div>
          </div>
        </div>
        :
        <Loader />
      }


    </>
  )
}

import React, { useEffect, useState } from 'react';
// import doctor from '../../../assets/Images/doctor/doctor.png';
// import license from '../../../assets/Images/doctor/license.png';
import { FiEdit3 } from 'react-icons/fi';
import { BiMessageRoundedAdd } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { apiheader } from '../../../utils/fetchData';
import $ from 'jquery'
import Loader from '../../../Components/Shared/Loader/Loader';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import oops from '../../../assets/Images/doctor/Z.jfif';


export default function DoctorProfile() {

  let {id} = useParams();
  const apiDoctoProfile = `https://bytrh.com/api/admin/doctors/profile/${id}`;

  const [fetchDoctor, setFetchDoctor] = useState([]);
  const [fetchDoctorLicense, setFetchDoctorLicense] = useState([]);
  const [fetchDoctorMedicalFields, setFetchDoctorMedicalFields] = useState([]);
  const [fetchDoctorAnimalCategories, setFetchDoctorAnimalCategories] = useState([]);
  const [fetchDoctorPricing, setFetchDoctorPricing] = useState([]);

  const [loading, setLoading] = useState(false);

  async function getDoctorData() {
    setLoading(true);
    await axios.get(apiDoctoProfile,  apiheader )
      .then(res => {
        if (res.status === 200 && res.request.readyState === 4) {
          setFetchDoctor(res.data.Response);
          setFetchDoctorLicense(res.data.Response.DoctorLicense);
          setFetchDoctorPricing(res.data.Response.DoctorPricing);
          setFetchDoctorAnimalCategories(res.data.Response.AnimalCategories);
          setFetchDoctorMedicalFields(res.data.Response.MedicalFields);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  useEffect(() => {
    getDoctorData();
  }, [])
  

  useEffect(() => {
    if(loading) {
      $('body').addClass('d-none');
      $('body').removeClass('d-block')
    }
    $('body').addClass('d-block');
    $('body').removeClass('d-none')
  }, [loading]);


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

    // e.preventDefault();
    setLoadingRemove(true);
      let { data } = await axios({
        method: 'get',
        url: `https://bytrh.com/api/admin/doctors/pricing/remove/${IDDoctorPricing}`,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });

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




  return (
    <>

    {!loading ?
      <div className="container-fluid py-2">

        <div className="row gx-lg-4 gx-0 gy-lg-0 gy-4 d-flex justify-content-lg-start justify-content-center mb-4">
          
          <div className="col-lg-7">
            <div className="doc-info bg-light shadow-sm rounded-3 p-2 h-100">
              <div className="row gx-md-3 gx-2 gy-0 d-flex align-items-center">
                <div className="col-4">
                  <div className="img-doc">
                    <img src={fetchDoctor.DoctorPicture} className='img-fluid d-block' loading='lazy' alt="doctor" />
                  </div>
                </div>
                <div className="col-8">
                  <div className="personal-info position-relative">

                    <small className='my-0 text-black-50' style={{fontWeight: '500'}}>Name:</small>
                    <h6 className='mb-2 text-black' style={{fontWeight: '700' , wordWrap:  'break-word'}}>{fetchDoctor.DoctorName}</h6>

                    <small className='my-0 text-black-50' style={{fontWeight: '500'}}>Mobile Number:</small>
                    <h6 className='mb-2 text-black' style={{fontWeight: '700' , wordWrap: 'break-word'}}>{fetchDoctor.DoctorPhone}</h6>

                    <small className='my-0 text-black-50' style={{fontWeight: '500'}}>Email:</small>
                    <h6 className='mb-2 mb-lg-3 text-black' style={{fontWeight: '700' , wordWrap: 'break-word'}}>{fetchDoctor.DoctorEmail}</h6>

                    <small className='my-0 text-decoration-underline color-red' style={{fontWeight: '500' , cursor: 'pointer'}}>Change Password</small>
                        
                    <Link to={`../editDoctor/${id}`} className="personal-info-edit position-absolute top-0 end-0 color-red" style={{cursor: 'pointer' , whiteSpace: 'nowrap'}}>
                        <FiEdit3 className='me-1' />
                        <small className='my-0' style={{fontWeight: '500'}}>Edit</small>
                    </Link>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="license bg-light shadow-sm rounded-3 p-2 h-100">
              <h6 className='mb-2 fw-bold'>Profission License</h6>
              <img src={fetchDoctorLicense.DoctorDocumentPath} className='img-fluid d-block' loading='lazy' alt="license" />
              <div className="d-flex mt-2">
                <small className='my-0 text-black-50 me-1' style={{fontWeight: '500'}}>Expire Date: </small>
                <h6 className='my-0 text-black' style={{fontWeight: '700' , wordWrap: 'break-word'}}>{fetchDoctorLicense.DoctorDocumentExpireDate}</h6>
              </div>
            </div>
          </div>

        </div>

        <div className="row gx-xl-4 gx-0 gy-xl-0 gy-4 d-flex justify-content-xl-start justify-content-center">

          <div className="col-xl-7">
            <div className="doc-info bg-light shadow-sm rounded-3 p-2 h-100">
              <h6 className='mb-sm-3 mb-4 fw-bold'>Services Prices</h6>
              <div className="row gx-sm-4 gx-0 gy-sm-0 gy-4 d-flex justify-content-sm-start justify-content-center">

                {fetchDoctorPricing.map((price , i) => (
                  <div key={i} className="col-sm-6">

                    {price.IDDoctorPricing ?
                        <>
                          <Modal style={{zIndex: '9999999999'}} show={showEdit} onHide={handleCloseEdit}>
                              <Modal.Header closeButton>
                                  <Modal.Title className='text-center w-100 text-primary'>
                                      <h5 className='mb-0'>Edit Price</h5>
                                  </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                  <form onSubmit={registerEditForm}>

                                      <div className="group-add">
                                        <label className="fs-6 " htmlFor="AmountEdit">Amount</label>
                                        <div className="input-group">
                                          <input value={amountEdit} onChange={(e) => setAmountEdit(e.target.value)} type="number" className='bg-transparent form-control  mx-auto py-2 w-100' required name="AmountEdit" id="AmountEdit" />
                                        </div>
                                      </div>

                                      <div className="group-add">
                                        <label className="fs-6 " htmlFor="DoctorServiceLevelEdit">Doctor Service Level / in minutes</label>
                                        <div className="input-group">
                                          <input value={doctorServiceLevelEdit} onChange={(e) => setDoctorServiceLevelEdit(e.target.value)} type="number" className='bg-transparent form-control mx-auto py-2 w-100' required name="DoctorServiceLevelEdit" id="DoctorServiceLevelEdit" />
                                        </div>
                                      </div>

                                      {messageEdit.length > 0 ? <p id="alertEdit" className={`alert ${apiCodeEdit === true ? 'alert-success' : 'alert-danger'} fs-6 py-2 mb-0 mt-3 w-50 text-center mx-auto`}>{messageEdit}</p> : ''}

                                      <div className="submitAdd-buttons mt-4 d-flex justify-content-center align-items-center">
                                          <Button type='submit' className="btn btn-primary py-2 px-3 me-3">{loadingEdit ? <i className="fa fa-spinner fa-spin text-white fs-4"></i> : 'Save'}</Button>
                                          {/* <Component.ButtonBase title={"Save"} bg={"primary"}    /> */}
                                          <Button className="btn btn-primary p-2 me-4" onClick={handleCloseEdit}>Cancel</Button>
                                      </div>

                                  </form>
                              </Modal.Body>
                          </Modal>

                          <Modal style={{zIndex: '9999999999'}} show={showRemove} onHide={handleCloseRemove}>
                              <Modal.Header closeButton>
                                  <Modal.Title className='text-center w-100 text-warning'>
                                      <h5 className='mb-0'>Warning Remove..</h5>
                                  </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                  <img src={oops} className='w-50 d-block mx-auto' alt="oops" />
                              </Modal.Body>
                              {messageRemove.length > 0 ? <p id="alertRemove" className={`alert ${apiCodeRemove === true ? 'alert-success' : 'alert-danger'} fs-6 py-2 my-2 w-50 text-center mx-auto`}>{messageRemove}</p> : ''}
                              <Modal.Footer className='d-flex justify-content-center align-items-center'>
                                  <Button className='btn btn-primary py-2 text-capitalize me-2' onClick={() => {
                                        removeConfirm()
                                  }}>
                                      {loadingRemove ? <i className="fa fa-spinner fa-spin text-white fs-4"></i> : 'Confirm'}
                                  </Button>
                                  <Button className='btn btn-primary py-2 px-3 text-capitalize' onClick={() => {
                                        handleCloseRemove();
                                    }}>
                                      Cancel
                                  </Button>
                              </Modal.Footer>
                          </Modal>
                        </>
                        :
                        <Modal style={{zIndex: '9999999999'}} show={showAdd} onHide={handleCloseAdd}>
                            <Modal.Header closeButton>
                                <Modal.Title className='text-center w-100 text-primary'>
                                    <h5 className='mb-0'>Add Price</h5>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form onSubmit={registerAddForm}>

                                      <div className="group-add">
                                        <label className="fs-6 " htmlFor="Amount">Amount</label>
                                        <div className="input-group">
                                          <input onChange={getDoctorAddData} type="number" className='bg-transparent form-control  mx-auto py-2 w-100' required placeholder='enter an amount..' name="Amount" id="Amount" />
                                        </div>
                                      </div>

                                      <div className="group-add">
                                        <label className="fs-6 " htmlFor="DoctorServiceLevel">Doctor Service Level / in minutes</label>
                                        <div className="input-group">
                                          <input onChange={getDoctorAddData} type="number" className='bg-transparent form-control mx-auto py-2 w-100' required placeholder='enter a level in minutes..' name="DoctorServiceLevel" id="DoctorServiceLevel" />
                                        </div>
                                      </div>

                                      <div className="group-add">
                                        <label className="fs-6 " htmlFor="DoctorPricingService">Service</label>
                                        <div className="input-group">
                                          <select onChange={getDoctorAddData} className='w-100 bg-transparent mx-auto py-2 px-2' required name="DoctorPricingService" id="DoctorPricingService">
                                            <option>choose a service</option>
                                            <option value='CONSULT' >CONSULT</option>
                                            <option value='URGENT_CONSULT' >URGENT_CONSULT</option>
                                          </select>
                                        </div>
                                      </div>
                                      
                                  {messageAdd.length > 0 ? <p id="alertAdd" className={`alert ${apiCodeAdd === true ? 'alert-success' : 'alert-danger'} fs-6 py-2 mb-0 mt-3 w-50 text-center mx-auto`}>{messageAdd}</p> : ''}

                                  <div className="submitAdd-buttons mt-4 d-flex justify-content-center align-items-center">
                                    <Button type='submit' className="btn btn-primary py-2 px-3 me-3">{loadingAdd ? <i className="fa fa-spinner fa-spin text-white fs-4"></i> : 'Save'}</Button>
                                    {/* <Component.ButtonBase title={"Save"} bg={"primary"}    /> */}
                                    <Button className="btn btn-primary p-2 me-4" onClick={handleCloseAdd}>Cancel</Button>
                                  </div>

                                </form>
                            </Modal.Body>
                            
                        </Modal>
                    }

                    

                    <div className="price position-relative">
                      <h6 className='mb-3'>{price.DoctorPricingService}</h6>
                      <div className="service-level d-flex justify-content-between mb-2">
                        <h6 className='mb-1'>Service Level <span className='text-black-50' style={{fontSize: '12px'}}>(start from)</span> :</h6>
                        <h6 className='mb-0 fw-bold pe-2 color-red'>{price.DoctorServiceLevel} SAR</h6>
                      </div>
                      <div className="service-level d-flex justify-content-between">
                        <h6 className='mb-1'>Amount :</h6>
                        <h6 className='mb-0 fw-bold pe-2 color-red'>{price.DoctorPricing} SAR</h6>
                      </div>

                      {price.IDDoctorPricing ? <button className='btn btn-danger mt-2 d-block mx-sm-auto' onClick={() => {
                        handleShowRemove();
                        setIDDoctorPricing(price.IDDoctorPricing)
                      }}>Remove Price</button> : ''}

                      {price.IDDoctorPricing ? 
                        <div className="personal-info-edit position-absolute top-0 color-red" onClick={() => {
                          handleShowEdit();
                          setIDDoctorPricing(price.IDDoctorPricing);
                          setAmountEdit(price.DoctorPricing);
                          setDoctorServiceLevelEdit(price.DoctorServiceLevel);
                        }} style={{cursor: 'pointer' , whiteSpace: 'nowrap' , right: '10px'}}>
                          <FiEdit3 className='me-1' />
                          <small className='my-0' style={{fontWeight: '500'}}>Edit</small>
                        </div>
                        :
                        <div className="personal-info-edit position-absolute top-0 color-red" onClick={handleShowAdd} style={{cursor: 'pointer' , whiteSpace: 'nowrap' , right: '10px'}}>
                          <BiMessageRoundedAdd className='me-1' />
                          <small className='my-0' style={{fontWeight: '500'}}>Add</small>
                        </div>
                      }

                    </div>

                  </div>
                ))}

              </div>
            </div>
          </div>

          <div className="col-xl-5">
            <div className="doc-info bg-light shadow-sm rounded-3 p-2 h-100">
              <h6 className='mb-sm-3 mb-4 fw-bold'>Medical Specialties</h6>
              <div className="row gx-sm-4 gx-0 gy-sm-0 gy-4 d-flex justify-content-sm-start justify-content-center">
                <div className="col-sm-6">
                  <div className="price position-relative">
                    <h6 className='mb-3'>Medical Fields</h6>

                    {fetchDoctorMedicalFields.map((field , i) => (
                        <h6 key={i} className='mb-2 color-red'>{field.MedicalFieldName}</h6>
                    ))}

                    <Link to={`../doctorfields/${id}`} className="personal-info-edit position-absolute top-0 color-red" style={{cursor: 'pointer' , whiteSpace: 'nowrap' , right: '10px'}}>
                        <FiEdit3 className='me-1' />
                        <small className='my-0' style={{fontWeight: '500'}}>Edit</small>
                    </Link>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="price position-relative">
                    <h6 className='mb-3'>Categories</h6>
                    
                    {fetchDoctorAnimalCategories.map((cate , i) => (
                        <h6 key={i} className='mb-2 color-red'>{cate.AnimalCategoryName}</h6>
                    ))}

                    <Link to={`../doctorCategory/${id}`} className="personal-info-edit position-absolute top-0 color-red" style={{cursor: 'pointer' , whiteSpace: 'nowrap' , right: '10px'}}>
                        <FiEdit3 className='me-1' />
                        <small className='my-0' style={{fontWeight: '500'}}>Edit</small>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      :
      <Loader />
    }
      
    </>
  )
}

import React, { useRef, useState , useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Select from "react-select";
import { Button, Container } from 'react-bootstrap';
import Component from '../../../constants/Component';
import $ from 'jquery';
import { VendersContext } from '../../../context/Store';
import CircularProgress from '@mui/material/CircularProgress';
// import { apiheader } from './../../../utils/fetchData';

function AddDoctorHours() {

  const { id } = useParams();

  const doctorHourService = useRef();
  const doctorHourStatus = useRef();
  const doctorStartHour = useRef();
  const doctorEndHour = useRef();
  const doctorHourDay = useRef();  

  const doctorServiceLevel = useRef();
  const doctorStartBulkHour = useRef();
  const doctorEndBulkHour = useRef();
  const doctorHourBulkService = useRef();


  const daysOptions = [
    { value: "SATURDAY", label: "Saturday", labelAr: 'السبـت' },
    { value: "SUNDAY", label: "Sunday", labelAr: 'الأحــد' },
    { value: "MONDAY", label: "Monday", labelAr: 'الأثنين' },
    { value: "TUESDAY", label: "Tuesday", labelAr: 'الثلاثـاء' },
    { value: "WEDNESDAY", label: "Wednesday", labelAr: 'الأربعــاء' },
    { value: "THURSDAY", label: "Thursday", labelAr: 'الخميــس' },
    { value: "FRIDAY", label: "Friday", labelAr: 'الجمعـة' }
  ];

  const [selectedValues, setSelectedValues] = useState([]);
  const [groupDays, setGroupDays] = useState();
  let daysList = [];

  function handleChange (selectedOptions) {
    setSelectedValues(selectedOptions);
    for (let i of selectedOptions) {
      daysList.push(i.value);
    }
    setGroupDays(daysList);
  };


  const changeStatus = () => {
    if(doctorHourStatus.current.value === 'CLOSE') {
        $('.startHour').attr('disabled' , true);
        $('.endHour').attr('disabled' , true);
        $('.startHour').removeAttr('required');
        $('.endHour').removeAttr('required');
    }
    else {
        $('.startHour').attr('required' , true);
        $('.endHour').attr('required' , true);
        $('.startHour').removeAttr('disabled');
        $('.endHour').removeAttr('disabled');
    }
  }

  // let navigate = useNavigate();

  const [messageSingle, setMessageSingle] = useState('');

  const [loadindSingle, setLoadindSingle] = useState(false);

  const [apiCodeSingle, setApiCodeSingle] = useState(null);

  const [messageBulk, setMessageBulk] = useState('');

  const [loadindBulk, setLoadindBulk] = useState(false);

  const [apiCodeBulk, setApiCodeBulk] = useState(null);


  async function registerAddSingleForm(e) {
    e.preventDefault();
    setLoadindSingle(true);
    let { data } = await axios({
        method: 'post',
        url: `https://bytrh.com/api/admin/doctors/hours/add`,
        data: doctorHourStatus.current.value === 'OPEN' ?
        {
          IDDoctor: id,
          AddType: 'SINGLE',
          DoctorHourService: doctorHourService.current.value,
          DoctorHourDay: doctorHourDay.current.value,
          DoctorHourStatus: doctorHourStatus.current.value,
          DoctorStartHour: doctorStartHour.current.value,
          DoctorEndHour: doctorEndHour.current.value,
        }
        :
        {
          IDDoctor: id,
          AddType: 'SINGLE',
          DoctorHourService: doctorHourService.current.value,
          DoctorHourDay: doctorHourDay.current.value,
          DoctorHourStatus: doctorHourStatus.current.value,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });

    setMessageSingle(data.ApiMsg);
    setLoadindSingle(false);

    if (data.Success === true) {
        setApiCodeSingle(data.Success);
        setTimeout(() => {
          window.history.go(-1);
        }, 1500);
    }
  }


  async function registerAddBulkForm(e) {
    e.preventDefault();
    setLoadindBulk(true);
    let { data } = await axios({
        method: 'post',
        url: `https://bytrh.com/api/admin/doctors/hours/add`,
        data: {
          IDDoctor: id,
          AddType: 'BULK',
          DoctorHourService: doctorHourBulkService.current.value,
          DoctorHourDay: groupDays,
          DoctorServiceLevel: doctorServiceLevel.current.value,
          DoctorStartHour: doctorStartBulkHour.current.value,
          DoctorEndHour: doctorEndBulkHour.current.value,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });

    setMessageBulk(data.ApiMsg);
    setLoadindBulk(false);

    if (data.Success === true) {
        setApiCodeBulk(data.Success);
        setTimeout(() => {
          window.history.go(-1);
        }, 1500);
    }
  }



  let { isLang } = useContext(VendersContext);







  return (
    <Container fluid>
      <div className="app__addprodects">
        {isLang === 'ar' ?
            <Component.SubNav sub__nav={[{ name: isLang === 'ar' ? 'إضـافـة موعـد' : 'Add Time', path: `/doctors/addDoctorHours/${id}`} , { name: isLang === 'ar' ? 'أوقـات العمـل' : 'Doctor Hours', path: `/doctors/doctorHours/${id}` }]} />
            :
            <Component.SubNav sub__nav={[{ name: isLang === 'ar' ? 'أوقـات العمـل' : 'Doctor Hours', path: `/doctors/doctorHours/${id}` }, { name: isLang === 'ar' ? 'إضـافـة موعـد' : 'Add Time', path: `/doctors/addDoctorHours/${id}` }]} />
        }
        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={isLang === 'ar' ? 'إضـافـة موعـد جديد' : 'Add a new Time'} />

          <div className="mt-4">
              <ul className="nav nav-pills mb-4" id="pills-tab" role="tablist">
                <li className="nav-item my-0 me-2" role="presentation">
                  <button className="nav-link mx-0 active" style={{fontWeight: '600' , fontSize: '18px'}} id="pills-single-tab" data-bs-toggle="pill" data-bs-target="#pills-single" type="button" role="tab" aria-controls="pills-single" aria-selected="true">{isLang === 'ar' ? 'يوم فردي' : 'Single'}</button>
                </li>
                <li className="nav-item my-0 ms-2" role="presentation">
                  <button className="nav-link mx-0" style={{fontWeight: '600' , fontSize: '18px'}} id="pills-bulk-tab" data-bs-toggle="pill" data-bs-target="#pills-bulk" type="button" role="tab" aria-controls="pills-bulk" aria-selected="false">{isLang === 'ar' ? 'مجموعة أيام بنفس الموعد' : 'Bulk'}</button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">

                <div className="tab-pane fade show active" id="pills-single" role="tabpanel" aria-labelledby="pills-single-tab" tabIndex="0">
                  <div className="app__addOrder-form">
                    <div className="app__addprodects-form">
                      <form onSubmit={registerAddSingleForm}>
                        <div className="row d-flex justify-content-center justify-content-md-start align-items-center g-4">

                          <div className="col-md-6">
                            <div className="group-add">
                              <label className="fs-5 " htmlFor="service">{isLang === 'ar' ? 'الخدمـة' : 'Service'}</label>
                              <div className="input-group">
                                <select className='w-100 bg-transparent mx-auto py-2 px-2' name="service" id="service" ref={doctorHourService} required>
                                  <option>{isLang === 'ar' ? 'اختر الخدمـة' : 'choose a Service'}</option>
                                  <option value='CONSULT' >{isLang === 'ar' ? 'إستشـارة' : 'Consult'}</option>
                                  <option value='VISIT' >{isLang === 'ar' ? 'زيـارة' : 'Visit'}</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="group-add">
                              <label className="fs-5 " htmlFor="day">{isLang === 'ar' ? 'اليـوم' : 'Day'}</label>
                              <div className="input-group">
                                <select className='w-100 bg-transparent mx-auto py-2 px-2' name="day" id="day" ref={doctorHourDay} required>
                                  <option>{isLang === 'ar' ? 'اختر اليوم' : 'choose a Day'}</option>
                                  {daysOptions.map((el , i) => (
                                    <option key={i} value={el.value} >{isLang === 'ar' ? el.labelAr : el.label}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="group-add">
                              <label className="fs-5 " htmlFor="status">{isLang === 'ar' ? 'الحالـة' : 'Status'}</label>
                              <div className="input-group">
                                <select className='w-100 bg-transparent mx-auto py-2 px-2' name="status" id="status" onChange={changeStatus} ref={doctorHourStatus} required>
                                  <option>{isLang === 'ar' ? 'اختر الحالـة' : 'choose a Status'}</option>
                                  <option value='OPEN' >{isLang === 'ar' ? 'مفتـوح' : 'Open'}</option>
                                  <option value='CLOSE' >{isLang === 'ar' ? 'مغلـق' : 'Close'}</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="group-add">
                              <label className="fs-5 " htmlFor="StartHour">{isLang === 'ar' ? 'وقت البدء' : 'Start'}</label>
                              <div className="input-group">
                                <input type="time" className='bg-transparent form-control mx-auto py-2 w-100 startHour' name="StartHour" id="StartHour" ref={doctorStartHour} required />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="group-add">
                              <label className="fs-5 " htmlFor="EndHour">{isLang === 'ar' ? 'وقت الإنتهـاء' : 'End'}</label>
                              <div className="input-group">
                                <input type="time" className='bg-transparent form-control mx-auto py-2 w-100 endHour' name="EndHour" id="EndHour" ref={doctorEndHour} required />
                              </div>
                            </div>
                          </div>

                        </div>

                        {messageSingle.length > 0 ? <p id="alertSave" className={`alert ${apiCodeSingle === true ? 'alert-success' : 'alert-danger'} fs-6 py-2 mb-0 mt-3 w-50 text-center mx-auto`}>{messageSingle}</p> : ''}

                          <div className='d-flex justify-content-center align-content-center gap-3 mt-4'>
                              <div className='baseBtn'>
                                  <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                      {loadindSingle ? <CircularProgress size={27} style={{color: '#fff'}} /> : 
                                        isLang === 'ar' ? 'حفـظ' : 'Save'
                                      }
                                  </Button>
                              </div>

                              <div className='baseBtn'>
                                  <Link to={`/dashboard/doctors/doctorHours/${id}`}>
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

                <div className="tab-pane fade" id="pills-bulk" role="tabpanel" aria-labelledby="pills-bulk-tab" tabIndex="0">
                  <div className="app__addOrder-form">
                    <div className="app__addprodects-form">
                      <form onSubmit={registerAddBulkForm}>
                        <div className="row d-flex justify-content-center justify-content-md-start align-items-center g-4">

                          <div className="col-md-6">
                            <div className="group-add">
                              <label className="fs-5 " htmlFor="serviceBulk">{isLang === 'ar' ? 'الخدمـة' : 'Service'}</label>
                              <div className="input-group">
                                <select className='w-100 bg-transparent mx-auto py-2 px-2' name="serviceBulk" id="serviceBulk" ref={doctorHourBulkService} required>
                                  <option>{isLang === 'ar' ? 'اختر الخدمـة' : 'choose a Service'}</option>
                                  <option value='CONSULT' >{isLang === 'ar' ? 'إستشـارة' : 'Consult'}</option>
                                  <option value='VISIT' >{isLang === 'ar' ? 'زيـارة' : 'Visit'}</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="group-add">
                              <label className="fs-5 " htmlFor="days">{isLang === 'ar' ? 'الأيـام' : 'Days'}</label>
                              <div className="input-group">
                                <Select
                                  defaultValue={[daysOptions[1], daysOptions[2]]}
                                  isMulti
                                  name="days"
                                  id="days"
                                  options={daysOptions}
                                  className="basic-multi-select w-100 py-0"
                                  classNamePrefix="select"
                                  placeholder={isLang === 'ar' ? 'اختر مجموعة من الأيام' : 'choose list of days..'}
                                  onChange={handleChange}
                                  value={selectedValues}
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="group-add">
                              <label className="fs-5 " htmlFor="serviceLevel">
                                {isLang === 'ar' ? 'مستوي الخدمة بالدقائق ( بين الخدمات )' : 'Service Level In Minutes (Between Slots)'}
                              </label>
                              <div className="input-group">
                                <input type="number" className='bg-transparent form-control mx-auto py-2 w-100' name="serviceLevel" id="serviceLevel" ref={doctorServiceLevel} required />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="group-add">
                              <label className="fs-5 " htmlFor="StartBulkHour">{isLang === 'ar' ? 'وقت البدء' : 'Start'}</label>
                              <div className="input-group">
                                <input type="time" className='bg-transparent form-control mx-auto py-2 w-100 startBulkHour' name="StartBulkHour" id="StartBulkHour" ref={doctorStartBulkHour} required />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="group-add">
                              <label className="fs-5 " htmlFor="EndBulkHour">{isLang === 'ar' ? 'وقت الإنتهـاء' : 'End'}</label>
                              <div className="input-group">
                                <input type="time" className='bg-transparent form-control mx-auto py-2 w-100 endBulkHour' name="EndBulkHour" id="EndBulkHour" ref={doctorEndBulkHour} required />
                              </div>
                            </div>
                          </div>

                        </div>

                        {messageBulk.length > 0 ? <p id="alertSave" className={`alert ${apiCodeBulk === true ? 'alert-success' : 'alert-danger'} fs-6 py-2 mb-0 mt-3 w-50 text-center mx-auto`}>{messageBulk}</p> : ''}

                          <div className='d-flex justify-content-center align-content-center gap-3 mt-4'>
                              <div className='baseBtn'>
                                  <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                      {loadindBulk ? <CircularProgress size={27} style={{color: '#fff'}} />: 
                                        isLang === 'ar' ? 'حفـظ' : 'Save'
                                      }
                                  </Button>
                              </div>

                              <div className='baseBtn'>
                                  <Link to={`/dashboard/doctors/doctorHours/${id}`}>
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
          </div>

        </div>
      </div >
    </Container >
  )
}

export default AddDoctorHours
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';
import Component from '../../../constants/Component';
import $ from 'jquery';
// import { apiheader } from './../../../utils/fetchData';


function AddDoctorHours() {

  const { id } = useParams();

  const doctorHourStatus = useRef();
  const doctorStartHour = useRef();
  const doctorEndHour = useRef();
  const doctorHourDay = useRef();  


  const doctorServiceLevel = useRef();
  const doctorHourDays = useRef([]);


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

  const [message, setMessage] = useState('');

  const [loadind, setLoadind] = useState(false);

  const [apiCode, setApiCode] = useState(null);


  async function registerAddSingleForm(e) {
    e.preventDefault();
    setLoadind(true);
    let { data } = await axios({
        method: 'post',
        url: `https://bytrh.com/api/admin/doctors/hours/add`,
        data: doctorHourStatus.current.value === 'OPEN' ?
        {
          IDDoctor: id,
          AddType: 'SINGLE',
          DoctorHourService: 'CONSULT',
          DoctorHourDay: doctorHourDay.current.value,
          DoctorHourStatus: doctorHourStatus.current.value,
          DoctorStartHour: doctorStartHour.current.value,
          DoctorEndHour: doctorEndHour.current.value,
        }
        :
        {
          IDDoctor: id,
          AddType: 'SINGLE',
          DoctorHourService: 'CONSULT',
          DoctorHourDay: doctorHourDay.current.value,
          DoctorHourStatus: doctorHourStatus.current.value,
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
          window.history.go(-1);
        }, 1500);
    }
  }

  return (
    <Container fluid>
      <div className="app__addprodects">
        <Component.SubNav sub__nav={[{ name: "Doctor Hours", path: `/doctors/doctorHours/${id}` }, { name: "Add Time", path: `/doctors/addDoctorHours/${id}` }]} />
        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={'Add Time'} />
          <div className="app__addOrder-form">
            <div className="app__addprodects-form">
              <form onSubmit={registerAddSingleForm}>
                <div className="row d-flex justify-content-center justify-content-md-start align-items-center g-4">

                  <div className="col-md-6">
                    <div className="group-add">
                      <label className="fs-5 " htmlFor="day">Day</label>
                      <div className="input-group">
                        <select className='w-100 bg-transparent mx-auto py-2 px-2' name="day" id="day" ref={doctorHourDay} required>
                          <option>choose a day</option>
                          <option value='SATURDAY' >Saturday</option>
                          <option value='SUNDAY' >Sunday</option>
                          <option value='MONDAY' >Monday</option>
                          <option value='TUESDAY' >Tuesday</option>
                          <option value='WEDNESDAY' >Wednesday</option>
                          <option value='THURSDAY' >Thursday</option>
                          <option value='FRIDAY' >Friday</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="group-add">
                      <label className="fs-5 " htmlFor="day">Status</label>
                      <div className="input-group">
                        <select className='w-100 bg-transparent mx-auto py-2 px-2' name="status" id="status" onChange={changeStatus} ref={doctorHourStatus} required>
                          <option>choose the status</option>
                          <option value='OPEN' >Open</option>
                          <option value='CLOSE' >Close</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="group-add">
                      <label className="fs-5 " htmlFor="StartHour">Start</label>
                      <div className="input-group">
                        <input type="time" className='bg-transparent form-control mx-auto py-2 w-100 startHour' name="StartHour" id="StartHour" ref={doctorStartHour} required />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="group-add">
                      <label className="fs-5 " htmlFor="EndHour">End</label>
                      <div className="input-group">
                        <input type="time" className='bg-transparent form-control mx-auto py-2 w-100 endHour' name="EndHour" id="EndHour" ref={doctorEndHour} required />
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
                              {loadind ? <i className="fa fa-spinner fa-spin text-white fs-4"></i> : 'Save'}
                          </Button>
                      </div>

                      <div className='baseBtn'>
                          <Link to={`/doctors/doctorHours/${id}`}>
                              <Button  variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                  Cancel
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

export default AddDoctorHours
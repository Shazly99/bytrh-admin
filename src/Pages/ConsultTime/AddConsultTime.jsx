import React, { useState , useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';
import Component from '../../constants/Component';
import { VendersContext } from '../../context/Store';
import CircularProgress from '@mui/material/CircularProgress';
import translateConsultTimes from './translateConsultTimes';


function AddConsultTime() {

//   let navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [loadind, setLoadind] = useState(false);

  const [apiCode, setApiCode] = useState(null);

  const timeRef = useRef();


  async function registerAddForm(e) { 
    e.preventDefault();
    setLoadind(true);
    let { data } = await axios({
    method: 'post',
    url: `https://bytrh.com/api/admin/consult/timevalues/add`,
    data: { 
        TimeValue: timeRef.current.value
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
    //   navigate('/doctors');
        window.history.go(-1);
    }, 1500);

    }
  }


  let { isLang } = useContext(VendersContext);



  return (
    <Container fluid>
      <div className="app__addprodects">
          {isLang === 'ar' ?
            <Component.SubNav sub__nav={[{ name: translateConsultTimes['ar']?.subNav , path: '/consultTime/add' } , { name: translateConsultTimes['ar']?.subNavList , path: '/consultTime' }]} />
            :
            <Component.SubNav sub__nav={[{ name: translateConsultTimes['en']?.subNavList, path: '/consultTime' }, { name: translateConsultTimes['en']?.subNav, path: '/consultTime/add' }]} />
          }
        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={translateConsultTimes[isLang]?.labelAddPage} />
          <div className="app__addOrder-form">
            <div className="app__addprodects-form">

              <form onSubmit={registerAddForm}>

                <div className="row d-flex justify-content-center justify-content-md-start align-items-center g-4">

                  <div className="col-md-6">
                    <div className="group-add">
                      <label className="fs-5 " htmlFor="timeValue">{translateConsultTimes[isLang]?.labelAddTime}</label>
                      <div className="input-group">
                        <input type="number" ref={timeRef} className='bg-transparent form-control  mx-auto py-2 w-100' required name="timeValue" id="timeValue" />
                      </div>
                    </div>
                  </div>
                </div>

                {message.length > 0 ? <p id="alertSave" className={`alert ${apiCode === true ? 'alert-success' : 'alert-danger'} fs-6 py-2 mb-0 mt-3 w-50 text-center mx-auto`}>{message}</p> : ''}

                  <div className='d-flex justify-content-center align-content-center gap-3 mt-4'>
                      <div className='baseBtn'>
                          <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                              {loadind ? <CircularProgress size={27} style={{color: '#fff'}} />: 
                                translateConsultTimes[isLang]?.SaveBTN
                              }
                          </Button>
                      </div>

                      <div className='baseBtn'>
                          <Link to={'/consultTime'}>
                              <Button  variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                  {translateConsultTimes[isLang]?.cancelBTN}
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

export default AddConsultTime
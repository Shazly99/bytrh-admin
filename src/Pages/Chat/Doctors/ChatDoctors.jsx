import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Outlet, useParams } from 'react-router-dom';
import Img from '../../../assets/Img';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import { ChatContext } from '../../../context/ChatStore';
import '../chat.scss';
import { apiheader, PostData } from './../../../utils/fetchData';
import _ from 'lodash';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
const ChatDoctors = () => {
  const { id } = useParams();
  let { setmassSend, chatEnd, userReplied, docChatSupport, setDocChatSupport } = useContext(ChatContext);

  const clientlist = _.debounce(async () => {
    let { data } = await PostData(`https://bytrh.com/api/admin/chat/doctor/list`, {}, apiheader)
    console.log(data.Response);
    setDocChatSupport(data.Response.DoctorChatSupport)
  }, 1000)

  const adminSendMess = async (value) => {
    await PostData(`https://bytrh.com/api/admin/chat/doctor/reply`,
      {
        IDDoctorChatSupport: id,
        ChatSupportMessage: value,
        ChatSupportType: 'TEXT'
      }
      , apiheader).then((res) => {
        if (res.data.Success === true) {
          console.log('setmassSend true');
          setmassSend(true) 
        } 
      });
  }
  useEffect(() => {
    clientlist()
  }, [id])


  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const handeAdminMess = () => {
    const value = inputRef.current.value;
    // console.log(value);
    // TODO: Send the value to the server
    adminSendMess(value)
    setInputValue('');
    inputRef.current.value = '';
  };

  // send image
  const [selectedFile, setSelectedFile] = useState(null);
  async function handleFileSelect(event) {
    console.log(event.target.files);
    setSelectedFile();
    if (selectedFile !== null) {
      let data = await PostData(`https://bytrh.com/api/admin/chat/doctor/reply`,
        {
          IDDoctorChatSupport: id,
          ChatSupportMessage: event.target.files[0],
          ChatSupportType: 'IMAGE'
        }
        , apiheader).then((res) => {
          if (res.data.Success === true) {
            console.log('setmassSend true');
            setmassSend(true) 
          } 
        });
      console.log(data);
    }
  }

  useEffect(() => {
    clientlist()
  }, [id, chatEnd])

  return (
    <div className='app__chat'>
      <Row className="app__chat__container ">
        <Component.DoctorList docChatSupport={docChatSupport} />
        <Col xl={8} lg={8} md={6} sm={12} className='app__chat_messages '>
          <div className='shadow app__chat_list-card'>
            <div className={`app__Live_chat chat-body  ${id ? '' : 'bg-dark'}`} style={{ background: '#d9d9d998' }}>
              {
                id ?
                  <Outlet></Outlet> :
                  <div className="empty_chat   w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                    <img src={Img.empty_chat} className='w-50' />
                    <h2 className={` ${id ? '' : 'text-light'}`}>
                      Welcome, <span style={{ color: '#FAAA40' }}>admin!</span>
                    </h2>
                    <h4 className={` ${id ? 'text-light' : 'text-light text-light'}`}>Please select a chat to Start messaging.</h4>
                  </div>
              }
            </div>
            {
              userReplied === 0 ?
                <>
                  {
                    chatEnd === 'ENDED' ?
                      <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">Chat has been closed!</Alert>
                      </Stack> :
                      <>
                        {
                          id ?
                            <div className="app__send">
                              <input type="text" className="form-control" ref={inputRef} />
                              <button className='btn shadow-lg bgChatBtn' onClick={handeAdminMess} >
                                <Icons.send color='#fff' size={20} />
                              </button>

                              <input type="file" id="file-input" accept="image/*" onChange={handleFileSelect} style={{ display: 'none' }} />
                              <label htmlFor="file-input" className="btn btn-info bgChatBtn shadow" style={{ pointerEvents: 'all' }}>
                                <Icons.imageUpload color='#fff' size={20} />
                              </label>

                            </div>
                            :
                            ''
                        }
                      </>
                  }
                </> :
                <>
                  {
                    id ?
                      <div className="app__send d-flex justify-content-center align-items-center">
                        <h6> Another user already replied</h6>
                      </div> : ''
                  }
                </>
            }


          </div>

        </Col >

      </Row >
    </div >
  )
}

export default ChatDoctors
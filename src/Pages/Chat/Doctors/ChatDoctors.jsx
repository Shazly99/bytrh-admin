import { Player } from '@lottiefiles/react-lottie-player';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import _ from 'lodash';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { Outlet, useParams } from 'react-router-dom';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import { ChatContext } from '../../../context/ChatStore';
import '../chat.scss';
import { PostData, apiheader } from './../../../utils/fetchData';
const ChatDoctors = () => {
  const { id } = useParams();
  let { setmassSend, chatEnd, userReplied, docChatSupport, setDocChatSupport } = useContext(ChatContext);

  const clientlist = _.debounce(async () => {
    let { data } = await PostData(`https://bytrh.com/api/admin/chat/doctor/list`, {}, apiheader)
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
          setmassSend(true)
        }
      });
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    clientlist()
  }, [id])


  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const handeAdminMess = () => {
    const value = inputRef.current.value;
    // TODO: Send the value to the server
    adminSendMess(value)
    setInputValue('');
    inputRef.current.value = '';
  };

  // send image
  const [selectedFile, setSelectedFile] = useState('');
  async function handleFileSelect(event) {
    setSelectedFile();
    let { data } = await PostData(`https://bytrh.com/api/admin/chat/doctor/reply`,
      {
        IDDoctorChatSupport: id,
        ChatSupportMessage: event.target.files[0],
        ChatSupportType: 'IMAGE'
      }
      , apiheader)

    if (data.Success === false) {
      toast.error(data.ApiMsg)
    }

  }

  useEffect(() => {
    clientlist()
    window.scrollTo(0, 0);
  }, [id, chatEnd])

  return (
    <>

      {
        docChatSupport ?
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
                          <div className="expired-container">
                            <Player
                              className="expired-image w-75"
                              // src="https://assets4.lottiefiles.com/packages/lf20_3vbOcw.json"
                              src="https://assets7.lottiefiles.com/packages/lf20_qwl4gi2d.json"

                              autoplay
                              loop
                            />
                          </div>                   
                           <h2 className={` ${id ? '' : 'text-light'}`}>
                            Welcome, <span className='admin__color'>admin!</span>
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
          : <Component.Loader />
      }
    </>
  )
}

export default ChatDoctors
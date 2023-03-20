import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import _ from 'lodash';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Outlet, useParams } from 'react-router-dom';
import Img from '../../../assets/Img';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import { ChatContext } from '../../../context/ChatStore';
import '../chat.scss';
import { apiheader, PostData } from './../../../utils/fetchData';
import { toast } from 'react-hot-toast';
import { Player } from '@lottiefiles/react-lottie-player';

const ChatClient = () => {
  const { id } = useParams();
  const inputRef = useRef(null);
  let { setmassSend, userReplied, chatEnd, setCChatSupport, cChatSupport } = useContext(ChatContext);
  const [inputValue, setInputValue] = useState('');

  const [clientChatSupport, setClientChatSupport] = useState([])

  const clientlist = _.debounce(async () => {
    let { data } = await PostData(`https://bytrh.com/api/admin/chat/client/list`, {}, apiheader)
     // setClientChatSupport(data.Response.ClientChatSupport)
    setCChatSupport(data.Response.ClientChatSupport)
  }, 1000)

  const adminSendMess = async (value) => {
    let data = await PostData(`https://bytrh.com/api/admin/chat/client/reply`,
      {
        IDClientChatSupport: id,
        ChatSupportMessage: value,
        ChatSupportType: 'TEXT'
      }
      , apiheader).then((res) => {
        if (res.data.Success === true) {
           setmassSend(true)
        }
      });;

   }


  const handeAdminMess = () => {
    const value = inputRef.current.value;
     // TODO: Send the value to the server
    adminSendMess(value)
    setInputValue('');
    inputRef.current.value = '';
  };

  const [selectedFile, setSelectedFile] = useState(null);
  async function handleFileSelect(event) {
     setSelectedFile();
    /*  if (selectedFile !== null) { */
    let { data } = await PostData(`https://bytrh.com/api/admin/chat/client/reply`,
      {
        IDClientChatSupport: id,
        ChatSupportMessage: event.target.files[0],
        ChatSupportType: 'IMAGE'
      }
      , apiheader)
    if (data.Success === false) {
      toast.error(data.ApiMsg)
    }
     // }
  }

  useEffect(() => {
    clientlist()
    window.scrollTo(0, 0);
  }, [id, chatEnd])
  return (
    <>

      {
        cChatSupport ?
          <div className='app__chat'>
            <Row className="app__chat__container ">
              <Component.ClientList cChatSupport={cChatSupport} />
              <Col xl={8} lg={8} md={6} sm={12} className='app__chat_messages '>
                <div className='shadow app__chat_list-card'>
                  <div className={`app__Live_chat chat-body  ${id ? '' : 'bg-dark'}`} style={{ background: 'rgb(217 217 217 / 28%)' }}>
                    {
                      id ?
                        <>
                          <Outlet></Outlet>
                        </>
                        :
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
                            Welcome, <span style={{ color: '#FAAA40' }}>admin!</span>
                          </h2>
                          <h4 className={` ${id ? 'text-center' : 'text-light text-center'}`}>Please select a chat to Start messaging.</h4>
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
          </div > : <Component.Loader/>
      }
    </>
  )
}

export default ChatClient
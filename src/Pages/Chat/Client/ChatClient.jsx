import React, { useContext, useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import '../chat.scss'
import Icons from '../../../constants/Icons';
import Img from '../../../assets/Img';
import Component from '../../../constants/Component';
import { PostData, apiheader, GetData } from './../../../utils/fetchData';
import { Outlet, useParams } from 'react-router-dom';
import { ChatContext } from '../../../context/ChatStore';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const ChatClient = () => {
  const { id } = useParams();
  const inputRef = useRef(null);
  let { userReplied } = useContext(ChatContext);
  const [inputValue, setInputValue] = useState('');

  const [clientChatSupport, setClientChatSupport] = useState([])

  const clientlist = async () => {
    let { data } = await PostData(`https://bytrh.com/api/admin/chat/client/list`, {}, apiheader)
    setClientChatSupport(data.Response.ClientChatSupport)
  }

  const adminSendMess = async (value) => {
    let data = await PostData(`https://bytrh.com/api/admin/chat/client/reply`,
      {
        IDClientChatSupport: id,
        ChatSupportMessage: value,
        ChatSupportType: 'TEXT'
      }
      , apiheader);
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
    if (selectedFile !== null) {
      let data = await PostData(`https://bytrh.com/api/admin/chat/client/reply`,
        {
          IDClientChatSupport: id,
          ChatSupportMessage: event.target.files[0],
          ChatSupportType: 'IMAGE'
        }
        , apiheader);
    }
  }

  const [power, setpower] = useState()
  useEffect(() => {
    setpower(localStorage.getItem('power'));
    clientlist()
  }, [id])
  return (
    <div className='app__chat'>
      <Row className="app__chat__container ">
        <Component.ClientList clientChatSupport={clientChatSupport} />
        <Col xl={8} lg={8} md={6} sm={12} className='app__chat_messages '>
          <div className='shadow app__chat_list-card'>
            <div className={`app__Live_chat chat-body  ${id ? '' : 'bg-dark'}`} style={{ background: '#d9d9d998' }}>
              {
                id ?
                  <>
                    <Outlet></Outlet>
                  </>
                  :
                  <div className="empty_chat   w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                    <img src={Img.empty_chat} className='w-50' />
                    <h2 className={` ${id ? '' : 'text-light'}`}>
                      Welcome, <span style={{ color: '#313bac' }}>admin!</span>
                    </h2>
                    <h4 className={` ${id ? '' : 'text-light'}`}>Please select a chat to Start messaging.</h4>
                  </div>
              }
            </div>
            {
              localStorage.getItem('chatStatus') === 'ENDED' ?
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="error">Chat has been closed!</Alert>
                </Stack>
                :
                <>
                  {
                    userReplied === 0 ?
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
                </>
            }


          </div>

        </Col >

      </Row >
    </div >
  )
}

export default ChatClient
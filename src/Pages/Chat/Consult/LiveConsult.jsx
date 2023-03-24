import { Player } from '@lottiefiles/react-lottie-player';
import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import Img from '../../../assets/Img';
import Component from '../../../constants/Component';
import { GetData } from '../../../utils/fetchData';
import { apiheader } from './../../../utils/fetchData';

const LiveConsult = () => {
  let { id } = useParams()
  const audioRef = useRef(null);

  function handlePlay() {
    audioRef.current.play();

  }

  const [chat, setChat] = useState([])
  const [consultDetails, setconsultDetails] = useState(null)
  const ConsultDetails = async () => {
    await GetData(`${process.env.REACT_APP_API_URL}/admin/consult/chat/details/${id}`, apiheader).then(({ Response }) => {
      setChat(Response.ChatDetails);
      setconsultDetails(Response);
    })
  }
  useEffect(() => {
    ConsultDetails()
    window.scrollTo(0, 0);
    return () => {
      ConsultDetails()
    }
  }, [id])

  return (
    <>
      {
        consultDetails ?
          <div className="app__chat__Consult  ">
            <div className='app__chat'>
              <div >
                <Component.SubNav sub__nav={[{ name: "Consults List", path: '/chat/consult' }, { name: "Consult ", path: `/consult/chat/${id}` }]} />
              </div>
              <div className='app__chat__Consult_details'>
                <Row>
                  <Col xl={4} lg={4} md={4} sm={6} className='client'>
                  {consultDetails?.ClientName &&                  
                    <div className="client_details">
                      <label htmlFor="">Client Name:</label>
                      <span>{consultDetails?.ClientName}</span>
                    </div>
                  }
                    {consultDetails?.ClientPhone&&
                    
                    <div className="client_details">
                      <label htmlFor="">Client Phone :</label>
                      <span>{consultDetails?.ClientPhone}</span>
                    </div>
                    }
                  </Col>
                  <Col xl={4} lg={4} md={4} sm={6} className='doctor'>
                  {consultDetails?.DoctorName&&
                  
                    <div className="client_details">
                      <label htmlFor="">Doctor Name :</label>
                      <span>{consultDetails?.DoctorName}</span>
                    </div>
                  }
                    {
                      consultDetails?.DoctorPhone &&
                      <div className="client_details">
                        <label htmlFor="">Doctor Phone :</label>
                        <span>{consultDetails?.DoctorPhone}</span>
                      </div>
                    }
                  </Col>

                  <Col xl={4} lg={4} md={4} sm={6} className='doctor'>
                    {
                      consultDetails?.ConsultStatus &&
                      <div className="client_details">
                        <label htmlFor="">Consult Status:</label>
                        <span>{consultDetails?.ConsultStatus.charAt(0).toUpperCase() + consultDetails?.ConsultStatus.slice(1).toLowerCase()}</span>
                      </div>
                    }
                    {
                      consultDetails?.ConsultDate &&
                      <div className="client_details">
                        <label htmlFor="">Create Date :</label>
                        <span>{consultDetails?.ConsultDate}</span>
                      </div>
                    }
                  </Col>
                </Row>
              </div>
              <Component.BaseHeader h1={'Consult Details :'} />

              <Row className="app__chat__container ">
                <Col xl={12} lg={12} md={12} sm={12} className='app__chat_messages '>
                  <div className='shadow app__chat_list-card'>
                    <div className={`app__Live_chat chat-body   ${chat.length === 0 ? 'bg-dark' : ''} `} style={{ background: 'rgb(217 217 217 / 28%)' }}>
                      <ScrollToBottom className="message-container">
                        {
                          chat.length === 0 ?
                            <div className="empty_chat   w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                              <div className="expired-container">
                                <Player
                                  className="expired-image w-75"
                                  // src="https://assets4.lottiefiles.com/packages/lf20_3vbOcw.json"
                                  src="https://assets7.lottiefiles.com/packages/lf20_qwl4gi2d.json"
                                  autoplay
                                  loop
                                />
                              </div>                              <h2 className={` ${chat.length === 0 ? 'text-light' : ''}`}>
                                Welcome, <span className='admin__color'>admin!</span>
                              </h2>
                              <h4 className={` ${chat.length === 0 ? 'text-light text-center' : ' text-center'}`}>This Consults Is Empty.</h4>
                            </div>
                            :
                            <>
                              {chat?.map((messageContent, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="message"
                                    id={messageContent.ConsultChatSender === "CLIENT" ? "other" : "you"}
                                  >
                                    <div>
                                      <div className="message-content"  >
                                        {
                                          messageContent.ConsultChatType === "TEXT" &&
                                          <p>{messageContent.ConsultChatMessage}</p>
                                        }
                                        {
                                          messageContent.ConsultChatType === "IMAGE" &&
                                          <img loading="lazy" src={messageContent.ConsultChatMessage} width="100%" className='rounded-3 w-50' />
                                        }
                                        {
                                          messageContent.ConsultChatType === "AUDIO" &&
                                          <audio ref={audioRef} controls>
                                            <source src={messageContent.ConsultChatMessage} type="audio/ogg" />
                                            <source src={messageContent.ConsultChatMessage} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                          </audio>
                                        }
                                      </div>
                                      <div className="message-meta">
                                        <p id="time">{messageContent.CreateDate.split(" ")[0]} {' , '} {messageContent.ConsultChatSender.charAt(0).toUpperCase() + messageContent?.ConsultChatSender?.slice(1).toLowerCase()}</p>
                                        {/* ConsultChatSender */}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                        }

                      </ScrollToBottom>
                    </div>
                  </div>

                </Col >

              </Row >
            </div >
          </div>
          : <Component.Loader />
      }
    </>

  )
}

export default LiveConsult
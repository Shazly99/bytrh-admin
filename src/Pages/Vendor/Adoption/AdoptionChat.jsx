import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import Img from '../../../assets/Img';
import Component from '../../../constants/Component';
import { GetData } from '../../../utils/fetchData';
import { apiheader } from './../../../utils/fetchData';

const AdoptionChat = () => {

  let { id } = useParams()
  const audioRef = useRef(null);

  function handlePlay() {
    audioRef.current.play();
  }

  const [chat, setChat] = useState([])
  const [adoptionDetails, setAdoptionDetails] = useState([])
  const getDetails = async () => {
    await GetData(`${process.env.REACT_APP_API_URL}/admin/adoptions/chat/details/${id}`, apiheader).then(({ Response }) => {
      setAdoptionDetails(Response);
      setChat(Response.ChatDetails);
     })
  }
  useEffect(() => {
    getDetails()
    return () => {
      getDetails()
    }
  }, [id])

  return (
    <>

      {
        Object.keys(adoptionDetails).length > 0 ?
          <Container fluid className="app__chat__Consult  ">
            <div className='app__chat'>
              <div >
                <Component.SubNav sub__nav={[{ name: "Adoption Details", path: `/adoption/details/${adoptionDetails?.IDAdoption}` }, { name: "Chat ", path: `/adoption/chat/${id}` }]} />
              </div>
              <div className='app__chat__Consult_details'>
                <Row>
                  <Col xl={4} lg={4} md={4} sm={6} className='client'>
                    <div className="client_details">
                      <label htmlFor="">Client Name:</label>
                      <span>{adoptionDetails?.ClientName}</span>
                    </div>

                    <div className="client_details">
                      <label htmlFor="">Client Phone :</label>
                      <span>{adoptionDetails?.ClientPhone}</span>
                    </div>
                  </Col>
                  <Col xl={4} lg={4} md={4} sm={6} className='doctor'>
                    <div className="client_details">
                      <label htmlFor="">Adopter Name :</label>
                      <span>{adoptionDetails?.AdopterName}</span>
                    </div>

                    <div className="client_details">
                      <label htmlFor="">Adopter Phone :</label>
                      <span>{adoptionDetails?.AdopterPhone}</span>
                    </div>
                  </Col>

                  <Col xl={4} lg={4} md={4} sm={6} className='doctor'>
                    <div className="client_details">
                      <label htmlFor="">Chat Status:</label>
                      {/* <span>{adoptionDetails?.AdoptionChatStatus.charAt(0).toUpperCase() + adoptionDetails?.AdoptionChatStatus.slice(1).toLowerCase()}</span> */}
                      <span>{adoptionDetails.AdoptionChatStatus && adoptionDetails.AdoptionChatStatus[0].toUpperCase() + adoptionDetails.AdoptionChatStatus.slice(1).toLowerCase()}</span>
                    </div>

                    {adoptionDetails?.CreateDate !== undefined && adoptionDetails?.CreateDate !== null ?
                      <div className="client_details">
                        <label htmlFor="">Create Date :</label>
                        <span>{adoptionDetails?.CreateDate}</span>
                      </div>
                      :
                      ''
                    }
                    
                  </Col>
                </Row>
              </div>
              <Component.BaseHeader h2={'Chat Details :'} />

              <Row className="app__chat__container ">
                <Col xl={12} lg={12} md={12} sm={12} className='app__chat_messages '>
                  <div className='shadow app__chat_list-card'>
                    <div className={`app__Live_chat chat-body   ${chat.length === 0 ? 'bg-dark' : ''} `} style={{ background: 'rgb(217 217 217 / 28%)' }}>
                      <ScrollToBottom className="message-container">
                        {
                          chat.length === 0 ?
                            <div className="empty_chat   w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                              <img loading="lazy"src={Img.empty_chat} className='w-25' />
                              <h2 className={` ${chat.length === 0 ? 'text-light' : ''}`}>
                                Welcome, <span style={{ color: '#FAAA40' }}>admin!</span>
                              </h2>
                              <h4 className={` ${chat.length === 0 ? 'text-light text-center' : ' text-center'}`}>This Chat Is Empty.</h4>
                            </div>
                            :
                            <>
                              {chat?.map((messageContent, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="message"
                                    id={messageContent.AdoptionChatSender === "CLIENT" ? "other" : "you"}
                                  >
                                    <div>
                                      <div className="message-content"  >
                                        {
                                          messageContent.AdoptionChatType === "TEXT" &&
                                          <p>{messageContent.AdoptionChatMessage}</p>
                                        }
                                        {
                                          messageContent.AdoptionChatType === "IMAGE" &&
                                          <img loading="lazy"src={messageContent.AdoptionChatMessage} width="100%" className='rounded-3 w-50' />
                                        }
                                        {
                                          messageContent.AdoptionChatType === "AUDIO" &&
                                          <audio ref={audioRef} controls>
                                            <source src={messageContent.AdoptionChatMessage} type="audio/ogg" />
                                            <source src={messageContent.AdoptionChatMessage} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                          </audio>
                                        }
                                      </div>
                                      <div className="message-meta">
                                        <p id="time">{messageContent.CreateDate.split(" ")[0]} {' , '} {messageContent.AdoptionChatSender.charAt(0).toUpperCase() + messageContent?.AdoptionChatSender?.slice(1).toLowerCase()}</p>
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
          </Container>
          : <Component.Loader />
      }

    </>
  )
}

export default AdoptionChat


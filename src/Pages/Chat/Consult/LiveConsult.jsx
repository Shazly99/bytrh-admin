import React, { useEffect,useRef,useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import { GetData } from '../../../utils/fetchData';
import { apiheader } from './../../../utils/fetchData';

const LiveConsult = () => {
  let {id}=useParams()
  const audioRef = useRef(null);

  function handlePlay() {
    audioRef.current.play();
}
  const [chat, setChat] = useState(null)
  const ConsultDetails=async()=>{
    await GetData(`${process.env.REACT_APP_API_URL}/admin/consult/chat/details/${id}`,apiheader).then(({Response})=>{
      setChat(Response.ChatDetails); 
      console.log(Response.ChatDetails);
    })
  }
  useEffect(() => { 
  ConsultDetails()
    return () => {
      ConsultDetails() 
    }
  }, [id])
  
  return (
    <div className='app__chat'>
    <Row className="app__chat__container "> 
      <Col xl={12} lg={12} md={12} sm={12} className='app__chat_messages '>
        <div className='shadow app__chat_list-card'>
          <div className={`app__Live_chat chat-body   `} style={{ background: 'rgb(217 217 217 / 28%)' }}>
          <ScrollToBottom className="message-container">
                {chat?.map((messageContent, index) => {
                    return (
                        <div
                            key={index}
                            className="message"
                            id={messageContent.ChatSupportSender === "CLIENT" ? "other" : "you"}
                        >
                            <div>
                                <div className="message-content"  >
                                    {
                                        messageContent.ConsultChatType === "TEXT" &&
                                        <p>{messageContent.ConsultChatMessage}</p>
                                    }
                                    {
                                        messageContent.ConsultChatType === "IMAGE" &&
                                        <img src={messageContent.ConsultChatMessage} width="100%" className='rounded-3 w-50' />
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
                                    <p id="time">{messageContent.CreateDate}</p> 
                                </div>
                            </div>
                        </div>
                    );
                })}
            </ScrollToBottom>
          </div> 
        </div>

      </Col >

    </Row >
  </div >
  )
}

export default LiveConsult
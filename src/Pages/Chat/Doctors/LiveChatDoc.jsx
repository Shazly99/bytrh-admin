import React, { useContext, useEffect, useRef, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import { apiheader, GetData } from '../../../utils/fetchData';
import axios from 'axios';
import { PostData } from './../../../utils/fetchData';
import { ChatContext } from '../../../context/ChatStore';

const LiveChatDoc = () => {
  const { id } = useParams();
  let { setUserReplied, userReplied } = useContext(ChatContext);

  const [clientChatSupport, setClientChatSupport] = useState([]);
  const [IdChatSupport, setIdChatSupportDetails] = useState([]);
  const [chat, setChat] = useState([]);
  const audioRef = useRef(null);

  function handlePlay() {
    audioRef.current.play();
  }
  const fetchClientDetail = async () => {
    try {
      const { data } = await axios(`https://bytrh.com/api/admin/chat/doctor/details/${id}`, apiheader);
      setClientChatSupport(data.Response.ChatDetails);
      setUserReplied(data.Response.UserReplied)
      console.log(userReplied);
      const IdLastMessage = data.Response.ChatDetails[data.Response.ChatDetails.length - 1].IDChatSupportDetails;
      setIdChatSupportDetails(IdLastMessage);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        setTimeout(() => {
          fetchClientDetail();
        }, (retryAfter || 1) * 1000);
      }
    }
  };
  const chatReceive = async () => {
    try {
      const { data } = await PostData(`https://bytrh.com/api/admin/chat/doctor/receive`, { IDDoctorChatSupport: id, IDChatSupportDetails: IdChatSupport }, apiheader);
      if (clientChatSupport !== []) {
        // console.log(data.Response);
        setChat([...clientChatSupport, ...data.Response]);
      }
    } catch (error) {
      /* if (error.response && error.response.status === 429) {
                 const retryAfter = error.response.headers['retry-after'];
                 setTimeout(() => {
                     chatReceive();
                 }, (retryAfter || 60) * 1000);
               } */
    }
  };

  useEffect(() => {

    fetchClientDetail();
    chatReceive()

    const interval = setInterval(() => {
      chatReceive()
    }, 5000);

    return () => clearInterval(interval);
  }, [id, IdChatSupport]);
  return (
    <>

      <ScrollToBottom className="message-container">
        {chat?.map((messageContent, index) => {
          return (
            <div
              key={index}
              className="message"
              id={messageContent.ChatSupportSender === "USER" ? "other" : "you"}
            >
              <div>
                <div className="message-content">
                  {
                    messageContent.ChatSupportType === "TEXT" &&
                    <p>{messageContent.ChatSupportMessage}</p>
                  }
                  {
                    messageContent.ChatSupportType === "IMAGE" &&
                    <img src={messageContent.ChatSupportMessage} width="100%" className='rounded-3 w-50' />
                  }
                  {
                    messageContent.ChatSupportType === "AUDIO" &&
                    <audio ref={audioRef} controls>
                      <source src={messageContent.ChatSupportMessage} type="audio/ogg" />
                      <source src={messageContent.ChatSupportMessage} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>


                  }
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.CreateDate}</p>
                  {/* <p id="author">{messageContent.ChatSupportSender}</p> */}
                </div>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
    </>
  )
}

export default LiveChatDoc
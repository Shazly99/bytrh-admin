import axios from 'axios';
import _ from 'lodash';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import Icons from '../../../constants/Icons';
import { ChatContext } from '../../../context/ChatStore';
import { apiheader, GetData } from '../../../utils/fetchData';
import useLocalStorage from './../../../context/useLocalStorage';
import { PostData } from './../../../utils/fetchData';

const LiveChatDoc = () => {
  const { id } = useParams();
  let { setmassSend, setUserReplied, massSend, setchatEnd } = useContext(ChatContext);
  const [isOn, setIsOn] = useLocalStorage('power', true);

  const [clientChatSupport, setClientChatSupport] = useState([]);
  const [clientChatSupportDetail, setClientChatSupportDetail] = useState([]);
  const [IdChatSupport, setIdChatSupportDetails] = useState([]);
  const [chatStatus, setChatStatus] = useState('');
  const [chatName, setChatName] = useState('');
  // const [chat, setChat] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  // function handlePlay() {
  //   audioRef.current.play();
  // }
  const fetchClientDetail = async () => {
    try {
      const { data } = await axios(`https://bytrh.com/api/admin/chat/doctor/details/${id}`, apiheader);
      setClientChatSupport(data.Response.ChatDetails);
      setClientChatSupportDetail(data.Response.ChatDetails)
      setUserReplied(data.Response.UserReplied)
      setChatStatus(data.Response.ChatSupportStatus);
      setchatEnd(data.Response.ChatSupportStatus)
      setChatName(data.Response.DoctorName)
      const IdLastMessage = data.Response.ChatDetails[data.Response.ChatDetails.length - 1].IDChatSupportDetails;
      setIdChatSupportDetails(IdLastMessage);
      setTimeout(() => {
        // setIsLoading(true)
    }, 5000);
    } catch (error) {
      // setIsLoading(false)
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        setTimeout(() => {
          fetchClientDetail();
          // setIsLoading(true)
        }, (retryAfter || 60) * 1000);
      }
    }
  };
  const chatReceive = _.debounce(async () => {
    if (chatStatus === 'ONGOING'|| chatStatus === 'PENDING') {
       try {

        const { data } = await PostData(`https://bytrh.com/api/admin/chat/doctor/receive`, { IDDoctorChatSupport: id, IDChatSupportDetails: IdChatSupport }, apiheader);
        if (clientChatSupport !== []) {
          setClientChatSupport([...clientChatSupport, ...data.Response]);
        }
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          setTimeout(async () => {
            const { data } = await PostData(`https://bytrh.com/api/admin/chat/client/receive`, { IDDoctorChatSupport: id, IDChatSupportDetails: IdChatSupport }, apiheader);
            if (clientChatSupport !== []) {
              setClientChatSupport([...clientChatSupport, ...data.Response]);
            }
          }, (retryAfter || 60) * 1000);
        }
      }
    } else {
       return
    }
  }, 1000);



  const handlePowerClick = async () => {
    setIsOn(false);
    // let fil = clientChatSupport
    if (isOn === true) {
      return await GetData(`https://bytrh.com/api/admin/chat/doctor/end/${id}`, apiheader)
    }

  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (chatStatus === 'ONGOING') {
      setIsOn(true)
      localStorage.setItem('chatStatus', 'ONGOING')
    } else if (chatStatus === 'ENDED') {

      setIsOn(false)
      localStorage.setItem('chatStatus', 'ENDED')

    } else if (chatStatus === 'PENDING') {
      setIsOn(true)
      localStorage.setItem('chatStatus', 'PENDING')
    }
    fetchClientDetail();
    chatReceive()

    let interval = setInterval(() => {
      chatReceive()
    }, 5000);

    return () => {
      clearInterval(interval);
      chatReceive()
    };


  }, [id, IdChatSupport, chatStatus]);

  useEffect(() => {
    if (massSend === true) {
       chatReceive()
      setmassSend(false)
    } else {
     }
  }, [massSend]);

  useEffect(() => {
    // setChat(null)
    // setIsLoading(false)
  }, [id]);
  return (
    <>
      <div className='chat__header'>
        <h6>{chatName}</h6>
        <div className="turn__off">
          <button className={`power-button ${isOn ? "on " : "off scaled"} `} onClick={handlePowerClick} >
            <Icons.Poweroff className="icon" />{isOn ? 'End chat' : 'Chat Ended'}
          </button>
        </div>
      </div>
      {
        chatStatus === 'ONGOING' || chatStatus === 'PENDING'  ?
          <ScrollToBottom  dir='ltr'className="message-container">
            {clientChatSupport?.map((messageContent, index) => {
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
                        <img loading="lazy"src={messageContent.ChatSupportMessage} alt='ChatSupportMessage' width="100%" className='rounded-3 w-50' />
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
          </ScrollToBottom> :
          <ScrollToBottom dir='ltr'className="message-container">
            {clientChatSupportDetail?.map((messageContent, index) => {
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
                        <img loading="lazy"src={messageContent.ChatSupportMessage} alt='ChatSupportMessage' width="100%" className='rounded-3 w-50' />
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
      }
    </>
  )
}

export default LiveChatDoc
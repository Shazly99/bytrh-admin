import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import { apiheader, GetData } from '../../../utils/fetchData';
import axios from 'axios';
import { PostData } from './../../../utils/fetchData';
import { ChatContext } from '../../../context/ChatStore';
import Icons from '../../../constants/Icons';
import useLocalStorage from './../../../context/useLocalStorage';

function LiveChat() {
    const { id } = useParams();
    let { setUserReplied, userReplied , setchatEnd} = useContext(ChatContext);
    const [isOn, setIsOn] = useLocalStorage('power', true);

    const [clientChatSupport, setClientChatSupport] = useState([]);
    const [IdChatSupport, setIdChatSupportDetails] = useState([]);
    const [chatStatus, setChatStatus] = useState('');
    const [chatName, setChatName] = useState('');
    const [chat, setChat] = useState([]);
    const audioRef = useRef(null);

    function handlePlay() {
        audioRef.current.play();
    }
    const fetchClientDetail = async () => {
        try {
            const { data } = await axios(`https://bytrh.com/api/admin/chat/client/details/${id}`, apiheader);
            setClientChatSupport(data.Response.ChatDetails);
            setUserReplied(data.Response.UserReplied)
            setChatStatus(data.Response.ChatSupportStatus);
            setchatEnd(data.Response.ChatSupportStatus)
            setChatName(data.Response.ClientName)
            const IdLastMessage = data.Response.ChatDetails[data.Response.ChatDetails.length - 1].IDChatSupportDetails;
            setIdChatSupportDetails(IdLastMessage);
        } catch (error) {
            // console.log(error);
            if (error.response && error.response.status === 429) {
                const retryAfter = error.response.headers['retry-after'];
                setTimeout(() => {
                    fetchClientDetail();
                }, (retryAfter || 60) * 1000);
            }
        }
    };
    const chatReceive = async () => {
        try {
            const { data } = await PostData(`https://bytrh.com/api/admin/chat/client/receive`, { IDClientChatSupport: id, IDChatSupportDetails: IdChatSupport }, apiheader);
            if (clientChatSupport !== []) {
                // console.log(data.Response);
                setChat([...clientChatSupport, ...data.Response]);
            }
        } catch (error) {
            if (error.response && error.response.status === 429) {
                const retryAfter = error.response.headers['retry-after'];
                setTimeout(() => {
                    chatReceive();
                }, (retryAfter || 60) * 1000);
            }
        }
    };

 

    const handlePowerClick = async () => {
        setIsOn(false);
        let fil = clientChatSupport
        //   console.log(fil);
        if (isOn === true) {
            let data = await GetData(`https://bytrh.com/api/admin/chat/client/end/${id}`, apiheader)
        }

    };

    useEffect(() => {
        if (chatStatus === 'ONGOING') {
            setIsOn(true)
            // console.log('ONGOING', isOn);
            localStorage.setItem('chatStatus','ONGOING')
        } else if (chatStatus === 'ENDED') {
            setIsOn(false)
            // console.log('ENDED', isOn);
            localStorage.setItem('chatStatus','ENDED')
        }else if (chatStatus === 'PENDING') {
            setIsOn(true) 
            localStorage.setItem('chatStatus','PENDING')
        }
        fetchClientDetail(); 
        chatReceive()

        const interval = setInterval(() => {
            chatReceive()
        }, 5000);

        return () => {
            clearInterval(interval);
            chatReceive()

        };
    }, [id, IdChatSupport]);

    return (
        <>
            <div className='chat__header'>
                <h6>{chatName}</h6>
                <div className="turn__off">
                    <button className={`power-button ${isOn ? "on " : "off scaled"} `} onClick={handlePowerClick} >
                        <Icons.poweroff className="icon" />{isOn?'End chat':'Chat Ended'} 
                    </button>
                </div>
            </div>
            <ScrollToBottom className="message-container">
                {chat?.map((messageContent, index) => {
                    return (
                        <div
                            key={index}
                            className="message"
                            id={messageContent.ChatSupportSender === "USER" ? "other" : "you"}
                        >
                            <div>
                                <div className="message-content"  >
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

export default LiveChat

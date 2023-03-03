import React, { createContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';


export const ChatContext = createContext([])

function ChatStore({ children }) {
  const [userReplied, setUserReplied] = useState(null); 
  const [chatEnd, setchatEnd] = useState(null); 
  const [cChatSupport, setCChatSupport] = useState(null); 
  const [docChatSupport, setDocChatSupport] = useState(null); 
  
  useEffect(() => {
    
  }, [chatEnd])


  return (
    <>
      <ChatContext.Provider value={{docChatSupport,setDocChatSupport,setCChatSupport, cChatSupport,chatEnd,setchatEnd,setUserReplied ,userReplied}}>
        {children}
      </ChatContext.Provider>
    </>
  )
}

export default ChatStore
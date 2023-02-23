import React, { createContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';


export const ChatContext = createContext([])

function ChatStore({ children }) {
  const [userReplied, setUserReplied] = useState(null); 
  const [chatEnd, setchatEnd] = useState(''); 
  
  useEffect(() => {
    
  }, [chatEnd])


  return (
    <>
      <ChatContext.Provider value={{chatEnd,setchatEnd,setUserReplied ,userReplied}}>
        {children}
      </ChatContext.Provider>
    </>
  )
}

export default ChatStore
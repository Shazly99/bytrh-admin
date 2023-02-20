import React, { createContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';


export const ChatContext = createContext([])

function ChatStore({ children }) {
  const [userReplied, setUserReplied] = useState(null); 
  
  useEffect(() => {
    console.log(userReplied);
  }, [])


  return (
    <>
      <ChatContext.Provider value={{setUserReplied ,userReplied}}>
        {children}
      </ChatContext.Provider>
    </>
  )
}

export default ChatStore
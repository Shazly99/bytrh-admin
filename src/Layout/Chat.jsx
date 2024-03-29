import { motion } from 'framer-motion';
import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Component from '../constants/Component';
import { VendersContext } from '../context/Store';
const Chat = () => {
    let { isOpen,isLang } = useContext(VendersContext);

    useEffect(() => {
     }, [isOpen])
    return (
        <div style={{ backgroundColor: ' #F5F8FA' }} dir={isLang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="vender overflow-hidden">
                <div className='d-flex'>
                    <Component.Sildebar />
                    <motion.div
                        className='adminLayout'
                        animate={{
                            width: isOpen ? `calc(100% - 250px)` : `calc( 100% - 50px )`,
                            transition: {
                                duration: 0.5,
                                type: "spring",
                                damping: 10,
                            },
                        }}
                    >
                        <main className='w-100  m-0 p-0 '>
                            <Component.Navber />
                                <Outlet></Outlet>
                        </main>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Chat

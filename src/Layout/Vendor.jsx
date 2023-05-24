import { motion } from 'framer-motion';
import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarSM from '../Components/Sidebar/SidebarSM';
import Component from '../constants/Component';
import { VendersContext } from '../context/Store';

function Vendor() {
  let { isOpen ,isLang} = useContext(VendersContext);

  useEffect(() => {
   

   }, [isOpen])
  return (
    <>
      <div className="vender overflow-hidden" dir={isLang === 'ar' ? 'rtl' : 'ltr'}>
        <div className='d-flex'>
          <Component.Sildebar />
          <SidebarSM/>
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
              <div className='p-2 '  >
                <Outlet></Outlet>
              </div>
            </main>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Vendor

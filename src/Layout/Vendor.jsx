import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Component from '../constants/Component';
import { motion } from 'framer-motion';
import { VendersContext } from '../context/Store';

function Vendor() {
  let { isOpen } = useContext(VendersContext);

  useEffect(() => {
    // console.log(isOpen);
  }, [isOpen])
  return (
    <>
      <div className="vender overflow-hidden">
        <div className='d-flex'>
          <Component.Sildebar />
          <motion.div
            className='adminLayout'
            animate={{
              width: isOpen ? `calc(100% - 270px)` : `calc( 100% - 50px )`,
              transition: {
                duration: 0.5,
                type: "spring",
                damping: 10,
              },
            }}
          >
            <main className='w-100  m-0 p-0 '>
              <Component.Navber />
              <div className='p-2'>
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

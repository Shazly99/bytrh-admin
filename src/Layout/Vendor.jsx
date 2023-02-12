import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Component from '../constants/Component';

function Vendor() {
  return (
    <>
      <div className="vender overflow-hidden">
        <div className='d-flex'>
          <Component.Sildebar />
          <main className='w-100  m-0 p-0'>
            <Component.Navber />
            <div className='p-2'>
              <Outlet></Outlet>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Vendor

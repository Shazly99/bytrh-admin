import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom';
import { VendersContext } from '../context/Store';

const Auth = () => {
    let { isOpen,isLang } = useContext(VendersContext);

    return (
        <>
            <div className="app__auth  " dir={isLang === 'ar' ? 'rtl' : 'ltr'}>
                <Outlet></Outlet>
            </div>
        </>
    )

}

export default Auth
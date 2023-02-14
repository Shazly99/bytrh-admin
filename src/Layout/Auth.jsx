import React from 'react'
import { Outlet } from 'react-router-dom';

const Auth = () => {
    return (
        <>
            <div className="app__auth  vh-100">
                <Outlet></Outlet>
            </div>
        </>
    )

}

export default Auth
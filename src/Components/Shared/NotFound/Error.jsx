import React from 'react'
import Img from '../../../assets/Img'

const Error = () => {
    return (
        <>
            <div className="app__error vh-100">
                <img src={Img.error} alt="" srcset="" />
                <h3>Sorry Try Again...</h3>
            </div>
        </>
    )
}

export default Error
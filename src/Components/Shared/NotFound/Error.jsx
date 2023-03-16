import React from 'react'
import Img from '../../../assets/Img'

const Error = () => {
    return (
        <>
            <div className="app__error vh-100">
                <img loading="lazy"src={Img.ErrorGif1} alt="" srcset="" />
             </div>
        </>
    )
}

export default Error
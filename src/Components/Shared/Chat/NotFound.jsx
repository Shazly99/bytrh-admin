import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'

const NotFound = () => {
    return (
        <div className="no-result-container">
            <Player
                className="no-result-image"
                src="https://assets3.lottiefiles.com/packages/lf20_bryykdkb.json" 
                autoplay
                loop
            />
            <div className="content">
                {/* <h4 className="text-center">User NotFound </h4> */}
            </div>
        </div>
    )
}

export default NotFound

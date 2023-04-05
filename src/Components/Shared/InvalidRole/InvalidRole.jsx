import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'

const InvalidRole = () => {
    return (
        <>
            <div className="expired-container">
                <Player
                    className="expired-image"
                    src="https://assets7.lottiefiles.com/private_files/lf30_wkl1ys4z.json"
                    autoplay
                    loop
                />
                <div className="contact">

                <h1>Invalid Role</h1>
                <p>You do not have permission to access this page.</p>
                </div>
            </div>
        </>
    )
}

export default InvalidRole

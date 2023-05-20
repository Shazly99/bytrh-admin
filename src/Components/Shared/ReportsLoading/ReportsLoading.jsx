import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'

const ReportsLoading = ({reportName}) => {
    return (
        <>
            <div className="no-result-container">
                <Player
                    className="no-result-image"
                    src="https://assets10.lottiefiles.com/packages/lf20_hSevJIQ2Wm.json" 
                    autoplay
                    loop
                />
                <div className="content">
                    <h3 className="text-center">You must choose </h3>
                    <p className="text-center">the {reportName}'s name to show his reports</p>
                </div>
            </div>
        </>
    )
}

export default ReportsLoading
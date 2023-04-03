import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'

const DataNotFound = () => {
    return (
        <div className="no-result-container">
            <Player
                className="no-result-image"
                // src="https://assets7.lottiefiles.com/packages/lf20_ttvteyvs.json"
                src={'https://assets7.lottiefiles.com/packages/lf20_jP0UkE.json'}
                autoplay
                loop
            />
            <div className="content">
                <h3 className="text-center">No results found</h3>
                <p className="text-center">Try different keywords or remove filters</p>
            </div>
        </div>
    )
}

export default DataNotFound

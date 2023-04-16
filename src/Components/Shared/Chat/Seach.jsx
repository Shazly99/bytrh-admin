import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'

const Seach = () => {
  return (
    <div className="no-result-container">
    <Player
        className="no-result-image"
        src="https://assets7.lottiefiles.com/packages/lf20_ttvteyvs.json" 
        autoplay
        loop
    />
    <div className="content">
        <h4 className="text-center">No results found</h4>
        <p className="text-center">Try different keywords or remove filters</p>
    </div>
</div>
  )
}

export default Seach

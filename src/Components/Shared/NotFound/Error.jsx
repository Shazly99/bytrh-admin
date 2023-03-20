import React from 'react' 
import { Player } from '@lottiefiles/react-lottie-player';

const Error = () => {
    return (
        <>
            <div className="app__error">
                <Player
                    className="expired-image"
                    src="https://assets3.lottiefiles.com/packages/lf20_ZJR0xnKKys.json"
                    autoplay
                    loop
                />
            </div>
        </>
    )
}

export default Error
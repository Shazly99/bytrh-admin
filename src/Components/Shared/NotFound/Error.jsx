import React from 'react' 
import { Player } from '@lottiefiles/react-lottie-player';

const Error = () => {
    return (
        <>
            <div className="app__error">
                <Player
                    className="notfound-image"
                    // src="https://assets3.lottiefiles.com/packages/lf20_ZJR0xnKKys.json"
                    src='https://assets7.lottiefiles.com/packages/lf20_vzj1xd0x.json'
                    autoplay
                    loop
                />
            </div>
        </>
    )
}

export default Error
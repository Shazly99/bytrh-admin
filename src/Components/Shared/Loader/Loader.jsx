import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'

export default function Loader() {
    return (
        <div id="ready">
            <div className="loader">
                <Player
                    className="loader-image"
                     src='https://assets3.lottiefiles.com/private_files/lf30_ds4gbnoj.json'
                    autoplay
                    loop
                />
            </div>
        </div>
    )
}
import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'

const PaymentLoader = () => {
    return (
        <div className='w-100 '>
            <Player
                className=" w-100"
                // src="https://assets3.lottiefiles.com/packages/lf20_ZJR0xnKKys.json"
                src='https://assets1.lottiefiles.com/packages/lf20_3m2goy8n.json'
                autoplay
                loop
            />
        </div>
    )
}

export default PaymentLoader

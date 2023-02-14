import React from 'react'

const BaseHeader = ({ h1, h2 ,colorW}) => {
    return (
        <>
            <div className={`app__baseHeader ${colorW}  `}>
                {h1 && <h1 className={`app__baseHeader ${colorW}  `}>{h1}</h1>}
                {h2 && <h2>{h2}</h2>}
            </div>
        </>
    )
}

export default BaseHeader
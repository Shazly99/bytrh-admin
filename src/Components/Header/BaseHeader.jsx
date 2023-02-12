import React from 'react'

const BaseHeader = ({ h1, h2 }) => {
    return (
        <>
            <div className="app__baseHeader">
                {h1 && <h1>{h1}</h1>}
                {h2 && <h2>{h2}</h2>}
            </div>
        </>
    )
}

export default BaseHeader
import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom' 


const ButtonBase = ({ title, bg, icon, path ,onclick}) => {
    return (
        <div className='baseBtn'>
            <Link to={`${path?path:''}`}>
                <Button variant={bg} onClick={onclick} className='d-flex align-items-center justify-content-center'>
                    {icon}
                    {title}
                </Button>
            </Link>
        </div>
    )
}

export default ButtonBase
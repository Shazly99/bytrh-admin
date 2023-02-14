import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const ButtonBase = ({ title, bg, icon, path, onclick }) => {
    return (
        <div className='baseBtn'>
            <Button type='submit' variant={bg} onClick={onclick} className='d-flex align-items-center justify-content-center'>
                <Link to={`${path ? path : ''}`} className='text-light'>
                    {icon}
                    {title}
                </Link>
            </Button>
        </div>
    )
}

export default ButtonBase
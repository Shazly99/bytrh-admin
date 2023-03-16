import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import './Doctor.scss';


const SingleHour = ({ DoctorTime }) => {


  return (
    <div className="col-xl-2 col-lg-3 col-md-4 col-6">
        <div className="inf-time bg-light py-4 px-3 rounded-3 shadow position-relative" style={{whiteSpace: 'nowrap' , fontWeight: '600'}}>
            {DoctorTime.DoctorStartHour.slice(0,5)} {Number(DoctorTime.DoctorStartHour.slice(0,2)) < 12 ? 'AM' : 'PM'}
            <AiFillCloseCircle className='position-absolute top-0 end-0 translate-middle-y h3 color-red' style={{ cursor: 'pointer' }} />
        </div>
    </div>
  )
}

export default SingleHour
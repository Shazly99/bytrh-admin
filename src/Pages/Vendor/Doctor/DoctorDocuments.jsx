import { motion } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import LogoSvg from '../../../assets/svg/LogoSvg';
import { VendersContext } from '../../../context/Store';

function DoctorDocuments({ DoctorDocument, id }) {
    let { isLang } = useContext(VendersContext);
    const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
    return (
        <>
            <div className="shadow-sm  p-3 mt-4  border-2" style={{ borderRadius: '5px', background: '#F9F9F9' }}>
                <div className="d-flex " style={{ justifyContent: 'space-between' }}>
                    <label className='Sign__Up-header text-dark'> {isLang === 'ar' ? '  وثيقة الطبيب' : 'Doctor Document'}  </label>
                    <Link to={`/doctors/document/add/${id}`} >
                        <span className='upload__doc'>
                            <LogoSvg.DocumentUpload />
                            {isLang === 'ar' ? '   إضــافة وثيقة للدكتور' : 'Add Document'}
                        </span>
                    </Link>
                </div>
                {
                    DoctorDocument?.length > 0 &&
                    <div className="d-flex flex-wrap justify-content-between align-items-center">

                        {
                            DoctorDocument.map((item, index) => (
                                <motion.div key={index} className="app__work-portfolio  " animate={animateCard} transition={{ duration: 0.5, delayChildren: 0.5 }}>

                                    <div className="app__work-item app__flex shadow-sm" >
                                        <div className="app__work-img app__flex"  >
                                            <img src={item?.DoctorDocumentPath} alt={item.name} className='w-100' />
                                            <motion.div className="app__work-hover app__flex" whileHover={{ opacity: [0, 1] }} transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}>
                                                <Link to={`/doctors/document/edit/${item.IDDoctor}/${item.IDDoctorDocument}`} rel="noreferrer">
                                                    <motion.div className="app__flex" whileInView={{ scale: [0, 1] }} whileHover={{ scale: [1, 0.90] }} transition={{ duration: 0.25 }}  >
                                                        <BiMessageSquareEdit />
                                                    </motion.div>
                                                </Link>
                                            </motion.div>
                                        </div>

                                        <div className="app__work-content app__flex">
                                            <h4 className="bold-text"> {isLang === 'ar' ? 'تاريخ انتهاء الصلاحية' : 'Expire Date'}  </h4>
                                            <p className="p-text text-center d-flex justify-content-center align-item-center m-0 p-0 flex-column gap-0" style={{ marginTop: 10 }}>
                                                <span> {item.DoctorDocumentExpireDate?.split(' ')[0]}</span>
                                            </p>

                                            <div className="app__work-tag app__flex">
                                                <p className="p-text">{item.DoctorDocumentType?.charAt(0).toUpperCase() + item.DoctorDocumentType?.slice(1).toLowerCase()}</p>
                                            </div>
                                        </div>
                                    </div>

                                </motion.div>
                            ))
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default DoctorDocuments

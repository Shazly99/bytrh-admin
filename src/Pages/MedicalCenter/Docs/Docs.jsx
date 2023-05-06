import React from 'react';

import { useContext, useEffect, useState } from 'react';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import { apiheader } from './../../../utils/fetchData';
// import { Pagination } from "@mui/material";
// import Box from "@mui/material/Box";
// import { Link } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'framer-motion';
import { VendersContext } from "../../../context/Store";
import useSkeletonTable from '../../../utils/useSkeletonTable';
import docs from './docstranslate';


const Docs = () => {
    const [docsList, setDocsList] = useState([]);
    const [isLoader, setIsloader] = useState(false);
    let { SkeletonTable, SkeletonFilters } = useSkeletonTable();
    const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

    let id = localStorage.getItem('idmc');

    // get getDocs
    const getDocs = async () => {
        await axios.get(`https://bytrh.com/api/admin/medicalcenter/profile/${id}`, apiheader)
            .then(res => {
                setDocsList(res.data.Response.MedicalCenterDocuments);
                setIsloader(true);
            })
            .catch(err => {
             })
    }


    useEffect(() => {
        let timeOut = setTimeout(() => {
            window.scrollTo(0, 0);
            getDocs();
        }, 200);
        return (() => {
            clearTimeout(timeOut);
        })
    }, [])


    let { isLang } = useContext(VendersContext);


    return (
        <>
            <div className="app__Users ">
                {isLoader ?
                    <>
                        <Component.ButtonBase title={docs[isLang]?.addBTN} bg={"primary"} icon={<Icons.Add size={21} color={'#ffffffb4'} />} path="/docs/add" />
                    </>
                    :
                    <div className="mt-3 p-2">
                        {SkeletonFilters(40, 150)}
                    </div>
                }


                {isLoader ?
                    <>

                        {
                            docsList?.length > 0 ?
                                <div className="  p-3 mt-4  border-2" style={{ borderRadius: '5px', background: '#F9F9F9' }}>
                                    <label className='Sign__Up-header text-dark'>{docs[isLang]?.DocsLable}</label>
                                    <motion.div className="app__work-portfolio " animate={animateCard} transition={{ duration: 0.5, delayChildren: 0.5 }}>
                                        {
                                            docsList?.map((work, index) => (
                                                <div className="app__work-item app__flex shadow-sm" key={index}>
                                                    <div className="app__work-img app__flex"  >
                                                        <img src={work?.CenterDocumentPath} alt={work.name} className='w-100' />
                                                        <motion.div className="app__work-hover app__flex" whileHover={{ opacity: [0, 1] }} transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}>
                                                            {/*      <Link to={'/medicalcenter/docs'} rel="noreferrer">
                                                            <motion.div className="app__flex" whileInView={{ scale: [0, 1] }} whileHover={{ scale: [1, 0.90] }} transition={{ duration: 0.25 }}  >
                                                                <AiFillEye />
                                                            </motion.div>
                                                        </Link> */}
                                                        </motion.div>
                                                    </div>

                                                    <div className="app__work-content app__flex">
                                                        <h4 className="bold-text"> Expire Date </h4>
                                                        <p className="p-text text-center d-flex justify-content-center align-item-center m-0 p-0 flex-column gap-0" style={{ marginTop: 10 }}>
                                                            <span   > {work.CenterDocumentExpireDate.split(' ')[0]}  </span>
                                                            <span className='ClientPhone'> {work.CenterDocumentExpireDate.split(' ')[1]}
                                                            </span>
                                                            { }
                                                        </p>

                                                        <div className="app__work-tag app__flex">
                                                            <p className="p-text">{work.CenterDocumentType?.charAt(0).toUpperCase() + work.CenterDocumentType?.slice(1).toLowerCase()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                    </motion.div>
                                </div> :
                                <Component.DataNotFound />
                        }
                    </> :
                    SkeletonTable()
                }

            </div>
        </>
    )
}

export default Docs
import React from 'react'
import { Table } from "react-bootstrap";

import Component from '../../../constants/Component'
import Icons from '../../../constants/Icons'
import { apiheader } from './../../../utils/fetchData';
import { useEffect , useContext } from 'react';
import { useState } from 'react';
// import { Pagination } from "@mui/material";
// import Box from "@mui/material/Box";
// import { Link } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
import useSkeletonTable from '../../../utils/useSkeletonTable';
import { VendersContext } from "../../../context/Store";
import docs from './docstranslate';
import axios from 'axios';


const Docs = () => {
    const [docsList, setDocsList] = useState([]);
    const [isLoader, setIsloader] = useState(false);
    let { SkeletonTable, SkeletonFilters } = useSkeletonTable();

    let id = localStorage.getItem('idmc');

    // get getDocs
    const getDocs = async () => {
        await axios.get(`https://bytrh.com/api/admin/medicalcenter/profile/${id}` , apiheader )
        .then(res => {
            setDocsList(res.data.Response.MedicalCenterDocuments);
            setIsloader(true);
        })
        .catch(err => {
            console.log(err);
        })
    }


    useEffect(() => {
        let timeOut = setTimeout(() => {
            window.scrollTo(0, 0);
            getDocs();
        }, 1500);
        return(() => {
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

                <div className="app__Users-table"> 
                    {isLoader ? 
                    <>
                        {Object.keys(docsList).length > 0 ?
                            <Table responsive={true} className='rounded-3 '>
                                <thead>
                                    <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                                        {docs[isLang]?.TableHeader?.map((el , i) => (
                                            <th key={i}>{el}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {
                                        docsList?.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div style={{width: '250px', height: '150px'}}>
                                                        <img loading="lazy" src={item.CenterDocumentPath} className='ro rounded-3 w-100 h-100 mx-auto' style={{cursor: 'pointer'}} alt="doc-image" />
                                                    </div>
                                                </td>
                                                <td >
                                                    <div>
                                                        {item.CenterDocumentExpireDate.slice(0,10)}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                            :
                            <Component.DataNotFound />
                        }
                    </> :
                        SkeletonTable()
                    }
                </div>
            </div>
        </>
    )
}

export default Docs
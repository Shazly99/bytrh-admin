
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import initialTranslation from './Translation';
import { Button, Col, Dropdown, DropdownButton, Form, Row, Table } from "react-bootstrap";
import { useContext, useEffect,   useState } from 'react';
import { PostData, apiheader } from '../../utils/fetchData';
import { VendersContext } from '../../context/Store';
import React from 'react';
import { SiMicrosoftexcel } from 'react-icons/si';

const ExcelSheet = () => {
    let { isLang } = useContext(VendersContext);

    const [exportData, setExportData] = useState(null)
    const [translate, setTranslate] = useState(initialTranslation)
    const handelTranslate = () => setTranslate(initialTranslation)
    const visits = async () => {
        await PostData(`${process.env.REACT_APP_API_URL}/admin/visits`, { Action: 'Export' }, apiheader).then(({ data }) => {
            setExportData(data.Response.Visits)
         }).catch((error) => {
         })
    }

    useEffect(() => {
        handelTranslate()
        const timeoutId = setTimeout(() => {
            visits()
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [])
    return (
        <>
            <ReactHTMLTableToExcel
                table="my-table"
                filename={translate[isLang]?.VisitDetails?.filename}
                sheet="Sheet 1"
                buttonText={
                    <div className='d-flex gap-2 ' style={{justifyContent:'center',alignItems:'center'}}>
                        <SiMicrosoftexcel/>
                        <span>{translate[isLang]?.VisitDetails?.excelSheet}</span>
                    </div>
                }
                className='btn btn-sucess btn__excel'
                 
                
            />
            <Table responsive={true} bordered id='my-table' className='rounded-3 d-none'>
                <thead>
                    <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                        {
                            translate[isLang]?.ExcelHeader?.map((item, index) => (
                                <th key={index} style={{width:'180px',height:'50px'}}>{item}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        exportData?.map((item, index) => (
                            <tr key={index}>
                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientName'>{item?.ClientName}</span>
                                     </div>
                                </td>
                                <td >
                                    <div className="text-center w-100">
                                         <span className='ClientPhone' style={{width:'200px',textAlign:'left'}}>{item?.ClientPhone}</span>
                                    </div>
                                </td>


                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientName'>{item?.MedicalCenterName}</span>
                                     </div>
                                </td>
                                
                                <td >
                                    <div className="text-center w-100">
                                         <span className='ClientPhone'>{item?.MedicalCenterPhone}</span>
                                    </div>
                                </td>

                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientName'>{item?.DoctorName}</span>
                                     </div>
                                </td>
                                <td >
                                    <div className="text-center w-100">
                                         <span className='ClientPhone'>{item?.DoctorPhone}</span>
                                    </div>
                                </td>

                                <td >
                                    <div>
                                        <h6 className="mb-0  pe-2 bolder">
                                            {item?.VisitTotalPrice} {translate[isLang]?.Actions.currency}
                                        </h6>
                                    </div>
                                </td>

                                <td >
                                    <div>
                                        <span style={{ height: 'fit-content !important' }}  >
                                            {item?.VisitType.charAt(0).toUpperCase() + item?.VisitType.slice(1).toLowerCase()}
                                        </span>
                                    </div>
                                </td>

                                <td className='text-center  d-flex '>
                                    <div>
                                        <span style={{ height: 'fit-content !important' }} >  
                                            {
                                                translate[isLang].FilterStatus?.filter((itemfilter) => itemfilter.value === item?.VisitStatus)
                                                    .map((status, index) => (
                                                        <React.Fragment key={index}>
                                                            {item?.VisitStatus === status.value ? status.text : ''}
                                                        </React.Fragment>
                                                    ))
                                            }
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div
                                        className="d-flex flex-column justify-content-center align-content-center"
                                        style={{ gap: "0" }}
                                    >
                                        <span className="ClientName">
                                            {" "}
                                            {item?.VisitStartTime.split(" ")[0]}{" "}
                                        </span>
                                        <span className="ClientPhone">
                                            {" "}
                                            {item?.VisitStartTime.split(" ")[1]}
                                        </span>
                                    </div>
                                </td>
                            
 
                            </tr>
                        ))
                    }

                </tbody>

            </Table>
        </>
    )
}

export default ExcelSheet

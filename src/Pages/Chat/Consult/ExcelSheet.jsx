
import React, { useContext, useEffect, useState } from 'react';
import { Table } from "react-bootstrap";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { SiMicrosoftexcel } from 'react-icons/si';
import { VendersContext } from '../../../context/Store';
import { PostData, apiheader } from '../../../utils/fetchData';
import initialTranslation from "./Translation";


const ExcelSheet = () => {
    let { isLang } = useContext(VendersContext);

    const [exportData, setExportData] = useState(null)
    const [translate, setTranslate] = useState(initialTranslation)
    const handelTranslate = () => setTranslate(initialTranslation)
    const consultList = async () => {
        await PostData(`${process.env.REACT_APP_API_URL}/admin/consult `, { Action: 'Export' }, apiheader).then(({ data }) => {
            setExportData(data.Response.Consults)
        }).catch((error) => {
         })
    }

    useEffect(() => {
        handelTranslate()
        const timeoutId = setTimeout(() => {
            consultList()
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [])
    return (
        <>
            <ReactHTMLTableToExcel
                table="my-table"
                filename={translate[isLang]?.filename}
                sheet="Sheet 1"
                buttonText={
                    <div className='d-flex gap-2 ' style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <SiMicrosoftexcel />
                        <span>{translate[isLang]?.excelSheet}</span>
                    </div>
                }
                className='btn btn-sucess btn__excel'


            />
            <Table responsive={true} bordered id='my-table' className='rounded-3 d-none '>
                <thead>
                    <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                        {
                            translate[isLang]?.ExcelHeader?.map((item, index) => (
                                <th key={index} style={{ width: '180px', height: '50px' }}>{item}</th>
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
                                        <span className='ClientPhone'>{item?.ClientName}</span>
                                    </div>
                                </td>
                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientPhone'>{item?.ClientPhone}</span>
                                    </div>
                                </td>

                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientPhone'>{item?.DoctorName}</span>
                                    </div>
                                </td>
                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientPhone'>{item?.DoctorPhone}</span>
                                    </div>
                                </td>

                                <td className='text-center  d-flex '>
                                    <div>
                                        <span style={{ height: 'fit-content !important' }} >
                                            {translate[isLang].ConsultType && translate[isLang].ConsultType.map((status, index) => (
                                                <React.Fragment key={index}>
                                                    {item?.ConsultType === status.value && status.text}
                                                </React.Fragment>
                                            ))}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className='d-flex flex-column justify-content-center align-content-center' style={{ gap: '0' }}>
                                        <h6 className="mb-0  pe-2 bolder">
                                            {item?.ConsultAmount} {translate[isLang]?.currency}
                                        </h6>
                                    </div>
                                </td>
                                <td className='text-center  d-flex '>
                                    <div>
                                        <span style={{ height: 'fit-content !important' }} >
                                            {translate[isLang].FilterStatus && translate[isLang].FilterStatus.map((status, index) => (
                                                <React.Fragment key={index}>
                                                    {item?.ConsultStatus === status.value && status.text}
                                                </React.Fragment>
                                            ))}
                                        </span>
                                    </div>
                                </td>
                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientPhone'>{item?.ClientComplainBody ? item?.ClientComplainBody : translate[isLang]?.ComplainBody}</span>
                                    </div>
                                </td>

                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientPhone'>{item?.DoctorComplainBody ? item?.DoctorComplainBody : translate[isLang]?.ComplainBody}</span>
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

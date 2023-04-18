
import React, { useContext, useEffect, useState } from 'react';
import { Table } from "react-bootstrap";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { SiMicrosoftexcel } from 'react-icons/si';
import { VendersContext } from '../../../context/Store';
import { PostData, apiheader } from '../../../utils/fetchData';
import initialTranslate from './initialTranslate';


const ExcelSheet = () => {
    let { isLang } = useContext(VendersContext);

    const [exportData, setExportData] = useState(null)
    const [translate, setTranslate] = useState(initialTranslate)
    const handelTranslate = () => setTranslate(initialTranslate)
    const userList = async () => {
        await PostData(`${process.env.REACT_APP_API_URL}/admin/users `, { Action: 'Export' }, apiheader).then(({ data }) => {
            setExportData(data.Response.Users)
        }).catch((error) => {
         })
    }

    useEffect(() => {
        handelTranslate()
        const timeoutId = setTimeout(() => {
            userList()
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
                                        <span className='ClientPhone'>{item?.UserName}</span>
                                    </div>
                                </td>
                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientPhone'>{item?.UserPhone}</span>
                                    </div>
                                </td>
                                <td style={{ width: '300px' }}>
                                    <div className="text-center w-100" >
                                        <span className='ClientName'>{item?.UserEmail}</span>
                                    </div>
                                </td>

                                <td >
                                    <div>
                                        <span style={{ height: 'fit-content !important' }}  >
                                            {item?.RoleName }
                                        </span>
                                    </div>
                                </td>
                                <td className='text-center  d-flex '>
                                    <div>
                                        <span style={{ height: 'fit-content !important' }} >
                                            {
                                                translate[isLang].FilterStatus?.filter((itemfilter) => itemfilter.value === item?.UserStatus)
                                                    .map((status, index) => (
                                                        <React.Fragment key={index}>
                                                            {item?.UserStatus === status.value ? status.text : ''}
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
                                            {item?.CreateDate?.split(" ")[0]}{" "}
                                        </span>
                                        <span className="ClientPhone">
                                            {" "}
                                            {item?.CreateDate?.split(" ")[1]}
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

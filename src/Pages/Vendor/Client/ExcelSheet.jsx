
import React, { useContext, useEffect, useState } from 'react';
import { Table } from "react-bootstrap";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { SiMicrosoftexcel } from 'react-icons/si';
import { VendersContext } from '../../../context/Store';
import initialTranslate from './initialTranslate';

const ExcelSheet = ({usersList}) => {
    let { isLang } = useContext(VendersContext);

    // const [exportData, setExportData] = useState(null)
    const [translate, setTranslate] = useState(initialTranslate)
    const handelTranslate = () => setTranslate(initialTranslate)
    // const clients = async () => {
    //     await PostData(`${process.env.REACT_APP_API_URL}/admin/clients`, { Action: 'Export' }, apiheader).then(({ data }) => {
    //         setExportData(data.Response.Clients)
    //     }).catch((error) => {
    //     })
    // }

    useEffect(() => {
        handelTranslate()
        // const timeoutId = setTimeout(() => {
        //     clients()
        // }, 1000);
        // return () => clearTimeout(timeoutId);
    }, [])
    return (
        <>
            <ReactHTMLTableToExcel
                table="my-table"
                filename={translate[isLang]?.dataExport}
                sheet="Sheet 1"
                buttonText={
                    <div className='d-flex gap-2 ' style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <SiMicrosoftexcel />
                        <span>{translate[isLang]?.excelSheet}</span>
                    </div>
                }
                className='btn btn-sucess btn__excel'


            />
            <Table responsive={true} bordered id='my-table' className='rounded-3  d-none'>
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
                        usersList?.map((item, index) => (
                            <tr key={index}>
                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientName'>{item?.ClientName}</span>
                                    </div>
                                </td>
                                <td  >
                                    <div className="text-center w-100">
                                        <span className='ClientPhone' style={{ width: '200px', textAlign: 'left' }}>{item?.ClientPhone}</span>
                                    </div>
                                </td>
                                <td style={{ width: '300px' }}>
                                    <div className="text-center w-100" >
                                        <span className='ClientName'>{item?.ClientEmail}</span>
                                    </div>
                                </td>
                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientName'>{item?.LoginBy.split(' ')
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                            .join(' ')}</span>
                                    </div>
                                </td>
                                <td >
                                    <div>
                                        <h6 className="mb-0  pe-2 bolder">
                                            {item?.ClientBalance} {translate[isLang]?.currency}
                                        </h6>
                                    </div>
                                </td>
                                <td >
                                    <div>
                                        <h6 className="mb-0  pe-2 bolder">
                                            {item?.ClientCurrentPoints}
                                        </h6>
                                    </div>
                                </td>


                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientName'>{item?.CountryName}</span>
                                    </div>
                                </td>
                                <td className='text-center  d-flex '>
                                    <div>
                                        <span style={{ height: 'fit-content !important' }} >
                                            {
                                                translate[isLang].FilterStatus?.filter((itemfilter) => itemfilter.value === item?.ClientStatus)
                                                    .map((status, index) => (
                                                        <React.Fragment key={index}>
                                                            {item?.ClientStatus === status.value ? status.text : ''}
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
                                            {item?.CreateDate.split(" ")[0]}{" "}
                                        </span>
                                        <span className="ClientPhone">
                                            {" "}
                                            {item?.CreateDate.split(" ")[1]}
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

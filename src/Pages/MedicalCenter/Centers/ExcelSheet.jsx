
import React, { useContext, useEffect, useState } from 'react';
import { Table } from "react-bootstrap";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { SiMicrosoftexcel } from 'react-icons/si';
import { VendersContext } from '../../../context/Store';
import initialTranslation from './Translation';
 

const ExcelSheet = ({medicalCenter}) => {
    let { isLang } = useContext(VendersContext);

    // const [exportData, setExportData] = useState(null)
    const [translate, setTranslate] = useState(initialTranslation)
    const handelTranslate = () => setTranslate(initialTranslation)
    // const medicalCenterList = async () => {
    //     await PostData(`${process.env.REACT_APP_API_URL}/admin/medicalcenter `, { Action: 'Export' }, apiheader).then(({ data }) => {
    //         setExportData(data.Response.MedicalCenters)
    //     }).catch((error) => {
    //      })
    // }

    useEffect(() => {
        handelTranslate()
        // const timeoutId = setTimeout(() => {
        //     medicalCenterList()
        // }, 1000);
        // return () => clearTimeout(timeoutId);
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
                        medicalCenter?.map((item, index) => (
                            <tr key={index}>
 
                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientPhone'>{item?.MedicalCenterName}</span>
                                    </div>
                                </td>
                                <td style={{ width: '300px' }}>
                                    <div className="text-center w-100" >
                                        <span className='ClientName'>{item?.MedicalCenterPhone}</span>
                                    </div>
                                </td>
 
                                <td >
                                    <div>
                                        <span style={{ height: 'fit-content !important' }}  >
                                            {item?.MedicalCenterType?.charAt(0).toUpperCase() + item?.MedicalCenterType?.slice(1).toLowerCase()}
                                        </span>
                                    </div>
                                </td>
                                <td className='text-center  d-flex '>
                                    <div>
                                        <span style={{ height: 'fit-content !important' }} >
                                            {
                                                translate[isLang].FilterStatus?.filter((itemfilter) => itemfilter.value === item?.MedicalCenterStatus)
                                                    .map((status, index) => (
                                                        <React.Fragment key={index}>
                                                            {item?.MedicalCenterStatus === status.value ? status.text : ''}
                                                        </React.Fragment>
                                                    ))
                                            }
                                        </span>
                                    </div>
                                </td> 

                                <td>
                            <div>
                              {item?.AreaName.charAt(0).toUpperCase() +
                                item?.AreaName.slice(1).toLowerCase()}
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

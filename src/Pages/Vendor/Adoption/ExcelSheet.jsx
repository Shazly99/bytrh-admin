
import React, { useContext, useEffect, useState } from 'react';
import { Table } from "react-bootstrap";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { SiMicrosoftexcel } from 'react-icons/si';
import { VendersContext } from '../../../context/Store';
import { PostData, apiheader } from '../../../utils/fetchData';

const ExcelSheet = () => {
    let { isLang } = useContext(VendersContext);
    const [exportData, setExportData] = useState(null)

    const Adoption = async () => {
        await PostData(`${process.env.REACT_APP_API_URL}/admin/adoptions`, { Action: 'Export' }, apiheader).then(({ data }) => {
            setExportData(data.Response.Adoptions)
        }).catch((error) => { 
        })
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            Adoption()
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [])
    return (
        <>
            <ReactHTMLTableToExcel
                table="my-table"
                filename={isLang === 'ar' ? 'بيانات التبني' : 'Adoptions data'}
                sheet="Sheet 1"
                buttonText={
                    <div className='d-flex gap-2 ' style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <SiMicrosoftexcel />
                        <span>{isLang === "ar" ? "تصدير إلى ملف إكسل" : "Export to excel sheet"}</span>
                    </div>
                }
                className='btn btn-sucess btn__excel'


            />
            <Table responsive={true} bordered id='my-table' className='rounded-3  d-none'>
                <thead>
                    <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                        <th style={{ width: '180px', height: '50px' }}>{isLang === 'ar' ? 'اسـم الحيـوان' : 'Pet Name'}</th>
                        <th style={{ width: '180px', height: '50px' }}>{isLang === 'ar' ? 'السلالـة' : 'Pet Strain'}</th>
                        <th style={{ width: '180px', height: '50px' }}>{isLang === 'ar' ? 'الفئــة' : 'Category'}</th>
                        <th style={{ width: '180px', height: '50px' }}>{isLang === 'ar' ? 'المدينــة' : 'City'}</th>
                        <th style={{ width: '180px', height: '50px' }}>{isLang === 'ar' ? 'اســم العميــل' : 'Client Name'}</th>
                        <th style={{ width: '180px', height: '50px' }}>{isLang === 'ar' ? 'الحالــة' : 'Status'}</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        exportData?.map((item, index) => (
                            <tr key={index}>
                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientName'>{item?.PetName}</span>
                                    </div>
                                </td>
                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientName'>{item?.PetStrain}</span>
                                    </div>
                                </td>
                                <td style={{ width: '200px' }}>
                                    <div className="text-center w-100" >
                                        <span className='ClientName'>{item?.AnimalSubCategoryName}</span>
                                    </div>
                                </td>
                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientName'>{item?.CityName}</span>
                                    </div>
                                </td>
                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientName'>{item?.ClientName}</span>
                                    </div>
                                </td>
                                <td className='text-center  d-flex '>
                                    <div>
                                        <span style={{ height: 'fit-content !important' }} >
                                            {isLang === 'en' && item?.AdoptionStatus && item?.AdoptionStatus[0].toUpperCase()}{isLang === 'en' && item?.AdoptionStatus && item?.AdoptionStatus.slice(1).toLowerCase()}

                                            {isLang === 'ar' && item?.AdoptionStatus === 'ACTIVE' ? 'نشــط' : ''}
                                            {isLang === 'ar' && item?.AdoptionStatus === 'PENDING' ? 'قيـد الإنتظـار' : ''}
                                            {isLang === 'ar' && item?.AdoptionStatus === 'ADOPTED' ? 'متبنـي' : ''}
                                            {isLang === 'ar' && item?.AdoptionStatus === 'CANCELLED' ? 'ملغــي' : ''}
                                            {isLang === 'ar' && item?.AdoptionStatus === 'REJECTED' ? 'رفض' : ''}                                        </span>
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


import React, { useContext } from 'react';
import { Table } from "react-bootstrap";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { SiMicrosoftexcel } from 'react-icons/si';
import { VendersContext } from '../../../context/Store';

const ExcelSheet = ({fetchDoctors}) => {
    let { isLang } = useContext(VendersContext);
    // const [exportData, setExportData] = useState(null)

    // const doctors = async () => {
    //     await PostData(`${process.env.REACT_APP_API_URL}/admin/doctors`, { Action: 'Export' }, apiheader).then(({ data }) => {
    //         setExportData(data.Response.Doctors)
    //     }).catch((error) => {
    //      })
    // }

    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         doctors()
    //     }, 1000);
    //     return () => clearTimeout(timeoutId);
    // }, [])
    return (
        <>
            <ReactHTMLTableToExcel
                table="my-table"
                filename={isLang === 'ar' ? 'بيانات الاطباء' : 'Doctors data'}
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
                             <th style={{width:'180px',height:'50px'}}>{isLang === 'ar' ? 'إسم الطبيب' : 'Doctor Name'}</th>
                            <th style={{width:'180px',height:'50px'}}>{isLang === 'ar' ? 'رقم هاتف الطبيب' : 'Doctor Phone'}</th>
                            <th style={{width:'180px',height:'50px'}}>{isLang === 'ar' ? 'بريد الالكتروني الطبيب' : 'Doctor Email'}</th>
                            <th style={{width:'180px',height:'50px'}}>{isLang === 'ar' ? 'الدولـة' : 'Country'}</th>
                            <th style={{width:'180px',height:'50px'}}>{isLang === 'ar' ? 'النـوع' : 'Type'}</th>
                            <th style={{width:'180px',height:'50px'}}>{isLang === 'ar' ? 'الرصيــد' : 'Balance'}</th>
                            <th style={{width:'180px',height:'50px'}}>{isLang === 'ar' ? 'الحالـة' : 'Status'}</th>
                            <th style={{width:'180px',height:'50px'}}>{isLang === 'ar' ? 'تاريخ التسجيـل' : 'Register Date'}</th>
                     </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        fetchDoctors?.map((item, index) => (
                            <tr key={index}>
                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientName'>{item?.DoctorName}</span>
                                    </div>
                                </td>
                                <td  >
                                    <div className="text-center w-100">
                                        <span className='ClientPhone' style={{ width: '200px', textAlign: 'left' }}>{item?.DoctorPhone}</span>
                                    </div>
                                </td>
                                <td style={{ width: '300px' }}>
                                    <div className="text-center w-100" >
                                        <span className='ClientName'>{item?.DoctorEmail}</span>
                                    </div>
                                </td>
                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientName'>{item?.CountryNameEn}</span>
                                    </div>
                                </td>
                                <td >
                                    <div className="text-center w-100">
                                        <span className='ClientName'>{item?.DoctorType.split(' ')
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                            .join(' ')}</span>
                                    </div>
                                </td>
                                <td >
                                    <div>
                                        <h6 className="mb-0  pe-2 bolder">
                                            {item?.DoctorBalance} {isLang === 'ar' ? ' ريال سعودي' : 'SAR'}
                                        </h6>
                                    </div>
                                </td>
                                <td className='text-center  d-flex '>
                                    <div>
                                        <span style={{ height: 'fit-content !important' }} >
                                            {isLang === 'en' && item?.DoctorStatus && item?.DoctorStatus[0].toUpperCase()}{isLang === 'en' && item?.DoctorStatus && item?.DoctorStatus.slice(1).toLowerCase()}
                                            {isLang === 'ar' && item?.DoctorStatus === 'ACTIVE' ? 'نشــط' : ''}
                                            {isLang === 'ar' && item?.DoctorStatus === 'PENDING' ? 'قيـد الإنتظـار' : ''}
                                            {isLang === 'ar' && item?.DoctorStatus === 'BLOCKED' ? 'محظــور' : ''}
                                            {isLang === 'ar' && item?.DoctorStatus === 'OFFLINE' ? 'مغلـق' : ''}
                                            {isLang === 'ar' && item?.DoctorStatus === 'NOT_VERIFIED' ? 'غير مثبـت' : ''}
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

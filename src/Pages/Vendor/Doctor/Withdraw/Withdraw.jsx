import React, { useContext, useEffect, useRef, useState } from 'react'
import { PostData, apiheader } from '../../../../utils/fetchData'
import { useParams } from 'react-router-dom'
import useSkeletonTable from '../../../../utils/useSkeletonTable'
import initialTranslation from './Translation'
import { VendersContext } from '../../../../context/Store'
import { DropdownButton, Table,Dropdown } from 'react-bootstrap'
import Component from '../../../../constants/Component'
import { toast } from 'react-hot-toast'
const Withdraw = () => {

    let { id } = useParams()
    let { isLang } = useContext(VendersContext);

    const [withdrawData, setWithdrawData] = useState([])
    const [isLoader, setIsloader] = useState(false);
    let { SkeletonTable, SkeletonFilters } = useSkeletonTable();

    let startDate = useRef()
    let endDate = useRef()

    const WithdrawGetData = async () => {
        await PostData(
            `${process.env.REACT_APP_API_URL}/admin/doctors/withdraws`,
            { IDDoctor: id },
            apiheader
        )
            .then(({ data }) => {
                setWithdrawData(data.Response);
                const timeoutId = setTimeout(() => {
                    setIsloader(true)
                }, 0);
                return () => clearTimeout(timeoutId);
            })
            .catch((error) => {
                if (error.response && error.response.status === 429) {
                    const retryAfter = error.response.headers["retry-after"];
                    setTimeout(() => {
                        WithdrawGetData();
                    }, (retryAfter || 60) * 1000);
                }
            });
    };

    // withdrow status
    const handleActionSelect = async (id, action) => {
        if (action === "PROCESSED" || action === "REJECTED" ) {
            await userstatus({ IDDoctorWithdraw: id, WithdrawStatus: action }).then((res) => {
                toast.success(<strong>{initialTranslation[isLang]?.toast.update}</strong>, {
                    duration: 4000,
                    position: 'bottom-center',
                    iconTheme: {
                        primary: '#3182CE',
                        secondary: '#fff',
                    },
                });
            })
            await WithdrawGetData()
        } 
    };

    const userstatus = async (status) => {
        return await PostData(`https://bytrh.com/api/admin/doctors/withdraws/status`, status, apiheader)
    }


    useEffect(() => {
        WithdrawGetData()
        return () => {
            WithdrawGetData()
        }
    }, [id])

    return (
        <>


            <div className="app__Users ">

                <Component.SubNav sub__nav={[
                    { name: initialTranslation[isLang]?.nav[0].navList1, path: `/doctors` },
                    { name: initialTranslation[isLang]?.nav[1].navList2, path: `/doctors/withdraw/${id}` }
                ]} />
                <div className="app__Users-table ">


                    {isLoader ? <>
                        <>
                            {
                                withdrawData?.length > 0 ?
                                    <Table responsive={true} className="rounded-3 ">
                                        <thead>
                                            <tr className="text-center  " style={{ background: "#F9F9F9" }}  >
                                                {initialTranslation[isLang]?.TableHeader?.map((el, i) => (
                                                    <th key={i}>{el}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            {withdrawData?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div>{item?.WithdrawAccountNumber}</div>
                                                    </td>

                                                    <td>
                                                        <div className="d-flex gap-1">
                                                            <h6 className={`mb-0 ${isLang === 'ar' ? 'ps-2' : 'pe-2'} color-red`}>{item?.WithdrawAmount}{' '}{isLang === 'ar' ? 'ريال سعودي' : 'SAR'}</h6>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div>{item?.WithdrawAccountName}</div>
                                                    </td>

                                                    <td>
                                                        <div>{item?.WithdrawBankName}</div>
                                                    </td>

                                                    <td>
                                                        <div>{item?.WithdrawIBAN}</div>
                                                    </td>

                                                    <td className='text-center d-flex '>
                                                        <div>
                                                            <span style={{ height: 'fit-content !important' }} className={`  ${item?.WithdrawStatus === 'PROCESSED' && 'txt_delivered'}     ${item?.WithdrawStatus === 'REJECTED' && 'txt_rejected'}  `} >
                                                                {isLang === 'en' && item?.WithdrawStatus && item?.WithdrawStatus[0].toUpperCase()}
                                                                {isLang === 'en' && item?.WithdrawStatus && item?.WithdrawStatus.slice(1).toLowerCase().replace('_', ' ')}
                                                                {isLang === 'ar' && item?.WithdrawStatus === 'PROCESSED' ? 'تمت المعالجة ' : ''}
                                                                {isLang === 'ar' && item?.WithdrawStatus === 'REJECTED' ? ' مرفوض ' : ''}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td >
                                                        <div className="d-flex flex-column justify-content-center align-content-center" style={{ gap: "0" }}  >
                                                            <span className="ClientName">  {" "}    {item?.WithdrawDate.split(" ")[0]}{" "}   </span>
                                                            <span className="ClientPhone">  {" "} {item?.WithdrawDate.split(" ")[1]}  </span>
                                                        </div>
                                                    </td>

                                                    <td>
                                                    <div>

                                                        <span>
                                                            <DropdownButton
                                                                id={`dropdown-${item.IDUser}`}
                                                                title={initialTranslation[isLang].ActionsNamebtn}
                                                                variant="outline-success"
                                                                onSelect={(eventKey) => handleActionSelect(item.IDDoctorWithdraw, eventKey)}
                                                                className="DropdownButton "
                                                            >  
                                                                {
                                                                    initialTranslation[isLang]?.FilterStatus?.filter?.((item) => item.value !== "All").map((status, index) => (
                                                                        <React.Fragment key={index}>
                                                                            {
                                                                                item?.UserStatus === status.value ? '' : <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey={status.value}>{status.text}</Dropdown.Item>
                                                                            }
                                                                        </React.Fragment>
                                                                    ))
                                                                }
                                                            </DropdownButton>
                                                        </span>
                                                    </div>
                                                </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    :
                                    <Component.DataNotFound />
                            }
                        </>
                    </> :
                        SkeletonTable()
                    }
                </div>
            </div>
        </>
    )
}

export default Withdraw

import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, DropdownButton, NavDropdown, Table } from "react-bootstrap";
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Component from '../../constants/Component';
import Icons from '../../constants/Icons';
import { VendersContext } from "../../context/Store";
import { apiheader, GetData, PostData } from '../../utils/fetchData';
import useSkeletonTable from "../../utils/useSkeletonTable";
import initialTranslation from "./Translation";


const Services = () => {
    let { isLang } = useContext(VendersContext);
    const [translate, setTranslate] = useState(initialTranslation)
    const handelTranslate = () => setTranslate(initialTranslation)

    const [servicesData, setServicesData] = useState([]);
    const [isLoader, setIsloader] = useState(true);
    let { SkeletonTable } = useSkeletonTable();

    const ServicesList = async () => {
        setIsloader(true)
        await PostData(`${process.env.REACT_APP_API_URL}/admin/services`, {}, apiheader).then(({ data }) => {
            setServicesData(data.Response.Services);
            setIsloader(false);
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleActionSelect = async (id, action) => {
        if (action === "ACTIVE" || action === "INACTIVE") {
            await ServicesDataStatus(id).then((res) => {
                toast.success(<strong>{translate[isLang].toast.update}</strong>, {
                    duration: 4000,
                    position: 'bottom-center',
                    iconTheme: {
                        primary: '#3182CE',
                        secondary: '#fff',
                    },
                });
            })
            await ServicesList()
        }
    };

    const ServicesDataStatus = async (id) => {
        return await GetData(`${process.env.REACT_APP_API_URL}/admin/services/status/${id}`, apiheader)
    }


    useEffect(() => {
        const timeOut = setTimeout(() => {
            ServicesList()
            window.scrollTo(0, 0);
            handelTranslate()
        }, 200);

        return () => clearTimeout(timeOut);

    }, [isLang])

    return (

        <>
            <div className="app__Users ">
                <div className="app__Users-table">
                    <div className="search-container">
                        <div className="search_and__btn w-100">
                            <Component.ButtonBase title={translate[isLang].add.btn} bg={"primary"} icon={<Icons.Add size={21} color={'#ffffffb4'} />} path="./add" />
                        </div>
                    </div>
                    {!isLoader ? 
                        <>
                            <Table responsive={true} className='rounded-3 '>
                                <thead>
                                    <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                                        {
                                            translate[isLang]?.TableHeader?.map((item, index) => (
                                                <th key={index}>{item}</th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {
                                        servicesData?.map((item, index) => (
                                            <tr key={index}>
                                                <td >
                                                    <div>
                                                        {item?.ServiceName}
                                                    </div>
                                                </td>

                                                <td >
                                                    <div>
                                                        <span style={{ height: 'fit-content !important' }} className={`  ${item?.ServiceActivated === 1 && 'txt_delivered'}  ${item?.ServiceActivated === 0 && 'txt_rejected'} `} >
                                                            {
                                                                translate[isLang].FilterStatus?.filter((itemfilter) => itemfilter.ServiceActivated === item?.ServiceActivated)
                                                                    .map((status, index) => (
                                                                        <React.Fragment key={index}>
                                                                            {item?.ServiceActivated === status.ServiceActivated ? status.text : ''}
                                                                        </React.Fragment>
                                                                    ))
                                                            }
                                                        </span>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div>
                                                        <span>
                                                            <DropdownButton
                                                                id={`dropdown-${item.IDService}`}
                                                                title={translate[isLang]?.Actions.action}
                                                                variant="outline-success"
                                                                onSelect={(eventKey) => handleActionSelect(item.IDService, eventKey)}
                                                                className="DropdownButton "
                                                                drop={'down-centered'}
                                                            >
                                                                <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey="Edite" as={Link} to={`./edit/${item.IDService}`}>
                                                                    {translate[isLang]?.Actions.edit}
                                                                </Dropdown.Item>
                                                                <NavDropdown.Divider />

                                                                {
                                                                    translate[isLang].FilterStatus?.filter?.((item) => item.value !== "All").map((status, index) => (
                                                                        <React.Fragment key={index}>
                                                                            {item?.ServiceActivated === status.ServiceActivated ? '' : item?.UserStatus === status.value ? '' : <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey={status.value}>{status.text}</Dropdown.Item>}
                                                                        </React.Fragment>
                                                                    ))
                                                                }
                                                            </DropdownButton>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>

                            </Table>
                        </> 
                        : 
                        SkeletonTable()
                    }
                </div>

            </div>
        </>

    )
}

export default Services
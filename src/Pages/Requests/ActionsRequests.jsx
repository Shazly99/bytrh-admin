import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LogoSvg from '../../assets/svg/LogoSvg'
import initialTranslation from "../Services/Translation.js";
import { toast } from 'react-hot-toast';
import { PostData, apiheader } from '../../utils/fetchData';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { VendersContext } from '../../context/Store';

const ActionsRequests = ({ RequestType, idType, RequestStatus, RequestsList }) => {
    let { isLang } = useContext(VendersContext);

    const [translate, setTranslate] = useState(initialTranslation)
    const handelTranslate = () => setTranslate(initialTranslation)

    const handelRoute = (type, id) => {
        if (type === 'DOCTOR') {
            return `/doctors/doctorProfile/${id}`
        }
    }

    const handleActionSelect = async (id, action) => {
        if (action === "ACTIVE" || action === "INACTIVE" || action === 'PENDING') {

            await ServicesDataStatus(id, action).then((res) => {
                toast.success(<strong>{translate[isLang].toast.update}</strong>, {
                    duration: 4000,
                    position: 'bottom-center',
                    iconTheme: {
                        primary: '#3182CE',
                        secondary: '#fff',
                    },
                });
            })

            RequestsList()
        }
    };

    const ServicesDataStatus = async (id, action) => {
        return await PostData(`${process.env.REACT_APP_API_URL}/admin/services/status`, { IDService: id, ServiceStatus: action }, apiheader)
    }
    return (
        <>
            {
                RequestType === 'DOCTOR' &&
                <Link to={handelRoute(RequestType, idType)}  >
                    <LogoSvg.view className="logoSvg" style={{ width: 19 }} />
                </Link>
            }


            {
                RequestType === 'DOCTOR_SERVICE' &&
                <span>
                    <DropdownButton
                        id={`dropdown-${idType}`}
                        title={translate[isLang]?.Actions.action}
                        variant="outline-success"
                        onSelect={(eventKey) => handleActionSelect(idType, eventKey)}
                        className="DropdownButton "
                        drop={'down-centered'}
                    >
                        {
                            translate[isLang].FilterStatus?.filter?.((item) => item.value !== "All").map((status, index) => (
                                <React.Fragment key={index}>

                                    {
                                        RequestStatus === status.value ? '' :
                                            <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey={status.value}>{status.text !== "Pending" ? status.text : ''}</Dropdown.Item>
                                    }
                                </React.Fragment>
                            ))
                        }
                    </DropdownButton>
                </span>
            }


             {/* {
                RequestType === 'DOCTOR_SERVICE' &&

                
                }   */}
        </>
    )
}

export default ActionsRequests

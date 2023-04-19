import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton, Row, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";

import img from "../../../assets/Img";
import Component from "../../../constants/Component";
import Icons from "../../../constants/Icons";
import { VendersContext } from "../../../context/Store";
import { apiheader, PostData } from "../../../utils/fetchData";
import useSkeletonTable from "../../../utils/useSkeletonTable";
import initialTranslation from "./Translation";

const DoctorRequest = () => {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslation)
  const handelTranslate = () => {
    setTranslate(initialTranslation)
  }
  let { SkeletonTable } = useSkeletonTable();

  const [medicalCenter, setmedicalCenter] = useState([]);
  const [page, setPage] = useState(1);
  const [PagesNumber, setPagesNumber] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoader, setIsloader] = useState(false);
  // **pagination
  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;

  // **get doctorRequest
  const doctorRequest = async (page) => {
    await PostData(
      `${process.env.REACT_APP_API_URL}/admin/medicalcenter/doctors/requests`,
      { IDPage: page },
      apiheader
    ).then(({ data }) => {
      setmedicalCenter(data.Response);
      setPagesNumber(data.Response.Pages);
      const timeoutId = setTimeout(() => {
        setIsloader(true)
      }, 0);
      return () => clearTimeout(timeoutId);
    })
      .catch((error) => {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers["retry-after"];
          setTimeout(() => {
            doctorRequest();
          }, (retryAfter || 60) * 1000);
        }
      });
  };

  // **pagination
  const handleChange = (event, value) => {
    setPage(value);
  };
  // ToDo::change Blogs status
  const handleActionSelect = async (id, action) => {
    if (
      action === "ACTIVE" ||
      action === "REJECTED" ||
      action === "INACTIVE"
    ) {
      await ChangedoctorRequestStatus({
        IDMedicalCenterDoctor: id,
        MedicalCenterDoctorStatus: action
      }).then((res) => {
        toast.success("Updated Successfully", {
          duration: 4000,
          position: "top-center",
          icon: <Icons.UploadItem color="#3182CE" size={20} />,
          iconTheme: {
            primary: "#0a0",
            secondary: "#fff",
          },
        });
      });
      await doctorRequest();
    }
    await doctorRequest();
  };
  const ChangedoctorRequestStatus = async (blog) => {
    return await PostData(
      `${process.env.REACT_APP_API_URL}/admin/medicalcenter/doctors/requests/status`,
      blog,
      apiheader
    );
  };



  // !Filter by  Medical Center Type
  // const medicalCenterTypeRef = useRef(null);
  // const handelMedicalCenterType = async () => {
  //   let MedicalCenterType = MedicalCenterType.current.value
  //   if (MedicalCenterType === 'All') {
  //     doctorRequest()
  //   } else if (MedicalCenterType === 'Select Product Type') {
  //     return false
  //   } else {
  //     await axios.post(`${process.env.REACT_APP_API_URL}/admin/medicalcenter`, { IDPage: page, MedicalCenterType: MedicalCenterType }, apiheader).then((res) => {
  //       if (res.status === 200 && res.request.readyState === 4) {
  //         setmedicalCenter(res.data.Response.MedicalCenters);
  //         setPagesNumber(res.data.Response.Pages);
  //       }
  //     })
  //   }
  // }
  useEffect(() => {
    let timeOut = setTimeout(() => {
      doctorRequest(page);
      window.scrollTo(0, 0);
      handelTranslate()
    }, 100);
    return (() => {
      clearTimeout(timeOut);
    })
  }, [page, isLoader, isLang]);
  useEffect(() => { }, [page, PagesNumber]);
  // const SkeletonSearch = (w, h) => {
  //   return (
  //     <div className="d-flex gap-2">
  //       <Skeleton variant='rounded' animation='wave' height={w} width={h} />
  //     </div>
  //   )
  // }
  // const SkeletonFilter = () => {
  //   return (
  //     <div className="d-flex flex-column  gap-2 mt-2">
  //       <Skeleton variant='rounded' animation='wave' height={15} width={'60%'} />
  //       <Skeleton variant='rounded' animation='wave' height={26} width={'100%'} />
  //     </div>
  //   )
  // }

  return (
    <>
      <div className="app__Users ">
        <div className="app__Users-table">
          <div className="search-container">
            <div className='  w-100'>

              <div className=' app__addOrder-form '>
                <Row className='d-flex  flex-row justify-content-between'>

                  {/* <Col xl={2} lg={2} md={6} sm={12} className='mt-2'>
                  {isLoader ? <>
                    <Form.Group controlId="formBasicEmail"  >
                      <Form.Select aria-label="Default select example" ref={medicalCenterTypeRef} onClick={handelMedicalCenterType} >
                        <option selected disabled hidden value={'Select Product Type'}> {translate[isLang]?.filter?.Product} </option>
                        {
                          translate[isLang]?.Filtertype?.map((Status, index) => (
                            <>
                              <option key={index} value={Status.value}  >{Status.text}</option>
                            </>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>
                  </> : SkeletonFilter()}
                </Col> */}

                </Row>
              </div>
            </div>
          </div>

          {isLoader ? <>
            <>
              {
                medicalCenter?.length > 0 ?
                  <Table responsive={true} className="rounded-3 ">
                    <thead>
                      <tr className="text-center  " style={{ background: "#F9F9F9" }} >
                        {
                          translate[isLang]?.TableHeader?.map((item, index) => (
                            <th key={index}>{item}</th>
                          ))
                        }
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {medicalCenter?.map((item, index) => (
                        <tr key={index}>

                          <td>
                            <div
                              className="d-flex flex-column justify-content-center align-content-center"
                              style={{ gap: "0" }}
                            >
                              <span className="ClientName">
                                {item?.DoctorName}
                              </span>
                              <span className="ClientPhone">
                                {item?.DoctorPhone}
                              </span>
                            </div>
                          </td>

                          <td>
                            <div>
                              {item?.RequestUser.charAt(0).toUpperCase() +
                                item?.RequestUser.slice(1).toLowerCase()}
                            </div>
                          </td>
                          <td>
                            <div className="blog__status">
                              <span
                                style={{ height: "fit-content  important" }}
                                className={`  ${item.MedicalCenterDoctorStatus === "PENDING" && "txt_pending"}  
                                             ${item.MedicalCenterDoctorStatus === "INACTIVE" && "txt_rejected"} 
                                              ${item.MedicalCenterDoctorStatus === "ACTIVE" && "txt_delivered"}`}
                              >
                                {
                                  translate[isLang].FilterStatus?.filter((itemfilter) => itemfilter.value === item?.MedicalCenterDoctorStatus)
                                    .map((status, index) => (
                                      <React.Fragment key={index}>
                                        {item?.MedicalCenterDoctorStatus === status.value ? status.text : ''}
                                      </React.Fragment>
                                    ))
                                }
                              </span>
                              {/*<div className="delete">
                              <DropdownButton
                                title={
                                  <img src={img.dropdown} alt="Img.dropdown" />
                                }
                                id="dropdown-menu"
                                variant="outline-success"
                                onClick={() => setShowDropdown(!showDropdown)}
                                onSelect={(eventKey) =>
                                  handleActionSelect(
                                    item.IDMedicalCenterDoctor,
                                    eventKey
                                  )
                                }
                                className="DropdownButton "
                                drop={"down-centered"}
                              >
                                {
                                  translate[isLang]?.FilterStatus?.filter?.((item) => item.value !== "All")?.map((Status, index) => (
                                    <>
                                      {item?.MedicalCenterDoctorStatus === Status.value ? (
                                        ""
                                      ) : (
                                        <Dropdown.Item eventKey={Status.value} className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"}>
                                          {Status.text}
                                        </Dropdown.Item>
                                      )}
                                    </>
                                  ))
                                }
                              </DropdownButton>
                            </div> */}
                            </div>
                          </td>

                          <td>
                            <div>
                              <span>
                                {
                                  item?.RequestUser === "CENTER" ?
                                    <Button variant=" outline-sucess" className="DropdownButton outline-sucess outline-sucessChat" title="Rejected Doctor" onClick={() => handleActionSelect(item.IDMedicalCenterDoctor, 'REJECTED')}> Reject</Button> :
                                    <DropdownButton
                                      id={`dropdown-${item.IDVisit}`}
                                      title={translate[isLang]?.Actions.action}
                                      variant="outline-success"
                                      onSelect={(eventKey) => handleActionSelect(item.IDMedicalCenterDoctor, eventKey)}
                                      className="DropdownButton "
                                      drop={'down-centered'}
                                    >


                                      {
                                        translate[isLang].FilterStatus?.filter?.((item) => item.value !== "All").map((status, index) => (
                                          <React.Fragment key={index}>
                                            {item?.MedicalCenterDoctorStatus === status.value ? '' : <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey={status.value}>{status.text}</Dropdown.Item>}
                                          </React.Fragment>
                                        ))
                                      }
                                    </DropdownButton>
                                }
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table> :
                  <Component.DataNotFound />
              }
            </>
          </> : SkeletonTable()}
        </div>
      </div>
      <div className="pagination " dir="ltr">
        {
          pageCount &&
          <Box
            sx={{
              margin: "auto",
              width: "fit-content",
              alignItems: "center",
            }}
          >
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChange}
            />
          </Box>
        }
      </div>
    </>
  )
}

export default DoctorRequest
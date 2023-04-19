
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState, useRef, useContext } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import Component from "../../../constants/Component";
import Icons from "../../../constants/Icons";
import useSkeletonTable from "../../../utils/useSkeletonTable";
import { apiheader, GetData, PostData } from "./../../../utils/fetchData";
import { VendersContext } from "../../../context/Store";
import translateBaggingPrice from './baggingPrice';


const BaggingPricing = () => {
  let { isLang } = useContext(VendersContext);
  const [animal, setAnimal] = useState(null);
  const [page, setPage] = useState(1);
  const [PagesNumber, setPagesNumber] = useState("");
  const [isLoader, setIsloader] = useState(false);

  let { SkeletonTable, SkeletonFilters } = useSkeletonTable();

  let changePrice = useRef()
  // Modal Table Delete
  const [modalShow, setModalShow] = React.useState(false);
  const [modalIndex, setModalIndex] = React.useState(0);
  function handleModalClose() {
    setModalShow(false);
  }
  function handleModalOpen(index) {
    setModalIndex(index);
    setModalShow(true);
  }
  // Modal Table Edit
  const [modalShowEdit, setModalShowEdit] = React.useState(false);
  const [modalIndexEdit, setModalIndexEdit] = React.useState(0);
  function handleModalCloseEdit() {
    setModalShowEdit(false);
  }
  function handleModalOpenEdit(index) {
    setModalIndexEdit(index);
    setModalShowEdit(true);
  }

  // pagination
  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;

  // get baggings
  const baggings = async () => {
    await PostData(
      `${process.env.REACT_APP_API_URL}/admin/baggings/pricing`,
      { IDPage: page },
      apiheader
    )
      .then(({ data }) => {
        setAnimal(data.Response.SubCategoryBagging);
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
            baggings();
          }, (retryAfter || 60) * 1000);
        }
      });
  };

  // pagination
  const handleChange = (event, value) => {
    setPage(value);
  };

  // change status Delete 
  const handleActionSelect = async (id) => {
    await baggingsStatus(id).then((res) => {
      toast.success("Deleted", {
        duration: 4000,
        position: "top-center",
        icon: <Icons.UploadItem color="#3182CE" size={20} />,
        iconTheme: {
          primary: "#0a0",
          secondary: "#fff",
        },
      });
    });
    handleModalClose()
    await baggings();
  };
  const baggingsStatus = async (id) => {
    return await GetData(
      `${process.env.REACT_APP_API_URL}/admin/baggings/pricing/status/${id}`,
      apiheader
    );
  };


  const handleChangePrice = async (id, IDCutting) => {

    await cuttingChangePrice(
      { IDBagging: IDCutting, IDAnimalSubCategory: id, SubCategoryBaggingPrice: changePrice.current.value }
    ).then((res) => {
      toast.success("update price ", {
        duration: 4000,
        position: "top-center",
        icon: <Icons.UploadItem color="#3182CE" size={20} />,
        iconTheme: {
          primary: "#0a0",
          secondary: "#fff",
        },
      });
    });
    handleModalCloseEdit()
    await baggings();
  };
  const cuttingChangePrice = async (priceUpdate) => {
    return await PostData(`${process.env.REACT_APP_API_URL}/admin/baggings/pricing/add`, priceUpdate, apiheader);
  };

  // search and filter

  useEffect(() => {
    baggings(page);
    window.scrollTo(0, 0);
  }, [page,isLang]);
  useEffect(() => { }, [page, PagesNumber]);




  return (
    <>

      <div className="app__Users ">

        <div className="app__Users-table">
          {isLoader ? <>
            <Component.ButtonBase
              title={translateBaggingPrice[isLang]?.addBTN}
              bg={"primary"}
              icon={<Icons.Add size={21} color={"#ffffffb4"} />}
              path="/animals/baggingprice/addbaggingprice"
            />
          </> :
            <div className="mt-3 p-2">
              {SkeletonFilters(40, 150)}
            </div>
          }
          {isLoader ? <>
            <Table responsive={true} className="rounded-3 ">
              <thead>
                <tr
                  className="text-center  "
                  style={{ background: "#F9F9F9" }}
                >
                  {translateBaggingPrice[isLang]?.TableHeader?.map((el, i) => (
                    <th key={i}>{el}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-center">
                {animal?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div>{item?.AnimalSubCategoryName}</div>
                    </td>
                    <td>
                      <div>{item?.BaggingName}</div>
                    </td>

                    <td>
                      <div className="d-flex gap-1">
                        <h6 className={`mb-0 ${isLang === 'ar' ? 'ps-2' : 'pe-2'} color-red`}>{item?.SubCategoryBaggingPrice}{' '}{isLang === 'ar' ? 'ريـال' : 'SAR'}</h6>
                        <Icons.edit
                          onClick={() => handleModalOpenEdit(index)}
                        />
                        <Modal
                          show={modalShowEdit && modalIndexEdit === index}
                          onHide={handleModalCloseEdit}
                          centered
                          dir={isLang === 'ar' ? 'rtl' : 'ltr'}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title className='w-100 text-center'>{translateBaggingPrice[isLang]?.ModalHeader}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body className="d-flex justify-content-center align-items-center gap-1 flex-column" >
                            <input className="form-control" defaultValue={item.SubCategoryBaggingPrice} ref={changePrice} />
                          </Modal.Body>
                          <Modal.Footer className="d-flex justify-content-center align-items-center">

                            <Button variant="outline-primary" onClick={handleModalCloseEdit}>
                              {translateBaggingPrice[isLang]?.CancelBTN}
                            </Button>
                            <Button onClick={() => handleChangePrice(item.IDAnimalSubCategory, item.IDBagging)}>
                              {translateBaggingPrice[isLang]?.ModalSetPrice}
                            </Button>
                          </Modal.Footer>
                        </Modal>


                      </div>
                    </td>

                    <td>
                      <div>
                        <span>
                          <Button
                            variant=" outline-sucess"
                            onClick={() => handleModalOpen(index)}
                            className="DropdownButton outline-sucess"
                          >
                            {isLang === 'ar' ? 'حـذف' : 'Detete'}
                          </Button>
                          <Modal
                            show={modalShow && modalIndex === index}
                            onHide={handleModalClose}
                            centered
                            dir={isLang === 'ar' ? 'rtl' : 'ltr'}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title className='  w-100 '>{translateBaggingPrice[isLang]?.ModalHeaderDel}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="d-flex justify-content-center align-items-center gap-1 flex-column" >
                              <Component.HandelDelete />

                              <input className="form-control" defaultValue={item.SubCategoryBaggingPrice} disabled />
                            </Modal.Body>
                            <Modal.Footer className="d-flex justify-content-center align-items-center">

                              <Button variant="danger" style={{ border: '#dc3545' }} onClick={() => handleActionSelect(item.IDSubCategoryCutting)}>
                                {translateBaggingPrice[isLang]?.ModalDelPrice}
                              </Button>
                              <Button variant="outline-primary" onClick={handleModalClose}>
                                {translateBaggingPrice[isLang]?.CancelBTN}
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </> :
            SkeletonTable()
          }
        </div>
      </div>
      <div className="pagination "  dir="ltr">
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

export default BaggingPricing
import { Player } from "@lottiefiles/react-lottie-player";
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState, useRef } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import Component from "../../../constants/Component";
import Icons from "../../../constants/Icons";
import useSkeletonTable from "../../../utils/useSkeletonTable";
import { apiheader, GetData, PostData } from "./../../../utils/fetchData";

const CuttingPricing = () => {
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
      `${process.env.REACT_APP_API_URL}/admin/cuttings/pricing`,
      { IDPage: page },
      apiheader
    )
      .then(({ data }) => {
        setAnimal(data.Response.SubCategoryCutting);
        setPagesNumber(data.Response.Pages);
        const timeoutId = setTimeout(() => {
          setIsloader(true)
        }, 200);
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
      `${process.env.REACT_APP_API_URL}/admin/cuttings/pricing/status/${id}`,
      apiheader
    );
  };


  const handleChangePrice = async (id, IDCutting) => {
    await cuttingChangePrice(
      { IDCutting: IDCutting, IDAnimalSubCategory: id, SubCategoryCuttingPrice: changePrice.current.value }
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
    return await PostData(`${process.env.REACT_APP_API_URL}/admin/cuttings/pricing/add`, priceUpdate, apiheader);
  };


  useEffect(() => {
    baggings(page);
    window.scrollTo(0, 0);
  }, [page]);
  useEffect(() => { }, [page, PagesNumber]);

  return (
    <>
      <div className="app__Users ">
        {isLoader ? <>
          <Component.ButtonBase
            title={"Add  "}
            bg={"primary"}
            icon={<Icons.Add size={21} color={"#ffffffb4"} />}
            path="/animals/cuttingprice/addcuttingprice"
          />
        </> :
          <div className="mt-3 p-2">
            {SkeletonFilters(40, 150)}
          </div>
        }
        <div className="app__Users-table">

          {isLoader ? <>
            <Table responsive={true} className="rounded-3 ">
              <thead>
                <tr
                  className="text-center  "
                  style={{ background: "#F9F9F9" }}
                >
                  <th>Animal SubCategory  </th>
                  <th>Cutting Name</th>
                  <th>Cutting Price </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {animal?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div>{item?.AnimalSubCategoryName}</div>
                    </td>
                    <td>
                      <div>{item?.CuttingName}</div>
                    </td>

                    <td>
                      <div className="d-flex gap-1">
                        <h6 className="mb-0  pe-2 color-red">{item?.SubCategoryCuttingPrice}{' '}SAR</h6>
                        <Icons.edit
                          onClick={() => handleModalOpenEdit(index)}
                        />
                        <Modal
                          show={modalShowEdit && modalIndexEdit === index}
                          onHide={handleModalCloseEdit}
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title className='  w-100 text-center'>  price Details</Modal.Title>
                          </Modal.Header>
                          <Modal.Body className="d-flex justify-content-center align-items-center gap-1 flex-column" >
                            <input className="form-control" defaultValue={item.SubCategoryCuttingPrice} ref={changePrice} />
                          </Modal.Body>
                          <Modal.Footer className="d-flex justify-content-center align-items-center">

                            <Button variant="outline-primary" onClick={handleModalCloseEdit}>
                              Cancel
                            </Button>
                            <Button style={{ border: '#FAAA40' }} onClick={() => handleChangePrice(item.IDAnimalSubCategory, item.IDCutting)}>
                              Set Price
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
                          >Detete</Button>
                          <Modal
                            show={modalShow && modalIndex === index}
                            onHide={handleModalClose}
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title className='  w-100 '> Delete Cutting Price </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="d-flex justify-content-center align-items-center gap-1 flex-column" >

                              <div className="expired-container">
                                <Player
                                  className="expired-image"
                                  src="https://assets6.lottiefiles.com/packages/lf20_dqnvaulk.json"
                                  autoplay
                                  loop
                                />
                              </div>                            <input className="form-control" defaultValue={item.SubCategoryCuttingPrice} disabled />
                            </Modal.Body>
                            <Modal.Footer className="d-flex justify-content-center align-items-center">

                              <Button variant="outline-primary" onClick={handleModalClose}>
                                Cancel
                              </Button>
                              <Button variant="danger" style={{ border: '#FAAA40' }} onClick={() => handleActionSelect(item.IDSubCategoryCutting)}>
                                Delete
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
      <div className="pagination ">
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
      </div>
    </>
  );
};

export default CuttingPricing;

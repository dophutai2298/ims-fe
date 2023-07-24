import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import * as apiaxios from "../../../api/service";
import { deleteDg, getDg } from "../../../redux/action/dg.action";
import AddDg from "../../dg/addDg/index";
import Swal from "sweetalert2";

function TableDg(props) {
  const [dg, setDg] = useState([]);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const idBatch = localStorage.getItem("idBatch");
  useEffect(() => {
    dispatch(getDg());
  }, []);

  const [open, setOpen] = useState(false);
  const [valuesId, setValuesId] = useState(null);
  useEffect(() => {
    apiaxios.dg(`dg?idInternshipCourse=${idBatch}`, "Get", null).then((res) => {
      setDg(res.data.data);
    });
  }, [dg]);

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const [values, setValues] = useState({
    nameDG: "",
  });
  const handleEditClick = (dg) => {
    setValuesId(dg.idDG);
    const formValues = {
      nameDG: dg.nameDG,
    };
    setValues(formValues);
  };
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...values };
    newFormData[fieldName] = fieldValue;
    setValues(newFormData);
  };
  const editSubmit = (event) => {
    event.preventDefault();
    const editDg = {
      nameDG: values.nameDG
    };
    apiaxios
      .dgEdit(`dg/${valuesId}`, editDg)
      .then((res) => {
        const newDg = [...posts];
        const index = posts.findIndex((dg) => dg.idDG === valuesId);
        newDg[index] = editDg;
        setPosts(newDg);
        handleCloseModal();
        setDg(newDg);
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            icon: "error",
            text: error.response.data.error,
            confirmButtonText: "Xác nhận",
          });
        } else if (error.request) {
          Swal.fire({
            icon: "error",
            text: error.request,
            confirmButtonText: "Xác nhận",
          });
        } else {
          console.log("Error", error.message);
          Swal.fire({
            icon: "error",
            text: error.message,
            confirmButtonText: "Xác nhận",
          });
        }
      });
    const newDg = [...dg];
    const index = dg.findIndex(
      (products) => products.idInternshipCourse === valuesId
      );
    newDg[index] = editDg;
  };
  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    Array.from(document.querySelectorAll("select")).forEach(
      (select) => (select.value = "Chọn...")
    );
  };
  return (
    <div>
      <h3>DANH SÁCH NHÓM THỰC TẬP </h3>
      <div className="grid griddg wide widedg home-mentor">
        <div className="row home-mentor--list">
          <span className="col l-2-2-dg ">Tên DG</span>
          <span className="col l-2-2-dg " style={{ marginRight: "11px" }}>
            Tác vụ
          </span>
        </div>
        <div>
          {dg.map((dg1) => (
            <ul className="row sm-gutter sm-gutter--list" key={dg.id}>
              <li className="col l-2-2-dg">{dg1.nameDG}</li>
              <li className="col l-2-2-dg">
                <i
                  onClick={() => {
                    dispatch(deleteDg(dg1.idDG));
                  }}
                  className="fa fa-trash-o iconred"
                  aria-hidden="true"
                ></i>
                <i
                  data-toggle="modal"
                  data-target="#myModalEditDg"
                  className="fa fa-pencil-square-o"
                  aria-hidden="true"
                  onClick={() => {
                    handleOpenModal();
                    handleEditClick(dg1);
                    handleReset();
                  }}
                >
                  {" "}
                </i>
              </li>
              {/* Modal Edit */}
              <form>
                {open && (
                  <div
                    class="modal fade"
                    id="myModalEditDg"
                    tabindex={-1}
                    role="dialog"
                    aria-labelledby="ModalEdit_Dg"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg modal-lg-dg">
                      <div className="modal-content" style={{ width: "90%" }}>
                        <div className="modal-header">
                          <div className="contai  ner d-flex pl-0">
                            <h4 id="ModalEdit_Dg">SỬA TÊN NHÓM</h4>
                          </div>
                        </div>
                        <div className="modal-body">
                          <table>
                            <tr>
                              <td className="left-mentor1">
                                <label>Nhập tên nhóm:</label>
                              </td>
                              <td>
                                <input
                                  className="inputText"
                                  type="text"
                                  name="nameDG"
                                  value={values.nameDG}
                                  onChange={handleEditFormChange}
                                />
                              </td>
                            </tr>
                          </table>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-light"
                              data-dismiss="modal"
                              id="modal__cancel"
                            >
                              Hủy
                            </button>{" "}
                            <button
                              className="btn btn-danger-del"
                              type="submit"
                              onClick={editSubmit}
                            >
                              Cập nhật
                            </button>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </ul>
          ))}
        </div>
      </div>
      <button
        className="btn btn-danger-del"
        style={{ marginLeft: "670px" }}
        type="submit"
        data-toggle="modal"
        data-target="#exampleModaldg"
        onClick={handleReset}
      >
        Thêm
      </button>
      {AddDg()}
    </div>
  );
}
export default withRouter(TableDg);

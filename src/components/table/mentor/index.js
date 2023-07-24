import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import * as apiaxios from "../../../api/service";
import { deleteMentor, getMentor } from "../../../redux/action/mentor.action";
import Pagination from "../../../components/mentor/pagination/index";
import AddMentor from "../../mentor/addMentors/index";
import Swal from "sweetalert2";
import DayJS from "react-dayjs";
import dayjs from "dayjs";

function TableMentor(props) {
  const [batch, setBatch] = useState([]);
  const [batchTitle, setBatchTitle] = useState([]);
  const [dg, setdg] = useState([]);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMentor());
  }, []);
  const [mentors, setMentor] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [mentorPerPage, setMentorPerPage] = useState(15);
  const indexOfLastMentor = currPage * mentorPerPage;
  const indexOfFirstMentor = indexOfLastMentor - mentorPerPage;
  const currMentor = mentors.slice(indexOfFirstMentor, indexOfLastMentor);
  const paginate = (pageNumber) => setCurrPage(pageNumber);
  const idBatch = localStorage.getItem("idBatch");

  const [open, setOpen] = useState(false);
  const [valuesId, setValuesId] = useState(null);
  useEffect(() => {
    apiaxios
      .batchAPI(`internshipcourse/${idBatch}`, "Get", null)
      .then((res) => {
        setBatchTitle(res.data.data);
      });
  }, {});
  useEffect(() => {
    apiaxios.mentorAPI("internshipcourse", "Get", null).then((res) => {
      setBatch(res.data.data);
    });
  }, {});
  useEffect(() => {
    apiaxios
      .mentorDG(`dg?idInternshipCourse=${idBatch}`, "Get", null)
      .then((res) => {
        setdg(res.data.data);
      });
  }, []);
  useEffect(() => {
    apiaxios.mentorAPI(`mentor/batch/${idBatch}`, null).then((res) => {
      setMentor(res.data.data);
    });
  }, [mentors]);

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const [values, setValues] = useState({
    fullNameMentor: "",
    dayOfBirth: "",
    address: "",
    email: "",
    position: "",
    idDG: "",
    nameDG: "",
    idMentor: "",
    workplace: "",
    idInternshipCourse: "",
    nameCoure: "",
  });
  const handleEditClick = (mentor) => {
    setValuesId(mentor.idMentor);
    const formValues = {
      fullNameMentor: mentor.fullNameMentor,
      dayOfBirth: mentor.dayOfBirth,
      address: mentor.address,
      email: mentor.email,
      position: mentor.position,
      idDG: mentor.idDG,
      nameDG: mentor.nameDG,
      idMentor: mentor.idMentor,
      workplace: mentor.workplace,
      idInternshipCourse: mentor.idInternshipCourse,
      nameCoure: mentor.nameCoure,
    };
    console.log(mentor);
    console.log(formValues);
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
    const editMentor = {
      fullNameMentor: values.fullNameMentor,
      dayOfBirth: values.dayOfBirth,
      address: values.address,
      email: values.email,
      position: values.position,
      idDG: values.idDG,
      idMentor: values.idMentor,
      workplace: values.workplace,
      idInternshipCourse: values.idInternshipCourse,
    };
    apiaxios
      .mentorEdit(`mentor/${valuesId}`, editMentor)
      .then((res) => {
        const newMentor = [...posts];
        const index = posts.findIndex((mentor) => mentor.idMentor === valuesId);
        newMentor[index] = editMentor;
        setPosts(newMentor);
        handleCloseModal();
        setMentor(newMentor);
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
    const newMentor = [...mentors];
    const index = mentors.findIndex(
      (products) => products.idInternshipCourse === valuesId
    );
    newMentor[index] = editMentor;
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
      <h3>DANH SÁCH NGƯỜI HƯỚNG DẪN {batchTitle.nameCoure}</h3>
      <div className="grid wide home-mentor">
        <div className="row home-mentor--list">
          <span className="col l-2-9-mentor " style={{ marginLeft: "6px" }}>
            Họ tên
          </span>
          <span className="l-2-6-mentor ">DG</span>
          <span className="col l-2-8-mentor ">Nơi công tác</span>
          <span className="col l-2-9-mentor ">Email</span>
          <span className="col l-2-9-mentor ">Địa chỉ</span>
          <span className="col l-2-8-mentor ">Chức vụ</span>
          <span className="col l-2-8-mentor " style={{ marginRight: "11px" }}>
            Tác vụ
          </span>
        </div>
        <div>
          {currMentor.map((mentor) => (
            <ul className="row sm-gutter sm-gutter--list" key={mentor.id}>
              <li className="col l-2-9-mentor">{mentor.fullNameMentor}</li>
              <li className="l-2-6-mentor">{mentor.nameDG}</li>
              <li className="col l-2-8-mentor">{mentor.workplace}</li>
              <li className="col l-2-9-mentor">{mentor.email}</li>
              <li className="col l-2-9-mentor">{mentor.address}</li>
              <li className="col l-2-8-mentor">{mentor.position}</li>
              <li className="col l-2-8-mentor">
                <i
                  onClick={() => {
                    dispatch(deleteMentor(mentor.idMentor));
                  }}
                  className="fa fa-trash-o iconred"
                  aria-hidden="true"
                ></i>
                <i
                  data-toggle="modal"
                  data-target="#myModalEditMentor"
                  className="fa fa-pencil-square-o"
                  aria-hidden="true"
                  onClick={() => {
                    handleOpenModal();
                    handleEditClick(mentor);
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
                    id="myModalEditMentor"
                    tabindex={-1}
                    role="dialog"
                    aria-labelledby="ModalEdit_Mentor"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content" style={{ width: "90%" }}>
                        <div className="modal-header">
                          <div className="contai  ner d-flex pl-0">
                            <h4 id="ModalEdit_Mentor">SỬA NGƯỜI HƯỚNG DẪN</h4>
                          </div>
                        </div>
                        <div className="modal-body">
                          <table>
                            <tr>
                              <td className="left-mentor1">
                                <label>Họ tên:</label>
                              </td>
                              <td>
                                <input
                                  className="inputText"
                                  type="text"
                                  name="fullNameMentor"
                                  value={values.fullNameMentor}
                                  onChange={handleEditFormChange}
                                />
                              </td>
                              <td className="right-mentor1">
                                <label>Chức vụ:</label>
                              </td>
                              <td>
                                <input
                                  className="inputText"
                                  type="text"
                                  name="position"
                                  value={values.position}
                                  onChange={handleEditFormChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="left-mentor1">
                                <label>Ngày sinh:</label>
                              </td>
                              <td>
                                <input
                                  style={{ width: "200px" }}
                                  className="inputText"
                                  type="date"
                                  name="dayOfBirth"
                                  value={dayjs(values.dayOfBirth).format(
                                    "YYYY-MM-DD"
                                  )}
                                  onChange={handleEditFormChange}
                                />
                              </td>
                              <td className="right-mentor1">
                                <label>Email:</label>
                              </td>
                              <td>
                                <input
                                  className="inputText"
                                  name="email"
                                  type="text"
                                  value={values.email}
                                  onChange={handleEditFormChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="left-mentor1">
                                <label>Batch:</label>
                              </td>
                              <td>
                                <input
                                  className="inputText"
                                  name="email"
                                  type="text"
                                  disabled
                                  value={batchTitle.nameCoure}
                                />
                              </td>
                              <td className="right-mentor1">
                                <label>Tên DG:</label>
                              </td>
                              <td>
                                <select
                                  style={{ width: "200px" }}
                                  className="inputText"
                                  name="idDG"
                                  id="cars"
                                  value={values.idDG}
                                  onChange={handleEditFormChange}
                                >
                                  <option disabled selected hidden>
                                    Chọn...
                                  </option>
                                  {dg?.map((itemDG) => (
                                    <option value={itemDG.idDG}>
                                      {itemDG.nameDG}
                                    </option>
                                  ))}
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <td className="left-mentor1">
                                <label>Nơi công tác:</label>
                              </td>
                              <td>
                                <input
                                  className="inputText"
                                  name="workplace"
                                  type="text"
                                  value={values.workplace}
                                  onChange={handleEditFormChange}
                                />
                              </td>
                              <td className="right-mentor1">
                                <label>Địa chỉ:</label>
                              </td>
                              <td>
                                <input
                                  className="inputText"
                                  name="address"
                                  type="text"
                                  value={values.address}
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
              {/* End Modal Edit */}
            </ul>
          ))}
        </div>
      </div>
      <Pagination
        className="pagination"
        mentorPerPage={mentorPerPage}
        totalMentor={mentors.length}
        paginate={paginate}
      />
      <button
        className="btn btn-danger-del"
        style={{ marginLeft: "1070px" }}
        type="submit"
        data-toggle="modal"
        data-target="#exampleModal2"
        onClick={handleReset}
      >
        Thêm
      </button>
      {AddMentor()}
    </div>
  );
}
export default withRouter(TableMentor);

import React, { useEffect, useState } from "react";
import * as apiaxios from "../../../api/service";
import Swal from "sweetalert2";
import { batch } from "react-redux";

export default function AddMentor() {
  const [mentors, setMentor] = useState([]);
  const [Batch, setBatch] = useState([]);
  const [batchTitle, setBatchTitle] = useState([]);
  const [dg, setdg] = useState([]);
  const idBatch = localStorage.getItem("idBatch");
    const closeModal = () => {
    const modals = document.getElementById("exampleModal2");
    modals.style.display = "none";
  };
  useEffect(() => {
    apiaxios
      .batchAPI("internshipcourse", "Get", null)
      .then((res) => {
        setBatch(res.data.data);
      });
  }, []);
  useEffect(() => {
    apiaxios
      .batchAPI(`internshipcourse/${idBatch}`, "Get", null)
      .then((res) => {
        setBatchTitle(res.data.data);
      });
  }, []);
  useEffect(() => {
    apiaxios.mentorAPI("internshipcourse", "Get", null).then((res) => {
      setBatch(res.data.data);
    });
  }, []);

  useEffect(() => {
    apiaxios.mentorDG(`dg?idInternshipCourse=${idBatch}`, "Get", null).then((res) => {
      setdg(res.data.data);
    });
  }, []);

  useEffect(() => {
    apiaxios.mentorAPI(`mentor/batch/${idBatch}`, null).then((res) => {
      setMentor(res.data.data);
    });
  }, [mentors]);

  const [addFormData, setAddFormData] = useState({
    fullNameMentor: "",
    dayOfBirth: "",
    address: "",
    email: "",
    position: "",
    idDG: "",
    idMentor: "",
    workplace: "",
    idInternshipCourse: "",
  });
  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };
  const handleReset = () => {
    setAddFormData({});
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    Array.from(document.querySelectorAll("select")).forEach(
      (select) => (select.value = "Chọn...")
    );
  };
  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newContact = {
      fullNameMentor: addFormData.fullNameMentor,
      dayOfBirth: addFormData.dayOfBirth,
      address: addFormData.address,
      email: addFormData.email,
      position: addFormData.position,
      idDG: addFormData.idDG,
      idMentor: addFormData.idMentor,
      workplace: addFormData.workplace,
      idInternshipCourse: addFormData.idInternshipCourse,
    };
    apiaxios
      .mentorCreate(`mentor?idInternshipCourse=${idBatch}`, newContact)
      .then((res) => {
        setMentor(res.data);
        handleReset();
        closeModal();
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
          Swal.fire({
            icon: "error",
            text: error.message,
            confirmButtonText: "Xác nhận",
          });
        }
        const newContacts = [...mentors, newContact];
        setMentor(newContacts);
      });
  };

  return (
    <div
      class="modal fade"
      id="exampleModal2"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content" style={{ width: "90%" }}>
          <div className="modal-header">
            <div className="contai  ner d-flex pl-0">
              <h4 id="exampleModalLabel">THÊM NGƯỜI HƯỚNG DẪN</h4>
            </div>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddFormSubmit}>
              <table>
                <tr>
                  <td className="left-mentor">
                    <label>Họ tên:</label>
                  </td>
                  <td>
                    <input
                      className="inputText"
                      type="text"
                      name="fullNameMentor"
                      placeholder="Nhập tên..."
                      onChange={handleAddFormChange}
                    />
                  </td>
                  <td className="right-mentor">
                    <label>Chức vụ:</label>
                  </td>
                  <td>
                    <input
                      className="inputText"
                      type="text"
                      name="position"
                      placeholder="Nhập chức vụ..."
                      onChange={handleAddFormChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="left-mentor">
                    <label>Ngày sinh:</label>
                  </td>
                  <td>
                    <input
                      style={{ width: "200px" }}
                      className="inputText"
                      type="date"
                      name="dayOfBirth"
                      onChange={handleAddFormChange}
                    />
                  </td>
                  <td className="right-mentor">
                    <label>Email:</label>
                  </td>
                  <td>
                    <input
                      className="inputText"
                      name="email"
                      type="text"
                      placeholder="VD: abc@gmail.com"
                      onChange={handleAddFormChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="left-mentor">
                    <label>Tên DG:</label>
                  </td>
                  <td>
                    <select
                      className="inputText"
                      name="idDG"
                      id="cars"
                      onChange={handleAddFormChange}
                      style={{ width: "200px" }}
                    >
                      <option disabled selected hidden>
                        Chọn...
                      </option>
                      {dg?.map((itemDG) => (
                        <option value={itemDG.idDG}>{itemDG.nameDG}</option>
                      ))}
                    </select>
                  </td>
                  <td className="right-mentor">
                    <label>Địa chỉ:</label>
                  </td>
                  <td>
                    <input
                      className="inputText"
                      name="address"
                      type="text"
                      placeholder="Nhập địa chỉ..."
                      onChange={handleAddFormChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="left-mentor">
                    <label>Nơi công tác:</label>
                  </td>
                  <td>
                    <input
                      className="inputText"
                      name="workplace"
                      type="text"
                      placeholder="Nhập nơi công tác..."
                      onChange={handleAddFormChange}
                    />
                  </td>
                </tr>
              </table>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  data-dismiss="modal"
                >
                  Hủy
                </button>
                <button type="submit" className="btn btn-danger-del ">
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

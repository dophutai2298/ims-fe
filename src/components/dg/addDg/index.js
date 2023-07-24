import React, { useEffect, useState } from "react";
import * as apiaxios from "../../../api/service";
import Swal from "sweetalert2";
import { batch } from "react-redux";

export default function AddDg() {
  const [dg, setDg] = useState([]);
  const idBatch = localStorage.getItem("idBatch");
  const closeModal = () => {
    const modals = document.getElementById("exampleModaldg");
    modals.style.display = "none";
  };

  useEffect(() => {
    apiaxios.dg("dg", null).then((res) => {
      setDg(res.data.data);
    });
  }, [dg]);
  const [addFormData, setAddFormData] = useState({
    nameDG: "",
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
      nameDG: addFormData.nameDG,
    };
    apiaxios
      .dgCreate(`dg/create?idInternshipCourse=${idBatch}`, newContact)
      .then((res) => {
        setDg(res.data.data);
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
        const newContacts = [...dg, newContact];
        setDg(newContacts);
      });
  };

  return (
    <div
      class="modal fade"
      id="exampleModaldg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-lg-dg">
        <div className="modal-content" style={{ width: "90%" }}>
          <div className="modal-header">
            <div className="contai  ner d-flex pl-0">
              <h4 id="exampleModalLabel">THÊM NHÓM THỰC TẬP</h4>
            </div>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddFormSubmit}>
              <table>
                <tr>
                  <td className="left-mentor">
                    <label>Nhập tên nhóm thực tập:</label>
                  </td>
                  <td>
                    <input
                      className="inputText"
                      type="text"
                      name="nameDG"
                      placeholder="Nhập tên nhóm..."
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

import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import * as apiaxios from "../../../../api/service";
import * as constTable from "../../../../constant/internview/table/index";
import dayjs from "dayjs";
import {
  delinterviewAPI,
  mentorAPI,
  mentorDG,
  updateinterviewAPI,
  batchAPI,
} from "../../../../api/service";
import Swal from "sweetalert2";
import "../search/style.css";
import insertInterview from "../insert/index";

function Index() {
  const [interviews, setinterviews] = useState([]);
  const [DG, setDG] = useState([]);
  const [idDG, setIdDG] = useState([]);
  console.log(idDG);
  const [posts, setPosts] = useState([]);
  const [mentor, setMentor] = useState([]);
  const [status, setStatus] = useState([]);
  const [batchTitle, setBatchTitle] = useState([]);
  const idBatch = localStorage.getItem("idBatch");
  const [open, setOpen] = useState(true);
  console.log(idDG);
  console.log(mentor);
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchDatas = async () => {
      mentorAPI(
        `mentor/idDG?idDG=${idDG}&idInternshipCourse=${idBatch}`,
        null
      ).then((res) => {
        setMentor(res.data.data);
      });
    };
    fetchDatas();
  }, [idDG]);
  useEffect(() => {
    mentorDG(`dg?idInternshipCourse=${idBatch}`, null).then((res) => {
      setDG(res.data.data);
    });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      apiaxios
        .interviewAPI(`internview/${idBatch}?fullName=${interviews}`, null)
        .then((res) => {
          setPosts(res.data.data);
        });
    };
    if (interviews.length === 0 || interviews.length > 0) fetchData();
  }, [interviews]);

  useEffect(() => {
    batchAPI(`internshipcourse/${idBatch}`, "Get", null).then((res) => {
      setBatchTitle(res.data.data);
    });
  }, {});

  useEffect(() => {
    const status = "Pass";
    const updateInsert = "success";
    apiaxios
      .interviewAPI(
        `internview/${idBatch}?status=${status}&updateInsert=${updateInsert}`,
        null
      )
      .then((res) => {
        setStatus(res.data.data);
      });
  }, [status]);
  const deleteInterview = (id) => {
    Swal.fire({
      title: "Bạn có muốn xóa người này ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "Hủy",
      confirmButtonText: "Đồng ý",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const newContacts = [...posts];
        const index = posts.findIndex(
          (products) => products.idCandidate === id
        );
        delinterviewAPI(`internview/${id}`, "DELETE", newContacts).then(
          (res) => {}
        );
        newContacts.splice(index, 1);
        setPosts(newContacts);
      }
    });
  };
  const [valuesId, setValuesId] = useState(null);
  const [values, setValues] = useState({
    idCandidate: "",
    status: "",
    idDG: idDG,
    idMentor: "",
    comments: "",
    fullName: "",
    emailCandidate: "",
    interviewDate: "",
    interviewTime: "",
    interviewer: "",
    interviewLink: "",
    technicalComments: "",
    technicalScore: "",
    attitude: "",
    englishCommunication: "",
    remarks: "",
  });
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...values };
    newFormData[fieldName] = fieldValue;
    setValues(newFormData);
  };
  const handleEditClick = (interview) => {
    setValuesId(interview.idCandidate);

    const formValues = {
      idCandidate: interview.idCandidate,
      fullName: interview.fullName,
      interviewDate: interview.interviewDate,
      emailCandidate: interview.emailCandidate,
      interviewTime: interview.interviewTime,
      interviewer: interview.interviewer,
      interviewLink: interview.interviewLink,
      technicalComments: interview.technicalComments,
      technicalScore: interview.technicalScore,
      attitude: interview.attitude,
      technicalScore: interview.technicalScore,
      englishCommunication: interview.englishCommunication,
      status: interview.status,
      idDG: idDG,
      idMentor: interview.idMentor,
      comments: interview.comments,
      remarks: interview.remarks,
    };
    setValues(formValues);
  };
  const editSubmit = (event) => {
    event.preventDefault();
    const editBatch = {
      idCandidate: values.idCandidate,
      fullName: values.fullName,
      interviewDate: values.interviewDate,
      emailCandidate: values.emailCandidate,
      interviewTime: values.interviewTime,
      interviewer: values.interviewer,
      interviewLink: values.interviewLink,
      technicalComments: values.technicalComments,
      technicalScore: values.technicalScore,
      attitude: values.attitude,
      technicalScore: values.technicalScore,
      englishCommunication: values.englishCommunication,
      status: values.status,
      idDG: idDG,
      idMentor: values.idMentor,
      comments: values.comments,
      remarks: values.remarks,
    };

    updateinterviewAPI(`internview/${valuesId}`, editBatch)
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: "Cập nhật thành công !!!",
          confirmButtonText: "Xác nhận",
        });
        handleCloseModal();
        const newBatch = [...posts];
        const index = posts.findIndex(
          (products) => products.idCandidate === valuesId
        );
        newBatch[index] = editBatch;
        setPosts(newBatch);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error.response.data.error,
          confirmButtonText: "Xác nhận",
        });
      });
  };

  return (
    <div>
      <h3>
        {constTable.H3} {batchTitle.nameCoure}
      </h3>
      <div className="input-toolbar">
        <div className="search-box">
          <div className="search">
            <form action="">
              <input
                type="text"
                className="search__input-iv"
                id="search"
                placeholder="Tìm kiếm..."
                onChange={(e) => setinterviews(e.target.value.toLowerCase())}
              />
              <i className="search__icon-iv fa fa-search"></i>
            </form>
          </div>
        </div>
      </div>
      <div className="grid wide home-interview">
        <div className="row home-interview--list1">
          <span className="col1 l-2-9 ">{constTable.NAME}</span>
          <span className="col1 l-2-9 ">{constTable.EMAIL}</span>
          <span className="col1 l-2-9 ">{constTable.DATE}</span>
          <span className="col1 l-2-9 ">{constTable.TIME}</span>
          <span className="col1 l-2-9 ">{constTable.INTERNVIEWER}</span>
          <span className="col1 l-2-9 ">{constTable.MEETING}</span>
          <span className="col1 l-2-9 ">{constTable.COMMENTS}</span>
          <span className="col1 l-2-9 ">{constTable.TECHNICALCOMMENTS}</span>
          <span className="col1 l-2-9 ">{constTable.TECHNICALSCORES}</span>
          <span className="col1 l-2-9 ">{constTable.ATTITUDE}</span>
          <span className="col1 l-2-9 ">{constTable.ENGLISH}</span>
          <span className="col1 l-2-9 ">{constTable.RESULT}</span>
          <span className="col1 l-2-9 ">{constTable.ACTION}</span>
        </div>
        <div className="table-body">
          {posts.length > 0 ? (
            posts.map((interview) => (
              <ul
                className="row sm-gutter sm-gutter--list"
                key={interview.idCandidate}
              >
                <li className="col1 l-2-9" style={{paddingLeft:"15px"}}>{interview.fullName}</li>
                <li className="col1 l-2-9">{interview.emailCandidate}</li>
                <li element="li" name="interviewDate" className="col1 l-2-9">
                  {dayjs(interview.interviewDate).format("DD/MM/YYYY")}
                </li>
                <li className="col1 l-2-9">{interview.interviewTime}</li>
                <li className="col1 l-2-9">{interview.interviewer}</li>
                <li className="col1 l-2-9">{interview.interviewLink}</li>
                <li className="col1 l-2-9">{interview.comments}</li>
                <li className="col1 l-2-9">{interview.technicalComments}</li>
                <li className="col1 l-2-9">{interview.technicalScore}</li>
                <li className="col1 l-2-9">{interview.attitude}</li>
                <li className="col1 l-2-9">{interview.englishCommunication}</li>
                <li className="col1 l-2-9">{interview.status}</li>
                <li className="col1 l-2-9">
                  <i
                    onClick={() => deleteInterview(interview.idCandidate)}
                    className="fa fa-trash-o"
                    aria-hidden="true"
                  ></i>
                  <i
                    data-toggle="modal"
                    data-target="#exampleModaEdit"
                    className="fa fa-pencil-square-o"
                    aria-hidden="true"
                    onClick={() => {
                      handleEditClick(interview);
                      handleOpenModal();
                    }}
                  ></i>
                </li>
              </ul>
            ))
          ) : (
            <div>
              <p className="mess-table-candidate">Chưa có dữ liệu</p>
            </div>
          )}
        </div>
      </div>
      <form>
        {open && (
          <div
            class="modal fade"
            id="exampleModaEdit"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="container d-flex pl-0">
                    <h5
                      className="modal-title ml-2"
                      id="exampleModalLabel"
                      style={{ color: "#007bff" }}
                    >
                      CẬP NHẬT KẾT QUẢ PHỎNG VẤN
                    </h5>
                  </div>{" "}
                </div>
                <div className="modal-body-iv">
                  <table>
                    <tr>
                      <td className="left-modal">
                        <label>Họ Tên:</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="fullName"
                          value={values.fullName}
                          disabled
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td className="right-modal">
                        <label>Tên DG:</label>
                      </td>
                      <td>
                        <select
                          name="idDG"
                          onChange={(e) => {
                            setIdDG(e.currentTarget.value);
                          }}
                        >
                          {DG?.map((itemDG) => (
                            <option value={itemDG.idDG}>{itemDG.nameDG}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="left-modal">
                        <label>Nhận xét:</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="comments"
                          value={values.comments}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td className="right-modal">
                        <label>Kết quả:</label>
                      </td>
                      <td>
                        <select name="status" onChange={handleEditFormChange}>
                          <option disabled selected hidden value="">
                            Chọn...
                          </option>
                          <option value="Pass">Pass</option>
                          <option value="Fail">Fail</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="left-modal">
                        <label>Nhận xét kỹ thuật:</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="technicalComments"
                          value={values.technicalComments}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td className="right-modal">
                        <label>Điểm kỹ thuật:</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="technicalScore"
                          value={values.technicalScore}
                          onChange={handleEditFormChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="left-modal">
                        <label>Giao tiếp Tiếng Anh:</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="englishCommunication"
                          value={values.englishCommunication}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td className="right-modal">
                        <label>Remarks:</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="remarks"
                          value={values.remarks}
                          onChange={handleEditFormChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="left-modal">
                        <label>Mentor:</label>
                      </td>
                      <td>
                        <select name="idMentor" onChange={handleEditFormChange}>
                          <option disabled selected hidden value="">
                            {" "}
                            Chọn...
                          </option>
                          {mentor?.map((itemmentor) => (
                            <option value={itemmentor.idMentor}>
                              {itemmentor.fullNameMentor}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="left-modal">
                        <label>Thái độ:</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="attitude"
                          value={values.attitude}
                          onChange={handleEditFormChange}
                        />
                      </td>
                    </tr>
                    <td>
                      <input
                        type="hidden"
                        name="emailCandidate"
                        value={values.emailCandidate}
                        onChange={handleEditFormChange}
                      />
                      <input
                        type="hidden"
                        name="interviewDate"
                        value={values.interviewDate}
                        onChange={handleEditFormChange}
                      />
                      <input
                        type="hidden"
                        name="interviewTime"
                        value={values.interviewTime}
                        onChange={handleEditFormChange}
                      />
                      <input
                        type="hidden"
                        name="interviewer"
                        value={values.interviewer}
                        onChange={handleEditFormChange}
                      />
                      <input
                        type="hidden"
                        name="interviewLink"
                        value={values.interviewLink}
                        onChange={handleEditFormChange}
                      />
                      <input
                        type="hidden"
                        name="technicalComments"
                        value={values.technicalComments}
                        onChange={handleEditFormChange}
                      />
                      <input
                        type="hidden"
                        name="technicalScore"
                        value={values.technicalScore}
                        onChange={handleEditFormChange}
                      />
                      <input
                        type="hidden"
                        name="englishCommunication"
                        value={values.englishCommunication}
                        onChange={handleEditFormChange}
                      />
                      <input
                        type="hidden"
                        name="attitude"
                        value={values.attitude}
                        onChange={handleEditFormChange}
                      />
                    </td>
                  </table>
                </div>
                <div className="modal-footer">
                  {" "}
                  <button
                    type="button"
                    className="btn btn-light"
                    data-dismiss="modal"
                  >
                    Hủy
                  </button>{" "}
                  <button
                    type="submit"
                    onClick={editSubmit}
                    className="btn btn-danger-del"
                  >
                    Cập Nhật
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
      <button
        className="btn-add-iv"
        type="submit"
        data-toggle="modal"
        data-target="#exampleModal2"
      >
        Kết quả
      </button>
      {insertInterview(status, setStatus)}
    </div>
  );
}

export default withRouter(Index);

import * as constTable from "../../../../constant/internview/table/index";
import "../insert/style.css";
import Swal from "sweetalert2";
import {
  insertinterviewAPI,
  updateinsertinterviewAPI,
  internshipStatusUpdate,
} from "../../../../api/service";

function InsertInterview(posts, setPosts) {
  const idBatch = localStorage.getItem("idBatch");
  const handleSubmit = (id) => {
    Swal.fire({
      title: "Bạn có muốn thêm danh sách này ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "Hủy",
      reverseButtons: true,
      confirmButtonText: "Đồng ý",
    }).then(
      (result) => {
        if (result.isConfirmed) {
          const newContacts = [...posts];
          const index = posts.findIndex(
            (products) => products.idInternshipCourse === id
          );
          insertinterviewAPI(`internship/${id}`).then((res) => {
            setPosts(res.data.data);
          });
          updateinsertinterviewAPI(`internview/updateInsert/${id}`).then(
            (res) => {}
          );
          internshipStatusUpdate(`internship/`).then((res) => {
          });
          for (let i = 0; i < newContacts.length; i) {
            newContacts.splice(index, 1);
          }
          setPosts(newContacts);
        }
      },
      [posts]
    );
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
      <div className="modal-dialog modal-lg modalml">
        <div className="modal-content" style={{ width: "170%" }}>
          <div className="modal-header">
            <div className="container d-flex pl-0">
              <h5
                className="modal-title ml-2"
                id="exampleModalLabel"
                style={{ color: "#007bff" }}
              >
                KẾT QUẢ PHỎNG VẤN
              </h5>
            </div>{" "}
          </div>
          <div className="grid wide home-interview">
            <div className="row home-interview--list1">
              <span className="col1 l-2-10 ">{constTable.NAME}</span>
              <span className="col1 l-2-10 ">{constTable.EMAIL}</span>
              <span className="col1 l-2-10 ">{constTable.COMMENTS}</span>
              <span className="col1 l-2-10 ">
                {constTable.TECHNICALCOMMENTS}
              </span>
              <span className="col1 l-2-10 ">{constTable.TECHNICALSCORES}</span>
              <span className="col1 l-2-10 ">{constTable.ATTITUDE}</span>
              <span className="col1 l-2-10 ">{constTable.ENGLISH}</span>
              <span className="col1 l-2-10 ">{constTable.RESULT}</span>
            </div>
            <div className="table-body tablenone">
              {posts?.map((interview) => (
                <ul
                  className="row sm-gutter sm-gutter--list"
                  key={interview.idCandidate}
                >
                  <li className="col1 l-2-10">{interview.fullName}</li>
                  <li className="col1 l-2-10">{interview.emailCandidate}</li>
                  <li className="col1 l-2-10">{interview.comments}</li>
                  <li className="col1 l-2-10">{interview.technicalComments}</li>
                  <li className="col1 l-2-10">{interview.technicalScore}</li>
                  <li className="col1 l-2-10">{interview.attitude}</li>
                  <li className="col1 l-2-10">
                    {interview.englishCommunication}
                  </li>
                  <li className="col1 l-2-10">{interview.status}</li>
                </ul>
              ))}
            </div>
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
              onClick={() => {
                handleSubmit(idBatch);
              }}
              className="btn btn-danger-del btn-add"
            >
              Thêm
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsertInterview;

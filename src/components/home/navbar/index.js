import React from "react";
import { Link } from "react-router-dom";
import { authActions } from "../../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

export default function Navbar() {
  const id = useSelector((state) => state.auth.id);

  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    Swal.fire({
      title: "Bạn có muốn đăng xuất ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "Hủy",
      confirmButtonText: "Đồng ý",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(authActions.logout());
      }
    });
  };

  return (
    <div class="wrap">
      <nav>
        <ul class="primary">
          <li>
            <Link class="nav-color" to="/mentor">
              Quản lý Mentor
            </Link>
            <ul class="sub"></ul>
          </li>
          <li>
            <Link class="nav-color" to="/candidate">
              Quản lý ứng viên
            </Link>
            <ul class="sub">
              <Link class="nav-color" to="/interview">
                Kết quả phỏng vấn
              </Link>
            </ul>
          </li>
          <li>
            <Link class="nav-color" to="/student">
              Quản lý sinh viên
            </Link>
            <ul class="sub"></ul>
          </li>
          <li>
            <Link class="nav-color" to="/internshipcourse">
              Quản lý khóa thực tập
            </Link>
            <ul class="sub">
              <Link class="nav-color" to="/dg">
                Quản lý nhóm
              </Link>
            </ul>
          </li>
          <li>
            <a
              class="nav-color"
              href=""
              data-toggle="modal"
              onClick={() => {
                Swal.fire({
                  title: "Chức năng này sẽ được hỗ trợ sau",
                  showClass: {
                    popup: "animate__animated animate__fadeInDown",
                  },
                  hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                  },
                });
              }}
            >
              Đánh giá thực tập
            </a>
            <ul class="sub">
              <li>
                <a
                  class="nav-color"
                  href=""
                  data-toggle="modal"
                  onClick={() => {
                    Swal.fire({
                      title: "Chức năng này sẽ được hỗ trợ sau",
                      showClass: {
                        popup: "animate__animated animate__fadeInDown",
                      },
                      hideClass: {
                        popup: "animate__animated animate__fadeOutUp",
                      },
                    });
                  }}
                >
                  Báo cáo
                </a>
              </li>
              <li>
                <a
                  class="nav-color"
                  href=""
                  data-toggle="modal"
                  onClick={() => {
                    Swal.fire({
                      title: "Chức năng này sẽ được hỗ trợ sau",
                      showClass: {
                        popup: "animate__animated animate__fadeInDown",
                      },
                      hideClass: {
                        popup: "animate__animated animate__fadeOutUp",
                      },
                    });
                  }}
                >
                  Cấu hình
                </a>
              </li>
            </ul>
          </li>
          <li className="float--right">
            <a class="nav-color" onClick={logoutHandler}>
              Đăng xuất
            </a>
            <ul class="sub"></ul>
          </li>
          <li className="float--right">
            <p class="nav-color1">
              <svg
                className="svg--list"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
              {id}
            </p>
            <ul class="sub"></ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

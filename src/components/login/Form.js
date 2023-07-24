import "../../asset/css/form.css";
import Logo from "./img/logo.png";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/store";
import { loginAPI } from "../../api/service";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const BasicForm = () => {
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const emailInputRef = useRef();
  const paswordInputRef = useRef();

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (isLogin) {
      history.push("/batch");
    }
  }, [isLogin]);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPasword = paswordInputRef.current.value;

    loginAPI(enteredEmail, enteredPasword)
      .then((res) => {
        console.log(res);
        const data = res.data;
        dispatch(authActions.login());
        dispatch(authActions.setToken(data.accessToken));
        dispatch(authActions.getid(enteredEmail));
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          text: 'Sai thông tin đăng nhập!',
        })
      });
  };

  return (
    <div>
    <div className="form-login">
      <form onSubmit={submitHandler}>
        <div className="grid">
          <div className="login">
            <div className="login__headgier">
            </div>
            <div className="login__form">
              <div className="login__content">
              <img src={Logo} alt="logo" className="logo" style={{width:"300px"}}></img>
                <h2 className="login__content-heading">
                  Đăng Nhập
                </h2>
                <div className="login__import">
                  <div className="form-field">
                    <input type="text" id="name" ref={emailInputRef} required className="form-input" placeholder=" " />
                    <lable htmlFor="name" className="form-lable">Tên Đăng Nhập</lable>
                  </div>
                  <div className="form-field">
                    <input type="password"
            id="password"
            ref={paswordInputRef}
            required className="form-input" placeholder=" " />
                    <lable htmlFor="password" className="form-lable">Mật Khẩu</lable>
                  </div>
                  <button className="login__import-btn" type="submit">
                    Đăng Nhập
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default BasicForm;

import { createAction } from ".";
import Swal from "sweetalert2";
import { dgService } from "../../services";
import {
  DELETE_DG,
  START_LOADING,
  FETCH_DG,
  STOP_LOADING,
} from "../type/types";

export const startLoading = () => {
  return {
    type: START_LOADING,
  };
};
export const stopLoading = () => {
  return {
    type: STOP_LOADING,
  };
};

export const getDg = () => {
  return (dispatch) => {
    dispatch(startLoading());
    dgService
      .getDg()
      .then((res) => {
        dispatch(createAction(FETCH_DG, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};
export const deleteDg = (id) => {
  return (dispatch) => {
    Swal.fire({
      title: "Bạn có muốn xóa nhóm này ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "Hủy",
      confirmButtonText: "Đồng ý",
      reverseButtons: true,
    })
      .then((result) => {
        if (result.isConfirmed) {
          dgService.deleteDg(id).then((res) => {
            dispatch(createAction(DELETE_DG, res.data));
            dispatch(getDg());
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

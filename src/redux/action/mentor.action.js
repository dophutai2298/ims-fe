import { createAction } from ".";
import Swal from "sweetalert2";
import { mentorService } from "../../services";
import {
  DELETE_MENTOR,
  START_LOADING,
  FETCH_MENTOR,
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

export const getMentor = () => {
  return (dispatch) => {
    dispatch(startLoading());
    mentorService
      .getMentor()
      .then((res) => {
        dispatch(createAction(FETCH_MENTOR, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};
export const deleteMentor = (id) => {
  return (dispatch) => {
    Swal.fire({
      title: "Bạn có muốn xóa người hướng dẫn này ?",
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
          mentorService.deleteMentor(id).then((res) => {
            dispatch(createAction(DELETE_MENTOR, res.data));
            dispatch(getMentor());
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

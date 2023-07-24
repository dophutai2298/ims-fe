import { createAction } from ".";
import Swal from "sweetalert2";
import { candirService } from "../../redux/services";
import * as constCandidate from "../../constant/constCandidate";
import {
  DELETE_CANDI,

} from "../type/types";

export const deleteCandi = (idCandidate) => {
  return (dispatch) => {
    Swal.fire({
      title: `${constCandidate.WARNDEL}`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Đồng ý",
      cancelButtonColor: "#white",
      cancelButtonText: "Hủy",
      reverseButtons: true,
    })
      .then((result) => {
        if (result.isConfirmed) {
          candirService
            .deleteCandi(idCandidate).then((res) => {
            dispatch(createAction(DELETE_CANDI, res.data));
          });
        }
      })
      };
};

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as apiaxios from "../../../api/service";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function AddMentor(props) {
  const { register, handleSubmit, reset } = useForm();
  const [birthDay, setBirthDay] = useState("");
  const idBatch = localStorage.getItem("idBatch");

  const handleClose = () => {
    props.setOpenAdd(false);
  };
  const onSubmit = (value) => {
    let birthDayLast = dayjs(birthDay).format("YYYY/MM/DD");
    value.dayOfBirth = birthDayLast;
    apiaxios
      .mentorCreate(`mentor?idInternshipCourse=${idBatch}`, value)
      .then((res) => {
        reset();
        setBirthDay("");
        props.fetchMentor();
        if (res.data) {
          Swal.fire({
            icon: "success",
            title: "Thêm thành công",
            showConfirmButton: false,
            timer: 1500,
          });
        }
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
      });
    handleClose();
  };

  return (
    <Dialog
      open={props.openAdd}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
    >
      <DialogTitle id="alert-dialog-title" align="center">
        Thêm người hướng dẫn
      </DialogTitle>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
              <TextField
                size="small"
                required
                id="outlined-required"
                label="Họ tên"
                name="fullNameMentor"
                {...register("fullNameMentor", {
                  required: true,
                })}
              />

              <TextField
                size="small"
                required
                id="outlined-required"
                label="Chức vụ"
                name="position"
                {...register("position", {
                  required: true,
                })}
              />
            </div>
            <div>
              <DesktopDatePicker
                disableFuture
                minDate="01/01/1960"
                maxDate="01/01/2005"
                label="Ngày sinh"
                inputFormat="DD/MM/YYYY"
                value={birthDay}
                onChange={(newValue) => {
                  setBirthDay(dayjs(newValue).format("MM/DD/YYYY"));
                }}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    required
                    id="outlined-required"
                    {...params}
                  />
                )}
              />
              <TextField
                size="small"
                required
                id="outlined-required"
                label="Email"
                name="email"
                {...register("email", {
                  required: true,
                })}
              />
            </div>
            <div>
              <TextField
                size="small"
                id="outlined-required"
                label="Batch"
                defaultValue={props.batchTitle.nameCoure}
                name="nameCoure"
                disabled
              />
              <FormControl
                sx={{ m: 1, minWidth: 216 }}
                size="small"
                required
                id="outlined-required"
              >
                <InputLabel htmlFor="grouped-select">Tên DG</InputLabel>
                <Select
                  defaultValue=""
                  id="grouped-select"
                  label="Tên DG"
                  name="idDG"
                  {...register("idDG", {
                    required: true,
                  })}
                >
                  {props.dg?.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item.idDG}>
                        {item.nameDG}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                size="small"
                required
                id="outlined-required"
                label="Nơi công tác"
                name="workplace"
                {...register("workplace", {
                  required: true,
                })}
              />
              <TextField
                size="small"
                required
                id="outlined-required"
                label="Địa chỉ"
                name="address"
                {...register("address", {
                  required: true,
                })}
              />
            </div>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="contained" type="submit">
            Thêm
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as apiaxios from "../../../api/service";
import "./style.css";
import Swal from "sweetalert2";
import ReusableDialog from "../../componentsReuse/reusableDialog";
import {
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
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

export default function SelectBatch() {
  let history = useHistory();
  const [idTemp, setIdTemp] = useState("");
  // data list batch
  const [posts, setPosts] = useState([]);
  // open form add batch
  const [open, setOpen] = useState(false);
  // open form select batch *always true
  const [openSelect, setOpenSelect] = useState(true);
  // set data date format
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [error, setError] = useState("");
  const [dateEndLast, setIsDateDuplicate] = useState("");
  const [batchTitle, setBatchTile] = useState("");
  const [isCheckDate, setIsCheckDate] = useState(false);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    apiaxios.batchAPI("internshipcourse").then((res) => {
      setPosts(res.data.data);
    });
  }, []);

  useEffect(() => {
    posts.every((item) => {
      let dateEndPrev = dayjs(item.dateEnd).format("YYYY/MM/DD");
      setIsDateDuplicate(dateEndPrev);
      setBatchTile(item.nameCoure);
    });
  }, [posts, dateStart]);

  // add batch
  const onSubmit = (data) => {
    data.dateStart = dayjs(dateStart).format("YYYY/MM/DD");
    data.dateEnd = dayjs(dateEnd).format("YYYY/MM/DD");
    apiaxios
      .batchCreate("internshipcourse/create", data)
      .then((res) => {
        if (res) {
          history.push(`/Home/batch/?id=${res.data.idInternshipCourse}`);
        }
      })
      .catch((error) => {
        error ? setOpen(false) : setOpen(true);

        if (error.response) {
          Swal.fire({
            icon: "error",
            text: error.response.data.error,
            confirmButtonText: "Xác nhận",
          }).then(function (isConfirm) {
            if (isConfirm) {
              setOpen(true);
            }
          });
        } else if (error.request) {
          Swal.fire({
            icon: "error",
            text: error.request,
            confirmButtonText: "Xác nhận",
          });
        } else {
          console.log("Error", error.message);
          Swal.fire({
            icon: "error",
            text: error.message,
            confirmButtonText: "Xác nhận",
          });
        }
      });
  };

  // select batch
  const handleSelect = () => {
    try {
      if (idTemp !== "") {
        history.push(`/Home/batch/?id=${idTemp}`);
      } else {
        setOpenSelect(false);
        Swal.fire({
          icon: "error",
          text: "Bạn cần chọn Batch !",
          confirmButtonText: "Xác nhận",
        }).then(function (isConfirm) {
          if (isConfirm) {
            setOpenSelect(true);
          }
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.status.error,
      });
    }
  };
  const handleChangeBatch = (event) => {
    setIdTemp(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenSelect(true);
  };

  const title = `Hệ thống quản lý thực tập`;
  const titleAdd = `Thêm khóa thực tập`;
  // form select batch
  const children = (
    <FormControl sx={{ m: 1, minWidth: 250 }}>
      <InputLabel htmlFor="grouped-select">Chọn khóa thực tập</InputLabel>
      <Select
        value={idTemp}
        id="grouped-select"
        label="Chọn khóa thực tập"
        onChange={handleChangeBatch}
      >
        {posts?.map((item, index) => (
          <MenuItem key={index} value={item.idInternshipCourse}>
            {item.nameCoure}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  // form add batch
  const mainAdd = (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <TextField
          label="Tên khóa thực tập"
          size="small"
          name="nameCoure"
          {...register("nameCoure")}
        ></TextField>
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
          <InputLabel htmlFor="grouped-select">Trạng thái</InputLabel>
          <Select
            defaultValue=""
            id="grouped-select"
            label="Trạng thái"
            name="status"
            {...register("status")}
          >
            <MenuItem value="Done">Done</MenuItem>;
            <MenuItem value="In progress">In progress</MenuItem>;
            <MenuItem value="N/A">N/A</MenuItem>;
          </Select>
        </FormControl>
      </div>
      <div>
        <DesktopDatePicker
          maxDate={dateEnd}
          label="Ngày bắt đầu"
          inputFormat="DD/MM/YYYY"
          value={dateStart}
          onChange={(newValue) => {
            let newData = dayjs(newValue).format("YYYY/MM/DD");
            setDateStart(newData);
            if (newData <= dateEndLast) {
              setError(
                `${batchTitle} kết thúc vào ngày ${dayjs(dateEndLast).format(
                  "DD/MM/YYYY"
                )} (vui lòng chọn sau ngày ${dayjs(dateEndLast).format(
                  "DD/MM/YYYY"
                )})`
              );
              setIsCheckDate(true);
            } else {
              setIsCheckDate(false);
            }
          }}
          renderInput={(params) => <TextField size="small" {...params} />}
        />
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
          <InputLabel htmlFor="grouped-select">Loại thực tập</InputLabel>
          <Select
            defaultValue=""
            id="grouped-select"
            label="Loại thực tập"
            name="kindOfInternship"
            {...register("kindOfInternship")}
          >
            <MenuItem value="Full time">Full time</MenuItem>;
            <MenuItem value="Part time">Part time</MenuItem>;
          </Select>
        </FormControl>
      </div>
      <div>
        <DesktopDatePicker
          disablePast
          minDate={dateStart}
          label="Ngày kết thúc"
          inputFormat="DD/MM/YYYY"
          value={dateEnd}
          onChange={(newValue) => {
            setDateEnd(newValue);
          }}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
      </div>
      <div>
        <Typography
          sx={{
            color: "red",
            textAlign: "center",
            m: "auto",
            width: "300px",
            wordWrap: "break-word",
          }}
        >
          {isCheckDate ? error : ""}
        </Typography>
      </div>
    </LocalizationProvider>
  );

  const button = "Xác nhận";
  const buttonAdd = (
    <Button variant="contained" type="submit" autoFocus>
      Thêm
    </Button>
  );
  return (
    <>
      <Dialog
        open={openSelect}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          {title}
        </DialogTitle>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <DialogContent>{children}</DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                handleOpen();
                setOpenSelect(false);
              }}
            >
              Thêm
            </Button>
            <Button variant="contained" onClick={handleSelect} autoFocus>
              {button}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <ReusableDialog
        title={titleAdd}
        isOpen={open}
        handleClose={handleClose}
        children={mainAdd}
        onSubmit={handleSubmit(onSubmit)}
        button={buttonAdd}
      />
    </>
  );
}

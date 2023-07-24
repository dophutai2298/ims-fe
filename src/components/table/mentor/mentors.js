import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as apiaxios from "../../../api/service";
import { deleteMentor, getMentor } from "../../../redux/action/mentor.action";
import AddMentor from "../../mentor/addMentors/addMentor";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  TableCell,
  TableRow,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";

import TextField from "@mui/material/TextField";
import ReusableTable from "../../componentsReuse/reusableTable";
import ReusableDialog from "../../componentsReuse/reusableDialog";
import { mentorService } from "../../../services";
import { DELETE_MENTOR } from "../../../redux/type/types";
import { createAction } from "../../../redux/action";

const headCells = [
  {
    label: "Họ tên",
  },
  {
    label: "DG",
  },
  {
    label: "Nơi công tác",
  },
  {
    label: "Email",
  },
  {
    label: "Địa chỉ",
  },
  {
    label: "Chức vụ",
  },
  {
    label: "Tác vụ",
  },
];

export default function Mentors() {
  const dispatch = useDispatch();
  // get id batch from localStorage
  const idBatch = localStorage.getItem("idBatch");
  // used useForm get data and submit form
  const { register, handleSubmit, reset } = useForm();
  // set day to format
  const [birthDay, setBirthDay] = useState("");
  // set name batch
  const [batchTitle, setBatchTitle] = useState([]);
  // set data
  const [dg, setdg] = useState([]);
  const [mentors, setMentor] = useState([]);
  // open dialog
  const [isOpenAdd, setOpenAdd] = useState(false);
  const [isOpenEdit, setOpenEdit] = useState(false);
  // set data after handle click edit
  const [valuesId, setValuesId] = useState(null);
  const [values, setValues] = useState({
    fullNameMentor: "",
    dayOfBirth: "",
    address: "",
    email: "",
    position: "",
    idDG: "",
    nameDG: "",
    idMentor: "",
    workplace: "",
    idInternshipCourse: "",
    nameCoure: "",
  });

  const fetchBatchTitle = async () => {
    await apiaxios
      .batchAPI(`internshipcourse/${idBatch}`, "Get", null)
      .then((res) => {
        setBatchTitle(res.data.data);
      });
  };

  const fetchDg = async () => {
    await apiaxios
      .mentorDG(`dg?idInternshipCourse=${idBatch}`, "Get", null)
      .then((res) => {
        setdg(res.data.data);
      });
  };
  const fetchMentor = async () => {
    await apiaxios.mentorAPI(`mentor/batch/${idBatch}`, null).then((res) => {
      setMentor(res.data.data);
    });
  };
  useEffect(() => {
    fetchBatchTitle();
    fetchDg();
    fetchMentor();
  }, []);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleOpen = () => {
    setOpenEdit(true);
  };
  const handleClose = () => {
    setOpenEdit(false);
  };
  // Click edit
  const handleEditClick = (mentor) => {
    reset();
    setValuesId(mentor.idMentor);
    const formValues = {
      fullNameMentor: mentor.fullNameMentor,
      dayOfBirth: mentor.dayOfBirth,
      address: mentor.address,
      email: mentor.email,
      position: mentor.position,
      idDG: mentor.idDG,
      nameDG: mentor.nameDG,
      idMentor: mentor.idMentor,
      workplace: mentor.workplace,
      idInternshipCourse: mentor.idInternshipCourse,
      nameCoure: mentor.nameCoure,
    };
    setValues(formValues);
  };
  // Click Delete
  const handleDeleteClick = (id) => {
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
            fetchMentor();
          });
          Swal.fire({
            icon: "success",
            title: "Xóa thành công",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    deleteMentor(id);
  };
  useEffect(() => {
    setBirthDay(values.dayOfBirth);
  }, [values]);

  const onSubmitEdit = (dataMentor) => {
    // format date and set data to dataMentor
    let birthDayLast = dayjs(birthDay).format("YYYY/MM/DD");
    dataMentor.dayOfBirth = birthDayLast;
    dataMentor.idInternshipCourse = values.idInternshipCourse;
    apiaxios
      .mentorEdit(
        valuesId
          ? `mentor/${valuesId}`
          : `mentor?idInternshipCourse=${idBatch}`,
        dataMentor
      )
      .then((res) => {
        const newMentor = [...mentors];
        const index = mentors.findIndex(
          (mentor) => mentor.idMentor === valuesId
        );
        newMentor[index] = dataMentor;
        setMentor(newMentor);
        fetchMentor();
        if (res.data) {
          Swal.fire({
            icon: "success",
            title: "Sửa thành công",
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
          console.log("Error", error.message);
          Swal.fire({
            icon: "error",
            text: error.message,
            confirmButtonText: "Xác nhận",
          });
        }
      });
    handleClose();
  };

  // const data reusable
  const title = `Danh sách người hướng dẫn ${batchTitle.nameCoure}`;
  const titleEdit = `Sửa người hướng dẫn`;
  // display data to table
  const childrenTable = mentors.map((row, index) => {
    return (
      <TableRow hover tabIndex={-1} key={index}>
        <TableCell>{row.fullNameMentor}</TableCell>
        <TableCell>{row.nameDG}</TableCell>
        <TableCell>{row.workplace}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.address}</TableCell>
        <TableCell>{row.position}</TableCell>
        <TableCell>
          <EditIcon
            sx={{
              fontSize: 22,
              color: "#1976d2",
              borderRadius: "20%",
              cursor: "pointer",
              mr: 0.5,
              "&:hover": {
                color: "white",
                backgroundColor: "#1976d2",
              },
            }}
            variant="outlined"
            onClick={() => {
              handleEditClick(row);
              handleOpen();
            }}
          />
          <DeleteForeverIcon
            sx={{
              fontSize: 22,
              color: "red",
              borderRadius: "20%",
              cursor: "pointer",
              "&:hover": {
                color: "white",
                backgroundColor: "red",
              },
            }}
            onClick={() => {
              handleDeleteClick(row.idMentor);
            }}
          />
        </TableCell>
      </TableRow>
    );
  });
  // form data edit
  const childrenDialog = (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <TextField
          size="small"
          required
          id="outlined-required"
          label="Họ tên"
          defaultValue={values.fullNameMentor}
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
          defaultValue={values.position}
          name="position"
          {...register("position", {
            required: true,
          })}
        />
      </div>
      <div>
        <DesktopDatePicker
          required
          disableFuture
          label="Ngày sinh"
          inputFormat="DD/MM/YYYY"
          value={birthDay}
          componentsProps={{
            actionBar: { actions: ["today"] },
          }}
          onChange={(newValue) => {
            setBirthDay(dayjs(newValue).format("MM/DD/YYYY"));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              required
              id="outlined-required"
            />
          )}
        />
        <TextField
          size="small"
          required
          id="outlined-required"
          label="Email"
          defaultValue={values.email}
          name="email"
          {...register("email", {
            required: true,
          })}
        ></TextField>
      </div>
      <div>
        <TextField
          size="small"
          required
          id="outlined-required"
          label="Batch"
          value={values.nameCoure}
          name="nameCoure"
          {...register("nameCoure")}
          InputProps={{
            readOnly: true,
          }}
        />
        <FormControl
          sx={{ m: 1, minWidth: 215 }}
          size="small"
          required
          id="outlined-required"
        >
          <InputLabel htmlFor="grouped-select">Tên DG</InputLabel>
          <Select
            defaultValue={values.idDG}
            id="grouped-select"
            label="Tên DG"
            name="idDG"
            {...register("idDG", {
              required: true,
            })}
          >
            {dg?.map((item, i) => {
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
          defaultValue={values.workplace}
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
          defaultValue={values.address}
          name="address"
          {...register("address", {
            required: true,
          })}
        />
      </div>
    </LocalizationProvider>
  );
  const buttonEdit = (
    <Button variant="contained" type="submit" autoFocus>
      Sửa
    </Button>
  );

  return (
    <>
      {/* Add mentor */}
      <AddMentor
        openAdd={isOpenAdd}
        setOpenAdd={setOpenAdd}
        batchTitle={batchTitle}
        dg={dg}
        fetchMentor={fetchMentor}
      />

      {/* Display table */}
      <ReusableTable
        title={title}
        handleSubmit={handleOpenAdd}
        headCells={headCells}
        children={childrenTable}
      />
      {/* Edit mentor */}
      <ReusableDialog
        isOpen={isOpenEdit}
        handleClose={handleClose}
        title={titleEdit}
        onSubmit={handleSubmit(onSubmitEdit)}
        children={childrenDialog}
        button={buttonEdit}
      />
    </>
  );
}

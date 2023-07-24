import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as apiaxios from "../../../api/service";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import ReusableDialog from "../../componentsReuse/reusableDialog";

const headCells = [
  {
    label: "Khóa thực tập",
  },
  {
    label: "Ngày bắt đầu",
  },
  {
    label: "Ngày kết thúc",
  },
  {
    label: "Loại thực tập",
  },
  {
    label: "Trạng thái",
  },
  {
    label: "Tác vụ",
  },
];

export default function InternShips() {
  const [open, setOpen] = React.useState(false);
  const [posts, setPosts] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const [nameCoure, setNameCoure] = useState("");
  const [data, setData] = useState([]);
  const [valueId, setValueId] = useState(null);
  const [isDone, setIsDone] = useState(false);

  const fetchData = () => {
    apiaxios.batchAPI("internshipcourse").then((res) => {
      setPosts(res.data.data);
    });
  }
  useEffect(() => {
    fetchData()
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (value) => {
    let dateStartLast = dayjs(dateStart).format("YYYY/MM/DD");
    let dateEndLast = dayjs(dateEnd).format("YYYY/MM/DD");
    value.idInternshipCourse = valueId;
    value.dateStart = dateStartLast;
    value.dateEnd = dateEndLast;
    value.nameCoure = nameCoure;
    // if isDone => set value status = data status
    if (isDone) {
      value.status = data.status
    }
    apiaxios
      .batchPut(`internshipcourse/${valueId}`, value)
      .then((res) => {
        const newBatch = [...posts];
        const index = posts.findIndex(
          (products) => products.idInternshipCourse === valueId
        );
        newBatch[index] = data;
        setPosts(newBatch);
        fetchData()
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
          Swal.fire({
            icon: "error",
            text: error.message,
            confirmButtonText: "Xác nhận",
          });
        }
      });
    handleClose();
  };

  const handleEditClick = (products) => {
    reset();
    setValueId(products.idInternshipCourse);
    const formValues = {
      idInternshipCourse: products.idInternshipCourse,
      nameCoure: products.nameCoure,
      dateStart: products.dateStart,
      dateEnd: products.dateEnd,
      kindOfInternship: products.kindOfInternship,
      status: products.status,
    };
    setData(formValues);
    setNameCoure(formValues.nameCoure);
  };
  useEffect(() => {
    setIsDone(false);
    setDateStart(data.dateStart);
    setDateEnd(data.dateEnd);
    // check status = done => set = true
    if (data.status === "Done") {
      setIsDone(true);
    }
  }, [data]);

  const titleEdit = `Sửa khóa thực tập ${data.nameCoure}`;
  const buttonEdit = (
    <Button variant="contained" type="submit" autoFocus>
      Cập nhật
    </Button>
  );
  const children = (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <FormControl sx={{ m: 1, minWidth: 215 }}>
          <InputLabel htmlFor="grouped-select">Loại thực tập</InputLabel>
          <Select
            defaultValue={data.kindOfInternship}
            id="grouped-select"
            label="Loại thực tập"
            name="kindOfInternship"
            {...register("kindOfInternship")}
          >
            <MenuItem value="Full time">Full time</MenuItem>
            <MenuItem value="Part time">Part time</MenuItem>
          </Select>
        </FormControl>
        <DesktopDatePicker
          label="Ngày bắt đầu"
          inputFormat="DD/MM/YYYY"
          value={dateStart}
          name="dateStart"
          componentsProps={{
            actionBar: { actions: ["today"] },
          }}
          minDate={"01/01/2022"}
          maxDate={dateEnd}
          onChange={(newValue) => {
            setDateStart(dayjs(newValue).format("MM/DD/YYYY"));
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 215 }}>
          <InputLabel htmlFor="grouped-select">Trạng thái</InputLabel>
           {/* !isDone display form select <=> select disable */}
          {!isDone ? (
            <Select
              defaultValue={data.status}
              id="grouped-select"
              label="Trạng thái"
              name="status"
              {...register("status")}
            >
              <MenuItem value="Done">Done</MenuItem>
              <MenuItem value="In progress">In progress</MenuItem>
              <MenuItem value="N/A">N/A</MenuItem>
            </Select>
          ) : (
            <Select
              disabled
              defaultValue={data.status}
              id="grouped-select"
              label="Trạng thái"
              name="status"
              {...register("status")}
            >
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          )}
        </FormControl>
        <DesktopDatePicker
          label="Ngày kết thúc"
          inputFormat="DD/MM/YYYY"
          value={dateEnd}
          name="dateEnd"
          componentsProps={{
            actionBar: { actions: ["today"] },
          }}
          minDate={dateStart}
          onChange={(newValue) => {
            setDateEnd(dayjs(newValue).format("MM/DD/YYYY"));
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          margin: "auto",
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%", maxWidth: 200, margin: "auto" }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          Khóa thực tập
        </Typography>
      </Toolbar>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2, maxWidth: 1200, margin: "auto" }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  {headCells.map((headCell, i) => (
                    <TableCell key={i} align="left" sx={{ px: 0 }}>
                      <Typography
                        sx={{ paddingLeft: 2, fontSize: 15, fontWeight: 600 }}
                      >
                        {headCell.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell>{row.nameCoure}</TableCell>
                      <TableCell>
                        {dayjs(row.dateStart).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {dayjs(row.dateEnd).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>{row.kindOfInternship}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>
                        <EditIcon
                          sx={{
                            fontSize: 22,
                            color: "#1976d2",
                            borderRadius: "20%",
                            cursor: "pointer",
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
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <ReusableDialog
        isOpen={open}
        handleClose={handleClose}
        title={titleEdit}
        onSubmit={handleSubmit(onSubmit)}
        children={children}
        button={buttonEdit}
      />
    </>
  );
}

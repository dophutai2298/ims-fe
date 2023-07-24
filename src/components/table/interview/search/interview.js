import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import * as apiaxios from "../../../../api/service";
import {
  delinterviewAPI,
  mentorAPI,
  mentorDG,
  updateinterviewAPI,
  batchAPI,
} from "../../../../api/service";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";

import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import ReusableDialog from "../../../componentsReuse/reusableDialog";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm } from "react-hook-form";
import InsertInterview from "../insert/insertInterview";
import ReusableTable from "../../../componentsReuse/reusableTable";

const headCells = [
  {
    label: "Họ tên",
  },
  {
    label: "Email",
  },
  {
    label: "Ngày phỏng vấn",
  },
  {
    label: "Giờ phỏng vấn",
  },
  {
    label: "Người phỏng vấn",
  },
  {
    label: "Link phỏng vấn",
  },
  {
    label: "Kết quả",
  },
  {
    label: "Tác vụ",
  },
];

function Interview() {
  const idBatch = localStorage.getItem("idBatch");
  const { register, handleSubmit, reset } = useForm();
  const [batchTitle, setBatchTitle] = useState([]);
  const [search, setSearch] = useState([]);
  const [posts, setPosts] = useState([]);
  //state open dialog
  const [isOpen, setisOpen] = useState(false);
  const [openViewData, setOpenViewData] = useState(false);
  const [openInsert, setOpenInsert] = useState(false);
  //state data
  const [DG, setDG] = useState([]);
  const [mentor, setMentor] = useState([]);
  const [resultInterview, setResultInterview] = useState([]);
  const [valuesId, setValuesId] = useState(null);
  const [values, setValues] = useState({
    idCandidate: "",
    status: "",
    // idDG: idDG,
    idMentor: "",
    comments: "",
    fullName: "",
    emailCandidate: "",
    interviewDate: "",
    interviewTime: "",
    interviewer: "",
    interviewLink: "",
    technicalComments: "",
    technicalScore: "",
    attitude: "",
    englishCommunication: "",
    remarks: "",
  });
  const [student, setStudent] = useState([]);
  useEffect(() => {
    batchAPI(`internshipcourse/${idBatch}`, "Get", null).then((res) => {
      setBatchTitle(res.data.data);
    });
    mentorDG(`dg?idInternshipCourse=${idBatch}`, null).then((res) => {
      setDG(res.data.data);
    });
    fetchDataPassed();
    fetchStudent();
  }, [posts]);

  const fetchStudent = () => {
    apiaxios.student(`internship/batch/${idBatch}`).then((res) => {
      setStudent(res.data.data);
    });
  };

  useEffect(() => {
    const fetchDataMentor = async () => {
      mentorAPI(`mentor/idDG?idDG&idInternshipCourse=${idBatch}`, null).then(
        (res) => {
          setMentor(res.data.data);
        }
      );
    };
    fetchDataMentor();
  }, []);

  // load data interview
  const fetchData = async () => {
    apiaxios
      .interviewAPI(`internview/${idBatch}?fullName=${search}`, null)
      .then((res) => {
        setPosts(res.data.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  // load data "Pass" display result
  const fetchDataPassed = () => {
    const status = "Pass";
    const updateInsert = "success";
    apiaxios
      .interviewAPI(
        `internview/${idBatch}?status=${status}&updateInsert=${updateInsert}`,
        null
      )
      .then((res) => {
        setResultInterview(res.data.data);
      });
  };
  useEffect(() => {
    if (search.length === 0 || search.length > 0) fetchData();
  }, [search]);

  const handleEditClick = (interview) => {
    reset();
    setValuesId(interview.idCandidate);

    const formValues = {
      idCandidate: interview.idCandidate,
      fullName: interview.fullName,
      interviewDate:
        interview.interviewDate === null ? "" : interview.interviewDate,
      emailCandidate:
        interview.emailCandidate === null ? "" : interview.emailCandidate,
      interviewTime:
        interview.interviewTime === null ? "" : interview.interviewTime,
      interviewer: interview.interviewer === null ? "" : interview.interviewer,
      interviewLink:
        interview.interviewLink === null ? "" : interview.interviewLink,
      technicalComments:
        interview.technicalComments === null ? "" : interview.technicalComments,
      technicalScore:
        interview.technicalScore === null ? "" : interview.technicalScore,
      attitude: interview.attitude === null ? "" : interview.attitude,
      englishCommunication:
        interview.englishCommunication === null
          ? ""
          : interview.englishCommunication,
      status:
        interview.status === "Waiting for results" ? "" : interview.status,
      idDG: interview.idDG === null ? "" : interview.idDG,
      idMentor: interview.idMentor === null ? "" : interview.idMentor,
      comments: interview.comments === null ? "" : interview.comments,
      remarks: interview.remarks === null ? "" : interview.remarks,
    };
    setValues(formValues);
  };
  // edit interview
  const onSubmit = (data) => {
    data.idCandidate = values.idCandidate;
    data.emailCandidate = values.emailCandidate;
    data.interviewDate = dayjs(values.interviewDate).format("YYYY/MM/DD");
    data.interviewLink = values.interviewLink;
    data.interviewTime = values.interviewTime;
    data.interviewer = values.interviewer;

    updateinterviewAPI(`internview/${valuesId}`, data)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Cập nhật thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        handleClose();
        const newBatch = [...posts];
        const index = posts.findIndex(
          (products) => products.idCandidate === valuesId
        );
        newBatch[index] = data;
        setPosts(newBatch);
        fetchData();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error.response.data.error,
          confirmButtonText: "Xác nhận",
        });
      });
  };
  // Delete row
  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Bạn có muốn xóa người này ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "Hủy",
      confirmButtonText: "Đồng ý",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const newContacts = [...posts];
        const index = posts.findIndex(
          (products) => products.idCandidate === id
        );
        delinterviewAPI(`internview/${id}`, "DELETE", newContacts).then(
          (res) => {}
        );
        newContacts.splice(index, 1);
        setPosts(newContacts);
        Swal.fire({
          icon: "success",
          title: "Xóa thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleOpenView = () => {
    setOpenViewData(true);
  };
  const handleOpen = () => {
    setisOpen(true);
  };
  const handleOpenInsert = () => {
    setOpenInsert(true);
  };
  const handleClose = () => {
    setisOpen(false);
    setOpenViewData(false);
  };

  const titleView = `Thông tin phỏng vấn`;
  const titleTable = `Danh sách phỏng vấn ${batchTitle.nameCoure}`;
  const dataView = (
    <>
      <div>
        <TextField
          label="Họ tên"
          InputProps={{
            readOnly: true,
          }}
          size="small"
          value={values.fullName}
        />
        <TextField
          label="Email"
          InputProps={{
            readOnly: true,
          }}
          size="small"
          value={values.emailCandidate}
        />
        <TextField
          label="Ngày phỏng vấn"
          InputProps={{
            readOnly: true,
          }}
          size="small"
          value={dayjs(values.interviewDate).format("DD/MM/YYYY")}
        />
      </div>
      <div>
        <TextField
          label="Giờ phỏng vấn"
          InputProps={{
            readOnly: true,
          }}
          size="small"
          value={values.interviewTime}
        />
        <TextField
          label="Người phỏng vấn"
          InputProps={{
            readOnly: true,
          }}
          size="small"
          value={values.interviewer}
        />
        <TextField
          size="small"
          label="Link phỏng vấn"
          InputProps={{
            readOnly: true,
          }}
          value={values.interviewLink}
        />
      </div>
      <div>
        <TextField
          label="Nhận xét kỹ thuật"
          InputProps={{
            readOnly: true,
          }}
          size="small"
          value={values.technicalComments}
        />
        <TextField
          size="small"
          label="Điểm kỹ thuật"
          InputProps={{
            readOnly: true,
          }}
          value={values.technicalScore}
        />
        <TextField
          size="small"
          label="Thái độ"
          InputProps={{
            readOnly: true,
          }}
          value={values.attitude}
        />
      </div>
      <div>
        <TextField
          size="small"
          label="Tiếng anh giao tiếp"
          InputProps={{
            readOnly: true,
          }}
          value={values.englishCommunication}
        />

        <TextField
          size="small"
          label="Nhận xét"
          InputProps={{
            readOnly: true,
          }}
          value={values.comments}
        />

        <TextField
          size="small"
          label="Kết quả"
          InputProps={{
            readOnly: true,
          }}
          value={values.status === "" ? "Waiting for results" : values.status}
        />
      </div>
    </>
  );

  const dataSearch = (
    <TextField
      size="small"
      placeholder="Tìm kiếm..."
      onChange={(e) => setSearch(e.target.value.toLowerCase())}
      InputProps={{
        endAdornment: (
          <IconButton>
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );

  // load data display
  const children = posts?.map((row, index) => {
    return (
      <TableRow hover tabIndex={-1} key={index} sx={{}}>
        <TableCell sx={{ minWidth: "100px" }}>{row.fullName}</TableCell>
        <TableCell
          sx={{
            maxWidth: 150,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {row.emailCandidate}
        </TableCell>
        <TableCell>{dayjs(row.interviewDate).format("DD/MM/YYYY")}</TableCell>
        <TableCell>{row.interviewTime}</TableCell>
        <TableCell>{row.interviewer}</TableCell>
        <TableCell
          sx={{
            maxWidth: 150,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {row.interviewLink}
        </TableCell>

        <TableCell>{row.status}</TableCell>
        <TableCell sx={{ minWidth: "50px" }}>
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
          <VisibilityIcon
            sx={{
              fontSize: 22,
              color: "#1976d2",
              borderRadius: "20%",
              cursor: "pointer",
              mx: "3px",
              "&:hover": {
                color: "white",
                backgroundColor: "#1976d2",
              },
            }}
            onClick={() => {
              handleEditClick(row);
              handleOpenView();
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
            onClick={() => handleDeleteClick(row.idCandidate)}
          />
        </TableCell>
      </TableRow>
    );
  });

  return (
    <>
      {/* Load data table */}
      <ReusableTable
        title={titleTable}
        search={dataSearch}
        handleSubmit={handleOpenInsert}
        headCells={headCells}
        children={children}
      />

      {/* Edit internview */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          {"Cập nhật kết quả phỏng vấn"}
        </DialogTitle>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div>
                <TextField
                  label="Họ tên"
                  size="small"
                  defaultValue={values.fullName}
                  name="fullName"
                  {...register("fullName")}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
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
                    {DG?.map((item, i) => {
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
                  label="Nhận xét"
                  size="small"
                  defaultValue={values.comments}
                  name="comments"
                  {...register("comments", {
                    required: true,
                  })}
                />
                <TextField
                  label="Nhận xét kỹ thuật"
                  size="small"
                  defaultValue={values.technicalComments}
                  name="technicalComments"
                  {...register("technicalComments", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <TextField
                  label="Điểm kỹ thuật"
                  size="small"
                  defaultValue={values.technicalScore}
                  name="technicalScore"
                  {...register("technicalScore", {
                    required: true,
                  })}
                />
                <TextField
                  label="Giao tiếp Tiếng Anh"
                  size="small"
                  defaultValue={values.englishCommunication}
                  name="englishCommunication"
                  {...register("englishCommunication", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <TextField
                  label="Thái độ"
                  size="small"
                  defaultValue={values.attitude}
                  name="attitude"
                  {...register("attitude", {
                    required: true,
                  })}
                />

                <TextField
                  label="Remarks"
                  size="small"
                  defaultValue={values.remarks}
                  name="remarks"
                  {...register("remarks", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                  <InputLabel htmlFor="grouped-select">Mentor</InputLabel>
                  <Select
                    defaultValue={values.idMentor}
                    id="grouped-select"
                    label="Mentor"
                    name="idMentor"
                    {...register("idMentor", {
                      required: true,
                    })}
                  >
                    {mentor?.map((item, i) => {
                      return (
                        <MenuItem key={i} value={item.idMentor}>
                          {item.fullNameMentor}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                  <InputLabel htmlFor="grouped-select">Kết quả</InputLabel>
                  <Select
                    defaultValue={values.status}
                    id="grouped-select"
                    label="Kết quả"
                    name="status"
                    {...register("status", {
                      required: true,
                    })}
                  >
                    <MenuItem value="Pass">Pass</MenuItem>
                    <MenuItem value="Fail">Fail</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Hủy
            </Button>
            <Button variant="contained" type="submit" autoFocus>
              Cập nhật
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* show view data */}
      <ReusableDialog
        isOpen={openViewData}
        handleClose={handleClose}
        title={titleView}
        children={dataView}
      />

      {/* insert Data passed */}
      <InsertInterview
        openInsert={openInsert}
        setOpenInsert={setOpenInsert}
        resultInterview={resultInterview}
        setResultInterview={setResultInterview}
        posts={posts}
        student={student}
      />
    </>
  );
}

export default Interview;

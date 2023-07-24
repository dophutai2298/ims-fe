import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import * as apiaxios from "../../../api/service";
import CalendarInterview from "../../calendarinterview/create/index";
import { popUpActions } from "../../../redux/store/popup";
import dayjs from "dayjs";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

import Button from "@mui/material/Button";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import {
  TableCell,
  TableRow,
  TablePagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import AddCandidate from "./addCandidate";
import Preview from "../../calendarinterview/review";
import ViewCandidate from "./viewCandidate";
import ReusableTable from "../../componentsReuse/reusableTable";
import ReusableDialog from "../../componentsReuse/reusableDialog";
import { useRef } from "react";

const headCells = [
  {
    label: "Họ tên",
  },
  {
    label: "Email",
  },
  {
    label: "Mã sinh viên",
  },
  {
    label: "Trường",
  },
  {
    label: "Vị trí thực tập",
  },
  {
    label: "Kết quả",
  },
  {
    label: "Tác vụ",
  },
];

export default function Candidate() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  //sort
  const { register, handleSubmit, reset } = useForm();
  const [candi, setCandi] = useState([]);
  const [batchTitle, setBatchTitle] = useState([]);
  const [search, setSearch] = useState("");

  const idBatch = localStorage.getItem("idBatch");

  // set data handle click edit
  const [values, setValues] = useState({
    idCandidate: "",
    fullName: "",
    tel: "",
    emailCandidate: "",
    internshipDomain: "",
    preferredSkills: "",
    university: "",
    faculty: "",
    currentYearofStudy: "",
    studentID: "",
    GPA: "",
    graduationYear: "",
    preferredInternshipStartDate: "",
    preferredInternshipDuration: "",
    internshipSchedule: "",
    pcType: "",
    projectExperience: "",
    expectedGraduationSchedule: "",
    remainingSubjects: "",
    covidVaccinationiInformation: "",
    covidVaccinationCertificate: "",
    certificationDate: "",
    interviewLink: "",
    interviewDate: "",
    interviewTime: "",
    interviewer: "",
    emailInterviewer: "",
  });
  const [valuesId, setValuesId] = useState(null);
  // set day format
  const [certificationDate, setCertificationDate] = useState("");
  const [preferredInternshipStartDate, setInterShipStartDate] = useState("");
  // open dialog
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openViewData, setOpenViewData] = useState(false);
  // set data total of candidate
  const [totalPage, setTotalPage] = useState(0);

  // set data file
  const [file, setFile] = useState("");

  const dispatch = useDispatch();
  const showModal = (data) => {
    dispatch(popUpActions.show());
    dispatch(popUpActions.setData(data));
  };
  const fetchCandi = () => {
    apiaxios
      .candidateAPI(
        `candidate/batch/${idBatch}?page=${page}&limit=${rowsPerPage}`
      )
      .then((res) => {
        setCandi(res.data.data);
        setTotalPage(res.data.total);
      });
  };

  useEffect(() => {
    const fetchData = () => {
      apiaxios
        .candidateAPI(`candidate/batch/${idBatch}?fullName=${search}`)
        .then((res) => {
          setCandi(res.data.data);
        });
    };
    if (search.length === 0 || search.length > 0) fetchData();
  }, [search]);

  useEffect(() => {
    fetchCandi();
  }, [page, rowsPerPage]);

  useEffect(() => {
    const fetchBatch = async () => {
      await apiaxios
        .batchAPI(`internshipcourse/${idBatch}`, "Get", null)
        .then((res) => {
          setBatchTitle(res.data.data);
        });
    };
    fetchBatch();
  }, [idBatch]);

  useEffect(() => {
    setCertificationDate(values.certificationDate);
    setInterShipStartDate(values.preferredInternshipStartDate);
  }, [values]);

  const handleOpenView = () => {
    setOpenViewData(true);
  };
  const handleOpenAdd = () => {
    if (batchTitle.status !== "Done") {
      setOpenAdd(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Batch đã kết thúc!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleClose = () => {
    setOpenEdit(false);
    setOpenViewData(false);
  };

  const status = (status) => {
    const value = "N/A";
    if (status == null) {
      return value;
    }
    return status;
  };
  // get data after click button edit
  const handleEditClick = (candidate) => {
    reset();
    setValuesId(candidate.idCandidate);
    const formValues = {
      idCandidate: candidate.idCandidate,
      fullName: candidate.fullName,
      tel: candidate.tel === null ? "" : candidate.tel,
      emailCandidate:
        candidate.emailCandidate === null ? "" : candidate.emailCandidate,
      internshipDomain:
        candidate.internshipDomain === null ? "" : candidate.internshipDomain,
      preferredSkills:
        candidate.preferredSkills === null ? "" : candidate.preferredSkills,
      university: candidate.university === null ? "" : candidate.university,
      faculty: candidate.faculty === null ? "" : candidate.faculty,
      currentYearofStudy:
        candidate.currentYearofStudy === null
          ? ""
          : candidate.currentYearofStudy,
      studentID: candidate.studentID === null ? "" : candidate.studentID,
      GPA: candidate.GPA,
      graduationYear:
        candidate.graduationYear === null ? "" : candidate.graduationYear,
      preferredInternshipStartDate:
        candidate.preferredInternshipStartDate === null
          ? ""
          : candidate.preferredInternshipStartDate,
      preferredInternshipDuration:
        candidate.preferredInternshipDuration === null
          ? ""
          : candidate.preferredInternshipDuration,
      internshipSchedule:
        candidate.internshipSchedule === null
          ? ""
          : candidate.internshipSchedule,
      pcType: candidate.pcType === null ? "" : candidate.pcType,
      status: candidate.status === null ? "" : candidate.status,
      technicalComments:
        candidate.technicalComments === null ? "" : candidate.technicalComments,
      technicalScore:
        candidate.technicalScore === null ? "" : candidate.technicalScore,
      attitude: candidate.attitude === null ? "" : candidate.attitude,
      englishCommunication:
        candidate.englishCommunication === null
          ? ""
          : candidate.englishCommunication,
      comments: candidate.comments === null ? "" : candidate.comments,
      remarks: candidate.remarks === null ? "" : candidate.remarks,
      projectExperience:
        candidate.projectExperience === null ? "" : candidate.projectExperience,
      expectedGraduationSchedule:
        candidate.expectedGraduationSchedule === null
          ? ""
          : candidate.expectedGraduationSchedule,
      remainingSubjects:
        candidate.remainingSubjects === null ? "" : candidate.remainingSubjects,
      covidVaccinationiInformation:
        candidate.covidVaccinationiInformation === null
          ? ""
          : candidate.covidVaccinationiInformation,
      covidVaccinationCertificate:
        candidate.covidVaccinationCertificate === null
          ? ""
          : candidate.covidVaccinationCertificate,
      certificationDate:
        candidate.certificationDate === null ? "" : candidate.certificationDate,
      interviewLink:
        candidate.interviewLink === null ? "" : candidate.certificationDate,
      interviewDate:
        candidate.interviewDate === null ? "" : candidate.interviewDate,
      interviewTime:
        candidate.interviewTime === null ? "" : candidate.interviewTime,
      interviewer: candidate.interviewer === null ? "" : candidate.interviewer,
      emailInterviewer:
        candidate.emailInterviewer === null ? "" : candidate.emailInterviewer,
    };

    setValues(formValues);
  };

  // click button edit, get data from form table => database
  const onSubmit = (data) => {
    let certificationDateLst = dayjs(certificationDate).format("YYYY/MM/DD");
    let internShipStartLst = dayjs(preferredInternshipStartDate).format(
      "YYYY/MM/DD"
    );
    data.certificationDate = certificationDateLst;
    data.preferredInternshipStartDate = internShipStartLst;
    apiaxios
      .candidatePut(`candidate/${valuesId}`, data)
      .then((res) => {
        const newCandi = [...candi];
        const index = candi.findIndex(
          (candidate) => candidate.idCandidate === valuesId
        );
        newCandi[index] = data;
        setCandi(newCandi);
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

  // click button delete
  const handleDeleteClick = (idCandidate) => {
    Swal.fire({
      title: "Bạn có muốn xóa?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "Hủy",
      confirmButtonText: "Đồng ý",
    }).then((result) => {
      if (result.isConfirmed) {
        const newContacts = [...candi];
        const index = candi.findIndex(
          (candidate) => candidate.idCandidate === idCandidate
        );
        apiaxios
          .deleteCandi(`candidate/${idCandidate}`, "DELETE", newContacts)
          .then((res) => {
            setCandi(newContacts);
          });
        newContacts.splice(index, 1);
        Swal.fire({
          icon: "success",
          title: "Xóa thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // Avoid a layout jump when reaching the last page with empty posts.
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const title = `Danh sách ứng viên ${batchTitle.nameCoure}`;
  const children = candi?.map((row, index) => {
    return (
      <TableRow hover tabIndex={-1} key={index} sx={{}}>
        <TableCell>{row.fullName}</TableCell>
        <TableCell
          sx={{
            maxWidth: 130,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {row.emailCandidate}
        </TableCell>
        <TableCell>{row.studentID}</TableCell>
        <TableCell
          sx={{
            maxWidth: 130,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {row.university}
        </TableCell>
        <TableCell
          sx={{
            maxWidth: 130,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {row.internshipDomain}
        </TableCell>
        <TableCell>{status(row.status)}</TableCell>
        <TableCell sx={{ minWidth: "100px" }}>
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
              handleOpenEdit();
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
              handleOpenView("paper");
            }}
          />
          <MoreTimeIcon
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
            onClick={() =>
              showModal({
                id: row.idCandidate,
                fullName: row.fullName,
                email: row.emailCandidate,
              })
            }
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
  const searchName = (
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

  const handleSubmitFile = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    apiaxios.UploadAPI("upload", formData, config).then((res) => {
      if (res.data) {
        Swal.fire({
          icon: "success",
          title: "Import thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setCandi();
      fetchCandi();
    });
    // .catch((error) => {
    //   if (error.response) {
    //     Swal.fire({
    //       icon: "error",
    //       text: error.response.data.error,
    //       confirmButtonText: "Xác nhận",
    //     });
    //   } else if (error.request) {
    //     Swal.fire({
    //       icon: "error",
    //       text: error.request,
    //       confirmButtonText: "Xác nhận",
    //     });
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       text: error.message,
    //       confirmButtonText: "Xác nhận",
    //     });
    //   }
    // })
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const importFile = (
    <Box component="form" onSubmit={handleSubmitFile}>
      <TextField size="small" type="file" onChange={handleChange}>
        Upload
      </TextField>
      <Button
        variant="contained"
        type="submit"
        sx={{ height: "40px", mr: "10px" }}
      >
        Upload
      </Button>
    </Box>
  );
  const paging = (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={totalPage}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );

  const titleEdit = "Sửa ứng viên";
  const childrenEdit = (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography sx={{ ml: 1, fontWeight: 600 }}>
        Thông tin cá nhân:
      </Typography>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Họ tên"
          size="small"
          defaultValue={values.fullName}
          name="fullName"
          {...register("fullName", {
            required: true,
          })}
        />
        <TextField
          required
          id="outlined-required"
          label="Số điện thoại"
          size="small"
          defaultValue={values.tel}
          name="tel"
          {...register("tel", {
            required: true,
          })}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          size="small"
          defaultValue={values.emailCandidate}
          name="emailCandidate"
          {...register("emailCandidate", {
            required: true,
          })}
        />
      </div>
      <Typography sx={{ ml: 1, mt: 1, fontWeight: 600 }}>
        Thông tin trường:
      </Typography>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Mã sinh viên"
          size="small"
          defaultValue={values.studentID}
          name="studentID"
          {...register("studentID", {
            required: true,
          })}
        />
        <TextField
          required
          id="outlined-required"
          label="Ngành học"
          size="small"
          defaultValue={values.faculty}
          name="faculty"
          {...register("faculty", {
            required: true,
          })}
        />
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Trường học"
          defaultValue={values.university}
          name="university"
          {...register("university", {
            required: true,
          })}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Sinh viên năm"
          size="small"
          defaultValue={values.currentYearofStudy}
          name="currentYearofStudy"
          {...register("currentYearofStudy", {
            required: true,
          })}
        />
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Điểm TB (Hệ 10)"
          defaultValue={values.GPA}
          name="GPA"
          {...register("GPA", {
            required: true,
          })}
        />
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Năm tốt nghiệp"
          defaultValue={values.graduationYear}
          name="graduationYear"
          {...register("graduationYear", {
            required: true,
          })}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Dự kiến tốt nghiệp"
          defaultValue={values.expectedGraduationSchedule}
          name="expectedGraduationSchedule"
          {...register("expectedGraduationSchedule", {
            required: true,
          })}
        />

        <TextField
          required
          id="outlined-required"
          size="small"
          label="Môn học còn lại"
          defaultValue={values.remainingSubjects}
          name="remainingSubjects"
          {...register("remainingSubjects", {
            required: true,
          })}
        />

        <TextField
          required
          id="outlined-required"
          size="small"
          label="Dự án đã tham gia"
          defaultValue={values.projectExperience}
          name="projectExperience"
          {...register("projectExperience", {
            required: true,
          })}
        />
      </div>
      <Typography sx={{ ml: 1, mt: 1, fontWeight: 600 }}>
        Thông tin thực tập:
      </Typography>
      <div>
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Vị trí thực tập"
          defaultValue={values.internshipDomain}
          name="internshipDomain"
          {...register("internshipDomain", {
            required: true,
          })}
        />

        <FormControl
          sx={{ m: 1, minWidth: 215 }}
          size="small"
          required
          id="outlined-required"
        >
          <InputLabel htmlFor="grouped-select">Thời gian thực tập</InputLabel>
          <Select
            defaultValue={values.preferredInternshipDuration}
            id="grouped-select"
            label="Thời gian thực tập"
            name="preferredInternshipDuration"
            {...register("preferredInternshipDuration", {
              required: true,
            })}
          >
            <MenuItem value="8 weeks">8 tuần</MenuItem>;
            <MenuItem value="12 weeks">12 tuần</MenuItem>;
          </Select>
        </FormControl>
        <FormControl
          sx={{ m: 1, minWidth: 215 }}
          size="small"
          required
          id="outlined-required"
        >
          <InputLabel htmlFor="grouped-select">Loại thực tập</InputLabel>
          <Select
            defaultValue={values.internshipSchedule}
            id="grouped-select"
            label="Loại thực tập"
            name="internshipSchedule"
            {...register("internshipSchedule", {
              required: true,
            })}
          >
            <MenuItem value="Full time">Full time</MenuItem>;
            <MenuItem value="Part time">Part time</MenuItem>;
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Kĩ năng"
          defaultValue={values.preferredSkills}
          name="preferredSkills"
          {...register("preferredSkills", {
            required: true,
          })}
        />

        <FormControl
          sx={{ m: 1, minWidth: 215 }}
          size="small"
          required
          id="outlined-required"
        >
          <InputLabel htmlFor="grouped-select">Loại PC</InputLabel>
          <Select
            defaultValue={values.pcType}
            id="grouped-select"
            label="Loại PC"
            name="pcType"
            {...register("pcType", {
              required: true,
            })}
          >
            <MenuItem value="PC">PC</MenuItem>;
            <MenuItem value="Laptop">Laptop</MenuItem>;
          </Select>
        </FormControl>
        <DesktopDatePicker
          label="Ngày thực tập"
          inputFormat="DD/MM/YYYY"
          name="preferredInternshipStartDate"
          value={preferredInternshipStartDate}
          onChange={(newValue) => {
            setInterShipStartDate(dayjs(newValue).format("MM/DD/YYYY"));
          }}
          renderInput={(params) => (
            <TextField
              required
              id="outlined-required"
              size="small"
              {...params}
            />
          )}
        />
      </div>
      <Typography sx={{ ml: 1, mt: 1, fontWeight: 600 }}>
        Thông tin Covid:
      </Typography>
      <div>
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Giấy chứng nhận"
          defaultValue={values.covidVaccinationCertificate}
          name="covidVaccinationCertificate"
          {...register("covidVaccinationCertificate", {
            required: true,
          })}
        />

        <DesktopDatePicker
          label="Ngày chứng nhận"
          //   maxDate={today}
          inputFormat="DD/MM/YYYY"
          value={certificationDate}
          name="certificationDate"
          onChange={(newValue) => {
            setCertificationDate(dayjs(newValue).format("MM/DD/YYYY"));
          }}
          renderInput={(params) => (
            <TextField
              required
              id="outlined-required"
              size="small"
              {...params}
            />
          )}
        />
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Tiêm chủng Covid"
          defaultValue={values.covidVaccinationiInformation}
          name="covidVaccinationiInformation"
          {...register("covidVaccinationiInformation", {
            required: true,
          })}
        />
      </div>
    </LocalizationProvider>
  );
  const buttonEdit = (
    <Button variant="contained" type="submit" autoFocus>
      Cập nhật
    </Button>
  );
  return (
    <>
      {/* set interview schedule */}
      <CalendarInterview />
      {/* view all data */}
      <Preview />
      {/* add data candidate */}
      <AddCandidate
        openAdd={openAdd}
        setOpenAdd={setOpenAdd}
        fetchCandi={fetchCandi}
        candi={candi}
      />
      {/* load data display */}
      <ReusableTable
        title={title}
        search={searchName}
        importFile={importFile}
        handleSubmit={handleOpenAdd}
        headCells={headCells}
        children={children}
        paging={paging}
      />

      {/* Edit candidate */}
      <ReusableDialog
        isOpen={openEdit}
        handleClose={handleClose}
        title={titleEdit}
        onSubmit={handleSubmit(onSubmit)}
        children={childrenEdit}
        button={buttonEdit}
      />
      {/* View all data */}
      <ViewCandidate
        openViewData={openViewData}
        setOpenViewData={setOpenViewData}
        values={values}
      />
    </>
  );
}

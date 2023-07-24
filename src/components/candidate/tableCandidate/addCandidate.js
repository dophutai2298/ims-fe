import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as apiaxios from "../../../api/service";
import Swal from "sweetalert2";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ReusableDialog from "../../componentsReuse/reusableDialog";
import { Box } from "@mui/system";

export default function AddCandidate(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "all" });

  const [certificationDate, setCertificationDate] = useState("");
  const [preferredInternshipStartDate, setInterShipStartDate] = useState("");

  const [candi, setCandi] = useState([]);
  const today = new Date();
  const idBatch = localStorage.getItem("idBatch");

  const handleClose = () => {
    props.setOpenAdd(false);
  };
  const statusaass = "Waiting for results";
  // submit add data
  const onSubmitAdd = (data) => {
    console.log(data);
    const certiDate = dayjs(certificationDate).format("YYYY/MM/DD");
    const internShipDate = dayjs(preferredInternshipStartDate).format(
      "YYYY/MM/DD"
    );

    data.certificationDate = certiDate;
    data.preferredInternshipStartDate = internShipDate;
    data.idInternshipCourse = idBatch;
    data.status = statusaass;
    apiaxios
      .candidatePost("candidate/create", data)
      .then((res) => {
        const newCadidates = [data, ...candi];
        setCandi(newCadidates);
        props.fetchCandi();
        reset();
        setCertificationDate("");
        setInterShipStartDate("");
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

  const title = "Thêm ứng viên";
  const children = (
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
          defaultValue=""
          name="fullName"
          {...register("fullName", {
            required: "Vui lòng nhập đầy đủ tên",
            // pattern: {
            //   value: /^[a-zA-Z\u00C0-\u017F]+(?:\s[a-zA-Z\u00C0-\u017F]+)*$/,
            //   message: "Vui lòng nhập đúng định dạng",
            // },
          })}
        />

        <TextField
          required
          id="outlined-required"
          label="Số điện thoại"
          size="small"
          defaultValue=""
          name="tel"
          {...register("tel", {
            required: "Vui lòng nhập số điện thoại",
            pattern: {
              value: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
              message: "Vui lòng nhập đúng định dạng",
            },
          })}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          size="small"
          defaultValue=""
          name="emailCandidate"
          {...register("emailCandidate", {
            required: "Vui lòng nhập email của bạn",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Vui lòng nhập đúng định dạng mail",
            },
          })}
        />
      </div>

      <Box component="div" sx={{ lineHeight: 0 }}>
        <Typography
          sx={{
            display: "inline",
            maxWidth: 200,
            my: 0,
            pl: 3,
            color: "#d32f2f",
            fontSize: "12px",
          }}
        >
          {errors.fullName?.message}
        </Typography>

        <Typography
          sx={{
            display: "inline",
            maxWidth: 200,
            position: "absolute",
            top: 165,
            left: 200,
            my: 0,
            pl: 8,
            color: "#d32f2f",
            fontSize: "12px",
          }}
        >
          {errors.tel?.message}
        </Typography>

        <Typography
          sx={{
            display: "inline",
            float: "right",
            minWidth: 180,
            my: 0,
            mx: 3,
            color: "#d32f2f",
            fontSize: "12px",
          }}
        >
          {errors.emailCandidate?.message}
        </Typography>
      </Box>
      <Typography sx={{ ml: 1, mt: 0, fontWeight: 600 }}>
        Thông tin trường:
      </Typography>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Mã sinh viên"
          size="small"
          defaultValue=""
          name="studentID"
          {...register("studentID", {
            required: "Vui lòng nhập mã sinh viên",
            pattern: {
              value: /^[a-zA-Z0-9\s]+(?:[-:%/\\()\u2122.+][a-zA-Z0-9\s]+)*$/,
              message: "Vui lòng nhập đúng định dạng",
            },
          })}
        />
        <TextField
          required
          id="outlined-required"
          label="Ngành học"
          size="small"
          defaultValue=""
          name="faculty"
          {...register("faculty", {
            required: "Vui lòng nhập ngành học",
            pattern: {
              value: /^[a-zA-Z\u00C0-\u017F]+(?:\s[a-zA-Z\u00C0-\u017F]+)*$/,
              message: "Vui lòng nhập đúng định dạng",
            },
          })}
        />
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Trường học"
          defaultValue=""
          name="university"
          {...register("university", {
            required: "Vui lòng nhập trường học",
            // pattern: {
            //   value: /^[a-zA-Z0-9]*$/,
            //   message: "Vui lòng nhập đúng định dạng",
            // },
          })}
        />
      </div>
      <Box component="div" sx={{ py: 0 }}>
        <Typography
          sx={{
            display: "inline",
            maxWidth: 200,
            my: 0,
            pl: 3,
            color: "#d32f2f",
            fontSize: "12px",
          }}
        >
          {errors.studentID?.message}
        </Typography>

        <Typography
          sx={{
            display: "inline",
            maxWidth: 200,
            position: "absolute",
            top: 262,
            left: 200,
            my: 0,
            pl: 8,
            color: "#d32f2f",
            fontSize: "12px",
          }}
        >
          {errors.faculty?.message}
        </Typography>

        <Typography
          sx={{
            display: "inline",
            float: "right",
            minWidth: 180,
            my: 0,
            mx: 3,
            color: "#d32f2f",
            fontSize: "12px",
          }}
        >
          {errors.university?.message}
        </Typography>
      </Box>

      <div>
        <TextField
          required
          id="outlined-required"
          label="Sinh viên năm"
          size="small"
          defaultValue=""
          name="currentYearofStudy"
          {...register("currentYearofStudy", {
            required: "Vui lòng nhập năm học",
            pattern: {
              value: /^[0-9]*$/,
              message: "Vui lòng nhập đúng định dạng",
            },
            max: {
              value: 5,
              message: "Vui lòng nhập đúng số năm",
            },
          })}
        />
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Điểm TB (Hệ 10)"
          defaultValue=""
          name="GPA"
          {...register("GPA", {
            required: "Vui lòng nhập điểm trung bình",
            pattern: {
              value: /^[0-9]*$/,
              message: "Vui lòng nhập đúng định dạng",
            },
            max: {
              value: 10,
              message: "Vui lòng nhập đúng điểm",
            },
          })}
        />
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Năm tốt nghiệp"
          defaultValue=""
          name="graduationYear"
          {...register("graduationYear", {
            required: "Vui lòng nhập năm tốt nghiệp",
            pattern: {
              value: /^[0-9]*$/,
              message: "Vui lòng nhập đúng định dạng",
            },
            min: {
              value: 1950,
              message: "Vui lòng nhập đúng số năm",
            },
            max: {
              value: 2030,
              message: "Vui lòng nhập đúng số năm",
            },
          })}
        />
      </div>
      <Box component="div" sx={{ py: 0 }}>
        <Typography
          sx={{
            display: "inline",
            maxWidth: 200,
            my: 0,
            pl: 3,
            color: "#d32f2f",
            fontSize: "12px",
          }}
        >
          {errors.currentYearofStudy?.message}
        </Typography>

        <Typography
          sx={{
            display: "inline",
            maxWidth: 200,
            position: "absolute",
            top: 337,
            left: 200,
            my: 0,
            pl: 8,
            color: "#d32f2f",
            fontSize: "12px",
          }}
        >
          {errors.GPA?.message}
        </Typography>

        <Typography
          sx={{
            display: "inline",
            float: "right",
            minWidth: 180,
            my: 0,
            mx: 3,
            color: "#d32f2f",
            fontSize: "12px",
          }}
        >
          {errors.graduationYear?.message}
        </Typography>
      </Box>
      <div>
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Dự kiến tốt nghiệp"
          defaultValue=""
          name="expectedGraduationSchedule"
          {...register("expectedGraduationSchedule", {
            required: "Vui lòng nhập năm tốt nghiệp",
            pattern: {
              value: /^[0-9]*$/,
              message: "Vui lòng nhập đúng định dạng",
            },
            min: {
              value: 1950,
              message: "Vui lòng nhập đúng số năm",
            },
            max: {
              value: 2030,
              message: "Vui lòng nhập đúng số năm",
            },
          })}
        />

        <TextField
          required
          id="outlined-required"
          size="small"
          label="Môn học còn lại"
          defaultValue=""
          name="remainingSubjects"
          {...register("remainingSubjects", {
            required: "Vui lòng nhập những môn còn lại",
          })}
        />

        <TextField
          required
          id="outlined-required"
          size="small"
          label="Dự án đã tham gia"
          defaultValue=""
          name="projectExperience"
          {...register("projectExperience", {
            required: "Vui lòng nhập dự án đã tham gia",
          })}
        />
      </div>
      <Box component="div" sx={{ py: 0 }}>
        <Typography
          sx={{
            display: "inline",
            maxWidth: 200,
            my: 0,
            pl: 3,
            color: "#d32f2f",
            fontSize: "12px",
          }}
        >
          {errors.expectedGraduationSchedule?.message}
        </Typography>

        <Typography
          sx={{
            display: "inline",
            maxWidth: 200,
            position: "absolute",
            bottom: 325,
            left: 200,
            my: 0,
            pl: 8,
            color: "#d32f2f",
            fontSize: "12px",
          }}
        >
          {errors.remainingSubjects?.message}
        </Typography>

        <Typography
          sx={{
            display: "inline",
            float: "right",
            minWidth: 180,
            my: 0,
            mx: 3,
            color: "#d32f2f",
            fontSize: "12px",
          }}
        >
          {errors.projectExperience?.message}
        </Typography>
      </Box>
      <Typography sx={{ ml: 1, mt: 1, fontWeight: 600 }}>
        Thông tin thực tập:
      </Typography>
      <div>
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Vị trí thực tập"
          defaultValue=""
          name="internshipDomain"
          {...register("internshipDomain", {
            required: "Vui lòng nhập vị trí thực tập",
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
            defaultValue=""
            id="grouped-select"
            label="Thời gian thực tập"
            name="preferredInternshipDuration"
            {...register("preferredInternshipDuration", {
              required: "Vui lòng chọn thời gian thực tập",
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
            defaultValue=""
            id="grouped-select"
            label="Loại thực tập"
            name="internshipSchedule"
            {...register("internshipSchedule", {
              required: "Vui lòng chọn loại thực tập",
            })}
          >
            <MenuItem value="Full time">Full time</MenuItem>;
            <MenuItem value="Part time">Part time</MenuItem>;
          </Select>
        </FormControl>
      </div>
      <Box component="div" sx={{ py: 0 }}>
        <Typography
          sx={{
            display: "inline",
            maxWidth: 200,
            my: 0,
            pl: 3,
            color: "#d32f2f",
            fontSize: "12px",
          }}
        >
          {errors.internshipDomain?.message}
        </Typography>

        <Typography
          sx={{
            display: "inline",
            maxWidth: 200,
            position: "absolute",
            bottom: 218,
            left: 200,
            my: 0,
            pl: 8,
            color: "#d32f2f",
            fontSize: "12px",
          }}
        >
          {errors.preferredInternshipDuration?.message}
        </Typography>

        <Typography
          sx={{
            display: "inline",
            float: "right",
            minWidth: 180,
            my: 0,
            mx: 3,
            color: "#d32f2f",
            fontSize: "12px",
          }}
        >
          {errors.internshipSchedule?.message}
        </Typography>
      </Box>
      <div>
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Kĩ năng"
          defaultValue=""
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
            defaultValue=""
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
          minDate={today}
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
          defaultValue=""
          name="covidVaccinationCertificate"
          {...register("covidVaccinationCertificate", {
            required: true,
          })}
        />

        <DesktopDatePicker
          label="Ngày chứng nhận"
          maxDate={today}
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
          defaultValue=""
          name="covidVaccinationiInformation"
          {...register("covidVaccinationiInformation", {
            required: true,
          })}
        />
      </div>
    </LocalizationProvider>
  );
  const button = (
    <Button variant="contained" type="submit" autoFocus>
      Thêm
    </Button>
  );
  return (
    <ReusableDialog
      isOpen={props.openAdd}
      handleClose={handleClose}
      title={title}
      onSubmit={handleSubmit(onSubmitAdd)}
      children={children}
      button={button}
    />
  );
}

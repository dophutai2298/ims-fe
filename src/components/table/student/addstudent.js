import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import * as apiaxios from "../../../api/service";
import Swal from "sweetalert2";
import ReusableDialog from "../../componentsReuse/reusableDialog";
import { useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

export default function AddStudent(props) {
  const today = new Date();
  const [posts, setPosts] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [testDate, setTestDate] = useState("");
  const [certificationDate, setCertificationDate] = useState("");
  const idBatch = localStorage.getItem("idBatch");

  const onSubmit = (dataAdd) => {
    dataAdd.testDate = dayjs(testDate).format("YYYY/MM/DD");
    dataAdd.certificationDate = dayjs(certificationDate).format("YYYY/MM/DD");
    apiaxios
      .studentCreate(`internship?idInternshipCourse=${idBatch}`, dataAdd)
      .then((res) => {
        const newBatch = [...posts, dataAdd];
        setPosts(newBatch);
        if (res.data) {
          Swal.fire({
            icon: "success",
            title: "Thêm thành công",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        props.fetchData();
        reset();
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

  const handleClose = () => {
    props.setOpenAdd(false);
  };
  const title = "Thêm thực tập sinh";
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
          name="fullNameInternship"
          {...register("fullNameInternship", {
            required: true,
          })}
        />
        <TextField
          required
          id="outlined-required"
          label="Số điện thoại"
          size="small"
          defaultValue=""
          name="telInternship"
          {...register("telInternship", {
            required: true,
          })}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          size="small"
          defaultValue=""
          name="email"
          {...register("email", {
            required: true,
          })}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Địa chỉ"
          defaultValue=""
          name="address"
          {...register("address", {
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
          label="Trường học"
          defaultValue=""
          name="university"
          {...register("university", {
            required: true,
          })}
        />
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Vị trí thực tập"
          defaultValue=""
          name="internshipDomain"
          {...register("internshipDomain", {
            required: true,
          })}
        />
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Trạng thái"
          defaultValue=""
          name="status"
          {...register("status", {
            required: true,
          })}
        />
      </div>

      <div>
        <TextField
          required
          id="outlined-required"
          label="Dự án thực tập"
          size="small"
          defaultValue=""
          name="internshipProject"
          {...register("internshipProject", {
            required: true,
          })}
        />
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Thỏa thuận thực tập"
          defaultValue=""
          name="internshipAgreementPolicy"
          {...register("internshipAgreementPolicy", {
            required: true,
          })}
        />
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Điểm bảo mật"
          defaultValue=""
          name="securityTest"
          {...register("securityTest", {
            required: true,
          })}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Điểm toeic"
          defaultValue=""
          name="toeicScore"
          {...register("toeicScore", {
            required: true,
          })}
        />

        <DesktopDatePicker
          label="Ngày test Toeic"
          maxDate={today}
          inputFormat="DD/MM/YYYY"
          value={testDate}
          onChange={(newValue) => {
            setTestDate(dayjs(newValue).format("MM/DD/YYYY"));
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
          label="Nhận thức bảo mật"
          defaultValue=""
          name="securityAwareness"
          {...register("securityAwareness", {
            required: true,
          })}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Phương pháp Agile"
          defaultValue=""
          name="pmtoolsAgileMethodology"
          {...register("pmtoolsAgileMethodology", {
            required: true,
          })}
        />
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Nghi thức truyền thông"
          defaultValue=""
          name="workEtiquetteProfessionalCommunication"
          {...register("workEtiquetteProfessionalCommunication", {
            required: true,
          })}
        />
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Kỹ năng thuyết trình"
          defaultValue=""
          name="presentationSkills"
          {...register("presentationSkills", {
            required: true,
          })}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Tham gia khóa đào tạo"
          defaultValue=""
          name="trainingAttendance"
          {...register("trainingAttendance", {
            required: true,
          })}
        />
        <FormControl
          sx={{ m: 1, minWidth: 200 }}
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
              required: true,
            })}
          >
            <MenuItem value="Full time">Full time</MenuItem>;
            <MenuItem value="Part time">Part time</MenuItem>;
          </Select>
        </FormControl>

        <FormControl
          sx={{ m: 1, minWidth: 200 }}
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
      </div>
      <div>
        <FormControl
          sx={{ m: 1, minWidth: 200 }}
          size="small"
          required
          id="outlined-required"
        >
          <InputLabel htmlFor="grouped-select">Mentor</InputLabel>
          <Select
            defaultValue=""
            id="grouped-select"
            label="Mentor"
            name="idMentor"
            {...register("idMentor", {
              required: true,
            })}
          >
            {props.mentor?.map((item, i) => {
              return (
                <MenuItem key={i} value={item.idMentor}>
                  {item.fullNameMentor}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl
          sx={{ m: 1, minWidth: 200 }}
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
        <FormControl
          sx={{ m: 1, minWidth: 200 }}
          size="small"
          required
          id="outlined-required"
        >
          <InputLabel htmlFor="grouped-select">Trạng thái thực tập</InputLabel>
          <Select
            defaultValue=""
            id="grouped-select"
            label="Trạng thái thực tập"
            name="internshipStatus"
            {...register("internshipStatus", {
              required: true,
            })}
          >
            <MenuItem value="Dừng thực tập">Dừng thực tập</MenuItem>;
            <MenuItem value="Đang thực tập">Đang thực tập</MenuItem>;
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Bình luận"
          defaultValue=""
          name="remark"
          {...register("remark", {
            required: true,
          })}
        />
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Thông tin Covid"
          defaultValue=""
          name="covidVaccinationiInformation"
          {...register("covidVaccinationiInformation", {
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
      onSubmit={handleSubmit(onSubmit)}
      children={children}
      button={button}
    />
  );
}

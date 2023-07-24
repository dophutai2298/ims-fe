import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";

export default function ViewCandidate(props) {
  const handleClose = () => {
    props.setOpenViewData(false);
  };

  return (
    <Dialog
      open={props.openViewData}
      onClose={handleClose}
      scroll={props.scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="lg"
    >
      <DialogTitle id="scroll-dialog-title" align="center">
        {"Thông tin ứng viên"}
      </DialogTitle>

      <DialogContent
        dividers={props.scroll === "paper"}
        id="scroll-dialog-description"
        sx={{
          maxHeight: 700,
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <Typography sx={{ ml: 1, fontWeight: 600 }}>
          Thông tin cá nhân:
        </Typography>
        <div>
          <TextField
            label="Họ tên"
            InputProps={{
              readOnly: true,
            }}
            size="small"
            value={props.values.fullName}
          />
          <TextField
            label="Số điện thoại"
            InputProps={{
              readOnly: true,
            }}
            size="small"
            value={props.values.tel}
          />
          <TextField
            label="Email"
            InputProps={{
              readOnly: true,
            }}
            size="small"
            value={props.values.emailCandidate}
          />
        </div>
        <Typography sx={{ ml: 1, mt: 1, fontWeight: 600 }}>
          Thông tin trường:
        </Typography>
        <div>
          <TextField
            label="Mã sinh viên"
            InputProps={{
              readOnly: true,
            }}
            size="small"
            value={props.values.studentID}
          />
          <TextField
            label="Ngành học"
            InputProps={{
              readOnly: true,
            }}
            size="small"
            value={props.values.faculty}
          />
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Trường học"
            InputProps={{
              readOnly: true,
            }}
            value={props.values.university}
          />
        </div>
        <div>
          <TextField
            label="Sinh viên năm"
            InputProps={{
              readOnly: true,
            }}
            size="small"
            value={props.values.currentYearofStudy}
          />
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Điểm TB (Hệ 10)"
            InputProps={{
              readOnly: true,
            }}
            value={props.values.GPA}
          />
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Năm tốt nghiệp"
            InputProps={{
              readOnly: true,
            }}
            value={props.values.graduationYear}
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Dự kiến tốt nghiệp"
            InputProps={{
              readOnly: true,
            }}
            value={props.values.expectedGraduationSchedule}
          />

          <TextField
            required
            id="outlined-required"
            size="small"
            label="Môn học còn lại"
            InputProps={{
              readOnly: true,
            }}
            value={props.values.remainingSubjects}
          />

          <TextField
            required
            id="outlined-required"
            size="small"
            label="Dự án đã tham gia"
            InputProps={{
              readOnly: true,
            }}
            value={props.values.projectExperience}
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
            InputProps={{
              readOnly: true,
            }}
            value={props.values.internshipDomain}
          />
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Thời gian thực tập"
            InputProps={{
              readOnly: true,
            }}
            value={props.values.preferredInternshipDuration}
          />
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Loại thực tập"
            InputProps={{
              readOnly: true,
            }}
            value={props.values.internshipSchedule}
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Kĩ năng"
            InputProps={{
              readOnly: true,
            }}
            value={props.values.preferredSkills}
          />
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Loại PC"
            InputProps={{
              readOnly: true,
            }}
            value={props.values.pcType}
          />
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Ngày thực tập"
            InputProps={{
              readOnly: true,
            }}
            value={dayjs(props.values.preferredInternshipStartDate).format(
              "DD/MM/YYYY"
            )}
          />
        </div>
        <div>
          <TextField
            label="Người phỏng vấn"
            InputProps={{
              readOnly: true,
            }}
            size="small"
            value={props.values.interviewer}
          />
          <TextField
            label="Email người PV"
            InputProps={{
              readOnly: true,
            }}
            size="small"
            value={props.values.emailInterviewer}
          />
          <TextField
            label="Link phỏng vấn"
            InputProps={{
              readOnly: true,
            }}
            size="small"
            value={props.values.interviewLink}
          />
        </div>
        <div>
          <TextField
            label="Ngày phỏng vấn"
            InputProps={{
              readOnly: true,
            }}
            size="small"
            value={dayjs(props.values.interviewDate).format("DD/MM/YYYY")}
          />
          <TextField
            label="Giờ phỏng vấn"
            InputProps={{
              readOnly: true,
            }}
            size="small"
            value={props.values.interviewTime}
          />
          <TextField
            label="Nhận xét kĩ thuật"
            InputProps={{
              readOnly: true,
            }}
            size="small"
            value={props.values.technicalComments}
          />
        </div>
        <div>
          <TextField
            label="Điểm kĩ thuật"
            InputProps={{
              readOnly: true,
            }}
            size="small"
            value={props.values.technicalScore}
          />

          <TextField
            label="Thái độ"
            InputProps={{
              readOnly: true,
            }}
            size="small"
            value={props.values.attitude}
          />
          <TextField
            label="Comments"
            InputProps={{
              readOnly: true,
            }}
            size="small"
            value={props.values.comments}
          />
        </div>

        <div>
          <TextField
            label="Kết quả"
            InputProps={{
              readOnly: true,
            }}
            size="small"
            value={props.values.status}
          />
          <TextField
            label="Giao tiếp Tiếng Anh"
            InputProps={{
              readOnly: true,
            }}
            size="small"
            value={props.values.englishCommunication}
          />
          <TextField
            label="Remarks"
            InputProps={{
              readOnly: true,
            }}
            size="small"
            value={props.values.remarks}
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
            InputProps={{
              readOnly: true,
            }}
            value={props.values.covidVaccinationCertificate}
          />
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Ngày chứng nhận"
            InputProps={{
              readOnly: true,
            }}
            value={dayjs(props.values.certificationDate).format("DD/MM/YYYY")}
          />
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Tiêm chủng Covid"
            InputProps={{
              readOnly: true,
            }}
            value={props.values.covidVaccinationiInformation}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}

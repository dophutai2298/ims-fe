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

export default function ViewStudent(props) {
  const handleClose = () => {
    props.setOpenView(false);
  };

  return (
    <Dialog
      open={props.openView}
      onClose={handleClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="lg"
    >
      <DialogTitle id="scroll-dialog-title" align="center">
        {"Thông tin ứng viên"}
      </DialogTitle>

      <DialogContent
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
            size="small"
            defaultValue={props.values.fullNameInternship}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Số điện thoại"
            size="small"
            defaultValue={props.values.telInternship}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Email"
            size="small"
            defaultValue={props.values.email}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            size="small"
            label="Địa chỉ"
            defaultValue={props.values.address}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <Typography sx={{ ml: 1, mt: 1, fontWeight: 600 }}>
          Thông tin thực tập:
        </Typography>
        <div>
          <TextField
            size="small"
            label="Trường học"
            defaultValue={props.values.university}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            size="small"
            label="Vị trí thực tập"
            defaultValue={props.values.internshipDomain}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            size="small"
            label="Trạng thái"
            defaultValue={props.values.status}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>

        <div>
          <TextField
            label="Dự án thực tập"
            size="small"
            defaultValue={props.values.internshipProject}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            size="small"
            label="Thỏa thuận thực tập"
            defaultValue={props.values.internshipAgreementPolicy}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            size="small"
            label="Điểm bảo mật"
            defaultValue={props.values.securityTest}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            size="small"
            label="Điểm toeic"
            defaultValue={props.values.toeicScore}
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            size="small"
            label="Ngày test Toeic"
            defaultValue={dayjs(props.values.testDate).format("DD/MM/YYYY")}
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            size="small"
            label="Nhận thức bảo mật"
            defaultValue={props.values.securityAwareness}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            size="small"
            label="Phương pháp Agile"
            defaultValue={props.values.pmtoolsAgileMethodology}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            size="small"
            label="Nghi thức truyền thông"
            defaultValue={props.values.workEtiquetteProfessionalCommunication}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            size="small"
            label="Kỹ năng thuyết trình"
            defaultValue={props.values.presentationSkills}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            size="small"
            label="Tham gia khóa đào tạo"
            defaultValue={props.values.trainingAttendance}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            size="small"
            label="Loại thực tập"
            defaultValue={props.values.internshipSchedule}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            size="small"
            label="Loại PC"
            defaultValue={props.values.pcType}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            size="small"
            label="Mentor"
            defaultValue={props.values.idMentor}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            size="small"
            label="Tên DG"
            defaultValue={props.values.nameDG}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            size="small"
            label="Trạng thái thực tập"
            defaultValue={props.values.internshipStatus}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            size="small"
            label="Bình luận"
            defaultValue={props.values.remark}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            size="small"
            label="Thông tin Covid"
            defaultValue={props.values.covidVaccinationiInformation}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            size="small"
            label="Ngày chứng nhận"
            defaultValue={dayjs(props.values.certificationDate).format("DD/MM/YYYY")}
            InputProps={{
              readOnly: true,
            }}
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

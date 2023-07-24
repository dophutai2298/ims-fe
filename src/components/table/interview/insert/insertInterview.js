import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  insertinterviewAPI,
  updateinsertinterviewAPI,
  internshipStatusUpdate,
} from "../../../../api/service";

const headCells = [
  {
    label: "Họ tên",
  },
  {
    label: "Email",
  },
  {
    label: "Nhận xét kỹ thuật",
  },
  {
    label: "Điểm kỹ thuật",
  },
  {
    label: "Nhận xét",
  },
  {
    label: "Thái độ",
  },
  {
    label: "Tiếng anh",
  },
  {
    label: "Kết quả",
  },
];

export default function InsertInterview(props) {
  const idBatch = localStorage.getItem("idBatch");

  const handleSubmit = (id) => {
    handleClose();
    Swal.fire({
      title: "Bạn có muốn thêm danh sách này ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "Hủy",
      reverseButtons: true,
      confirmButtonText: "Đồng ý",
    }).then((result) => {
      if (result.isConfirmed) {
        const newContacts = [...props.resultInterview];
        const index = props.resultInterview.findIndex(
          (products) => products.idInternshipCourse === id
        );
        insertinterviewAPI(`internship/${id}`).then((res) => {});
        updateinsertinterviewAPI(`internview/updateInsert/${id}`).then(
          (res) => {}
        );
        internshipStatusUpdate(`internship/`).then((res) => {});
        for (let i = 0; i < newContacts.length; i) {
          newContacts.splice(index, 1);
        }
        props.setResultInterview(newContacts);
        Swal.fire({
          icon: "success",
          title: "Thêm thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        props.setOpenInsert(true);
      }
    });
  };

  const handleClose = () => {
    props.setOpenInsert(false);
  };
  return (
    <>
      <Dialog
        open={props.openInsert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          {"Kết quả phỏng vấn"}
        </DialogTitle>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <DialogContent>
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <TableHead>
                  <TableRow>
                    {headCells.map((row, i) => (
                      <TableCell
                        key={i}
                        align="left"
                        padding={row.disablePadding ? "none" : "normal"}
                        sx={{ px: 0 }}
                      >
                        <Typography sx={{ paddingLeft: 2, fontWeight: 600 }}>
                          {row.label}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.resultInterview?.map((row, index) => {
                    return (
                      <TableRow hover tabIndex={-1} key={index} sx={{}}>
                        <TableCell>{row.fullName}</TableCell>
                        <TableCell>{row.emailCandidate}</TableCell>
                        <TableCell>{row.studentID}</TableCell>
                        <TableCell
                          sx={{
                            maxWidth: 150,
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}
                        >
                          {row.university}
                        </TableCell>
                        <TableCell
                          sx={{
                            maxWidth: 150,
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}
                        >
                          {row.internshipDomain}
                        </TableCell>
                        <TableCell>{row.attitude}</TableCell>
                        <TableCell>{row.englishCommunication}</TableCell>
                        <TableCell>{row.status}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Hủy
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleSubmit(idBatch);
              }}
            >
              Thêm
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

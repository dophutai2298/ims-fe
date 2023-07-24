import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as apiaxios from "../../../api/service";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import ReusableDialog from "../../componentsReuse/reusableDialog";
import { useForm } from "react-hook-form";

const headCells = [
  {
    label: "Tên DG",
  },
  {
    label: "Tác vụ",
  },
];
function ListDg() {
  const idBatch = localStorage.getItem("idBatch");
  const [dg, setDg] = useState([]);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [valuesId, setValuesId] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [values, setValues] = useState("");

  const fetchDG = () => {
    apiaxios.dg(`dg?idInternshipCourse=${idBatch}`, "Get", null).then((res) => {
      setDg(res.data.data);
    });
  };

  useEffect(() => {
    fetchDG();
  }, []);

  const onSubmitAdd = (data) => {
    apiaxios
      .dgCreate(`dg/create?idInternshipCourse=${idBatch}`, data)
      .then((res) => {
        setDg(res.data.data);
        if (res.data) {
          Swal.fire({
            icon: "success",
            title: "Thêm thành công",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        fetchDG();
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
        const newContacts = [...dg, data];
        setDg(newContacts);
      });
    handleClose();
  };

  const handleEditClick = (dg) => {
    reset();
    setValuesId(dg.idDG);
    const formValues = {
      nameDG: dg.nameDG,
    };
    setValues(formValues);
  };
  const editSubmit = (data) => {
    apiaxios
      .dgEdit(`dg/${valuesId}`, data)
      .then((res) => {
        const newDg = [...posts];
        const index = posts.findIndex((dg) => dg.idDG === valuesId);
        newDg[index] = data;
        setPosts(newDg);
        setDg(newDg);
        if (res.data) {
          Swal.fire({
            icon: "success",
            title: "Sửa thành công",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        fetchDG();
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
    const newDg = [...dg];
    const index = dg.findIndex(
      (products) => products.idInternshipCourse === valuesId
    );
    newDg[index] = data;
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handlOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
  };

  const title = "Thêm nhóm thực tập";
  const button = (
    <Button variant="contained" type="submit" autoFocus>
      Thêm
    </Button>
  );
  const buttonEdit = (
    <Button variant="contained" type="submit" autoFocus>
      Cập nhật
    </Button>
  );
  const children = (
    <TextField
      required
      label="Tên nhóm thực tập"
      name="nameDG"
      defaultValue={values.nameDG}
      {...register("nameDG", {
        required: true,
      })}
    />
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
          sx={{ flex: "1 1 100%", maxWidth: 300, margin: "auto" }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          Danh sách nhóm thực tập
        </Typography>
      </Toolbar>

      <Box sx={{ width: "100%", mb: 2, maxWidth: 300, margin: "auto" }}>
        <Button
          variant="contained"
          type="submit"
          sx={{ float: "right" }}
          onClick={handleOpen}
        >
          Thêm
        </Button>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2, maxWidth: 300, margin: "auto" }}>
          <TableContainer>
            <Table aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  {headCells.map((headCell, i) => (
                    <TableCell key={i} align="left" sx={{ px: 0 }}>
                      <Typography
                        align="center"
                        sx={{ fontSize: 15, fontWeight: 600 }}
                      >
                        {headCell.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dg?.map((row, i) => (
                  <TableRow hover tabIndex={-1} key={i}>
                    <TableCell align="center">{row.nameDG}</TableCell>
                    <TableCell align="center">
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
                          handlOpenEdit();
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Add Dg */}
      <ReusableDialog
        title={title}
        isOpen={open}
        onSubmit={handleSubmit(onSubmitAdd)}
        handleClose={handleClose}
        children={children}
        button={button}
      />
      {/* Edit Dg */}
      <ReusableDialog
        title={title}
        isOpen={openEdit}
        onSubmit={handleSubmit(editSubmit)}
        handleClose={handleClose}
        children={children}
        button={buttonEdit}
      />
    </>
  );
}

export default ListDg;

import React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const ReusableTable = ({
  title,
  search,
  handleSubmit,
  paging,
  children,
  headCells,
  importFile,
}) => {
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
          sx={{ flex: "1 1 100%", maxWidth: 400, margin: "auto" }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      </Toolbar>
      <Box>
        <Box
          sx={{
            width: "100%",
            mb: 2,
            maxWidth: 1200,
            margin: "auto",
          }}
        >
          {search}
          <Box sx={{ display: "flex", float: "right" }}>
            {importFile}
            <Button
              variant="contained"
              type="submit"
              sx={{ float: "right" }}
              onClick={handleSubmit}
            >
              Thêm
            </Button>
          </Box>
        </Box>
      </Box>
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
              <TableBody>{children}</TableBody>
            </Table>
          </TableContainer>
          {paging}
        </Paper>
      </Box>
    </>
  );
};

export default ReusableTable;

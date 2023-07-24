import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { popUpActions } from "../../../redux/store/popup";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

const Preview = () => {
  const dispatch = useDispatch();
  const showPopUp = useSelector((state) => state.popup.showPreview);
  const showData = useSelector((state) => state.data.dataPreview);
  const hidePreview = () => {
    dispatch(popUpActions.hidePreview());
    dispatch(popUpActions.show());
  };
  const invitation =
    "Như đã qua trao đổi bằng điện thoại, chúng tôi xin mời bạn đến với cuộc phỏng vấn chi tiết với trưởng dự án bằng link dưới đây.";
  const contact =
    "Vui lòng xác nhận nếu bạn nhận được email này. Nếu bạn có bất kì câu hỏi nào, chỉ cần liên hệ với chúng tôi qua.";
  const hotline = "0977.465.083";
  const email = "intern-binhdinh@tma.com.vn";
  const website = "www.tma-binhdinh.vn";
  return (
    <Dialog
      open={showPopUp}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
    >
      <DialogTitle id="alert-dialog-title" align="center">
        {"Xem trước nội dung khi gửi"}
      </DialogTitle>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <DialogContent>
          <List
            sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}
          >
            <Typography sx={{ color: "red" }}>
              Xin chào {showData?.name}
            </Typography>
            <Typography>{invitation}</Typography>
            <ListItem sx={{ pb: 0 }}>
              <Typography>
                - Ngày phỏng vấn: {dayjs(showData?.date).format("DD/MM/YYYY")}
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 0 }}>
              <Typography>- Thời gian phỏng vấn: {showData?.time}</Typography>
            </ListItem>
            <ListItem sx={{ py: 0 }}>
              <Typography>- Link phỏng vấn: {showData?.link}</Typography>
            </ListItem>
            <ListItem sx={{ pt: 0 }}>
              <Typography>
                - Email người phỏng vấn: {showData?.emailMentor}
              </Typography>
            </ListItem>
            <Typography>{contact}</Typography>
            <Typography>Hotline: {hotline}</Typography>
            <Typography>
              Email: {email} | Website: {website}
            </Typography>
          </List>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit" onClick={hidePreview}>
            OK
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
export default Preview;

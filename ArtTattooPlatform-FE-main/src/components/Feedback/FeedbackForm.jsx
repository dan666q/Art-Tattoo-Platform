import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Rating, Typography } from "@mui/material";
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useUserInfo } from "../../stores/useUserInfo";

export default function FeedbackForm({ serviceId }) {
  const user = useUserInfo((state) => state.user);
  const [title, setTitle] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login to continue!!!");
      return;
    }
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const isFeedBackEnabled = () => {
    if (title.length === 0 || rating === 0) {
      return false;
    }
    return true;
  };

  const onClickSubmit = async () => {
    const token = localStorage.getItem("token");

    // Lấy giá trị đầu vào của người dùng
    const titleValue = title;
    const ratingValue = rating;

    const feedbackRequest = {
      FeedbackDetail: titleValue,
      UserID: user.userID,
      ServiceID: serviceId,
      Rating: ratingValue,
    };
    console.log(feedbackRequest);
    await axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/Feedback/AddFeedback`,
        feedbackRequest,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        toast.success("Feedback saved successfully");
        handleClickClose();
        window.location.reload();
      })
      .catch((err) => {
        toast.error("Feedback saved failed");
        console.log(err);
      });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Give us your feedback
      </Button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogContent>
          <Typography component="legend" className="mt-3">
            Feedback service
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="feedback"
            type="feedback"
            fullWidth
            variant="standard"
            onChange={(event) => setTitle(event.target.value)}
          />
          <Typography component="legend" className="mt-3">
            Rating service
          </Typography>
          <Rating
            onChange={(event) => setRating(event.target.value)}
            name="simple-controlled size-small"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickSubmit} disabled={!isFeedBackEnabled()}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

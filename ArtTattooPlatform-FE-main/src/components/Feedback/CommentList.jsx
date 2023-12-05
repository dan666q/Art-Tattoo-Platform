import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  Container,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserInfo } from "../../stores/useUserInfo";

const CommentList = ({ serviceId }) => {
  const user = useUserInfo((state) => state.user);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    getCommentByServiceId();
  }, [serviceId]);

  const getCommentByServiceId = async () => {
    await axios
      .get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/Feedback/GetFeedbackByServiceID/${serviceId}`
      )
      .then((res) => {
        console.log(res.data.$values);
        setComments(res.data.$values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formatDate = (date) => {
    const feedbackDate = new Date(date);
    return feedbackDate.toLocaleString();
  };

  return (
    <Container>
      <Stack
        divider={
          <Divider
            orientation="horizontal"
            flexItem
            sx={{ border: "2px solid gray" }}
          />
        }
        direction={"column"}
        spacing={3}
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        <Typography variant="h4">Feedback</Typography>

        {comments &&
          comments.map((comment, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={2}>
                <Avatar
                  sx={{ width: 62, height: 62 }}
                  src={comment.user.image}
                  alt={comment.user.fullName}
                />
              </Grid>
              <Grid item xs={10}>
                <Stack
                  spacing={2}
                  direction="column"
                  divider={
                    <Divider
                      orientation="horizontal"
                      flexItem
                      sx={{ width: 300, border: "1px solid gray" }}
                    />
                  }
                >
                  <div>
                    <Typography variant="h6">{comment.userName}</Typography>

                    <Typography variant="subtitle2" color={"gray"}>
                      Date: {formatDate(comment.feedbackDate)}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h6">
                      {comment.feedbackDetail}
                    </Typography>
                    <Rating
                      aria-label="20/10/2023"
                      value={comment.rating}
                      size="medium"
                      readOnly
                    />
                  </div>
                </Stack>
                {/* <Stack direction={"row"} spacing={1}>
                  <Button>Reply</Button>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </Stack> */}
              </Grid>
            </Grid>
          ))}
      </Stack>
    </Container>
  );
};

export default CommentList;

import * as React from "react";

import {
    Card,
  CardActions,
  CardContent,
  Chip,
  Avatar,
  Typography,
  Checkbox,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function ForumCard(props) {
  const{title,date,content} = props.title;
  console.log(props.title)
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          <Chip
            avatar={
              <Avatar
                alt="Natacha"
                src="https://images.unsplash.com/photo-1596805827513-33a7b2523abf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
              />
            }
            label="理財小達人"
            variant="Chip Filled"
            size="medium"
          />
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {date}
        </Typography>
        <Typography variant="body2">
          {content}
        </Typography>
      </CardContent>
      <Typography>
        <Chip label="存錢" variant="outlined" sx={{ mb: 1.5, ml: 1 }} />
        <Chip label="理財" variant="outlined" sx={{ mb: 1.5, ml: 1 }} />
      </Typography>
      <CardActions>
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
        <Checkbox
          icon={<BookmarkBorderIcon />}
          checkedIcon={<BookmarkIcon />}
        />
      </CardActions>
    </Card>
  );
}

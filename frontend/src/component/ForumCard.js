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

export default function ForumCard() {
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
          「資料夾理財法」懶得記帳也存到錢！
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          2021/11/05 22:00
        </Typography>
        <Typography variant="body2">
          很多盲目存錢的朋友，常常存不到幾萬塊，又轉眼花掉了。都是因為存錢沒有動力的關係！因此，建議您「存錢要有動力」，而且動力越浮誇越好。
          首先，針對每個存錢的背後設立終極目標，可以是買房子、旅遊基金、買車等等。設好目標後，請再替這個目標取一個華麗而浮誇的名稱。買房基金可以取名為「20坪華而美五臟俱全兩房的張家小豪宅基金」，
          旅行當然是「2019年日本北海道邊看雪邊泡溫泉邊喝清酒的八天七夜雙人遊」，也可以存一筆「Maserati雙門4座GT跑車……」！（被毆飛XDDD）
          總而言之，替自己的存錢目標取一個好名字，可以有效增加存錢的動力。花錢之前，先想想那小豪宅基金、日本八天七夜雙人遊等等，也許您會發現這筆錢還是存下來比較好。
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

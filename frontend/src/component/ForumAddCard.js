import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Chip,
  Autocomplete,
  Avatar,
  Container,
  TextareaAutosize,
  Button,
} from "@mui/material";

import axios from "axios";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

export default function ForumAddCard(props) {
  const handleClose = props.onClose;
  const date = new Date();
  const [article, setArticle] = useState({
    id: 3,
    date:date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
    title: "",
    content: "",
    category:"理財",
    user_id: "1", // 先把使用者寫死
  });

  const update = async function () {
    try {
      if (article.title) {
        await axios.post("/Gossip", article);
        handleClose(true)
      }
    } catch (e) {
      alert("post failed");
    }
  };

  const handleClick = function (e) {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };
  const handleCate = function (e, value) {
    const cate = value.map((item) => {
      return Object.values(item)[0];
    });
    setArticle({ ...article, category: cate.toString() });
  };
  return (
    <Box>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Stack spacing={3} sx={{ width: 500 }}>
              <Chip
                avatar={
                  <Avatar
                    alt="Natacha"
                    src="https://images.unsplash.com/photo-1596805827513-33a7b2523abf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
                  />
                }
                label="理財小達人"
                variant="Chip Filled"
                size="small"
                sx={{ width: 100 }}
              />
              <TextField
                id="filled-basic"
                label="文章標題"
                variant="filled"
                name="title"
                value={article.title}
                onChange={handleClick}
              />

              <Autocomplete
                multiple
                id="tags-outlined"
                onChange={handleCate}
                options={category}
                getOptionLabel={(option) => option.title}
                defaultValue={[category[0]]}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="你分享了什麼呢..."
                    placeholder="文章分類"
                  />
                )}
              />
              <TextareaAutosize
                onChange={handleClick}
                name="content"
                value={article.content}
                minRows={20}
                aria-label="maximum height"
                placeholder="Maximum 4 rows"
              />
            </Stack>
            <Button
            onClick={handleClose}
              variant="outlined"
              startIcon={<DeleteIcon />}
              sx={{ mt: 5 }}
            >
              取消
            </Button>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ mt: 5 }}
              onClick={update}
            >
              發佈
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

const category = [
  { title: "理財" },
  { title: "股票" },
  { title: "基金" },
  { title: "存錢" },
];

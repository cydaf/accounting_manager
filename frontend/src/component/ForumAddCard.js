import React, { useState } from "react";
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
  TextField,
  Stack
} from "@mui/material";

import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import {STATUS} from "../account/AuthContext";


export default function ForumAddCard(props) {
  const handleClose = props.onClose; // 關閉視窗方法
  const tempData = props.tempData?props.tempData:{}; // 關閉視窗方法
  const [article, setArticle] = useState(tempData);

  console.log(article)
  let  category = [
    { title: "理財" },
    { title: "股票" },
    { title: "基金" },
    { title: "存錢" },
    { title: "省錢" },
    { title: "小資族" },
    { title: "虛擬貨幣" },
  ];

  // 新增/修改文章
  const update = async function () {
    const date = new Date();
    let month = date.getMonth() + 1>10?date.getMonth() + 1:'0'+(date.getMonth() + 1);
    let day = date.getDate() >10?date.getDate():'0'+date.getDate()
      try {
        if (!article.gossip_id) { // 新增
          const date = new Date();
          article.date = date.getFullYear() + "-" + month + "-" + day;
          article.user_id = STATUS.id;
          await axios.post("/Gossip", article);
        }else{ // 修改
          article.date = date.getFullYear() + "-" +month + "-" + day;
          await axios.put("/Gossip", article);
        }
      } catch (e) {
        alert("post failed");
      }
    handleClose(true)
  };

  // 加入 article 的值
  const handleClick = function (e) {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  // 加入 article 的分類
  const handleCate = function (e, value) {
    const cate = value.map((item) => {
      return item;
    });
    setArticle({ ...article, category: cate.toString() });
  };
  return (
    <Box>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>

            <Stack spacing={3} sx={{ width: 500 }}>
              {/* <Chip
                avatar={
                  <Avatar
                    alt="Natacha"
                    src="https://images.unsplash.com/photo-1596805827513-33a7b2523abf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
                  />
                }
                label={article.author}
                variant="Chip Filled"
                size="small"
                sx={{ width: 100 }}
              /> */}
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
                options={category.map((option) => option.title)}
                value={article.category?article.category.split(','):[]}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
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
                minRows={10}
                aria-label="maximum height"
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



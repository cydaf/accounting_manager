import React, {useState } from "react";
import axios from "axios";
import {
    Card,
  CardActions,
  CardContent,
  Chip,
  Avatar,
  Typography,
  Checkbox,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';


export default function ForumCard(props) {
  const fetchData = props.fetch; // 更新文章列表
  const openDialog = props.openDialog
  const [article, setArticle] = useState({...props.title});
  let {title,date,content,author,category,islike,iscollect,gossip_id,total} = article;
  let canEdit = props.canEdit;
  category = category.split(',');

  // 執行按讚
  async function handleLike() {
    try {
      const result = await axios.put("/Gossip/like",{
        gossip_id,
        user_id:1,  // 先把使用者寫死
        islike:islike===0?1:0,
      });
      let data = {...article}
      data.islike=islike===0?1:0
      data.total=islike===0?data.total+1:data.total-1
      setArticle(data)
    } catch (e) {
      alert("put like failed!");
    }
    
  }

  // 執行收藏
  async function handleCollect() {
    try {
      const result = await axios.put("/Gossip/collect",{
        gossip_id,
        user_id:1, // 先把使用者寫死
        iscollect:iscollect===0?1:0,
      });
      let data = {...article}
      data.iscollect=iscollect===0?1:0
      setArticle(data)
    } catch (e) {
      alert("put collect failed!");
    }  
  }
  
  // 刪除對話框 useState
  const [open, setOpen] = useState(false);

  // 打開刪除對話框
  const handleClickOpen = () => {
    setOpen(true);
  };

  // 關閉刪除對話框
  const handleClose = () => {
    fetchData()
    setOpen(false);
  };

  // 刪除文章
  async function handleDelete() {
    try {
      await axios.delete("/Gossip/"+gossip_id);
      handleClose()
    } catch (e) {
      alert("failed delete!");
    }  
  }


  return (
    <Box>
    <Card sx={{ minWidth: 275,marginBottom:1 }}>
      <CardContent>
        <Typography color="text.secondary" sx={{display: 'flex', justifyContent: 'space-between' }} gutterBottom>
          <Chip
            avatar={
              <Avatar
                alt="Author"
                src="https://images.unsplash.com/photo-1596805827513-33a7b2523abf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
              />
            }
            label={author}
            variant="Chip Filled"
            size="medium"
          />
          {
          canEdit?
          <Box>
          <IconButton aria-label="Example" onClick={handleClickOpen}>
                <DeleteIcon />
          </IconButton>
          <IconButton aria-label="Example" onClick={()=>{openDialog(article)}}>
          <EditIcon />
          </IconButton>
          </Box>
          :null
          }
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
        <Typography>
      {category.map((data, index) => {
          return <Chip label={data} variant="outlined" sx={{ mb: 0.5,mt:3,mr:0.5}} key={index}/>;
        })}
        
      </Typography>
      </CardContent>
      <CardActions sx={{ bgcolor: 'lightBlue.main',color:'white'}}>       
        <Checkbox color="secondary" icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={handleLike} checked={Boolean(islike)}/>
        {total}人說讚
        <Checkbox icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon /> } onClick={handleCollect} checked={Boolean(iscollect)}/>
      </CardActions>
    </Card>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"確定要刪除文章嗎?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            文章刪除後就無法復原囉...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleDelete} autoFocus>
            確定
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    
  );
}

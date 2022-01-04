import React, { useEffect, useState } from "react";
import { Box, Container, Fab ,Dialog , AppBar,Toolbar,Typography,} from "@mui/material";
import axios from "axios";
import AppMenu from "../component/AppMenu";
import ForumCard from "../component/ForumCard";
import ForumAddCard from "../component/ForumAddCard";
import AddIcon from "@mui/icons-material/Add";
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import {STATUS} from "../account/AuthContext";

export default function ForumCollect() {

  const [article, setArticle] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (refresh=false) => {
    setOpen(false);
    if(refresh){
      fetchData()
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
      try {
        const result = await axios.get("/Gossip/archieve/"+STATUS.id); // 先把使用者寫死
        setArticle(result.data);
      } catch (e) {
        alert("get failed，使用前端預設值");
        setArticle([
          {
            id: 1,
            title: "ETF 投資心法",
            user_name: "Andy",
            user_id: 1,
            content: "0050,0056是個好投資",
            date: "2021-12-07",
          },
          {
            id: 2,
            title: "台積電股票",
            user_name: "Tim",
            user_id: 1,
            content: "台積電近日股市連續上漲",
            date: "2021-12-06",
          },
        ]);
      }
    }
  return (
    <Box>
      <AppMenu />
      <Container maxWidth="sm">
      <img src="./../assets/banner-collect.png" alt="banner" style={{maxWidth: '100%'}}></img>
        {article.map((data, index) => {
          return <ForumCard key={index} title={data}></ForumCard>;
        })}

      </Container>
      
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
      >
        <AddIcon  />
      </Fab>
      <Fab
        color="secondary"
        aria-label="add"
        sx={{
          position: "fixed",

          bottom: (theme) => theme.spacing(2),

          left: (theme) => theme.spacing(2),
        }}
      >
        <TurnedInIcon  />
      </Fab>
      <Fab
        color="lightblue"
        component={Link}
        to="./../Personal"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(2),
          left: (theme) => theme.spacing(10),
        }}
      >
        <PersonIcon  />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              發表你的想法吧....
            </Typography>
            
          </Toolbar>
        </AppBar>
        <ForumAddCard open={open} onClose={handleClose}></ForumAddCard>
      </Dialog>
    </Box>
  );
}

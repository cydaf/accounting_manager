import React, { useEffect, useState} from "react";
import { Box,Container,Fab} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import AppMenu from "../component/AppMenu";
import ForumCard from "../component/ForumCard";
import AddIcon from '@mui/icons-material/Add';


export default function ForumIndex() {
  // const [date, setDate] = React.useState(new Date());
  const [article, setArticle] = useState([]);
  useEffect(() => {
    
    async function fetchData () {
      try {
      const result = await axios.get("/Gossip");
      console.log(result);
      setArticle(result.data);
      }catch(e){
        // 每有抓取到後端時的預設值
        setArticle([[
          {
          id: 1,
          title: "ETF 投資心法",
          user_name: "Andy",
          user_id: 1,
          content: "0050,0056是個好投資",
          date: "2021-12-07"
          },
          {
          id: 2,
          title: "台積電股票",
          user_name: "Tim",
          user_id: 1,
          content: "台積電近日股市連續上漲",
          date: "2021-12-06"
          }
          ]]);
      }  
    }
    fetchData();
  },[]);



 


  return (
    <Box>
      <AppMenu />
      <Container maxWidth="sm">
      {article.map((data, index) =>{
          return <ForumCard key ={index} title={data}></ForumCard>
      })}
      
      {/* <ForumCard></ForumCard>
      <ForumCard></ForumCard>
      <ForumCard></ForumCard>
      <ForumCard></ForumCard> */}
      </Container>
      <Fab color="primary" aria-label="add"  component={Link} to="../forumAddCard" sx={{

position: "fixed",

bottom: (theme) => theme.spacing(2),

right: (theme) => theme.spacing(2)

}}>
  <AddIcon />
</Fab>
    </Box>
  );
}

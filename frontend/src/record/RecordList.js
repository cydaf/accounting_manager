import React, {useEffect,useState} from 'react';

import { Box, List, ListItem, ListItemText } from '@mui/material';

import axios from 'axios';
import Typography from '@mui/material/Typography';

export default function RecordList() {

  const [record, setRecords] = useState([]);

// const record=[
//     {
//         id:1,
//         user:"mavis",
//         price:20,
//         category:"食物",
//         description:"晚餐：仁園",
//         date:"2010-10-10"
//     }
// ]
  
  useEffect(() => {

    async function fetchData () {

      const result = await axios.get("/Record");
      setRecords(result.data);

    }

    fetchData();

  },[]);

   

  return (

    <Box sx={{

      width: '100vw',

      height: '100vh',

      backgroundColor: 'background.paper',

      color: 'black',

      textAlign: 'left'

    }}>

      <List subheader="Daily Accounting" aria-label="expenses">

      {record.map((record, index) => 

        <ListItem divider key={index}>
          <ListItemText primary={record.description} secondary={
              <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                價錢：{record.price} / 分類：{record.category} / date：{record.date}
              </Typography>
            </React.Fragment>

          } ></ListItemText>

        </ListItem>)}

      </List>

    </Box>



  );

}
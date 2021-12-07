import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Fab } from '@mui/material';
import { Link } from "react-router-dom";

import axios from 'axios';
import Typography from '@mui/material/Typography';
import TabSwitch from '../component/TabSwitch';
import AppMenu from '../component/AppMenu';
import AddIcon from '@mui/icons-material/Add';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import MonthPicker from '@mui/lab/MonthPicker';
import YearPicker from '@mui/lab/YearPicker';
import Grid from '@mui/material/Grid';

export default function RecordList() {
  const [date, setDate] = React.useState(new Date());
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function fetchData () {
      const result = await axios.get("/Record");
      console.log(result);
      setRecords(result.data);
    }
    fetchData();
  },[]);

  // const [records, setRecords] = useState([
  //   {
  //     date: "2021/12/5",
  //     cost: 600,
  //     category: "交通",
  //     desc: "123"
  //   }
  // ]);
  const insert = function (newRecord) {
    setRecords(oldRecords => [...oldRecords, newRecord])
  }
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

  // useEffect(() => {

  //   async function fetchData () {

  //     const result = await axios.get("/Record");
  //     setRecords(result.data);

  //   }

  //   fetchData();

  // },[]);



  return (

    <Box>
      <AppMenu />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
          </Grid>
        </Grid>
      </LocalizationProvider>
      <List subheader="Daily Accounting" aria-label="expenses">

        {records.map((record, index) =>

          <ListItem divider key={index}>
            <ListItemText primary={record.descs} secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  價錢：{record.price} / 分類：{record.category} / 日期：{record.date}
                </Typography>
              </React.Fragment>

            } ></ListItemText>

          </ListItem>)}

      </List>
      {/* <AddExpenditure update={insert} /> */}
      <Fab color="primary" aria-label="add" component={Link} to="../TabSwitch" sx={{

        position: "fixed",

        bottom: (theme) => theme.spacing(2),

        right: (theme) => theme.spacing(2)

      }}>
        <AddIcon />
      </Fab>
    </Box>



  );

}
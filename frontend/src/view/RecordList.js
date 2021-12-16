import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Fab, IconButton } from '@mui/material';
import { Link } from "react-router-dom";

import axios from 'axios';
import Typography from '@mui/material/Typography';
import AppMenu from '../component/AppMenu';
import AddIcon from '@mui/icons-material/Add';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import TabSwitch from '../component/TabSwitch';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import Grid from '@mui/material/Grid';

export default function RecordList() {
  const [date, setDate] = useState(new Date());
  const [records, setRecords] = useState([]);
  const [sum, setSum] = useState();
  const [deleted, setDeleted] = useState(false);
  const [open, setOpen] = useState(false);

  const onChangeDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("/Record");
      const sumResult = await axios.get("/RecordSum");
      console.log(result.data);
      setRecords(result.data);
      console.log(sumResult.data);
    }
    fetchData();
  }, [open, deleted]);

  const handleChange = (newDate) => {
    setDate(newDate);
    // let newdate = newDate.getFullYear() + "-" + (newDate.getMonth()+1) + "-" + newDate.getDate();
    // console.log("newdate: " + newdate);
    // let result = records.filter((data) => {
    //   return data.date.search(newdate) != -1;
    // });
    // setRecords(result);
  };

  const addData = function () {
    setOpen(true);
  }

  const close = function () {
    setOpen(false);
  }

  // 刪除
  const deleteData = async function (id) {
    await axios.delete("/Record/" + id);

    setDeleted(currentDeleted => setDeleted(!currentDeleted));
    console.log(id);
    setOpen(true);
    setOpen(false);
  }

  // 修改
  // const updateData = function(customer) {
  //   setCurrentCustomer(customer);
  //   setOpen(true);
  // }

  const text = {
    color: "#0D1B2A",
    fontWeight: "bold"
  };

  return (

    <Box>
      <AppMenu />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CalendarPicker date={date} onChange={handleChange} />
          </Grid>
        </Grid>
      </LocalizationProvider>
      <List subheader={onChangeDate} aria-label="expenses"
        sx={{ width: '95%', margin: 'auto' }}
      >

        {records.filter((record) => {
          if ( onChangeDate == record.date ) {
            return record
          } 
        }).map((record, index) => {
          return (
            <ListItem divider key={index} sx={{ px: 8, py: 3 }} className="list">
              <ListItemText primaryTypographyProps={{ style: text }} primary={record.descs} className="fw-bold"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline', fontWeight: 600 }}
                      component="span"
                      variant="body2"
                      color="rgb(77, 77, 77)"
                    >
                      價錢：{record.price} / 分類：{record.category} / 日期：{record.date}
                    </Typography>
                  </React.Fragment>
                }></ListItemText>
              <IconButton edge="end" aria-label="update" sx={{ mx: 2 }} color="lightGray"
              // onClick={() => updateData(record)}
              >
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" color="lightGray"
                onClick={() => deleteData(record.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          );
        })}

      </List>
      <Fab color="primary" aria-label="add"
        component={Link}
        to="../TabSwitch"
        // onClick={addData}
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2)
        }}>
        <AddIcon />
      </Fab>
      {/* <TabSwitch open={open} close={close} /> */}
    </Box>



  );

}
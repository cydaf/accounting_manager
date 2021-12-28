import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Fab, IconButton, Dialog } from '@mui/material';

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
  const [sum, setSum] = useState(0);
  const [deleted, setDeleted] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (refresh = false) => {
    setOpen(false);
    if (refresh) {
      fetchData()
    }
  };

  const onChangeDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  const handleChange = (newDate) => {
    setDate(newDate);
  };

  useEffect(() => {
    fetchData();
  }, [open, deleted, date]);

  async function fetchData() {
    const result = await axios.get("/Record/" + 1 + "/date/" + onChangeDate);
    const sumResult = await axios.get("/RecordSum/" + 1 + "/date/" + onChangeDate);
    console.log(result.data);
    setRecords(result.data);
    console.log(sumResult.data);
    setSum(sumResult.data);
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
  const updateData = function (temp) {
    setRecords(temp);
    setOpen(true);
  }

  const titleEx = {
    color: "rgb(192, 35, 74)",
    fontWeight: "bold"
  };
  const titleIn = {
    color: "rgb(48, 48, 48)",
    fontWeight: "bold"
  }

  return (

    <Box>
      <AppMenu />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={3} >
          <Grid item xs={12} >
            <CalendarPicker date={date} onChange={handleChange} />
          </Grid>
        </Grid>
      </LocalizationProvider>
      <Box sx={{ maxWidth: '55%', margin: 'auto' }}>
        {sum >= 0 ?
          (
            <Typography sx={{ textAlign: 'right', py: 1.5, px: 3, bgcolor: '#778DA9', borderRadius: '10px 10px 0 0', color: 'rgb(241, 241, 241)' }}>
              {`合計：$ ${sum}`}
            </Typography>)
          :
          <Typography sx={{ textAlign: 'right', py: 1.5, px: 3, bgcolor: 'rgb(209, 72, 106)', borderRadius: '10px 10px 0 0', color: 'rgb(241, 241, 241)' }}>
            {`合計：$ ${sum}`}
          </Typography>
        }

        <List aria-label="expenses"
          sx={{ borderRadius: '0 0 10px 10px', bgcolor: 'rgba(241, 241, 241, 0.9)', mb: 2 }}
        >
        {records.length > 0 ? (
          records.map((record, index) =>
            (record.revenue == "expense"
              ? (
                <ListItem divider key={index} sx={{ px: 8, py: 2.5 }} className="list">
                  <ListItemText primaryTypographyProps={{ style: titleEx }} primary={record.descs} className="fw-bold"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline', fontWeight: 600 }}
                          component="span"
                          variant="body2"
                          color="rgb(206, 102, 128)"
                        >
                          花費：{record.price} / 分類：{record.category} / 日期：{record.date}
                        </Typography>
                      </React.Fragment>
                    }></ListItemText>
                  <IconButton edge="end" aria-label="update" sx={{ mx: 2 }} color="lightGray" className="icon"
                    onClick={() => updateData(record)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" color="lightGray" className="icon"
                    onClick={() => deleteData(record.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              )
              :
              <ListItem divider key={index} sx={{ px: 8, py: 2.5 }} className="list">
                <ListItemText primaryTypographyProps={{ style: titleIn }} primary={record.descs} className="fw-bold"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline', fontWeight: 600 }}
                        component="span"
                        variant="body2"
                        color="rgb(88, 88, 88)"
                      >
                        進帳：{record.price} / 分類：{record.category} / 日期：{record.date}
                      </Typography>
                    </React.Fragment>
                  }></ListItemText>
                <IconButton edge="end" aria-label="update" sx={{ mx: 2 }} color="lightGray" className="icon"
                  onClick={() => updateData(record)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" color="lightGray" className="icon"
                  onClick={() => deleteData(record.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            )
          )
        )
          : <Typography sx={{ textAlign: 'center', py: 1.5, color: '#415A77', fontWeight: 600 }}>目前沒有記錄，快去記一筆吧 ~</Typography>
}
        </List>
      </Box>
      <Fab color="primary" aria-label="add"
        // component={Link}
        // to="../TabSwitch"
        onClick={handleClickOpen}
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2)
        }}>
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <TabSwitch open={open} onClose={handleClose}
          record={records}
        />
      </Dialog>
    </Box>



  );

}
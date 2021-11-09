import React, {useEffect, useState} from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
   useEffect(() => {
    async function fetchData () {
      const result = await axios.get("/customer");
      console.log(result);
      setCustomers(result.data);
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
      <List subheader="customer list" aria-label="customer list">
      {customers.map((customer, index) => 
        <ListItem divider key={index}>
          <ListItemText primary={customer.name} secondary={"體重:"+customer.weight}></ListItemText>
        </ListItem>)}
      </List>
    </Box>

  );
}
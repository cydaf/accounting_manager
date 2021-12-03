import * as React from "react";
import {
  Card,
  CardContent,
  Box,
  Chip,
  Autocomplete,
  Avatar,
  Container,
  TextareaAutosize,
  Button
} from "@mui/material";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import AppMenu from "../component/AppMenu";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from "@mui/icons-material/Send";

export default function ForumAddCard() {
  return (
    <Box>
      <AppMenu />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ minWidth: 275 }} >
      <CardContent>
      
 
        <Stack spacing={3} sx={{ width: 500}}>
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
            sx={{width:100}}
          />
          <TextField id="filled-basic" label="文章標題" variant="filled" />

          <Autocomplete
            multiple
            id="tags-outlined"
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
            minRows={20}
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua."
          />
        </Stack>
        <Button variant="outlined" startIcon={<DeleteIcon />} sx={{ mt: 5 }}>
  取消
</Button>
<Button variant="contained" endIcon={<SendIcon />} sx={{ mt: 5 }}>
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

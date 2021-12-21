import * as React from "react";
import {useState, useContext} from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

import AppMenu from "../component/AppMenu";
import {AuthContext, STATUS} from '../account/AuthContext';

export default function SignIn() {

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   // eslint-disable-next-line no-console
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };
  const authContext = useContext(AuthContext);
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = useState("");
  //登入
  const handleSubmit = async function(){
    let auth = { account: account, password: password};
    try {
      // get user資料
      const res = await axios.get("/user",auth);
      console.log(auth);
      if (res) {
        console.log(res);
        console.log(res.statusText);
        setMessage(res.data);
        //不確定需不需要改狀態
        authContext.setStatus(STATUS.toSignOut);
      }
    }
    catch(error){
      console.log(error);
      setMessage("登入資料有誤");
    }
  }
  //註冊
  const changeStatus = function(){
    authContext.setStatus(STATUS.toSignUp);
  }
  return (
    <Box>
      <AppMenu />
      <Container component="main" maxWidth="xs" sx={{bgcolor:"rgba(128, 128, 128, 0.3)",borderRadius: 5}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: '55vh'
          }}
        >
        {/* 頭像ICON */}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main", marginTop: 3 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight="700" color="primary">
            L . O . G . I . N
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{bgcolor:"#fff"}}
              onChange={(e) => {
                setAccount(e.target.value)
                }
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{bgcolor:"#fff"}}
              onChange={(e) => {
                setPassword(e.target.value)
                }
              }
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              endIcon={<SendIcon />}
              // onClick={handleSubmit}
            >
              LOGIN
            </Button>
            <Grid container>
              <Grid item xs>
              <Typography
              color="red">
                  {message}
              </Typography>
              </Grid>
              <Grid item>
                <Link href ="./SignUp" variant="contained" onClick={changeStatus}>
                  還沒有帳號是吧？ 註冊
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

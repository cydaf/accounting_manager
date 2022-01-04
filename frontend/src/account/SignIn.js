import * as React from "react";
import { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AppMenu from "../component/AppMenu";
import { AuthContext, STATUS } from "../account/AuthContext";

export default function SignIn() {
  let navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if(authContext.status===STATUS.toSignIn||authContext.status===STATUS.toSignUp){
    console.log("尚未登入");
  }else{
    console.log("已登入");
  }
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = useState("");
  //登入
  const handleSubmit = async function () {
    let auth = { auth:{username: account, password: password} };
      try {
        // get user資料
        const res = await axios.get("/user", auth)
        STATUS.account = account;
        if (res) {
          handleInfo()
          // STATUS.id = 1;
          setMessage(res.data);
          navigate('/record');
          authContext.setStatus(STATUS.toSignOut);

        }else{
          console.log("something wrong")
        }
      } catch (error) {
        console.log(error);
        setMessage("登入資料有誤");
      }
    
  };


  const handleInfo = async function () {
    let auth = { auth:{username: account, password: password} };
    try {
      // get user資料
      const res = await axios.get("/userID", auth);
      if (res) {
        console.log("res:",res) 
        STATUS.id = res.data;
      }else{
        console.log("something wrong")
      }
    } catch (error) {
      console.log(error);
    }

  }

  
  //註冊
  const changeStatus = function () {
    authContext.setStatus(STATUS.toSignUp);
  };
  return (
    <Box>
      <AppMenu />
      <Container
        component="main"
        maxWidth="xs"
        sx={{ bgcolor: "rgba(128, 128, 128, 0.3)", borderRadius: 5 }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "53vh",
          }}
        >
          {/* 頭像ICON */}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main", marginTop: 3 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            fontWeight="700"
            color="primary"
          >
            L . O . G . I . N
          </Typography>
          <Box
            component="form"
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
              sx={{ bgcolor: "#fff" }}
              onChange={(e) => {
                setAccount(e.target.value);
              }}
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
              sx={{ bgcolor: "#fff" }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              onClick={handleSubmit}
              // type="submit"
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
                <Typography color="red">{message}</Typography>
              </Grid>
              <Grid item>
              <Button component={Link} to="/SignUp" onClick={changeStatus}>
                  還沒有帳號是吧？ 註冊
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

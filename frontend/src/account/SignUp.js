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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AppMenu from "../component/AppMenu";
import { AuthContext, STATUS } from "../account/AuthContext";

export default function SignUp(props) {
  let navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if(authContext.status===STATUS.toSignIn||authContext.status===STATUS.toSignUp){
    console.log("尚未登入");
  }else{
    console.log("已登入");
  }
  const [name, setName] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = useState("");
  // const [gender, setGender] = React.useState("1");
  // const [age, setAge] = React.useState("50");

  //按下註冊按鈕
  const Submit = async function () {
    const user = { username: name, account: account, password: password };
    console.log(user);
    // navigate('/SignIn');
    if(name.length>0 && account.length>0 && password.length>=6){
      try{
        const Auth = await axios.post("/user",user);
        if(Auth){
          navigate('/SignIn');
          console.log("註冊成功");
          authContext.setStatus(STATUS.toSignIn);
        }
      }
      catch(e){
        console.log(e);
        console.log("註冊失敗");
      }
    }else{
      setMessage("註冊資料請輸入完整");
    }
    
  };
  //登入
  const changeStatus = function () {
    authContext.setStatus(STATUS.toSignIn);
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
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main", marginTop: 3 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            fontWeight="700"
            color="primary"
          >
            R . E . G . I . S . T . E . R
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="userName"
                  name="name"
                  autoComplete="name"
                  sx={{ bgcolor: "#fff" }}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  sx={{ bgcolor: "#fff" }}
                  value={account}
                  onChange={(e) => {
                    setAccount(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  sx={{ bgcolor: "#fff" }}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value)
                    }
                  }
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </Grid> */}
              {/* <Grid item xs={12}>
                <FormLabel component="legend">Age</FormLabel>
                <Slider
                  defaultValue={50}
                  aria-label="Default"
                  valueLabelDisplay="on"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value)
                    }
                  }
                />
              </Grid> */}
            </Grid>
            <Button
            onClick={Submit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Typography color="red">{message}</Typography>
              </Grid>
              <Grid item>
                <Button component={Link} to="/SignIn" onClick={changeStatus}>
                  已經有帳號了是吧？ 登入
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
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
import axios from 'axios';

import AppMenu from "../component/AppMenu";

export default function SignUp(props) {
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [gender, setGender] = React.useState("female");
  const [age, setAge] = React.useState(50);

  //按下註冊按鈕
  // const Submit = (event) => {
    const Submit = async function () {

      const user = { account: account, password: password, gender: gender, age: age };
        console.log(user)
      try{
        await axios.post("/user",user);
      }
      catch(e){
        console.log(e);
      }
      // props.close();
    
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
            height: "70vh",
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
          <Box
            component="form"
            noValidate
            onSubmit={Submit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  sx={{ bgcolor: "#fff" }}
                  value = {account}
                  onChange={(e) => {
                    setAccount(e.target.value)
                    }
                  }
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
                  value = {password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    }
                  }
                />
              </Grid>
              <Grid item xs={12}>
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
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./SignIn" variant="body2">
                  已經有帳號了是吧？ 登入
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

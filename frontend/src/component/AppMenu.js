import React, { useState, useEffect, useContext } from "react";

import { AuthContext, STATUS } from "../account/AuthContext";

import { Link } from "react-router-dom";

import {
  AppBar,
  Button,
  Toolbar,
  Avatar,
  Tooltip,
  Box,
  Typography,
} from "@mui/material";

export default function AppMenu() {
  const authContext = useContext(AuthContext);
  //登出
  const changeStatus = function () {
    authContext.setStatus(STATUS.toSignIn);
  };
  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* 如果狀態在toSignIn和toSignUp不顯示 */}
        {authContext.status === STATUS.toSignIn ||
        authContext.status === STATUS.toSignUp ? (
          <Box></Box>
        ) : (
          <>
            <Button component={Link} to="../" color="inherit">
              消費紀錄
            </Button>
            <Button component={Link} to="../ForumIndex" color="inherit">
              志同道合
            </Button>
          </>
        )}
        {/* 項目至右 */}
        <Box sx={{ flexGrow: 1 }} />
        {/* 如果狀態在toSignIn和toSignUp顯示登入
        狀態在toSignOut顯示Username */}
        {authContext.status === STATUS.toSignOut ? (
          <>
            <Typography color="inherit">Username</Typography>
            <Button
              component={Link}
              to="../SignIn"
              onClick={changeStatus}
              color="inherit"
            >
              登出
            </Button>
          </>
        ) : (
          <Button component={Link} to="../SignIn" color="inherit">
            登入
          </Button>
        )}
        {authContext.status === STATUS.toSignOut ? (
          <Tooltip title="使用者帳號顯示">
            <Avatar
              sx={{ m: 1, bgcolor: "secondary.main" }}
              variant="rounded"
            ></Avatar>
          </Tooltip>
        ) : (
          <Tooltip title="尚未登入">
            <Avatar
              sx={{ m: 1, bgcolor: "lightGray.main" }}
              variant="rounded"
            ></Avatar>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
}

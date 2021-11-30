import React from "react";

import { Link } from "react-router-dom";

import { AppBar, Button, Toolbar } from "@mui/material";

export default function AppMenu() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button component={Link} to="./record/RecordList" color="inherit">
          消費紀錄
        </Button>
        <Button component={Link} to="./record/RecordList" color="inherit">
          志同道合
        </Button>
        <Button component={Link} to="./record/RecordList" color="inherit">
          個人資料
        </Button>
      </Toolbar>
    </AppBar>
  );
}

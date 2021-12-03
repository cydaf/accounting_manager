import React from "react";

import { Link } from "react-router-dom";

import { AppBar, Button, Toolbar } from "@mui/material";

export default function AppMenu() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button component={Link} to="../" color="inherit">
          消費紀錄
        </Button>
        <Button component={Link} to="../forumIndex" color="inherit">
          志同道合
        </Button>
        
      </Toolbar>
    </AppBar>
  );
}
import React from "react";

import { Link } from "react-router-dom";

import { AppBar, Button, Toolbar, Avatar, Tooltip, Box } from "@mui/material";

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
        {/* 項目至右 */}
        <Box sx={{ flexGrow: 1 }} />
        <Button component={Link} to="../SignIn" color="inherit">
          登入
        </Button>
        <Tooltip title="尚未登入">
          <Avatar
            sx={{ m: 1, bgcolor: "secondary.main" }}
            variant="rounded"
          ></Avatar>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

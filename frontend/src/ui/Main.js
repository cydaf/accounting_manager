import React from "react";

import { Link } from "react-router-dom";
import { Box, Button, Toolbar } from "@mui/material";

import AppMenu from "./AppMenu";

export default function Main() {
  return (
    <Box>
      <AppMenu />
      <Button component={Link} to="./record/RecordList" color="inherit">
        消費紀錄
      </Button>
    </Box>
  );
}

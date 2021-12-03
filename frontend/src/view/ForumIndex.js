import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemText,Container,Fab} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import AppMenu from "../component/AppMenu";
import ForumCard from "../component/ForumCard";
import AddIcon from '@mui/icons-material/Add';
export default function ForumIndex() {
  return (
    <Box>
      <AppMenu />
      <Container maxWidth="sm">

      <ForumCard></ForumCard>
      <ForumCard></ForumCard>
      <ForumCard></ForumCard>
      <ForumCard></ForumCard>
      <ForumCard></ForumCard>
      </Container>
      <Fab color="primary" aria-label="add"  component={Link} to="../forumAddCard" sx={{

position: "fixed",

bottom: (theme) => theme.spacing(2),

right: (theme) => theme.spacing(2)

}}>
  <AddIcon />
</Fab>
    </Box>
  );
}

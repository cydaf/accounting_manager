import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecordList from "./view/RecordList.js";
import ForumIndex from "./view/ForumIndex.js"
import ForumAddCard from "./view/ForumAddCard.js"

import { createTheme, ThemeProvider } from '@mui/material/styles';


// 主題色設定
const theme = createTheme({

  palette: {
    primary: {
      main: '#f44336',
    },
    secondary: {
      main: '#F5B7B1',
    },
  },
});
function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<RecordList />} />
        <Route path="/record" element={<RecordList />} />
        <Route path="/forumIndex" element={<ForumIndex />} />
        <Route path="/forumAddCard" element={<ForumAddCard />} />
      </Routes>
    </Router>
    </ThemeProvider>
  </React.StrictMode>
  );
}

export default App;
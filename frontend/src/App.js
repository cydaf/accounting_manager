import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecordList from "./view/RecordList.js";
import ForumIndex from "./view/ForumIndex.js"
import ForumCollect from "./view/ForumCollect.js"
import ForumPersonal from "./view/ForumPersonal.js"
import AddExpenditure from './component/AddExpenditure.js'
import TabSwitch from './component/TabSwitch.js'
import SignIn from './account/SignIn.js'
import SignUp from './account/SignUp.js'
import { createTheme, ThemeProvider } from '@mui/material/styles';


// 主題色設定
const theme = createTheme({

  palette: {
    primary: {
      main: '#415A77', // #f44336(origin)
    },
    secondary: {
      main: '#F5B7B1',
    },
    lightBlue: {
      main: '#778DA9',
    },
    lightbg:{
      main: '#E0E1DD'
    },
    lightGray: {
      main: 'rgb(130, 130, 130)'
    },
    lightText: {
      main: 'white'
    }
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
        <Route path="/ForumIndex" element={<ForumIndex />} />
        <Route path="/ForumIndex/Collect" element={<ForumCollect />} />
        <Route path="/ForumIndex/Personal" element={<ForumPersonal />} />
        <Route path="/addExpenditure" element={<AddExpenditure />} />
        <Route path="/TabSwitch" element={<TabSwitch />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </Router>
    </ThemeProvider>
  </React.StrictMode>
  );
}

export default App;
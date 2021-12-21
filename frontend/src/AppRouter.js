import './App.css';
import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecordList from "./view/RecordList.js";
import ForumIndex from "./view/ForumIndex.js"
import ForumCollect from "./view/ForumCollect.js"
import ForumPersonal from "./view/ForumPersonal.js"
import AddExpenditure from './component/AddExpenditure.js'
import TabSwitch from './component/TabSwitch.js'
import SignIn from './account/SignIn.js'
import SignUp from './account/SignUp.js'
import {AuthContext, STATUS} from './account/AuthContext';

export default function AppRouter(){
  const [status, setStatus] = useState(STATUS.toSignIn);
  return (
    <AuthContext.Provider value={{status, setStatus}}>
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
    </AuthContext.Provider>
  );
}

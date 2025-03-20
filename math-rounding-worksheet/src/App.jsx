import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.jsx";
import Worksheet from "./components/Worksheet/Worksheet.jsx";
import Ranking from "./components/Ranking/Ranking.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Worksheet />} />
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
      </div>

      <div className="copyright">copyright: www.mathinenglish.com</div>
    </Router>
  );
}

export default App;

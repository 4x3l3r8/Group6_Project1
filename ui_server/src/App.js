import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./Header";
import EmployeeDirectory from "./EmployeeDirectory";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Edit from "./components/Edit";

const App = () => {
  return (
    <div className="body position-relative">
      {/* Render the Header component */}
      <div className="header">
        <Header />
      </div>

      {/* Render the EmployeeDirectory component */}
      <div className="directory d-flex flex-column align-items-center justify-content-center">
        <Router>
          <Routes>
            <Route path="/" element={<EmployeeDirectory />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;

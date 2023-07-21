import React from "react";
import { Container, Navbar } from "react-bootstrap";
import "./App.css";

const Header = () => {
  return (
    <>
      {/* Navigation bar */}
      <Navbar bg="dark" variant="dark">
        <Container>
          {/* Brand/logo section */}
          <Navbar.Brand style={{ fontWeight: "bold" }} href="/">
            CondorHR
          </Navbar.Brand>

          {/* Navigation toggler */}
          <Navbar.Toggle />

          {/* Navigation links */}
          <Navbar.Collapse className="justify-content-end gap-5">
            {/* Projects */}
            <Navbar.Text>
              <a href="/">Projects</a>
            </Navbar.Text>
            {/* Reports */}
            <Navbar.Text>
              <a href="/">Reports</a>
            </Navbar.Text>
            {/* Invoice */}
            <Navbar.Text>
              <a href="/">Invoice</a>
            </Navbar.Text>
            {/* Payroll */}
            <Navbar.Text>
              <a href="/">Payroll</a>
            </Navbar.Text>
            {/* Settings */}
            <Navbar.Text>
              <a href="/">Settings</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

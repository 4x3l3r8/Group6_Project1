import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useCreateNewEmployee } from "../hooks/useEmployees";

const EmployeeCreate = ({ hidden }) => {
  // State variables to store form input values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [title, setTitle] = useState("VP");
  const [dept, setDept] = useState("HR");
  const [employeeType, setEmployeeType] = useState("FullTime");

  // Custom hook to create a new employee
  const { createEmployee } = useCreateNewEmployee();

  // State variable and functions for modal visibility
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  if (!hidden) {
    return (
      <>
        {/* Button to trigger the modal */}
        <Button variant="primary" size="lg" onClick={handleShow}>
          Create
        </Button>

        {/* Modal for creating a new employee */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Form for creating a new employee */}
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                if (age > 70 || age < 20) {
                  alert("Age is invalid");
                  return false;
                }
                // Call the createEmployee function with the employee details
                createEmployee({
                  variables: {
                    firstName: firstName,
                    lastName: lastName,
                    age: Number(age),
                    dateOfJoining: dateOfJoining,
                    title: title,
                    department: dept,
                    employeeType: employeeType,
                  },
                  refetchQueries: "all",
                  onCompleted: () => {
                    // Reset form input values and close the modal
                    setAge(0);
                    setDateOfJoining("");
                    setFirstName("");
                    setLastName("");
                    handleClose();
                  },
                });
              }}
              className="d-grid gap-2"
            >
              <fieldset>
                {/* Form inputs */}
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAge">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Age"
                    required
                    min={20}
                    max={70}
                    value={age}
                    onChange={({ target }) => setAge(target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDateOfJoining">
                  <Form.Label>Date of Joining</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter the day you joined the company"
                    required
                    value={dateOfJoining}
                    onChange={(e) => setDateOfJoining(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Select
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  >
                    <option>Employee</option>
                    <option>Manager</option>
                    <option>Director</option>
                    <option>VP</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDept">
                  <Form.Label>Department</Form.Label>
                  <Form.Select
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                  >
                    <option>IT</option>
                    <option>Marketing</option>
                    <option>HR</option>
                    <option>Engineering</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmployeeType">
                  <Form.Label>Employee Type</Form.Label>
                  <Form.Select
                    value={employeeType}
                    onChange={(e) => setEmployeeType(e.target.value)}
                  >
                    <option>FullTime</option>
                    <option>PartTime</option>
                    <option>Contract</option>
                    <option>Seasonal</option>
                  </Form.Select>
                </Form.Group>

                {/* Submit button */}
                <Button variant="primary" type="submit" className="w-100 mt-2">
                  Add New Employee
                </Button>
              </fieldset>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  } else {
    return <></>;
  }
};

export default EmployeeCreate;

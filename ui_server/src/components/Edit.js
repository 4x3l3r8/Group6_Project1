import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleEmployee, useUpdateEmployee } from "../hooks/useEmployees";

const Edit = () => {
  // get userId from url
  const { id } = useParams();

  const { data, loading, error } = useGetSingleEmployee(id);
  const { updateEmployee } = useUpdateEmployee();

  // State variables to store form input values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState(new Date());
  const [title, setTitle] = useState("Employee");
  const [dept, setDept] = useState("IT");
  const [employeeType, setEmployeeType] = useState("FullTime");

  const setEmployeeData = () => {};

  // Access the navigation object from React Router
  let history = useNavigate();

  useEffect(() => {
    if (data) {
      const { getSingleEmployee } = data;
      setFirstName(getSingleEmployee.firstName);
      setLastName(getSingleEmployee.lastName);
      setAge(getSingleEmployee.age);
      setDateOfJoining(
        new Date(getSingleEmployee.dateOfJoining).toDateString()
      );
      setTitle(getSingleEmployee.title);
      setDept(getSingleEmployee.department);
      setEmployeeType(getSingleEmployee.employeeType);
    }
  }, [data]);

  const Update = async () => {
    try {
      debugger;
      updateEmployee({
        variables: {
          id: id,
          firstName: firstName,
          lastName: lastName,
          title: title,
          department: dept,
          employeeType: employeeType,
        },
        refetchQueries: "all",
        onCompleted: () => {
          // go back to home
          alert("Update Successful");
          history("/");
        },
        onError: (error) => {
          console.log(error);
        },
      });
    } catch (error) {
      alert("failed to update employee!");
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Update Employee</h1>
      {/* Form for creating a new employee */}
      <Form className="d-grid gap-2" onSubmit={() => Update()}>
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
              placeholder="Enter Last Name "
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Age"
              required
              disabled
              value={age}
              onChange={(e) => setAge(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDateOfJoining">
            <Form.Label>Date of Joining</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the day you joined"
              required
              disabled
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
              <option></option>
              <option>Employee</option>
              <option>Manager</option>
              <option>Director</option>
              <option>VP</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDept">
            <Form.Label>Department</Form.Label>
            <Form.Select value={dept} onChange={(e) => setDept(e.target.value)}>
              <option></option>
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
              <option></option>
              <option>FullTime</option>
              <option>PartTime</option>
              <option>Contract</option>
              <option>Seasonal</option>
            </Form.Select>
          </Form.Group>

          {/* Button to submit the form */}
          <Button variant="success" type="submit" className="w-100 mt-2">
            Update Employee
          </Button>
        </fieldset>
      </Form>
    </div>
  );
};

export default Edit;

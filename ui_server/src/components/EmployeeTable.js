import React, { useEffect, useState } from "react";
import { Button, Table, Toast, ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDeleteEmployee } from "../hooks/useEmployees";
import {
  calculateDateOfBirth,
  calculateRetirementDate,
  calculateTimeRemaining,
} from "../utils";

const EmployeeTable = ({ data, loading, activeTab }) => {
  const [alert, setAlert] = useState(false);

  // Destructuring variables and functions from the 'useDeleteEmployee' hook
  const {
    deleteEmployee,
    loading: deleteIsLoading,
    error,
    data: response,
  } = useDeleteEmployee();

  const handleDelete = (id) => {
    // Calling 'deleteEmployee' function from the hook with required parameters
    deleteEmployee({
      variables: { deleteEmployeeId: id }, // Passes the 'id' parameter as 'deleteEmployeeId' variable
      refetchQueries: "all", // REFETCH: Pass an array of query names or functions to refetch specific queries or pass an empty array '[]' to refetch all queries.
      onCompleted: (data) => {
        // alert(data.deleteEmployee);
        setAlert(true);
        // console.log(data.deleteEmployee);
      },
    });
  };

  return (
    <>
      <Table striped bordered hover size="md" className="w-90">
        <thead>
          <tr>
            {/* Table header */}
            <th>FirstName</th>
            <th>LastName</th>
            <th>Age</th>
            {!activeTab ? (
              <>
                <th>DateOfJoining</th>
                <th>Title</th>
                <th>Department</th>
                <th>EmployeeType</th>
                <th>CurrentStatus</th>
                <th>Days till retirement</th>
                <th>Actions</th>
              </>
            ) : (
              <>
                <th>Date of Retirement</th>
              </>
            )}
          </tr>
        </thead>
        {loading ? (
          // If 'loading' is true, display a loading message
          <div className="text-center">loading...</div>
        ) : (
          <tbody>
            {data && data.length > 0 ? ( // If 'data' is not empty and has items
              data.map((item) => {
                const retirementDate = calculateRetirementDate(
                  calculateDateOfBirth(item.age)
                );
                const remainingTime = calculateTimeRemaining(retirementDate);
                return (
                  // Render a table row for each item in the 'data' array
                  <tr key={item.id}>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.age}</td>
                    {!activeTab ? (
                      <>
                        <td>
                          {new Date(item.dateOfJoining).toLocaleDateString()}
                        </td>
                        <td>{item.title}</td>
                        <td>{item.department}</td>
                        <td>{item.employeeType}</td>
                        <td>
                          {item.currentStatus ? "working" : "not working"}
                        </td>
                        <td>
                          {remainingTime.yearsRemaining}years{" "}
                          {remainingTime.months}months{" "}
                          {remainingTime.days}days
                        </td>
                        {/* actions */}
                        <td className="d-flex gap-3">
                          {/* Link to the edit page for the specific employee */}
                          <Link to={`/edit/${item.id}`}>
                            <Button
                              variant="success"
                              // onClick={() => alert(item.id)} // Show an alert with the employee ID on button click
                            >
                              Edit
                            </Button>
                          </Link>
                          {/* Button to delete the specific employee */}
                          <Button
                            variant="danger"
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Are you sure you want to remove ${item.firstName} ${item.lastName} from employee table?`
                                )
                              ) {
                                handleDelete(item.id);
                              }
                            }} // Call 'handleDelete' function with the employee ID on button click
                          >
                            Delete
                          </Button>
                        </td>
                      </>
                    ) : (
                      <>
                        {calculateRetirementDate(
                          calculateDateOfBirth(item.age)
                        ).toLocaleDateString()}
                      </>
                    )}
                  </tr>
                );
              })
            ) : (
              // If 'data' is empty or has no items, display a "No data available" message
              <tr>
                <td colSpan={9} className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        )}
      </Table>
      <ToastContainer
        className="p-3"
        position={"bottom-end"}
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={() => setAlert(false)}
          show={alert}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">CondorHR</strong>
            <small>Less than a minute ago</small>
          </Toast.Header>
          <Toast.Body>{response?.deleteEmployee}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default EmployeeTable;

import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDeleteEmployee } from "../hooks/useEmployees";

const EmployeeTable = ({ data, loading }) => {
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
        alert(data.deleteEmployee);
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
            <th>DateOfJoining</th>
            <th>Title</th>
            <th>Department</th>
            <th>EmployeeType</th>
            <th>CurrentStatus</th>
            <th>Actions</th>
          </tr>
        </thead>
        {loading ? (
          // If 'loading' is true, display a loading message
          <div className="text-center">loading...</div>
        ) : (
          <tbody>
            {data && data.length > 0 ? ( // If 'data' is not empty and has items
              data.map((item) => {
                return (
                  // Render a table row for each item in the 'data' array
                  <tr key={item.id}>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.age}</td>
                    <td>{new Date(item.dateOfJoining).toLocaleDateString()}</td>
                    <td>{item.title}</td>
                    <td>{item.department}</td>
                    <td>{item.employeeType}</td>
                    <td>{item.currentStatus ? "working" : "not working"}</td>
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
                  </tr>
                );
              })
            ) : (
              // If 'data' is empty or has no items, display a "No data available" message
              <tr>
                <td>"No data available"</td>
              </tr>
            )}
          </tbody>
        )}
      </Table>
    </>
  );
};

export default EmployeeTable;

import React, { useEffect, useState } from "react";
import EmployeeCreate from "./components/EmployeeCreate";
import EmployeeSearch from "./components/EmployeeSearch";
import EmployeeTable from "./components/EmployeeTable";
import { useGetAllEmployees } from "./hooks/useEmployees";
import { Form } from "react-bootstrap";

const EmployeeDirectory = () => {
  const [query, setQuery] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const keys = ["firstName", "lastName", "title", "department", "employeeType"];

  // Custom hook to fetch all employees
  const { data: Employees, loading, error } = useGetAllEmployees();

  // Function to filter employees based on search query
  const search = (Data) => {
    if (loading) {
      return [];
    }
    return Data.filter((item) => {
      return keys.some((key) => {
        return item[key]?.toLowerCase().includes(query);
      });
    });
  };

  useEffect(() => {
    setQuery(employeeType);
  }, [employeeType]);

  // Event handler for search input change
  const handleChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  if (error) {
    return <p>An error occurred while returning data...</p>;
  }

  return (
    <>
      <h2 className="mb-4">Employee Management System</h2>
      <div className="employee_directory d-flex flex-column align-items-center justify-content-center w-90">
        <div className="partition_widget d-flex align-items-center justify-content-between mb-3">
          <EmployeeSearch
            placeholder="Search..."
            value={query}
            handleChange={handleChange}
          />
          <Form.Group className="mb-3" controlId="formEmployeeType">
            <Form.Label>Filter By Employee Type</Form.Label>
            <Form.Select
              value={employeeType}
              onChange={(e) => setEmployeeType(e.target.value)}
            >
              <option value={""}>All</option>
              <option value={"fulltime"}>FullTime</option>
              <option value={"parttime"}>PartTime</option>
              <option value={"contract"}>Contract</option>
              <option value={"seasonal"}>Seasonal</option>
            </Form.Select>
          </Form.Group>
          <EmployeeCreate />
        </div>

        <EmployeeTable
          data={search(Employees?.getAllEmployees)}
          loading={loading}
        />
      </div>
    </>
  );
};

export default EmployeeDirectory;

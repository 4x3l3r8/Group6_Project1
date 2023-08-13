import React, { useEffect, useState } from "react";
import EmployeeCreate from "./components/EmployeeCreate";
import EmployeeSearch from "./components/EmployeeSearch";
import EmployeeTable from "./components/EmployeeTable";
import { useGetAllEmployees } from "./hooks/useEmployees";
import { Form, Tab, Tabs } from "react-bootstrap";
import { retiringEmployeesIn6Months } from "./utils";

const EmployeeDirectory = () => {
  const [query, setQuery] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [activeTab, setActiveTab] = useState("allEmployees");
  const [retiringEmployees, setRetiringEmployees] = useState([]);

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

  useEffect(() => {
    setEmployeeType("");
  }, [activeTab]);

  useEffect(() => {
    if (!loading) {
      setRetiringEmployees(
        retiringEmployeesIn6Months(Employees?.getAllEmployees)
      );
    }
  }, [Employees?.getAllEmployees, loading]);

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
      <div className="employee_directory d-flex flex-column align-items-center w-90">
        <div className="partition_widget d-flex align-items-center justify-content-between mb-3">
          <EmployeeSearch
            placeholder="Search..."
            value={query}
            handleChange={handleChange}
            hidden={activeTab === "retiringEmployees"}
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
          <EmployeeCreate hidden={activeTab === "retiringEmployees"} />
        </div>
        <Tabs
          id="controlled-tab-example"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3 w-100"
        >
          <Tab eventKey="allEmployees" title="All Employees">
            <EmployeeTable
              data={search(Employees?.getAllEmployees)}
              loading={loading}
            />
          </Tab>
          <Tab eventKey="retiringEmployees" title="Upcoming Retirement">
            <EmployeeTable
              data={search(retiringEmployees)}
              loading={loading}
              activeTab={activeTab === "retiringEmployees"}
            />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default EmployeeDirectory;

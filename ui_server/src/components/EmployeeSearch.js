import React from "react";
import { Form, InputGroup } from "react-bootstrap";

// The EmployeeSearch component accepts a prop called handleChange
const EmployeeSearch = ({ handleChange, value }) => {
  return (
    // Render an InputGroup component from React Bootstrap
    <InputGroup className="w-25">
      {/* Display the label "Search" */}
      <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>

      {/* Render the search input field */}
      <Form.Control
        aria-label="Default"
        value={value}
        aria-describedby="inputGroup-sizing-default"
        onChange={handleChange} // Call the handleChange function when the input value changes
      />
    </InputGroup>
  );
};

export default EmployeeSearch;

import { gql } from "@apollo/client";

// Query to retrieve all employees
export const GET_EMPLOYEES = gql`
  query Query {
    getAllEmployees {
      id
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
    }
  }
`;

export const GET_SINGLE_EMPLOYEE = gql`
  query GetSingleEmployee($getSingleEmployeeId: ID!) {
    getSingleEmployee(id: $getSingleEmployeeId) {
      id
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
    }
  }
`;

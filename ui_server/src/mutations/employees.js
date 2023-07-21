import { gql } from "@apollo/client";

// Mutation to add a new employee
export const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $firstName: String!
    $lastName: String!
    $age: Int!
    $dateOfJoining: GraphQLDateType!
    $title: Title!
    $department: Department!
    $employeeType: EmployeeType!
  ) {
    createEmployee(
      firstName: $firstName
      lastName: $lastName
      age: $age
      dateOfJoining: $dateOfJoining
      title: $title
      department: $department
      employeeType: $employeeType
    ) {
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

// Mutation to delete an employee
export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($deleteEmployeeId: ID!) {
    deleteEmployee(id: $deleteEmployeeId)
  }
`;

// Mutation to delete an employee
export const UPDATE_EMPLOYEE = gql`
  mutation Mutation(
    $id: ID!
    $firstName: String
    $lastName: String
    $age: Int
    $title: Title
    $dateOfJoining: GraphQLDateType
    $department: Department
    $employeeType: EmployeeType
  ) {
    updateEmployee(
      id: $id
      firstName: $firstName
      lastName: $lastName
      age: $age
      title: $title
      dateOfJoining: $dateOfJoining
      department: $department
      employeeType: $employeeType
    )
  }
`;

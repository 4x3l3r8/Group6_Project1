import { useQuery, useMutation } from "@apollo/client";
import { GET_EMPLOYEES, GET_SINGLE_EMPLOYEE } from "../queries/employees";
import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "../mutations/employees";

// Custom hook to fetch all employees
export const useGetAllEmployees = () => {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  return { loading, error, data };
};

// Custom hook to fetch all employees
export const useGetSingleEmployee = (id) => {
  const { loading, error, data } = useQuery(GET_SINGLE_EMPLOYEE, {
    variables: { getSingleEmployeeId: id },
  });

  return { loading, error, data };
};

// Custom hook to create a new employee
export const useCreateNewEmployee = () => {
  const [createEmployee, { data, error, loading }] = useMutation(ADD_EMPLOYEE);

  return { createEmployee, data, error, loading };
};

// Custom hook to delete an employee
export const useDeleteEmployee = () => {
  const [deleteEmployee, { data, error, loading }] =
    useMutation(DELETE_EMPLOYEE);

  return { deleteEmployee, data, error, loading };
};

// Custom hook to update an employee
export const useUpdateEmployee = () => {
  const [updateEmployee, { data, error, loading }] =
    useMutation(UPDATE_EMPLOYEE);

  return { updateEmployee, data, error, loading };
};

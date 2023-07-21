import express from "express";
import { ApolloServer } from "@apollo/server";
import mongoose from "mongoose";
import { expressMiddleware } from "@apollo/server/express4";
import { EmployeeModel } from "./models/Employee.js";
import { GraphQLScalarType } from "graphql";
import { readFile } from "node:fs/promises";
import cors from "cors";

// Read the type definitions from the schema file
const typeDefs = await readFile("./graphql/schema.graphql", "utf8");

// Create an Express application
const app = express();

// Parse incoming request bodies as JSON
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: "*",
  })
);

// Connect to MongoDB using Mongoose
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.upwjuwm.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "emsDb",
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

// Define a custom GraphQL scalar type for dates
const graphQlDateType = new GraphQLScalarType({
  name: "GraphQLDateType",
  description: "A date type for GraphQl",
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const newDate = new Date(value);
    return isNaN(newDate) ? undefined : newDate;
  },
});

// Define the resolvers for the GraphQL schema
const resolvers = {
  Query: {
    getAllEmployees: async () => {
      try {
        // Retrieve all employees from the EmployeeModel
        const employees = await EmployeeModel.find();
        return employees;
      } catch (error) {
        console.log("Error retrieving employees:", error);
        throw error;
      }
    },
    getSingleEmployee: async (_, { id }) => {
      try {
        const employee = await EmployeeModel.findById(id);
        if (employee) {
          return employee;
        } else {
          return "Employee doesn't exist";
        }
      } catch (error) {
        console.log("Error retrieving employee:", error);
        throw error;
      }
    },
  },
  GraphQLDateType: graphQlDateType,
  Mutation: {
    createEmployee: async (_, args) => {
      try {
        if (args.age <= 70 && args.age >= 20) {
          // Create a new employee using the EmployeeModel
          const newEmployee = await EmployeeModel.create(args);
          return newEmployee;
        } else {
          throw new Error("Age is invalid (age should be between 20 and 70)");
        }
      } catch (error) {
        console.log("Error creating employee:", error);
        throw error;
      }
    },
    updateEmployee: async (_, { id, ...rest }) => {
      try {
        // get employee by employeeId
        const employee = await EmployeeModel.findById(id);
        debugger;
        if (employee) {
          const updatedEmployee = await EmployeeModel.findByIdAndUpdate(id, {
            ...rest,
          });

          return "Employee updated sucessfully";
        } else {
          return "Employee doesn't exist";
        }
      } catch (error) {
        console.log("Error updating employee:", error);
        throw error;
      }
      
    },
    deleteEmployee: async (_, { id }) => {
      try {
        // Find and delete an employee by their ID
        await EmployeeModel.findByIdAndDelete(id);
        return "Employee deleted successfully";
      } catch (error) {
        console.log("Error deleting employee:", error);
        throw error;
      }
    },
  },
};

// Create an Apollo Server instance with the type definitions and resolvers
const apolloServer = new ApolloServer({ typeDefs, resolvers });

await apolloServer.start();

// Mount the Apollo Server middleware at the "/graphql" endpoint
app.use("/graphql", expressMiddleware(apolloServer));

// Start the server and listen for incoming requests
app.listen({ port: 5002 }, () => {
  console.log("Server started at http://localhost:5002");
});

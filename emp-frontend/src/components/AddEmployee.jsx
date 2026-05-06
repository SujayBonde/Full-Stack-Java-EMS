import React, { useEffect, useState } from "react";
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const AddEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error("Error fetching employee details:", error);
        });
    }
  }, [id]);

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errorsCopy.email = "Enter a valid email address";
        valid = false;
      } else {
        errorsCopy.email = "";
      }
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const employee = { firstName, lastName, email };
    console.log(employee);

    if (id) {
      // Update existing employee
      updateEmployee(id, employee)
        .then((response) => {
          console.log(response.data);
          navigate("/employees");
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    } else {
      // Create new employee
      createEmployee(employee)
        .then((response) => {
          console.log(response.data);
          navigate("/employees");
        })
        .catch((error) => {
          console.error("Error creating employee:", error);
        });
    }
  }

  function pageTitle() {
    if (id) {
      return (
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update Employee
        </h2>
      );
    } else {
      return (
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Employee
        </h2>
      );
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {pageTitle()}
        <form className="space-y-4" onSubmit={saveOrUpdateEmployee}>
          {/* First Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              First Name:
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.firstName
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Last Name:
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.lastName
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Email Id */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Id:
            </label>
            <input
              type="email"
              placeholder="Enter email Id"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;

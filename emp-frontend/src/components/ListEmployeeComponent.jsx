import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function addNewEmployee() {
    navigate("/add-employee");
  }

  function updateEmployee(id) {
    navigate(`/edit-employee/${id}`);
  }

  function removeEmployee(id) {
    deleteEmployee(id)
      .then(() => {
        setEmployees(employees.filter((employee) => employee.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Employees</h2>
          <button
            onClick={addNewEmployee}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 font-semibold shadow"
          >
            + Add Employee
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">First Name</th>
                <th className="py-3 px-4 text-left">Last Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b hover:bg-blue-50 transition duration-200"
                >
                  <td className="py-3 px-4">{employee.id}</td>
                  <td className="py-3 px-4">{employee.firstName}</td>
                  <td className="py-3 px-4">{employee.lastName}</td>
                  <td className="py-3 px-4 text-blue-600 font-medium">
                    {employee.email}
                  </td>
                  <td className="py-3 px-4 flex gap-2 justify-center">
                    <button
                      onClick={() => updateEmployee(employee.id)}
                      className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-lg hover:bg-yellow-500 transition duration-200 font-semibold"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => removeEmployee(employee.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200 font-semibold"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              {employees.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;

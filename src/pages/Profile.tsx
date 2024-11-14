import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Profile: React.FC = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', role: 'Developer', department: 'Engineering', email: 'john@example.com', phone: '123-456-7890', logins: 5 },
    { id: 2, name: 'Jane Smith', role: 'Designer', department: 'Design', email: 'jane@example.com', phone: '987-654-3210', logins: 3 },
    { id: 3, name: 'Mike Johnson', role: 'Manager', department: 'HR', email: 'mike@example.com', phone: '555-555-5555', logins: 8 },
  ]);

  const [loginData, setLoginData] = useState({
    labels: ['John Doe', 'Jane Smith', 'Mike Johnson'],
    datasets: [
      {
        label: 'Login Activity',
        data: [5, 3, 8],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    department: '',
    email: '',
    phone: '',
  });

  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = (id: number) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === id ? { ...employee, ...newEmployee } : employee
    );
    setEmployees(updatedEmployees);
    setNewEmployee({ name: '', role: '', department: '', email: '', phone: '' });

    const updatedLoginData = {
      ...loginData,
      datasets: [
        {
          ...loginData.datasets[0],
          data: updatedEmployees.map((employee) => employee.logins),
        },
      ],
    };
    setLoginData(updatedLoginData);

    console.log('Employee updated:', id);
  };

  const handleDelete = (id: number) => {
    try {
      const updatedEmployees = employees.filter((employee) => employee.id !== id);
      setEmployees(updatedEmployees);

      const updatedLoginData = {
        ...loginData,
        labels: updatedEmployees.map((employee) => employee.name),
        datasets: [
          {
            ...loginData.datasets[0],
            data: updatedEmployees.map((employee) => employee.logins),
          },
        ],
      };
      setLoginData(updatedLoginData);

      console.log('Employee deleted:', id);
    } catch (error) {
      console.error('Error deleting employee:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete employee');
    }
  };

  const handleAddEmployee = () => {
    if (
      !newEmployee.name ||
      !newEmployee.role ||
      !newEmployee.department ||
      !newEmployee.email ||
      !newEmployee.phone
    ) {
      alert('Please fill in all fields');
      return;
    }

    const newEmployeeData = {
      id: employees.length + 1,
      name: newEmployee.name,
      role: newEmployee.role,
      department: newEmployee.department,
      email: newEmployee.email,
      phone: newEmployee.phone,
      logins: 0,
    };

    setEmployees([...employees, newEmployeeData]);

    const updatedLoginData = {
      ...loginData,
      labels: [...loginData.labels, newEmployee.name],
      datasets: [
        {
          ...loginData.datasets[0],
          data: [...loginData.datasets[0].data, 0],
        },
      ],
    };
    setLoginData(updatedLoginData);

    setNewEmployee({ name: '', role: '', department: '', email: '', phone: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Search function
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Employee List</h1>
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for an employee..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Add Employee Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={newEmployee.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="px-4 py-2 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            name="role"
            value={newEmployee.role}
            onChange={handleInputChange}
            placeholder="Role"
            className="px-4 py-2 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            name="department"
            value={newEmployee.department}
            onChange={handleInputChange}
            placeholder="Department"
            className="px-4 py-2 border border-gray-300 rounded w-full"
          />
          <input
            type="email"
            name="email"
            value={newEmployee.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="px-4 py-2 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            name="phone"
            value={newEmployee.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="px-4 py-2 border border-gray-300 rounded w-full"
          />
          <button
            onClick={handleAddEmployee}
            className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition duration-200"
          >
            Add Employee
          </button>
        </div>
      </div>

      {/* Employee Table */}
      {filteredEmployees.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border border-gray-300">ID</th>
                <th className="px-4 py-2 border border-gray-300">Name</th>
                <th className="px-4 py-2 border border-gray-300">Role</th>
                <th className="px-4 py-2 border border-gray-300">Department</th>
                <th className="px-4 py-2 border border-gray-300">Email</th>
                <th className="px-4 py-2 border border-gray-300">Phone</th>
                <th className="px-4 py-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">{employee.id}</td>
                  <td className="px-4 py-2 border border-gray-300">{employee.name}</td>
                  <td className="px-4 py-2 border border-gray-300">{employee.role}</td>
                  <td className="px-4 py-2 border border-gray-300">{employee.department}</td>
                  <td className="px-4 py-2 border border-gray-300">{employee.email}</td>
                  <td className="px-4 py-2 border border-gray-300">{employee.phone}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button
                      onClick={() => handleUpdate(employee.id)}
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-200"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-center text-gray-500">No employees found</p>
      )}

      {/* Bar Chart */}
      <div className="mt-8">
        <Bar data={loginData} />
      </div>
    </div>
  );
};

export default Profile;

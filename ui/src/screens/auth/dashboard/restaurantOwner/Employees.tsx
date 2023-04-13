import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import FormModal from "../../../../components/auth/FormModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Employees() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [employeeToEditData, setEmployeeToEditData] =
    useState<IEmployee | null>(null);
  const [employees, setEmployees] = useState<IEmployee[]>([
    {
      id: 1,
      name: "John Doe",
      job: "chef",
      email: "test@gmail.com",
      password: "test",
    },
    {
      id: 2,
      name: "Jane Doe",
      job: "waiter",
      email: "test@gmail.com",

      password: "test",
    },
    {
      id: 3,
      name: "John Smith",
      job: "waiter",
      email: "test@gmail.com",

      password: "test",
    },
    {
      id: 4,
      name: "Jane Smith",
      job: "chef",
      email: "test@gmail.com",
      password: "test",
    },
  ]);

  const addNewEmployee = (employee: IEmployee) => {
    const id = employees.length + 1;
    setEmployees((prev) => [...prev, { ...employee, id }]);
  };

  const removeEmployee = (id: number) => {
    setEmployees((prev) => prev.filter((item) => item.id !== id));
  };

  const editEmployee = (data: IEmployee) => {
    setEmployeeToEditData(data);
    setIsModalOpen(true);
  };

  const updateEmployee = (data: IEmployee) => {
    if (!employeeToEditData) return;
    const updatedEmployees = employees.map((employee) => {
      if (employee.id === employeeToEditData.id) {
        return { ...data, id: employee.id };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  };

  const closeModal = () => {
    setEmployeeToEditData(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <FormModal
            pageTitle="add new employee"
            getData={(data: IEmployee) => {
              employeeToEditData !== null
                ? updateEmployee(data)
                : addNewEmployee(data);
            }}
            fields={[
              { name: "name", type: "text" },
              { name: "job", type: "text" },
              { name: "email", type: "email" },
              { name: "password", type: "password" },
            ]}
            fieldsValue={
              employeeToEditData !== null
                ? {
                    name: { value: employeeToEditData.name, error: null },
                    job: { value: employeeToEditData.job, error: null },
                    email: { value: employeeToEditData.email, error: null },
                    password: {
                      value: employeeToEditData.password,
                      error: null,
                    },
                  }
                : undefined
            }
            closeModal={closeModal}
          />
        )}
      </AnimatePresence>
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-2xl font-bold capitalize">employees</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Add employee
        </button>
      </div>
      <table className="w-full border border-solid border-black mt-4">
        <thead>
          <tr>
            <th className="border border-solid border-black p-2">id</th>
            <th className="border border-solid border-black p-2">name</th>
            <th className="border border-solid border-black p-2">job</th>
            <th className="border border-solid border-black p-2">email</th>
            <th className="border border-solid border-black p-2">actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border border-solid border-black p-2">
                {employee.id}
              </td>
              <td className="border border-solid border-black p-2">
                {employee.name}
              </td>
              <td className="border border-solid border-black p-2">
                {employee.job}
              </td>
              <td className="border border-solid border-black p-2">
                {employee.email}
              </td>
              <td className="border border-solid border-black p-2">
                <div className="flex gap-2 items-center justify-center">
                  <button
                    className="text-red-500"
                    onClick={() => removeEmployee(employee.id)}
                  >
                    <DeleteIcon />
                  </button>

                  <button
                    className="text-blue-500"
                    onClick={() => editEmployee(employee)}
                  >
                    <EditIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Employees;

import { useState } from "react";
import FormModal from "../../../../components/auth/FormModal";

function Employees() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const removeEmployee = (id: number | undefined) => {
        if(typeof id === 'undefined') return;
    setEmployees((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      {isModalOpen && (
        <FormModal
          pageTitle="add new employee"
          addFormData={(data: IEmployee) => addNewEmployee(data)}
          fields={[
            { name: "name", type: "text" },
            { name: "job", type: "text" },
            { name: "email", type: "email" },
            { name: "password", type: "password" },
          ]}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
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
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => removeEmployee(employee.id)}
                    >
                    Remove
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Employees;

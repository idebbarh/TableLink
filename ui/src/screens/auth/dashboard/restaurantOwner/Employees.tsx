import { useState } from "react";
import UserTypeSwitcher from "../../../../components/notAuth/UserTypeSwitcher";

const employees = [
  {
    id: 1,
    name: "John Doe",
    job: "chef",
  },
  {
    id: 2,
    name: "Jane Doe",
    job: "waiter",
  },
  {
    id: 3,
    name: "John Smith",
    job: "waiter",
  },
  {
    id: 4,
    name: "Jane Smith",
    job: "chef",
  },
];

function Employees() {
  return (
    <div>
      <h1 className="text-2xl font-bold capitalize">employees</h1>
            <table className="w-full border border-solid border-black mt-4">
                <thead>
                    <tr>
                        <th className="border border-solid border-black p-2">id</th>
                        <th className="border border-solid border-black p-2">name</th>
                        <th className="border border-solid border-black p-2">job</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td className="border border-solid border-black p-2">{employee.id}</td>
                            <td className="border border-solid border-black p-2">{employee.name}</td>
                            <td className="border border-solid border-black p-2">{employee.job}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  );
}

export default Employees;

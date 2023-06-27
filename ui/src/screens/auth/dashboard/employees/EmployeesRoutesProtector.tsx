import { Outlet } from "react-router-dom";

function EmployeesRoutesProtector() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default EmployeesRoutesProtector;

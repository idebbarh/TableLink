import { Outlet } from "react-router-dom";

function OwnerRoutesProtector() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default OwnerRoutesProtector;

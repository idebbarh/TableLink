import { Outlet } from "react-router-dom";
import Header from "../../components/notAuth/Header";

function NotAuth() {
  return (
    <div>
      <Header />
        <Outlet />
    </div>
  );
}
export default NotAuth;

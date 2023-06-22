import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import SideBar from "../../../components/auth/SideBar";
import { logout, selectUser } from "../../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import Home from "./Home";
import Employees from "./restaurantOwner/Employees";
import MainMenu from "./restaurantOwner/MainMenu";
import Reservations from "./restaurantOwner/Reservations";
import Statistics from "./restaurantOwner/Statistics";

const sideBarOptions: SideBarOptionType[] = [
  {
    title: "Home",
    path: "",
  },
  {
    title: "Employees",
    path: "employees",
  },
  {
    title: "Reservations",
    path: "reservations",
  },
  {
    title: "Menu",
    path: "menu",
  },
  {
    title: "Statistics",
    path: "statistics",
  },
  {
    title: "Settings",
    path: "settings",
  },
];

function Dashboard() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  if (!user.user) {
    return <div>not auth</div>;
  }
  return (
    <div className="flex">
      <SideBar items={sideBarOptions} />
      <div className="flex-[0.8]">
        <header className="px-8 flex items-center justify-end min-h-[80px]">
          <button
            className="bg-mainBlue text-white px-4 py-2 rounded-md"
            onClick={() => dispatch(logout())}
          >
            Sign Out
          </button>
        </header>
        <main className="p-8 relative">
          <Routes>
            <Route path="" element={<Home userName={user.user.name} />} />
            <Route path="employees" element={<Employees />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="menu" element={<MainMenu />} />
            <Route path="statistics" element={<Statistics />} />
            {/* <Route path="settings" element={<Settings />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
}
export default Dashboard;

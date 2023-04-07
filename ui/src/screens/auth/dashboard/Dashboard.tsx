import { Route, Routes } from "react-router-dom";
import SideBar from "../../../components/auth/SideBar";
import Home from "./Home";
import Employees from "./restaurantOwner/Employees";
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
    title: "Statistics",
    path: "statistics",
  },
  {
    title: "Settings",
    path: "settings",
  },
];

function Dashboard() {
  return (
    <div className="flex">
      <SideBar items={sideBarOptions} />
      <div className="flex-[0.8]">
        <header className="p-8 flex items-center justify-end">
          <button className="bg-mainBlue text-white px-4 py-2 rounded-md">
            Sign Out
          </button>
        </header>
        <main className="p-8">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="employees" element={<Employees />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="statistics" element={<Statistics />} />
            {/* <Route path="settings" element={<Settings />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
}
export default Dashboard;

import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SideBar from "../../../components/auth/SideBar";
import { logout, selectUser } from "../../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import Home from "./Home";
import OwnerRoutesProtector from "./restaurantOwner/OwnerRoutesProtector";
import Chefs from "./restaurantOwner/Chefs";
import MainMenu from "./restaurantOwner/MainMenu";
import Reservations from "./restaurantOwner/Reservations";
import Statistics from "./restaurantOwner/Statistics";
import Waiters from "./restaurantOwner/Waiters";
import Settings from "./Settings";
import EmployeesRoutesProtector from "./employees/EmployeesRoutesProtector";
import Availability from "./employees/Availability";

const sideBarOptions: SideBarOptionType[] = [
  {
    title: "Home",
    path: "",
    validIn: ["owners", "waiters", "chefs"],
  },
  {
    title: "Availability",
    path: "availability",
    validIn: ["waiters", "chefs"],
  },
  {
    title: "Waiters",
    path: "waiters",
    validIn: ["owners"],
  },

  {
    title: "Chefs",
    path: "chefs",
    validIn: ["owners"],
  },
  {
    title: "Reservations",
    path: "reservations",
    validIn: ["owners"],
  },
  {
    title: "Menu",
    path: "menu",
    validIn: ["owners"],
  },
  {
    title: "Statistics",
    path: "statistics",
    validIn: ["owners"],
  },
  {
    title: "Settings",
    path: "settings",
    validIn: ["owners"],
  },
];

function Dashboard() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const validSideBarOptions = useMemo(() => {
    return sideBarOptions.filter(
      (opt) =>
        user.user &&
        opt.validIn.includes(
          user.user.lives_in as "owners" | "waiters" | "chefs"
        )
    );
  }, [user.user, sideBarOptions]);

  if (!user.user || !user.token) {
    return <div>not auth</div>;
  }

  return (
    <div className="flex">
      <SideBar items={validSideBarOptions} />
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
            {/* owner routes protector */}
            <Route
              element={
                user.user.lives_in === "owners" ? (
                  <OwnerRoutesProtector />
                ) : (
                  <Navigate to={""} replace={true} />
                )
              }
            >
              <Route path="waiters" element={<Waiters token={user.token} />} />
              <Route path="chefs" element={<Chefs token={user.token} />} />
              <Route
                path="reservations"
                element={<Reservations token={user.token} />}
              />
              <Route path="menu" element={<MainMenu token={user.token} />} />
              <Route
                path="statistics"
                element={<Statistics token={user.token} />}
              />
              <Route
                path="settings"
                element={<Settings token={user.token} />}
              />
            </Route>
            {/* employees routes protector */}
            <Route
              element={
                user.user.lives_in === "waiters" ||
                user.user.lives_in === "chefs" ? (
                  <EmployeesRoutesProtector />
                ) : (
                  <Navigate to={""} replace={true} />
                )
              }
            >
              <Route path="availability" element={<Availability />} />
              {/* waiters routes protector */}
              {/* chefs routes protector */}
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}
export default Dashboard;

import SideBar from "../../components/auth/SideBar";



const sideBarOptions: SideBarOptionType[] = [
  {
    title: "Home",
    path: "",
  },
  {
    title: "Explore",
    path: "explore",
  },
  {
    title: "Profile",
    path: "profile",
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
    </div>
  );
}
export default Dashboard;

import { Link } from "react-router-dom";

interface SideBarProps {
  items: SideBarOptionType[];
}

function SideBar({ items }: SideBarProps) {
  return (
    <div className="flex-[0.2] bg-gray-100 h-screen border-r-2 border-gray-300 p-4">
      <Link to="" className="text-3xl font-bold text-[#343434] block pl-2 mb-2">
        TableLink
      </Link>
      <nav>
        <ul className="flex flex-col gap-2 p-2 text-gray-500">
          {items.map((item) => (
            <li key={item.title}>
              <Link
                to={item.path}
                className="p-2 rounded-md w-full block transition-all duration-300 ease-in-out hover:bg-gray-200"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
export default SideBar;

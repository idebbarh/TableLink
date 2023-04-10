import FormModal from "../../../../components/auth/FormModal";
import { restaurants } from "../../../notAuth/explore/Explore";

function MainMenu() {
  return (
    <div>
      <FormModal page="menu item" fields={["name", "job"]} />
      <h1 className="text-2xl font-bold capitalize">Menu</h1>
      <table className="w-full border border-solid border-black mt-4">
        <thead>
          <tr>
            <th className="border border-solid border-black p-2">Name</th>
            <th className="border border-solid border-black p-2">Price</th>
            <th className="border border-solid border-black p-2">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {restaurants[0].restaurantMenu.map((item) => (
            <tr key={item.id}>
              <td className="border border-solid border-black p-2">
                {item.name}
              </td>
              <td className="border border-solid border-black p-2">
                {item.price}
              </td>
              <td className="border border-solid border-black p-2">
                {item.description}
              </td>
              <td className="border border-solid border-black p-2 flex items-center gap-2">
                {item.ingredients.map((ing) => {
                  return <span key={ing.id}>{ing.name}</span>;
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default MainMenu;

import { removeListener } from "process";
import { useState } from "react";
import FormModal from "../../../../components/auth/FormModal";
import { restaurants } from "../../../notAuth/explore/Explore";

const menu = [
  {
    id: 1,
    name: "Burger",
    price: 100,
    description: "A burger",
    ingredients: [
      {
        id: 1,
        name: "Cheese",
      },
      {
        id: 2,
        name: "Tomato",
      },
      {
        id: 3,
        name: "Onion",
      },
      {
        id: 4,
        name: "Capsicum",
      },
    ],
  },
];

function MainMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menu, setMenu] = useState<IMenuItem[]>([
    {
      id: 1,
      name: "Burger",
      price: 100,
      description: "A burger",
      ingredients: [
        {
          id: 1,
          name: "Cheese",
        },
        {
          id: 2,
          name: "Tomato",
        },
        {
          id: 3,
          name: "Onion",
        },
        {
          id: 4,
          name: "Capsicum",
        },
      ],
    },
  ]);
  const addNewMenuItem = (menuItem: IMenuItem) => {
    const id = menu.length + 1;
    if (typeof menuItem.ingredients === "string") {
      const ingredients = menuItem.ingredients.split(",");
      const newIngredients = ingredients.map((ing, index) => {
        return {
          id: index + 1,
          name: ing.trim(),
        };
      });
      menuItem.ingredients = newIngredients;
    }
    setMenu((prev) => [...prev, { ...menuItem, id }]);
  };

    const removeMenuItem = (id:number)=>{
        setMenu(prev=>prev.filter(item=>item.id !== id))
    }
  return (
    <>
      {isModalOpen && (
        <FormModal
          addFormData={(data: IMenuItem) => addNewMenuItem(data)}
          pageTitle="add new item"
          fields={[
            { name: "name", type: "text" },
            { name: "price", type: "text" },
            { name: "description", type: "text" },
            { name: "ingredients", type: "text" },
          ]}
          closeModal={() => setIsModalOpen(false)}
        />
      )}

      <div className="flex justify-between items-center gap-4">
        <h1 className="text-2xl font-bold capitalize">Menu</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Add new item
        </button>
      </div>
      <table className="w-full border border-solid border-black mt-4">
        <thead>
          <tr>
            <th className="border border-solid border-black p-2">Name</th>
            <th className="border border-solid border-black p-2">Price</th>
            <th className="border border-solid border-black p-2">
              Description
            </th>
            <th className="border border-solid border-black p-2">
              Ingredients
            </th>
            <th className="border border-solid border-black p-2">actions</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((item) => (
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
                            {typeof item.ingredients !== "string" && (
              <td className="border border-solid border-black p-2 flex items-center gap-2">
                {item.ingredients.map((ing) => {
                  return <span key={ing.id}>{ing.name}</span>;
                })}
              </td>
            )}
                <td>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={()=>removeMenuItem(item.id)}>
                        Delete
                    </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default MainMenu;

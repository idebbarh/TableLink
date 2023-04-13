import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormModal from "../../../../components/auth/FormModal";

function MainMenu() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [menuItemToEdit, setMenuItemToEdit] = useState<IMenuItem | null>(null);
  const [menu, setMenu] = useState<IMenuItem[]>([
    {
      id: 1,
      name: "Burger",
      price: "100",
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

  const makeNewIngredients = (ingredients: string) => {
    return ingredients.split(",").map((ing, index) => {
      return {
        id: index + 1,
        name: ing.trim(),
      };
    });
  };
  const addNewMenuItem = (menuItem: IMenuItem) => {
    const id = menu.length + 1;
    if (typeof menuItem.ingredients === "string") {
      menuItem.ingredients = makeNewIngredients(menuItem.ingredients);
    }
    setMenu((prev) => [...prev, { ...menuItem, id }]);
  };

  const removeMenuItem = (id: number) => {
    setMenu((prev) => prev.filter((item) => item.id !== id));
  };

  const editMenuItem = (data: IMenuItem) => {
    setMenuItemToEdit(data);
    setIsModalOpen(true);
  };
  const updateMenuItem = (data: IMenuItem) => {
    if (!menuItemToEdit) return;
    const updatedMenu = menu.map((menuItem) => {
      if (menuItem.id === menuItemToEdit.id) {
        return {
          ...data,
          id: menuItem.id,
          ingredients:
            typeof data.ingredients === "string"
              ? makeNewIngredients(data.ingredients)
              : data.ingredients,
        };
      }
      return menuItem;
    });
    setMenu(updatedMenu);
  };

  const closeModal = () => {
    setMenuItemToEdit(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <FormModal
            getData={(data: IMenuItem) =>
              menuItemToEdit !== null
                ? updateMenuItem(data)
                : addNewMenuItem(data)
            }
            pageTitle="add new item"
            fields={[
              { name: "name", type: "text" },
              { name: "price", type: "text" },
              { name: "description", type: "text" },
              { name: "ingredients", type: "text" },
            ]}
            fieldsValue={
              menuItemToEdit
                ? {
                    name: { value: menuItemToEdit.name, error: null },
                    price: { value: menuItemToEdit.price, error: null },
                    description: {
                      value: menuItemToEdit.description,
                      error: null,
                    },
                    ingredients: {
                      value:
                        typeof menuItemToEdit.ingredients === "string"
                          ? menuItemToEdit.ingredients
                          : menuItemToEdit.ingredients
                              .map((ing) => ing.name)
                              .join(","),
                      error: null,
                    },
                  }
                : undefined
            }
            closeModal={closeModal}
          />
        )}
      </AnimatePresence>
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
                <td className="border border-solid border-black p-2">
                  <div className="flex items-center gap-2">
                    {item.ingredients.map((ing) => {
                      return <span key={ing.id}>{ing.name}</span>;
                    })}
                  </div>
                </td>
              )}
              <td className="border border-solid border-black p-2">
                <div className="flex gap-2 items-center justify-center">
                  <button
                    className="text-red-500"
                    onClick={() => removeMenuItem(item.id)}
                  >
                    <DeleteIcon />
                  </button>

                  <button
                    className="text-blue-500"
                    onClick={() => editMenuItem(item)}
                  >
                    <EditIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default MainMenu;

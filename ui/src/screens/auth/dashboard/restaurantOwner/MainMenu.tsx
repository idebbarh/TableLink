import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormModal from "../../../../components/auth/FormModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import OwnerApi from "../../../../api/owner";

function MainMenu({ token }: { token: string }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [menuItemToEdit, setMenuItemToEdit] = useState<Pick<
    Plate,
    "id" | "name" | "description" | "ingredients" | "price"
  > | null>(null);
  const queryClient = useQueryClient();

  const platesQuery = useQuery<{ res: Plate[] }, MyKnownError>({
    queryKey: ["api", "owner", "plates"],
    queryFn: () => OwnerApi.getAllPlates(token),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err.errorMessage);
    },
  });

  const plateMutate = useMutation<
    { res: Plate },
    MyKnownError,
    Pick<Plate, "name" | "description" | "ingredients" | "price">
  >({
    mutationKey: ["api", "owner", "plates"],
    mutationFn: (data) => OwnerApi.createPlate(token, data),
    onSuccess: (data) => {
      console.log(data);
      closeModal();
      queryClient.invalidateQueries(["api", "owner", "plates"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const deletePlateMutate = useMutation<
    { res: Plate },
    MyKnownError,
    string | number
  >({
    mutationKey: ["api", "owner", "plates", "id"],
    mutationFn: (id) => OwnerApi.deletePlate(token, id),
    onSuccess: (data) => {
      console.log(data);
      closeModal();
      queryClient.invalidateQueries(["api", "owner", "plates"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const updatePlateMutate = useMutation<
    { res: Plate },
    MyKnownError,
    {
      id: string | number;
      formData: Pick<Plate, "name" | "description" | "ingredients" | "price">;
    }
  >({
    mutationKey: ["api", "owner", "plates", "id"],
    mutationFn: (data) => OwnerApi.updatePlate(token, data.id, data.formData),
    onSuccess: (data) => {
      console.log(data);
      closeModal();
      queryClient.invalidateQueries(["api", "owner", "plates"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const addNewMenuItem = (
    formData: Pick<Plate, "name" | "description" | "ingredients" | "price">
  ) => {
    console.log("test");
    if (menuItemToEdit) {
      return;
    }
    plateMutate.mutate(formData);
  };

  const removeMenuItem = (id: number | string) => {
    deletePlateMutate.mutate(id);
  };
  const editMenuItem = (
    data: Pick<Plate, "id" | "name" | "description" | "ingredients" | "price">
  ) => {
    setMenuItemToEdit(data);
    setIsModalOpen(true);
  };
  const updateMenuItem = (
    formData: Pick<Plate, "name" | "description" | "ingredients" | "price">
  ) => {
    if (!menuItemToEdit) {
      return;
    }
    updatePlateMutate.mutate({ id: menuItemToEdit.id, formData });
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
            returnData={(data) => {
              updateMenuItem(
                data as Pick<
                  Plate,
                  "name" | "description" | "ingredients" | "price"
                >
              );
              addNewMenuItem(
                data as Pick<
                  Plate,
                  "name" | "description" | "ingredients" | "price"
                >
              );
            }}
            modalTitle={menuItemToEdit ? "update plate" : "add plate"}
            submitBtnTitle={menuItemToEdit ? "update" : "add"}
            fields={[
              {
                name: "name",
                type: "text",
                value: menuItemToEdit ? menuItemToEdit.name : "",
              },
              {
                name: "description",
                type: "text",
                value: menuItemToEdit ? menuItemToEdit.description : "",
              },
              {
                name: "ingredients",
                type: "text",
                value: menuItemToEdit ? menuItemToEdit.ingredients : "",
              },
              {
                name: "price",
                type: "number",
                value: menuItemToEdit ? menuItemToEdit.price : "",
              },
            ]}
            closeModal={() => closeModal()}
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
          {platesQuery.isLoading ? (
            <tr>
              <td colSpan={5}>Loading...</td>
            </tr>
          ) : platesQuery.data && platesQuery.data.res.length ? (
            platesQuery.data.res.map((item) => (
              <tr key={item.id}>
                <td className="border border-solid border-black p-2">
                  {item.name}
                </td>
                <td className="border border-solid border-black p-2">
                  {item.price}$
                </td>
                <td className="border border-solid border-black p-2">
                  {item.description}
                </td>
                <td className="border border-solid border-black p-2">
                  <div className="flex items-center gap-2">
                    {item.ingredients.split(",").map((ing, index) => {
                      return <span key={index}>{ing.trim()}</span>;
                    })}
                  </div>
                </td>
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
                      onClick={() =>
                        editMenuItem({
                          id: item.id,
                          name: item.name,
                          description: item.description,
                          ingredients: item.ingredients,
                          price: item.price,
                        })
                      }
                    >
                      <EditIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="p-2 text-red-500">
                No plates found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
export default MainMenu;

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import FormModal from "../../../../components/auth/FormModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import OwnerApi from "../../../../api/owner";

function Chefs({ token }: { token: string }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [chefDataToEdit, setChefDataToEdit] = useState<{
    id: number | string;
    name: string;
    email: string;
  } | null>(null);
  const queryClient = useQueryClient();

  const chefsQuery = useQuery<{ res: Chef[] }>({
    queryKey: ["api", "owner", "employees", "chefs"],
    queryFn: () => OwnerApi.getAllChefs(token),
  });

  const deleteChefMutation = useMutation<
    { res: Chef },
    MyKnownError,
    number | string
  >({
    mutationKey: ["api", "owner", "employees", "chefs", "id"],
    mutationFn: (id) => OwnerApi.deleteChef(id, token),
    onSuccess(data) {
      console.log(data);
      queryClient.invalidateQueries(["api", "owner", "employees", "chefs"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const updateChefMutation = useMutation<
    { res: Chef },
    MyKnownError,
    {
      id: number | string;
      formData: Pick<Chef, "name" | "email" | "password">;
    }
  >({
    mutationKey: ["api", "owner", "employees", "chefs", "id"],
    mutationFn: (data) => OwnerApi.updateChef(data.id, data.formData, token),
    onSuccess(data) {
      console.log(data);
      queryClient.invalidateQueries(["api", "owner", "employees", "chefs"]);
      closeModal();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const addChefMutation = useMutation<
    { res: Chef },
    MyKnownError,
    Pick<Chef, "name" | "email" | "password">
  >({
    mutationKey: ["api", "owner", "employees", "chefs"],
    mutationFn: (formData) => OwnerApi.createChef(formData, token),
    onSuccess(data) {
      console.log(data);
      queryClient.invalidateQueries(["api", "owner", "employees", "chefs"]);
      closeModal();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  //-----------------------//
  const addNewEmployee = (
    formData: Pick<Chef, "name" | "email" | "password">
  ) => {
    if (chefDataToEdit) {
      return;
    }
    addChefMutation.mutate(formData);
  };

  const removeEmployee = (id: number | string) => {
    deleteChefMutation.mutate(id);
  };

  const editEmployee = (data: Pick<Chef, "id" | "name" | "email">) => {
    setChefDataToEdit(data);
    setIsModalOpen(true);
  };

  const updateEmployee = (
    formData: Pick<Chef, "name" | "email" | "password">
  ) => {
    if (!chefDataToEdit) {
      return;
    }
    updateChefMutation.mutate({ id: chefDataToEdit.id, formData });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setChefDataToEdit(null);
  };

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <FormModal
            returnData={(data) => {
              updateEmployee(data as Pick<Chef, "name" | "email" | "password">);
              addNewEmployee(data as Pick<Chef, "name" | "email" | "password">);
            }}
            modalTitle={chefDataToEdit ? "update chef" : "add new chef"}
            submitBtnTitle={chefDataToEdit ? "update" : "add"}
            fields={[
              {
                name: "name",
                type: "text",
                value: chefDataToEdit ? chefDataToEdit.name : "",
              },
              {
                name: "email",
                type: "email",
                value: chefDataToEdit ? chefDataToEdit.email : "",
              },
              {
                name: "password",
                type: "password",
                value: "",
              },
            ]}
            closeModal={() => closeModal()}
          />
        )}
      </AnimatePresence>
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-2xl font-bold capitalize">chefs</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Add chef
        </button>
      </div>
      <table className="w-full border border-solid border-black mt-4">
        <thead>
          <tr>
            <th className="border border-solid border-black p-2">name</th>
            <th className="border border-solid border-black p-2">email</th>
            <th className="border border-solid border-black p-2">actions</th>
          </tr>
        </thead>
        <tbody>
          {chefsQuery.isLoading ? (
            <tr>
              <td colSpan={3}>Loading...</td>
            </tr>
          ) : chefsQuery.data && chefsQuery.data.res.length ? (
            chefsQuery.data.res.map((employee) => (
              <tr key={employee.id}>
                <td className="border border-solid border-black p-2">
                  {employee.name}
                </td>
                <td className="border border-solid border-black p-2">
                  {employee.email}
                </td>
                <td className="border border-solid border-black p-2">
                  <div className="flex gap-2 items-center justify-center">
                    <button
                      className="text-red-500"
                      onClick={() => removeEmployee(employee.id)}
                    >
                      <DeleteIcon />
                    </button>

                    <button
                      className="text-blue-500"
                      onClick={() =>
                        editEmployee({
                          id: employee.id,
                          name: employee.name,
                          email: employee.email,
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
                No chefs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {deleteChefMutation.isError ? (
        <p className="mt-4 font-bold text-lg text-red-500">
          {deleteChefMutation.error.errorMessage}
        </p>
      ) : updateChefMutation.isError ? (
        <p className="mt-4 font-bold text-lg text-red-500">
          {updateChefMutation.error.errorMessage}
        </p>
      ) : addChefMutation.isError ? (
        <p className="mt-4 font-bold text-lg text-red-500">
          {addChefMutation.error.errorMessage}
        </p>
      ) : undefined}
    </>
  );
}

export default Chefs;

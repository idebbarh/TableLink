import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import FormModal from "../../../../components/auth/FormModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "../../../../redux/store/hooks";
import { selectUser } from "../../../../redux/slices/userSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import OwnerApi from "../../../../api/owner";

function Waiters({ token }: { token: string }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [waiterDataToEdit, setWaiterDataToEdit] = useState<{
    id: number | string;
    name: string;
    email: string;
  } | null>(null);
  const queryClient = useQueryClient();
  const waitersQuery = useQuery<{ res: Waiter[] }>({
    queryKey: ["api", "owner", "employees", "waiters"],
    queryFn: () => OwnerApi.getAllWaiters(token),
  });
  const deleteWaiterMutation = useMutation<
    { res: Waiter },
    MyKnownError,
    number | string
  >({
    mutationKey: ["api", "owner", "employees", "waiters", "id"],
    mutationFn: (id) => OwnerApi.deleteWaiter(id, token),
    onSuccess(data) {
      console.log(data);
      queryClient.invalidateQueries(["api", "owner", "employees", "waiters"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const updateWaiterMutation = useMutation<
    { res: Waiter },
    MyKnownError,
    {
      id: number | string;
      formData: Pick<Waiter, "name" | "email" | "password">;
    }
  >({
    mutationKey: ["api", "owner", "employees", "waiters", "id"],
    mutationFn: (data) => OwnerApi.updateWaiter(data.id, data.formData, token),
    onSuccess(data) {
      console.log(data);
      queryClient.invalidateQueries(["api", "owner", "employees", "waiters"]);
      closeModal();
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const addWaiterMutation = useMutation<
    { res: Waiter },
    MyKnownError,
    Pick<Waiter, "name" | "email" | "password">
  >({
    mutationKey: ["api", "owner", "employees", "waiters"],
    mutationFn: (formData) => OwnerApi.createWaiter(formData, token),
    onSuccess(data) {
      console.log(data);
      queryClient.invalidateQueries(["api", "owner", "employees", "waiters"]);
      closeModal();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const addNewEmployee = (
    formData: Pick<Waiter, "name" | "email" | "password">
  ) => {
    if (waiterDataToEdit) {
      return;
    }
    addWaiterMutation.mutate(formData);
  };

  const removeEmployee = (id: number | string) => {
    deleteWaiterMutation.mutate(id);
  };

  const editEmployee = (data: Pick<Waiter, "id" | "name" | "email">) => {
    setWaiterDataToEdit(data);
    setIsModalOpen(true);
  };

  const updateEmployee = (
    formData: Pick<Waiter, "name" | "email" | "password">
  ) => {
    if (!waiterDataToEdit) {
      return;
    }
    updateWaiterMutation.mutate({ id: waiterDataToEdit.id, formData });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setWaiterDataToEdit(null);
  };

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <FormModal
            returnData={(data) => {
              updateEmployee(
                data as Pick<Waiter, "name" | "email" | "password">
              );
              addNewEmployee(
                data as Pick<Waiter, "name" | "email" | "password">
              );
            }}
            modalTitle={waiterDataToEdit ? "update waiter" : "add new waiter"}
            submitBtnTitle={waiterDataToEdit ? "update" : "add"}
            fields={[
              {
                name: "name",
                type: "text",
                value: waiterDataToEdit ? waiterDataToEdit.name : "",
              },
              {
                name: "email",
                type: "email",
                value: waiterDataToEdit ? waiterDataToEdit.email : "",
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
        <h1 className="text-2xl font-bold capitalize">waiters</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Add waiter
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
          {waitersQuery.isLoading ? (
            <tr>
              <td colSpan={3}>Loading...</td>
            </tr>
          ) : waitersQuery.data && waitersQuery.data.res.length ? (
            waitersQuery.data.res.map((employee) => (
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
                No waiters found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {deleteWaiterMutation.isError ? (
        <p className="mt-4 font-bold text-lg text-red-500">
          {deleteWaiterMutation.error.errorMessage}
        </p>
      ) : updateWaiterMutation.isError ? (
        <p className="mt-4 font-bold text-lg text-red-500">
          {updateWaiterMutation.error.errorMessage}
        </p>
      ) : addWaiterMutation.isError ? (
        <p className="mt-4 font-bold text-lg text-red-500">
          {addWaiterMutation.error.errorMessage}
        </p>
      ) : undefined}
    </>
  );
}

export default Waiters;

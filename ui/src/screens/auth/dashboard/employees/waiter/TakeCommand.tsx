import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import PlateApi from "../../../../../api/plate";
import WaiterApi from "../../../../../api/waiter";
import { selectUser } from "../../../../../redux/slices/userSlice";
import { useAppSelector } from "../../../../../redux/store/hooks";

function TakeCommand({ token }: { token: string }) {
  const user = useAppSelector(selectUser);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [plateName, setPlateName] = useState<string | null>();

  const menuQuery = useQuery<{ res: Plate[] }, MyKnownError>({
    queryKey: ["api", "plates", user.user?.restaurant_id],
    queryFn: () =>
      user.user && user.user.restaurant_id
        ? PlateApi.getRestaurantMenu(user.user.restaurant_id)
        : { res: [] },
    onSuccess: (data) => {
      console.log(data.res);
    },
  });

  useEffect(() => {
    if (successMsg === null) {
      return;
    }
    const timeout = setTimeout(() => {
      setSuccessMsg(null);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [successMsg]);

  useEffect(() => {
    if (errorMsg === null) {
      return;
    }
    const timeout = setTimeout(() => {
      setErrorMsg(null);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [errorMsg]);

  const commandMutation = useMutation<
    { res: Command },
    MyKnownError,
    number | string
  >({
    mutationKey: ["api", "waiter", "commands"],
    mutationFn: (id) => WaiterApi.makeCommand(id, token),
    onSuccess: (data) => {
      if (!plateName) {
        return;
      }
      console.log(data);
      setSuccessMsg(`${plateName} is succussfully sent to some chef`);
    },
    onError: (err) => {
      console.log(err);
      setErrorMsg(err.errorMessage);
    },
  });

  const makeCommand = (id: number | string, plateName: string) => {
    setPlateName(plateName);
    commandMutation.mutate(id);
  };

  return (
    <>
      <h2 className="text-[1.6rem] font-bold capitalize text-black">
        Restaurant Menu
      </h2>
      <div className="grid grid-cols-auto-fit gap-4 mt-4">
        {menuQuery.isLoading ? (
          <p className="text-blue-500">Loading...</p>
        ) : menuQuery.data && menuQuery.data.res.length ? (
          menuQuery.data.res.map((item) => (
            <div
              className="flex flex-col gap-2 border border-black bg-white"
              key={item.id}
            >
              <h4 className="p-2 text-lg font-bold text-dark">{item.name}</h4>
              <div className="p-2 border-t border-black">
                <button
                  className="font-bold w-fit mx-auto block p-2 capitalize border border-black text-black transition-colors duration-300 ease-in-out hover:bg-black hover:text-white"
                  onClick={() => makeCommand(item.id, item.name)}
                >
                  send to chef
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="mt-4 text-red-500">
            menu is steal empty, talk to the owner to fill it
          </p>
        )}
      </div>
      {successMsg && (
        <p className="font-bold text-green-500 mt-4">{successMsg}</p>
      )}
      {errorMsg && <p className="font-bold text-red-500 mt-4">{errorMsg}</p>}
    </>
  );
}

export default TakeCommand;

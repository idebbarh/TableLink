import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiEndpoints from "../../../../../api/apiEndpoints";
import WaiterApi from "../../../../../api/waiter";

function CommandToPay({ token }: { token: string }) {
  const queryClient = useQueryClient();
  const commandsQuery = useQuery<{ res: Command[] }, MyKnownError>({
    queryKey: apiEndpoints.waiter.getCommandsToPay.split("/"),
    queryFn: () => WaiterApi.getCommandsToPay(token),
    onSuccess: (data) => console.log(data),
    onError: (err) => console.log(err),
  });

  const commandsMutation = useMutation<
    { res: Command },
    MyKnownError,
    number | string
  >({
    mutationKey: apiEndpoints.waiter.setCommandAsPayed.split("/"),
    mutationFn: (id) => WaiterApi.setCommandAsPayed(id, token),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(
        apiEndpoints.waiter.getCommandsToPay.split("/")
      );
    },
    onError: (err) => console.log(err),
  });

  const payed = (id: number | string) => {
    commandsMutation.mutate(id);
  };
  return (
    <>
      <h2 className="text-[1.6rem] font-bold capitalize text-black">
        commands to pay
      </h2>

      <div className="grid grid-cols-auto-fit gap-4 mt-4">
        {commandsQuery.isLoading ? (
          <p className="text-blue-500">Loading...</p>
        ) : commandsQuery.data && commandsQuery.data.res.length ? (
          commandsQuery.data.res.map((item, index) => (
            <div
              className="flex flex-col gap-2 border border-black bg-white"
              key={item.id}
            >
              <h4 className="p-2 text-lg font-bold text-dark">
                {index + 1}-{item.name}
              </h4>
              <div className="p-2 border-t border-black">
                <button
                  className="font-bold w-fit mx-auto block p-2 capitalize border border-black text-black transition-colors duration-300 ease-in-out hover:bg-black hover:text-white"
                  onClick={() => payed(item.id)}
                >
                  payed
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="mt-4 text-red-500">
            not plates need to pay in this moment
          </p>
        )}
      </div>
    </>
  );
}
export default CommandToPay;

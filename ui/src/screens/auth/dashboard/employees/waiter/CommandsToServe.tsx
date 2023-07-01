import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import WaiterApi from "../../../../../api/waiter";

function CommandsToServe({ token }: { token: string }) {
  const queryClient = useQueryClient();
  const commandsQuery = useQuery<{ res: Command[] }, MyKnownError>({
    queryKey: ["api", "waiter", "commands"],
    queryFn: () => WaiterApi.getCommandsToServe(token),
    onSuccess: (data) => console.log(data),
    onError: (err) => console.log(err),
  });
  const commandsMutation = useMutation<
    { res: Command },
    MyKnownError,
    number | string
  >({
    mutationKey: ["api", "waiter", "commands", "id", "served"],
    mutationFn: (id) => WaiterApi.setCommandAsServed(id, token),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["api", "waiter", "commands"]);
    },
    onError: (err) => console.log(err),
  });

  const served = (id: number | string) => {
    commandsMutation.mutate(id);
  };
  return (
    <>
      <h2 className="text-[1.6rem] font-bold capitalize text-black">
        commands to cook
      </h2>

      <div className="grid grid-cols-auto-fit gap-4 mt-4">
        {commandsQuery.isLoading ? (
          <p className="text-blue-500">Loading...</p>
        ) : commandsQuery.data && commandsQuery.data.res.length ? (
          commandsQuery.data.res.map((item, index) => (
            <div
              className={`flex flex-col gap-2 border border-black bg-white ${
                index === 0
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-40 pointer-events-none"
              }`}
              key={item.id}
            >
              <h4 className="p-2 text-lg font-bold text-dark">
                {index + 1}-{item.name}
              </h4>
              <div className="p-2 border-t border-black">
                <button
                  className="font-bold w-fit mx-auto block p-2 capitalize border border-black text-black transition-colors duration-300 ease-in-out hover:bg-black hover:text-white"
                  onClick={index === 0 ? () => served(item.id) : undefined}
                >
                  served
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="mt-4 text-red-500">
            not plates to serve in this moment, take a rest
          </p>
        )}
      </div>
    </>
  );
}

export default CommandsToServe;

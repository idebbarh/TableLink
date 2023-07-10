import { useQuery } from "@tanstack/react-query";
import OwnerApi from "../../../../api/owner";
import usePaginate from "../../../../hooks/usePaginate";

function RestaurantCommands({ token }: { token: string }) {
  const { paginate, paginationLinks } = usePaginate(5);
  const commandsQuery = useQuery<{ res: Command[] }, MyKnownError>({
    queryKey: ["api", "owner", "commands"],
    queryFn: () => OwnerApi.getAllCommands(token),
    onSuccess: (data) => console.log(data),
    onError: (err) => console.log(err),
  });

  return (
    <>
      <h1 className="text-2xl font-bold capitalize">Commands</h1>
      <table className="w-full border border-solid border-black mt-4">
        <thead>
          <tr>
            <th className="border border-solid border-black p-2">plate name</th>
            <th className="border border-solid border-black p-2">date</th>
            <th className="border border-solid border-black p-2">status</th>
          </tr>
        </thead>
        <tbody>
          {commandsQuery.isLoading ? (
            <tr>
              <td colSpan={3}>Loading...</td>
            </tr>
          ) : commandsQuery.data && commandsQuery.data.res.length ? (
            [
              ...paginate<Command>([...commandsQuery.data.res].reverse()).map(
                (command) => (
                  <tr key={command.id}>
                    <td className="border border-solid border-black p-2">
                      {command.name}
                    </td>
                    <td className="border border-solid border-black p-2">
                      {command.date.split("T")[0]}{" "}
                      {command.date.split("T")[1].split(".")[0]}
                    </td>
                    <td className="border border-solid border-black p-2">
                      <div className="flex flex-wrap gap-2 items-center justify-center">
                        <span
                          className={`px-4 py-2 rounded-3xl capitalize ${
                            command.is_cooked ? "bg-green-500" : "bg-red-500"
                          } text-white text-sm w-full text-center`}
                        >
                          {command.is_cooked ? "cooked" : "not cooked"}
                        </span>
                        <span
                          className={`px-4 py-2 rounded-3xl capitalize ${
                            command.is_served ? "bg-green-500" : "bg-red-500"
                          } text-white text-sm w-full text-center`}
                        >
                          {command.is_served ? "served" : "not served"}
                        </span>
                        <span
                          className={`px-4 py-2 rounded-3xl capitalize ${
                            command.is_payed ? "bg-green-500" : "bg-red-500"
                          } text-white text-sm w-full text-center`}
                        >
                          {command.is_payed ? "payed" : "not payed"}
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              ),
              <tr>
                <td
                  className="border border-solid border-black p-2"
                  colSpan={3}
                >
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {paginationLinks(
                      commandsQuery.data.res.length,
                      "cursor-pointer text-black border border-solid border-black p-2 transition duration-300 easy-in-out hover:text-white hover:bg-black",
                      "text-white bg-black"
                    )}
                  </div>
                </td>
              </tr>,
            ]
          ) : (
            <tr>
              <td colSpan={3} className="p-2 text-red-500">
                no commands found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {commandsQuery.isError && (
        <p className="mt-4 font-bold text-lg text-red-500">
          {commandsQuery.error.errorMessage}
        </p>
      )}
    </>
  );
}

export default RestaurantCommands;

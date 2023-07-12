import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import OwnerApi from "../../../../api/owner";
import usePaginate from "../../../../hooks/usePaginate";

type CommandsFilter = {
  isCooked: boolean;
  isServed: boolean;
  isPayed: boolean;
  all: boolean;
};
function RestaurantCommands({ token }: { token: string }) {
  const { paginate, paginationLinks } = usePaginate(5);
  const [commandsFilter, setCommandsFilter] = useState<CommandsFilter>({
    isCooked: true,
    isServed: true,
    isPayed: true,
    all: true,
  });

  const commandsQuery = useQuery<{ res: Command[] }, MyKnownError>({
    queryKey: ["api", "owner", "commands"],
    queryFn: () => OwnerApi.getAllCommands(token),
    onSuccess: (data) => console.log(data),
    onError: (err) => console.log(err),
  });

  function changeFilter(newVal: Partial<CommandsFilter>) {
    setCommandsFilter((prevState) => ({ ...prevState, ...newVal }));
  }

  const commandsToShow = useMemo(() => {
    return commandsQuery.data
      ? commandsQuery.data.res
          .filter(
            (command) =>
              commandsFilter.all ||
              (command.is_cooked === (commandsFilter.isCooked ? 1 : 0) &&
                command.is_served === (commandsFilter.isServed ? 1 : 0) &&
                command.is_payed === (commandsFilter.isPayed ? 1 : 0))
          )
          .reverse()
      : [];
  }, [commandsQuery, commandsFilter]);

  return (
    <>
      <h1 className="text-2xl font-bold capitalize">Commands</h1>
      <div className="flex items-center gap-4 mt-4 flex-wrap">
        <div className="w-full">
          <button
            className={`text-sm border border-solid border-black px-4 py-2 rounded-3xl cursor-pointer transition-colors duration-300 easy-in-out ${
              commandsFilter.all ? "text-white bg-black" : "text-black bg-white"
            }`}
            onClick={() => changeFilter({ all: !commandsFilter.all })}
          >
            show all
          </button>
        </div>
        {!commandsFilter.all && (
          <>
            <button
              className={`text-sm border border-solid border-black px-4 py-2 rounded-3xl cursor-pointer transition-colors duration-300 easy-in-out ${
                commandsFilter.isCooked
                  ? "text-white bg-black"
                  : "text-black bg-white"
              }`}
              onClick={() =>
                changeFilter({ isCooked: !commandsFilter.isCooked })
              }
            >
              is cooked
            </button>
            <button
              className={`text-sm border border-solid border-black px-4 py-2 rounded-3xl cursor-pointer transition-colors duration-300 easy-in-out ${
                commandsFilter.isServed
                  ? "text-white bg-black"
                  : "text-black bg-white"
              }`}
              onClick={() =>
                changeFilter({ isServed: !commandsFilter.isServed })
              }
            >
              is served
            </button>
            <button
              className={`text-sm border border-solid border-black px-4 py-2 rounded-3xl cursor-pointer transition-colors duration-300 easy-in-out ${
                commandsFilter.isPayed
                  ? "text-white bg-black"
                  : "text-black bg-white"
              }`}
              onClick={() => changeFilter({ isPayed: !commandsFilter.isPayed })}
            >
              is payed
            </button>
          </>
        )}
      </div>
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
              ...paginate<Command>(commandsToShow).map((command) => (
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
              )),
              <tr key="paginationRow">
                <td
                  className="border border-solid border-black p-2"
                  colSpan={3}
                >
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {paginationLinks(
                      commandsToShow.length,
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

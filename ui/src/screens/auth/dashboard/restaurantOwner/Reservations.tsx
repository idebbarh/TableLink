import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import OwnerApi from "../../../../api/owner";

function Reservations({ token }: { token: string }) {
  const queryClient = useQueryClient();
  const reservationsQuery = useQuery<{ res: Reservation[] }>({
    queryKey: ["api", "owner", "reservations"],
    queryFn: () => OwnerApi.getAllReservations(token),
  });

  const reservationMutation = useMutation<
    { res: Reservation },
    MyKnownError,
    number | string
  >({
    mutationKey: ["api", "owner", "reservations", "id"],
    mutationFn: (id) => OwnerApi.deleteReservation(id, token),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["api", "owner", "reservations"]);
    },
    onError: (error) => {
      console.log(error.errorMessage);
    },
  });
  const removeReservation = (id: number | string) => {
    reservationMutation.mutate(id);
  };
  return (
    <>
      <h1 className="text-2xl font-bold capitalize">Reservations</h1>
      <table className="w-full border border-solid border-black mt-4">
        <thead>
          <tr>
            <th className="border border-solid border-black p-2">id</th>
            <th className="border border-solid border-black p-2">name</th>
            <th className="border border-solid border-black p-2">date</th>
            <th className="border border-solid border-black p-2">time</th>
            <th className="border border-solid border-black p-2">guests</th>
            <th className="border border-solid border-black p-2">actions</th>
          </tr>
        </thead>
        <tbody>
          {reservationsQuery.isLoading ? (
            <tr>
              <td colSpan={3}>Loading...</td>
            </tr>
          ) : reservationsQuery.data && reservationsQuery.data.res.length ? (
            reservationsQuery.data.res.map((reservation) => (
              <tr key={reservation.id}>
                <td className="border border-solid border-black p-2">
                  {reservation.id}
                </td>
                <td className="border border-solid border-black p-2">
                  {reservation.client_name}
                </td>
                <td className="border border-solid border-black p-2">
                  {reservation.date.split("T")[0]}
                </td>
                <td className="border border-solid border-black p-2">
                  {reservation.time}
                </td>
                <td className="border border-solid border-black p-2">
                  {reservation.guests}
                </td>
                <td className="border border-solid border-black p-2">
                  <div className="flex gap-2 items-center justify-center">
                    <button
                      className="text-red-500"
                      onClick={() => removeReservation(reservation.id)}
                    >
                      <DeleteIcon />
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
      {reservationMutation.isError && (
        <p className="mt-4 font-bold text-lg text-red-500">
          {reservationMutation.error.errorMessage}
        </p>
      )}
    </>
  );
}

export default Reservations;

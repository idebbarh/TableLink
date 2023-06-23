import { useQuery } from "@tanstack/react-query";
import OwnerApi from "../../../../api/owner";

function Statistics({ token }: { token: string }) {
  const statisticsQuery = useQuery<{ res: Statistics }, MyKnownError>({
    queryKey: ["api", "owner", "statistiques"],
    queryFn: () => OwnerApi.getRestaurantStatistics(token),
    onSuccess: (data) => {
      console.log(data);
    },
  });
  if (statisticsQuery.isLoading) {
    return <p>Loading...</p>;
  }
  if (statisticsQuery.isError) {
    return <p className="text-red-500">{statisticsQuery.error.errorMessage}</p>;
  }

  if (!statisticsQuery.data) {
    return <p className="text-red-500">No statistics found</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold capitalize">statistics</h1>
      <div className="mt-4 flex flex-col gap-4">
        <p className="text-xl">
          Today's bookings:{" "}
          <span className="text-mainBlue">
            {statisticsQuery.data.res.todaysBookings}
          </span>
        </p>
        <p className="text-xl">
          Today's revenues:{" "}
          <span className="text-mainBlue">
            {statisticsQuery.data.res.todaysRevenues}$
          </span>
        </p>

        <p className="text-xl">
          This month bookings:{" "}
          <span className="text-mainBlue">
            {statisticsQuery.data.res.thisMonthBookings}
          </span>
        </p>

        <p className="text-xl">
          This month revenues:{" "}
          <span className="text-mainBlue">
            {statisticsQuery.data.res.thisMonthRevenues}$
          </span>
        </p>

        <p className="text-xl">
          This year bookings:{" "}
          <span className="text-mainBlue">
            {statisticsQuery.data.res.thisYearBookings}
          </span>
        </p>

        <p className="text-xl">
          This year revenues:{" "}
          <span className="text-mainBlue">
            {statisticsQuery.data.res.thisYearRevenues}$
          </span>
        </p>
      </div>
    </>
  );
}

export default Statistics;

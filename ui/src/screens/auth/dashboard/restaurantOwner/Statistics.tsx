const statistics = {
  todaysBooking: 10,
  todaysRevenues: 1008,
};
function Statistics() {
  return (
    <>
      <h1 className="text-2xl font-bold capitalize">statistics</h1>
      <div className="mt-4 flex flex-col gap-4">
        <p className="text-xl">
          Today's bookings:{" "}
          <span className="text-mainBlue">{statistics.todaysBooking}</span>
        </p>
        <p className="text-xl">
          Today's revenues:{" "}
          <span className="text-mainBlue">{statistics.todaysRevenues}$</span>
        </p>

        <p className="text-xl">
          This month bookings:{" "}
          <span className="text-mainBlue">{statistics.todaysBooking * 30}</span>
        </p>

        <p className="text-xl">
          This month revenues:{" "}
          <span className="text-mainBlue">
            {statistics.todaysRevenues * 30}$
          </span>
        </p>

        <p className="text-xl">
          This year bookings:{" "}
          <span className="text-mainBlue">
            {statistics.todaysBooking * 365}
          </span>
        </p>

        <p className="text-xl">
          This year revenues:{" "}
          <span className="text-mainBlue">
            {statistics.todaysRevenues * 365}$
          </span>
        </p>
      </div>
    </>
  );
}

export default Statistics;

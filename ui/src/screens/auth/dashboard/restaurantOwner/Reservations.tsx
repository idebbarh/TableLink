


const reservations = [
    {
        id: 1,
        name: "John Doe",
        date: "2021-10-10",
        time: "12:00",
        people: 2,
    },
    {
        id: 2,
        name: "Jane Doe",
        date: "2021-10-10",
        time: "12:00",
        people: 2,
    },
    {
        id: 3,
        name: "John Smith",
        date: "2021-10-10",
        time: "12:00",
        people: 2,
    },
    {
        id: 4,
        name: "Jane Smith",
        date: "2021-10-10",
        time: "12:00",
        people: 2,
    },
];
function Reservations() {

  return (
    <div>
            <h1 className="text-2xl font-bold capitalize">Reservations</h1>
            <table className="w-full border border-solid border-black mt-4">
            <thead>
                <tr>
                        <th className="border border-solid border-black p-2">id</th>
                        <th className="border border-solid border-black p-2">name</th>
                        <th className="border border-solid border-black p-2">date</th>
                        <th className="border border-solid border-black p-2">time</th>
                        <th className="border border-solid border-black p-2">people</th>
                </tr>
            </thead>
            <tbody>
                {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                            <td className="border border-solid border-black p-2">{reservation.id}</td>
                            <td className="border border-solid border-black p-2">{reservation.name}</td>
                            <td className="border border-solid border-black p-2">{reservation.date}</td>
                            <td className="border border-solid border-black p-2">{reservation.time}</td>
                            <td className="border border-solid border-black p-2">{reservation.people}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default Reservations;

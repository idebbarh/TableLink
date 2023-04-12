import { removeListener } from "process";
import { useState } from "react";

function Reservations() {
    const [reservations,setReservations] = useState<IReservation[]>(
            [
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
            ])
    const removeReservation = (id:number)=>{
        setReservations(prev=>prev.filter(item=>item.id !== id))
    }
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
            <th className="border border-solid border-black p-2">people</th>
            <th className="border border-solid border-black p-2">actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td className="border border-solid border-black p-2">
                {reservation.id}
              </td>
              <td className="border border-solid border-black p-2">
                {reservation.name}
              </td>
              <td className="border border-solid border-black p-2">
                {reservation.date}
              </td>
              <td className="border border-solid border-black p-2">
                {reservation.time}
              </td>
              <td className="border border-solid border-black p-2">
                {reservation.people}
              </td>
                <td className="border border-solid border-black p-2">
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => removeReservation(reservation.id)}
                    >
                    Remove
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Reservations;

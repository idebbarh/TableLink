import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { restaurants } from "./Explore";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

function RestaurantDetails() {
  const { id } = useParams();
  const restaurant = useMemo(() => {
    return restaurants.find((restaurant) => restaurant.id.toString() === id);
  }, [id]);
  if (!restaurant) {
    return (
      <h1 className="text-[2rem] font-bold capitalize text-black">
        Restaurant not found
      </h1>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[2.4rem] font-bold capitalize text-black">
        {restaurant?.name}
      </h1>
      <div className="flex items-center">
        {new Array(5).fill(0).map((_, i) => (
          <span className="text-mainBlue" key={i}>
            {i + 1 <= Math.trunc(restaurant?.rating) ? (
              <StarIcon />
            ) : restaurant?.rating % 1 === 0 ? (
              <StarOutlineIcon />
            ) : i < restaurant?.rating ? (
              <StarHalfIcon />
            ) : (
              <StarOutlineIcon />
            )}
          </span>
        ))}
        <span className="text-sm text-dark ml-2">
          {restaurant?.numberOfReviews} reviews
        </span>
      </div>
      <span className="text-sm text-gray-500">{restaurant?.location}</span>
      <span className="text-lg text-dark">
        {restaurant?.todaysBookings} bookings today
      </span>
      <div className="flex flex-col gap-2">
        <h2 className="text-[1.6rem] font-bold capitalize text-black">About</h2>
        <span className="text-sm text-gray-500">{restaurant?.about}</span>
      </div>
      <h2 className="text-[1.6rem] font-bold capitalize text-black">Menu</h2>
      <div className="flex gap-4 overflow-hidden">
        {restaurant?.restaurantMenu.map((item) => (
          <div
            className="flex flex-col gap-2 items-center bg-white rounded-3xl p-4 border border-solid border-gray-200 min-w-[300px]"
            key={item.id}
          >
            <h4 className="text-lg font-bold text-dark">{item.name}</h4>
            <span className="text-sm text-gray-500">{item.description}</span>
            <ul className="flex flex-wrap gap-2">
              {item.ingredients.map((ingredient) => (
                <li className="text-sm text-gray-500" key={ingredient.id}>
                  {ingredient.name}
                </li>
              ))}
            </ul>
            <span className="text-2xl text-dark font-bold">{item.price}$</span>
          </div>
        ))}
      </div>
      {/* book a table */}
      <h2 className="text-[1.6rem] font-bold capitalize text-black">
        Book a table
      </h2>
      <form className="border border-solid border-gray-200 p-6 rounded-3xl flex gap-4 shadow-formShadow items-center w-fit">
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="text-sm text-gray-500">
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="border border-solid border-gray-200 rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="time" className="text-sm text-gray-500">
            Time
          </label>
          <input
            type="time"
            name="time"
            id="time"
            className="border border-solid border-gray-200 rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="guests" className="text-sm text-gray-500">
            Guests
          </label>
          <input
            type="number"
            name="guests"
            id="guests"
            className="border border-solid border-gray-200 rounded-lg p-2"
          />
        </div>
        <button className="block w-fit text-white font-semibold text-lg bg-mainBlue px-8 py-4 rounded-3xl self-end capitalize">
          check availability
        </button>
      </form>
    </div>
  );
}

export default RestaurantDetails;

import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { restaurants } from "./Explore";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useForm } from "react-hook-form";

interface BookingsFormData {
    name:string;
  date: string;
  time: string;
  guests: string;
}

const user = null;

function RestaurantDetails() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookingsFormData>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = useMemo(() => {
    return restaurants.find((restaurant) => restaurant.id.toString() === id);
  }, [id]);

  const bokingHanlder = (data: BookingsFormData) => {
    if (!user) {
            setValue("name","");
      setValue("date", "");
      setValue("time", "");
      setValue("guests", "");
      setSuccessMessage("Booking successful");
    } else {
      navigate("/signin");
    }
  };

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
      <div className="grid grid-cols-auto-fit gap-4">
        {restaurant?.restaurantMenu.map((item) => (
          <div
            className="flex flex-col gap-2 items-center bg-white rounded-3xl p-4 border border-solid border-gray-200 shadow-lg"
            key={item.id}
          >
            <h4 className="text-lg font-bold text-dark">{item.name}</h4>
            <span className="text-sm text-gray-500">{item.description}</span>
            <ul className="flex flex-wrap gap-2 justify-center items-center">
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
      <h2 className="text-[1.6rem] font-bold capitalize text-black">
        Book a table
      </h2>
      <form
        className="border border-solid border-gray-200 p-6 rounded-3xl flex flex-col max-w-[600px] gap-4 shadow-formShadow items-start"
        onSubmit={handleSubmit(bokingHanlder)}
      >

        <div className="flex flex-col gap-2 w-full">

            <label htmlFor="name" className="text-sm text-gray-500">
                Name
            </label>
            <input
                {...register("name", { required: "Please entre a name" })}
                type="text"
                name="name"
                id="name"
                className="border border-solid border-gray-200 rounded-lg p-2"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="date" className="text-sm text-gray-500">
            Date
          </label>
          <input
            {...register("date", { required: "Please entre a date" })}
            type="date"
            name="date"
            id="date"
            className="border border-solid border-gray-200 rounded-lg p-2"
          />
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="time" className="text-sm text-gray-500">
            Time
          </label>
          <input
            {...register("time", { required: "Please entre a time" })}
            type="time"
            name="time"
            id="time"
            className="border border-solid border-gray-200 rounded-lg p-2"
          />
          {errors.time && <p className="text-red-500">{errors.time.message}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="guests" className="text-sm text-gray-500">
            Guests
          </label>
          <input
            {...register("guests", {
              min: 1,
              max: 8,
              required: "Please entre a number between 1 and 8",
            })}
            type="number"
            name="guests"
            id="guests"
            className="border border-solid border-gray-200 rounded-lg p-2"
          />
          {errors.guests && (
            <p className="text-red-500">
              Please entre a number between 1 and 8
            </p>
          )}
        </div>
        <button className="block w-fit text-white font-semibold text-lg bg-mainBlue px-8 py-4 rounded-3xl capitalize self-center">
          check availability
        </button>
      </form>

      {successMessage && (
        <p className="text-green-500 text-lg font-semibold">{successMessage}</p>
      )}
    </div>
  );
}

export default RestaurantDetails;

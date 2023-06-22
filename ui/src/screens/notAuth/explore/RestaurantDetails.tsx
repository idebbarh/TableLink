import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import RestaurantApi from "../../../api/restaurant";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/userSlice";
import ClientApi from "../../../api/client";
import PlateApi from "../../../api/plate";
import ReviewModel from "./ReviewModel";

interface BookingsFormData {
  date: string;
  time: string;
  guests: string;
}

function RestaurantDetails() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookingsFormData>();

  const user = useSelector(selectUser);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModelReviewModelOpen, setIsReviewModelOpen] =
    useState<boolean>(false);

  const restaurantQuery = useQuery<{ res: Restaurant | null }>({
    queryKey: ["api", "restaurants", id],
    queryFn: () => (id ? RestaurantApi.getRestaurant(id) : { res: null }),
  });

  const menuQuery = useQuery<{ res: Plate[] }>({
    queryKey: ["api", "plates", id],
    queryFn: () => (id ? PlateApi.getRestaurantMenu(id) : { res: [] }),
    onSuccess: (data) => {
      console.log(data.res);
    },
  });

  const availabilityMutate = useMutation<
    {
      res: {
        is_available: 0 | 1;
      };
    },
    MyKnownError,
    { date: string; token: string }
  >({
    mutationKey: ["api", "client", "reservation", "availability", id],
    mutationFn: (data) =>
      ClientApi.checkAvailability(id as string | number, data.date, data.token),
    onSuccess: (data) => {
      if (data.res.is_available === 1) {
        setSuccessMessage("you can book a table in this date");
      } else {
        setErrorMessage("sorry our restaurant is full in this date");
      }
    },
    onError: (err) => {
      setErrorMessage(err.errorMessage);
    },
  });

  const reservationMutate = useMutation<
    { res: Reservation },
    MyKnownError,
    { dataForm: BookingsFormData; token: string }
  >({
    mutationKey: ["api", "client", "reservation", id],
    mutationFn: (data) =>
      ClientApi.makeReservation(
        id as string | number,
        { ...data.dataForm, guests: parseInt(data.dataForm.guests) },
        data.token
      ),
    onSuccess: (data) => {
      setValue("date", "");
      setValue("time", "");
      setValue("guests", "");
      setSuccessMessage(`thank you ${user.user?.name} for choosing us`);
      availabilityMutate.reset();
      queryClient.invalidateQueries(["api", "restaurants", id]);
      console.log(data);
    },
    onError: (err) => {
      setErrorMessage(err.errorMessage);
    },
  });

  const checkAvailabilityHandler = (data: BookingsFormData) => {
    if (user.user && user.token) {
      if (user.user.lives_in === "clients") {
        setErrorMessage(null);
        availabilityMutate.mutate({ date: data.date, token: user.token });
        return;
      }
      setErrorMessage("please signin as a client to make a reservation");
      setSuccessMessage(null);
      return;
    }
    setErrorMessage("please signin/register to make a reservation");
  };

  const reservationHandler = (data: BookingsFormData) => {
    if (user.user && user.token) {
      setErrorMessage(null);
      setSuccessMessage(null);
      reservationMutate.mutate({ dataForm: data, token: user.token });
    }
  };

  if (restaurantQuery.isLoading) {
    return (
      <div>
        <p className="text-blue-500">loading...</p>
      </div>
    );
  }

  if (restaurantQuery.isError || !restaurantQuery.data) {
    return (
      <h1 className="text-[2rem] font-bold capitalize text-black">
        Something bad happend try again
      </h1>
    );
  }

  if (
    restaurantQuery.data.res === null ||
    !Object.entries(restaurantQuery.data.res).every(
      ([_, value]) => value !== null
    )
  ) {
    return (
      <h1 className="text-[2rem] font-bold capitalize text-black">
        restaurant not found
      </h1>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {isModelReviewModelOpen ? (
        user.user && user.token ? (
          <ReviewModel
            closeModel={() => setIsReviewModelOpen(false)}
            restaurantName={restaurantQuery.data.res.name}
            userName={user.user.name}
            token={user.token}
          />
        ) : (
          <Navigate to={"/signin"} />
        )
      ) : undefined}

      <div className="flex items-center justify-between gap-2">
        <h1 className="text-[2.4rem] font-bold capitalize text-black">
          {restaurantQuery.data.res.name}
        </h1>
        <button
          className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 text-sm rounded-3xl py-1 px-4 capitalize hover:bg-gray-100 transition duration-150 ease-in-out"
          onClick={() => setIsReviewModelOpen(true)}
        >
          <RateReviewIcon />
          <span>review now</span>
        </button>
      </div>
      <div className="flex items-center">
        {new Array(5).fill(0).map((_, i) => (
          <span className="text-mainBlue" key={i}>
            {i + 1 <=
            parseFloat((restaurantQuery.data.res as Restaurant).rating) ? (
              <StarIcon />
            ) : i + 1 <=
              Math.ceil(
                parseFloat((restaurantQuery.data.res as Restaurant).rating)
              ) ? (
              <StarHalfIcon />
            ) : (
              <StarOutlineIcon />
            )}
          </span>
        ))}
        <span className="text-sm text-dark ml-2">
          {restaurantQuery.data.res.numberOfReviews} reviews
        </span>
      </div>
      <span className="text-lg text-dark">
        {restaurantQuery.data.res.todaysBookings} bookings today
      </span>
      <div className="flex flex-col gap-2">
        <h2 className="text-[1.6rem] font-bold capitalize text-black">About</h2>
        <span className="text-sm text-gray-500">
          {restaurantQuery.data.res.description}
        </span>
      </div>
      <h2 className="text-[1.6rem] font-bold capitalize text-black">Menu</h2>
      <div className="grid grid-cols-auto-fit gap-4">
        {menuQuery.data && menuQuery.data.res.length ? (
          menuQuery.data.res.map((item) => (
            <div
              className="flex flex-col gap-2 items-center bg-white rounded-3xl p-4 border border-solid border-gray-200 shadow-lg"
              key={item.id}
            >
              <h4 className="text-lg font-bold text-dark">{item.name}</h4>
              <span className="text-sm text-gray-500">{item.description}</span>
              <ul className="flex flex-wrap gap-2 justify-center items-center">
                {item.ingredients.split(",").map((ingredient, index) => (
                  <li className="text-sm text-gray-500" key={index}>
                    {ingredient}
                  </li>
                ))}
              </ul>
              <span className="text-2xl text-dark font-bold">
                {item.price}$
              </span>
            </div>
          ))
        ) : (
          <p>our menu is steal empty</p>
        )}
      </div>
      <h2 className="text-[1.6rem] font-bold capitalize text-black">
        Book a table
      </h2>
      <form
        className="border border-solid border-gray-200 p-6 rounded-3xl flex flex-col max-w-[600px] gap-4 shadow-formShadow items-start"
        onSubmit={handleSubmit(
          availabilityMutate.data &&
            availabilityMutate.data.res.is_available === 1
            ? reservationHandler
            : checkAvailabilityHandler
        )}
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="date" className="text-sm text-gray-500">
            Date
          </label>
          <input
            {...register("date", {
              required: "Please entre a date",
              onChange: () => {
                setErrorMessage(null);
                setSuccessMessage(null);
                availabilityMutate.reset();
              },
            })}
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
            {...register("time", {
              required: "Please entre a time",
              onChange: () => {
                setErrorMessage(null);
                setSuccessMessage(null);
                availabilityMutate.reset();
              },
            })}
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
              onChange: () => {
                setErrorMessage(null);
                setSuccessMessage(null);
                availabilityMutate.reset();
              },
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
          {availabilityMutate.data &&
          availabilityMutate.data.res.is_available === 1
            ? "make reservation"
            : "check availability"}
        </button>
      </form>

      {successMessage ? (
        <p className="text-green-500 text-lg font-semibold">{successMessage}</p>
      ) : errorMessage ? (
        <p className="text-red-500 text-lg font-semibold">{errorMessage}</p>
      ) : null}
    </div>
  );
}

export default RestaurantDetails;

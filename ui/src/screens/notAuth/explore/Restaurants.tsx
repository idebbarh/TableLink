import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Link } from "react-router-dom";
import { restaurants } from "./Explore";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import RestaurantApi from "../../../api/restaurant";

function Restaurants() {
  const restaurantsQuery = useQuery<{ res: Restaurant[] }>({
    queryKey: ["api", "restaurants"],
    queryFn: () => RestaurantApi.getAllRestaurants(),
    onSuccess(data) {
      console.log(data);
    },
  });
  const cards = useMemo(
    () =>
      restaurantsQuery.data &&
      !restaurantsQuery.isError &&
      !restaurantsQuery.isLoading &&
      restaurantsQuery.data.res
        .filter((restaurant) =>
          Object.entries(restaurant).every(([_, value]) => value !== null)
        )
        .map((restaurant) => {
          return (
            <Link
              to={`${restaurant.id}`}
              key={restaurant.id}
              className="flex flex-col gap-2 bg-white rounded-lg shadow-lg p-4 border border-solid border-gray-200"
            >
              <h4 className="text-lg font-bold text-dark">{restaurant.name}</h4>
              <div className="flex items-center">
                {/* {new Array(5).fill(0).map((_, i) => ( */}
                {/*   <span className="text-mainBlue" key={i}> */}
                {/*     {i + 1 <= Math.trunc(restaurant.rating) ? ( */}
                {/*       <StarIcon /> */}
                {/*     ) : restaurant.rating % 1 === 0 ? ( */}
                {/*       <StarOutlineIcon /> */}
                {/*     ) : i < restaurant.rating ? ( */}
                {/*       <StarHalfIcon /> */}
                {/*     ) : ( */}
                {/*       <StarOutlineIcon /> */}
                {/*     )} */}
                {/*   </span> */}
                {/* ))} */}
                {/* <span className="text-sm text-dark ml-2"> */}
                {/*   {restaurant.numberOfReviews} reviews */}
                {/* </span> */}
              </div>
              {/* <span className="text-lg text-dark"> */}
              {/*   {restaurant.todaysBookings} bookings today */}
              {/* </span> */}
            </Link>
          );
        }),
    [restaurantsQuery]
  );

  if (restaurantsQuery.isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <h1 className="text-[2rem] font-bold capitalize text-black">
        available restaurants
      </h1>
      <div className="grid grid-cols-auto-fit gap-4 mt-6">{cards}</div>
    </>
  );
}

export default Restaurants;

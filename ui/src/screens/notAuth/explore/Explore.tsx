import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
const restaurants = [
  {
    id: 1,
    name: "Burger King",
    location: "Koramangala",
    rating: 4.5,
    numberOfReviews: 10,
    todaysBookings: 10,
  },
  {
    id: 2,
    name: "Dominos",
    location: "Koramangala",
    rating: 3.5,
    numberOfReviews: 10,
    todaysBookings: 10,
  },
  {
    id: 3,
    name: "Pizza Hut",
    location: "Koramangala",
    rating: 5,
    numberOfReviews: 10,
    todaysBookings: 10,
  },
  {
    id: 4,
    name: "Burger King",
    location: "Koramangala",
    rating: 4,
    numberOfReviews: 10,
    todaysBookings: 10,
  },
];
const cards = restaurants.map((restaurant) => {
  return (
    <div
      key={restaurant.id}
      className="felx flex-col gap-2 bg-white rounded-lg shadow-lg p-4 border border-solid border-gray-200"
    >
      <h4>{restaurant.name}</h4>
      <div className="flex items-center">
        {new Array(5).fill(0).map((_, i) => (
          <span>
            {i + 1 <= Math.trunc(restaurant.rating) ? (
              <StarIcon />
            ) : restaurant.rating % 1 === 0 ? (
              <StarOutlineIcon />
            ) : i < restaurant.rating ? (
              <StarHalfIcon />
            ) : (
              <StarOutlineIcon />
            )}
          </span>
        ))}
        <span className="text-sm text-gray-500 ml-2">
          {restaurant.numberOfReviews} reviews
        </span>
      </div>
    </div>
  );
});
function Explore() {
  return (
    <div className="px-20 py-10">
      <h1 className="text-[2rem] font-bold capitalize text-black">
        available restaurants
      </h1>
      <div className="grid grid-cols-auto-fit gap-4 mt-6">{cards}</div>
    </div>
  );
}

export default Explore;

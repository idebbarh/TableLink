import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import OwnerApi from "../../../api/owner";

interface Token {
  token: string;
}
function Settings({ token }: Token) {
  return (
    <>
      <h1 className="text-2xl font-bold capitalize">update informations</h1>
      <OwnerSettingsForm token={token} />
    </>
  );
}

/* id: number; */
/* description: string | null; */
/* name: string | null; */
/* owner_id: number; */
/* tables_number: number | null; */
/* tele: string | null; */
/* todaysBookings: number; */
/* rating: string; */
/* numberOfReviews: number; */
/* updatedAt: string; */
/* createdAt: string; */

type OwnerSettingsFormValues = Pick<
  Restaurant,
  "description" | "name" | "tables_number" | "tele"
>;
function OwnerSettingsForm({ token }: Token) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OwnerSettingsFormValues>();
  const queryClient = useQueryClient();

  const restaurantQuery = useQuery<
    {
      res: Omit<Restaurant, "todaysBookings" | "rating" | "numberOfReviews">;
    },
    MyKnownError
  >({
    queryKey: ["api", "owner", "restaurant"],
    queryFn: () => OwnerApi.getOwnerRestaurant(token),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err.errorMessage);
    },
  });

  const restaurantMutation = useMutation<
    {
      res: Omit<Restaurant, "todaysBookings" | "rating" | "numberOfReviews">;
    },
    MyKnownError,
    { id: number | string; formData: OwnerSettingsFormValues }
  >({
    mutationKey: ["api", "owner", "restaurant", restaurantQuery.data?.res.id],
    mutationFn: (data) =>
      OwnerApi.updateRestaurant(data.id, token, data.formData),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["api", "owner", "restaurant"]);
    },
    onError: (err) => {
      console.log(err.errorMessage);
    },
  });

  useEffect(() => {
    if (!restaurantQuery.data) {
      return;
    }
    setValue("name", restaurantQuery.data.res.name);
    setValue("tables_number", restaurantQuery.data.res.tables_number);
    setValue("tele", restaurantQuery.data.res.tele);
    setValue("description", restaurantQuery.data.res.description);
  }, [restaurantQuery.data]);

  if (restaurantQuery.isLoading) {
    return <p>Loading...</p>;
  }
  if (restaurantQuery.isError) {
    return <p className="text-red-500">{restaurantQuery.error.errorMessage}</p>;
  }

  if (!restaurantQuery.data) {
    return <p className="text-red-500">No restaurant data found</p>;
  }

  const saveHandler = (data: OwnerSettingsFormValues, id: number | string) => {
    restaurantMutation.mutate({ id, formData: data });
  };

  return (
    <>
      <form
        className="w-full mt-6 border border-solid border-gray-200 p-6 mx-auto flex flex-col gap-4"
        onSubmit={handleSubmit((data) =>
          saveHandler(data, restaurantQuery.data.res.id)
        )}
      >
        <div className="flex flex-col gap-4">
          <label htmlFor="name">name</label>
          <input
            {...register("name", { required: "Please enter a name" })}
            placeholder="Enter your restaurant name"
            type="text"
            name="name"
            id="name"
            className="outline-none border border-solid border-gray-200 rounded-3xl py-3 px-4 focus:border-mainBlue"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="tables_number" className="text-sm text-gray-500">
            tables
          </label>
          <input
            {...register("tables_number", {
              min: 1,
              required: "Please entre your restaurant tables number",
            })}
            type="number"
            name="tables_number"
            id="tables_number"
            className="outline-none border border-solid border-gray-200 rounded-3xl py-3 px-4 focus:border-mainBlue"
          />
          {errors.tables_number && (
            <p className="text-red-500">Please entre a number start from 1</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="tele">tele</label>
          <input
            {...register("tele", {
              required: "Please enter your restaurant phone number",
            })}
            placeholder="Enter your restaurant phone number"
            type="tel"
            name="tele"
            id="tele"
            className="outline-none border border-solid border-gray-200 rounded-3xl py-3 px-4 focus:border-mainBlue"
          />
          {errors.tele && <p className="text-red-500">{errors.tele.message}</p>}
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="description">description</label>
          <textarea
            {...register("description", {
              required: "Please enter your restaurant description",
            })}
            placeholder="Enter your restaurant description"
            name="description"
            id="description"
            className="outline-none border border-solid border-gray-200 rounded-3xl py-3 px-4 focus:border-mainBlue"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="capitalize w-fit text-white font-semibold text-lg bg-mainBlue px-8 py-4 rounded-3xl mx-auto"
        >
          save
        </button>
      </form>
      {Object.entries(restaurantQuery.data.res).some(
        ([_, value]) => value === null
      ) && (
        <p className="text-red-500 mt-4">
          you didn't add your restaurant informations, please fill all this
          fields to make your restaurant appear in our explore page
        </p>
      )}
    </>
  );
}
export default Settings;

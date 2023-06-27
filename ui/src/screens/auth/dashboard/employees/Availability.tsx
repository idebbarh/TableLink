import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ChefApi from "../../../../api/chef";
import WaiterApi from "../../../../api/waiter";
import ToggleSwitch from "../../../../components/auth/ToggleSwitch";
import { selectUser } from "../../../../redux/slices/userSlice";
import { useAppSelector } from "../../../../redux/store/hooks";

function Availability() {
  const user = useAppSelector(selectUser);
  if (!user.user || !user.token) {
    return <div>user not found</div>;
  }
  return (
    <>
      {user.user.lives_in === "waiters" ? (
        <WaiterAvailability token={user.token} />
      ) : (
        <ChefAvailability token={user.token} />
      )}
    </>
  );
}

function WaiterAvailability({ token }: { token: string }) {
  const queryClient = useQueryClient();

  const availabilityQuery = useQuery<{ res: Availability }, MyKnownError>({
    queryKey: ["api", "waiter", "availability"],
    queryFn: () => WaiterApi.getAvailability(token),
    onSuccess: (data) => console.log(data),
    onError: (err) => console.log(err),
  });

  const availabilityMutation = useMutation<
    { res: Availability },
    MyKnownError,
    string
  >({
    mutationKey: ["api", "waiter", "availability"],
    mutationFn: (token) => WaiterApi.toggleAvailability(token),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["api", "waiter", "availability"]);
    },
    onError: (err) => console.log(err),
  });

  const toggle = () => {
    availabilityMutation.mutate(token);
  };

  if (availabilityQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (availabilityQuery.isError) {
    return <div>{availabilityQuery.error.errorMessage}</div>;
  }

  if (!availabilityQuery.data) {
    return <div>Something wrong happend</div>;
  }
  return (
    <>
      <ToggleSwitch
        isOn={availabilityQuery.data.res.is_available === 1 ? true : false}
        toggle={() => toggle()}
      />
    </>
  );
}
function ChefAvailability({ token }: { token: string }) {
  const queryClient = useQueryClient();

  const availabilityQuery = useQuery<{ res: Availability }, MyKnownError>({
    queryKey: ["api", "chef", "availability"],
    queryFn: () => ChefApi.getAvailability(token),
    onSuccess: (data) => console.log(data),
    onError: (err) => console.log(err),
  });

  const availabilityMutation = useMutation<
    { res: Availability },
    MyKnownError,
    string
  >({
    mutationKey: ["api", "chef", "availability"],
    mutationFn: (token) => ChefApi.toggleAvailability(token),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["api", "chef", "availability"]);
    },
    onError: (err) => console.log(err),
  });

  const toggle = () => {
    availabilityMutation.mutate(token);
  };

  if (availabilityQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (availabilityQuery.isError) {
    return <div>{availabilityQuery.error.errorMessage}</div>;
  }

  if (!availabilityQuery.data) {
    return <div>Something wrong happend</div>;
  }
  return (
    <>
      <ToggleSwitch
        isOn={availabilityQuery.data.res.is_available === 1 ? true : false}
        toggle={() => toggle()}
      />
    </>
  );
}

export default Availability;

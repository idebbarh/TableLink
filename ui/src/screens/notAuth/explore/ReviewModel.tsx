import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ClientApi from "../../../api/client";

type ReviewModel = {
  closeModel: () => void;
  restaurantName: string | null;
  userName: string;
  token: string;
};

function ReviewModel({
  closeModel,
  restaurantName,
  userName,
  token,
}: ReviewModel) {
  const [currentRate, setCurrentRate] = useState<{
    rate: number;
    isRated: boolean;
  } | null>(null);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const rateQuery = useQuery<{ res: Review | null }, MyKnownError>({
    queryKey: ["api", "client", "review", id],
    queryFn: () => ClientApi.getRate(id as string, token),
    onSuccess: (data) => {
      setCurrentRate(() => ({
        isRated: false,
        rate: data.res ? data.res.rating : 0,
      }));
    },
    onError: (err) => {
      console.log(err.errorMessage);
    },
  });

  const rateMutate = useMutation<
    { res: Review },
    MyKnownError,
    { rating: number }
  >({
    mutationKey: ["api", "client", "review", id],
    mutationFn: (data) =>
      ClientApi.makeReview(id as string, data.rating, token),
    onSuccess: (data) => {
      console.log(data.res);
      queryClient.invalidateQueries(["api", "restaurants", id]);
    },
    onError: (err) => {
      console.log(err.errorMessage);
    },
  });

  const rate = () => {
    if (currentRate === null || currentRate.isRated === false) {
      return;
    }
    rateMutate.mutate({ rating: currentRate.rate });
    closeModel();
  };
  return (
    <div className="fixed left-0 top-0 w-screen h-screen z-50 bg-blackOverlay">
      <div className="absolute left-1/2 top-1/2 max-w-[500px] w-[500px] bg-white rounded-md transform -translate-x-1/2 -translate-y-1/2 shadow-reviewModelShadow">
        <div className="p-4 border-b border-gray-300">
          <h3 className="capitalize">make review</h3>
          <h4 className="capitalize text-xs mt-2">{restaurantName}</h4>
        </div>
        <div className="p-4">
          <h3 className="capitalize text-sm font-bold">{userName}</h3>
          <div className="flex items-center gap-4 mt-4">
            {rateQuery.isLoading ? (
              <span>Loading...</span>
            ) : !rateQuery.isError && currentRate && rateQuery.data ? (
              new Array(5).fill(0).map((_, index) => {
                return (
                  <div
                    className="cursor-pointer text-mainBlue"
                    key={index}
                    onClick={() =>
                      setCurrentRate(() => ({
                        rate: index + 1,
                        isRated:
                          rateQuery.data.res === null ||
                          rateQuery.data.res.rating !== index + 1,
                      }))
                    }
                  >
                    {currentRate.rate < index + 1 ? (
                      <StarOutlineIcon />
                    ) : (
                      <StarIcon />
                    )}
                  </div>
                );
              })
            ) : (
              <span>
                {rateQuery.error
                  ? rateQuery.error.errorMessage
                  : "something bad happend"}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end p-4 gap-4">
          <button
            className="text-mainBlue capitalize"
            onClick={() => closeModel()}
          >
            cancel
          </button>
          <button
            className={`text-white capitalize px-6 py-2 bg-mainBlue rounded-sm ${
              currentRate === null || currentRate.isRated === false
                ? "pointer-events-none opacity-70"
                : "pointer-events-auto opacity-100"
            } hover:opacity-90`}
            onClick={rate}
            disabled={currentRate === null || currentRate.isRated === false}
          >
            post
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModel;

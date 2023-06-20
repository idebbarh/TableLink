import { useForm } from "react-hook-form";
import { login, selectUser } from "../../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
type SigninFormData = {
  email: string;
  password: string;
};

function Signin() {
  return (
    <div className="px-20 py-10">
      <div className="max-w-[600px] mx-auto">
        <h1 className="mt-10 text-[2rem] font-bold capitalize text-black">
          sign in
        </h1>
        <SigninForm />
      </div>
    </div>
  );
}

function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const signinHandler = (data: SigninFormData) => {
    dispatch(login(data));
  };

  return (
    <form
      className="max-full mt-6 border border-solid border-gray-200 p-6 rounded-3xl mx-auto flex flex-col gap-4 shadow-formShadow"
      onSubmit={handleSubmit(signinHandler)}
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="email">Email</label>
        <input
          {...register("email", { required: "Please enter a Email" })}
          placeholder="Enter your Email"
          type="text"
          name="email"
          id="email"
          className="outline-none border border-solid border-gray-200 rounded-3xl py-3 px-4 focus:border-mainBlue"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="password">Password</label>
        <input
          {...register("password", {
            minLength: 8,
            required: "Please enter a password",
          })}
          placeholder="Enter your password"
          type="password"
          name="password"
          id="password"
          className="outline-none border border-solid border-gray-200 rounded-3xl py-3 px-4 focus:border-mainBlue"
        />
        {errors.password && (
          <p className="text-red-500">
            {errors.password.message?.length
              ? errors.password.message
              : "Password must be at least 8 characters"}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="capitalize w-fit text-white font-semibold text-lg bg-mainBlue px-8 py-4 rounded-3xl mx-auto"
        disabled={user.status === "loading"}
      >
        sign in
      </button>
    </form>
  );
}
export default Signin;

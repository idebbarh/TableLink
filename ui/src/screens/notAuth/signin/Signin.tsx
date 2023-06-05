import { useForm } from "react-hook-form";
type SigninFormData = {
  username: string;
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

  const signinHandler = (data: SigninFormData) => {
    console.log(data);
  };

  return (
    <form
      className="max-full mt-6 border border-solid border-gray-200 p-6 rounded-3xl mx-auto flex flex-col gap-4 shadow-formShadow"
      onSubmit={handleSubmit(signinHandler)}
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="username">Username</label>
        <input
          {...register("username", { required: "Please enter a username" })}
          placeholder="Enter your username"
          type="text"
          name="username"
          id="username"
          className="outline-none border border-solid border-gray-200 rounded-3xl py-3 px-4 focus:border-mainBlue"
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
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
      >
        sign in
      </button>
    </form>
  );
}
export default Signin;

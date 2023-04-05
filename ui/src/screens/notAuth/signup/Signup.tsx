import { useState } from "react";
import { useForm } from "react-hook-form";
import UserTypeSwitcher from "../../../components/notAuth/UserTypeSwitcher";

type CustomerSignupFormDataType = {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

type RestaurantSignupFormDataType = {
restaurantName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

function Signup() {
  const [currentUser, setCurrentUser] = useState<1 | 0>(0);
  return (
    <div className="px-20 py-10">
      <div className="w-fit mx-auto">
        <UserTypeSwitcher
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        <h1 className="mt-10 text-[2rem] font-bold capitalize text-black">
          signup
        </h1>
        {currentUser === 0 ? <CustomerSignupForm /> : <RestaurantSignupForm />}
      </div>
    </div>
  );
}
function CustomerSignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CustomerSignupFormDataType>();

  const signupHandler = (data: CustomerSignupFormDataType) => {
    console.log(data);
  };
  return (
    <form
      className="mt-6 border border-solid border-gray-200 p-6 rounded-3xl max-w-[600px] mx-auto flex flex-col gap-4 shadow-formShadow"
      onSubmit={handleSubmit(signupHandler)}
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="name">Full Name</label>
        <input
          {...register("name", { required: "Please enter a name" })}
                    placeholder="Enter your name"
          type="text"
          name="name"
          id="name"
          className="outline-none border border-solid border-gray-200 rounded-3xl py-3 px-4 focus:border-mainBlue"
        />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="email">Email</label>
        <input
          {...register("email", { required: "Please enter an email" })}
                    placeholder="Enter your email"
          type="email"
          name="email"
          id="email"
          className="outline-none border border-solid border-gray-200 rounded-3xl py-3 px-4 focus:border-mainBlue"
        />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

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
                {errors.username && <p className="text-red-500">{errors.username.message}</p>}
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="password">Password</label>
        <input
          {...register("password", {minLength:8, required: "Please enter a password"})}
                    placeholder="Enter your password"
          type="password"
          name="password"
          id="password"
          className="outline-none border border-solid border-gray-200 rounded-3xl py-3 px-4 focus:border-mainBlue"
        />
        {errors.password && <p className="text-red-500">{errors.password.message?.length ? errors.password.message : "Password must be at least 8 characters"}</p>}
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          {...register("confirmPassword", {
            required: "Please confirm your password",
          })}
                    placeholder="Confirm your password"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="outline-none border border-solid border-gray-200 rounded-3xl py-3 px-4 focus:border-mainBlue"
        />
                {(errors.confirmPassword || watch("confirmPassword") !== watch("password"))
                    && <p className="text-red-500">{errors.confirmPassword?.message?.length ? errors.confirmPassword.message :"Passwords do not match"}</p>}

      </div>
      <button
        type="submit"
        className="capitalize w-fit text-white font-semibold text-lg bg-mainBlue px-8 py-4 rounded-3xl mx-auto"
      >
        sign up
      </button>
    </form>
  );
}
function RestaurantSignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    } = useForm<RestaurantSignupFormDataType>();

  const signupHandler = (data:RestaurantSignupFormDataType) => {
    console.log(data);
  };
  return (
        <form className="mt-6 border border-solid border-gray-200 p-6 rounded-3xl max-w-[600px] mx-auto flex flex-col gap-4 shadow-formShadow"
        onSubmit={handleSubmit(signupHandler)}
        >
      <div className="flex flex-col gap-4">
        <label htmlFor="restaurantName">Restaurant Name</label>
        <input
                    {...register("restaurantName", { required: "Please enter a restaurant name" })}
                    placeholder="Enter your restaurant name"
          type="text"
          name="restaurantName"
          id="restaurantName"
          className="outline-none border border-solid border-gray-200 rounded-3xl py-3 px-4 focus:border-mainBlue"
        />
                {errors.restaurantName && <p className="text-red-500">{errors.restaurantName.message}</p>}
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="email">Email</label>
        <input
                    {...register("email", { required: "Please enter an email" })}
                    placeholder="Enter your email"
          type="email"
          name="email"
          id="email"
          className="outline-none border border-solid border-gray-200 rounded-3xl py-3 px-4 focus:border-mainBlue"
        />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
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
                {errors.username && <p className="text-red-500">{errors.username.message}</p>}
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="password">Password</label>
        <input
                    {...register("password", {minLength:8, required: "Please enter a password"})}
                    placeholder="Enter your password"
          type="password"
          name="password"
          id="password"
          className="outline-none border border-solid border-gray-200 rounded-3xl py-3 px-4 focus:border-mainBlue"
        />
                {errors.password && <p className="text-red-500">{errors.password.message?.length ? errors.password.message : "Password must be at least 8 characters"}</p>}
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          {...register("confirmPassword", {
            required: "Please confirm your password",
          })}
                    placeholder="Confirm your password"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="outline-none border border-solid border-gray-200 rounded-3xl py-3 px-4 focus:border-mainBlue"
        />
                {(errors.confirmPassword || watch("confirmPassword") !== watch("password"))
                    && <p className="text-red-500">{errors.confirmPassword?.message?.length ? errors.confirmPassword.message :"Passwords do not match"}</p>}
      </div>
      <button
        type="submit"
        className="capitalize w-fit text-white font-semibold text-lg bg-mainBlue px-8 py-4 rounded-3xl mx-auto"
      >
        sign up
      </button>
    </form>
  );
}

export default Signup;

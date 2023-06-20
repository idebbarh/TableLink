import { useState } from "react";
import { useForm } from "react-hook-form";
import UserTypeSwitcher from "../../../components/notAuth/UserTypeSwitcher";
import { register, selectUser } from "../../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";

function Signup() {
  const [currentUser, setCurrentUser] = useState<1 | 0>(0);
  return (
    <div className="px-20 py-10">
      <div className="mx-auto max-w-[600px]">
        <UserTypeSwitcher
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        <h1 className="mt-10 text-[2rem] font-bold capitalize text-black">
          signup
        </h1>
        <SignupForm currentUser={currentUser} />
      </div>
    </div>
  );
}
function SignupForm({ currentUser }: { currentUser: 1 | 0 }) {
  const {
    register: formRegister,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFromData>();

  const user = useAppSelector(selectUser);
  console.log(user);

  const dispatch = useAppDispatch();

  const signupHandler = (data: SignupFromData) => {
    let newData = {} as SubmitSignupFormData;

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "confirmPassword") {
        newData = { ...newData, [key]: value };
      }
    });

    newData = {
      ...newData,
      lives_in: currentUser === 0 ? "clients" : "owners",
    };
    dispatch(register(newData));
  };
  return (
    <form
      className="w-full mt-6 border border-solid border-gray-200 p-6 rounded-3xl mx-auto flex flex-col gap-4 shadow-formShadow"
      onSubmit={handleSubmit(signupHandler)}
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="name">Full Name</label>
        <input
          {...formRegister("name", { required: "Please enter a name" })}
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
          {...formRegister("email", { required: "Please enter an email" })}
          placeholder="Enter your email"
          type="email"
          name="email"
          id="email"
          className="outline-none border border-solid border-gray-200 rounded-3xl py-3 px-4 focus:border-mainBlue"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="password">Password</label>
        <input
          {...formRegister("password", {
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
      <div className="flex flex-col gap-4">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          {...formRegister("confirmPassword", {
            required: "Please confirm your password",
          })}
          placeholder="Confirm your password"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="outline-none border border-solid border-gray-200 rounded-3xl py-3 px-4 focus:border-mainBlue"
        />
        {(errors.confirmPassword ||
          watch("confirmPassword") !== watch("password")) && (
          <p className="text-red-500">
            {errors.confirmPassword?.message?.length
              ? errors.confirmPassword.message
              : "Passwords do not match"}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="capitalize w-fit text-white font-semibold text-lg bg-mainBlue px-8 py-4 rounded-3xl mx-auto"
        disabled={user.status === "loading"}
      >
        sign up
      </button>
    </form>
  );
}

export default Signup;

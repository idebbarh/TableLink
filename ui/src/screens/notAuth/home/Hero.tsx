import { useState } from "react";
import { Link } from "react-router-dom";
import UserTypeSwitcher from "../../../components/notAuth/UserTypeSwitcher";

const heroData = {
  0: {
    title: "Simplify Your Dining Experience with TableLink",
    shortDescription: "Reserve Tables and Customize Orders with Ease.",
  },
  1: {
    title: "Streamline Your Operations with TableLink",
    shortDescription: "Improve Communication and Serve Customers Efficiently.",
  },
};

function Hero() {
  const [currentUser, setCurrentUser] = useState<1 | 0>(0);

  return (
    <div className="px-20 py-10">
      <UserTypeSwitcher
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <h1 className="mt-10 text-[4rem] font-bold max-w-[600px]">
        {heroData[currentUser].title}
      </h1>
      <p className="text-xl my-10">
        {heroData[currentUser].shortDescription}
      </p>
      {currentUser === 0 ? (
        <Link
          to="/explore"
          className="block w-fit text-white font-semibold text-lg bg-mainBlue px-8 py-4 rounded-3xl"
        >
          Explore now
        </Link>
      ) : (
        <Link
          to="/signup"
          className="block w-fit text-white font-semibold text-lg bg-mainBlue px-8 py-4 rounded-3xl"
        >
          Get started
        </Link>
      )}
    </div>
  );
}

export default Hero;

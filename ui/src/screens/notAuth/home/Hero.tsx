import { useRef, useState } from "react";
import { Link } from "react-router-dom";

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
  const [activeSection, setActiveSection] = useState<1 | 0>(0);
  return (
    <div className="px-20 py-10">
      <div className="p-3 border border-solid border-black relative flex items-center gap-8 w-[500px] mb-10">
        <div
          className="absolute bg-mainBlue h-full z-[-1] left-0 transition-transform duration-300 ease-in-out"
          style={{
            width: "50%",
            transform:
              activeSection === 0 ? "translateX(0)" : `translateX(100%)`,
          }}
        />
        <h3
          className={`flex-1 font-semibold text-lg transition-colors duration-300 ease-in-out w-[calc(50%-32px)] cursor-pointer ${
            activeSection === 0 ? "text-white" : "text-[#343434]"
          }`}
          onClick={() => {
            setActiveSection(0);
          }}
        >
          Customer
        </h3>
        <h3
          className={`flex-1 font-semibold text-lg transition-colors duration-300 ease-in-out w-[calc(50%-32px)] cursor-pointer ${
            activeSection === 1 ? "text-white" : "text-[#343434]"
          }`}
          onClick={() => {
            setActiveSection(1);
          }}
        >
          Restaurant Owners
        </h3>
      </div>
      <h1 className="text-[4rem] font-bold max-w-[600px]">
        {heroData[activeSection].title}
      </h1>
      <p className="text-xl my-10">
        {heroData[activeSection].shortDescription}
      </p>
      {activeSection === 0 ? (
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

type UserTypeSwitcherProps = {
  currentUser: number;
  setCurrentUser: React.Dispatch<React.SetStateAction<1 | 0>>;
};

function UserTypeSwitcher({
  currentUser,
  setCurrentUser,
}: UserTypeSwitcherProps) {
  return (
    <div className="p-3 border border-solid border-black relative flex items-center gap-8 w-[500px]">
      <div
        className="absolute bg-mainBlue h-full z-[-1] left-0 transition-transform duration-300 ease-in-out"
        style={{
          width: "50%",
          transform: currentUser === 0 ? "translateX(0)" : `translateX(100%)`,
        }}
      />
      <h3
        className={`flex-1 font-semibold text-lg transition-colors duration-300 ease-in-out w-[calc(50%-32px)] cursor-pointer ${
          currentUser === 0 ? "text-white" : "text-[#343434]"
        }`}
        onClick={() => {
          setCurrentUser(0);
        }}
      >
        Customer
      </h3>
      <h3
        className={`flex-1 font-semibold text-lg transition-colors duration-300 ease-in-out w-[calc(50%-32px)] cursor-pointer ${
          currentUser === 1 ? "text-white" : "text-[#343434]"
        }`}
        onClick={() => {
          setCurrentUser(1);
        }}
      >
        Restaurant Owner
      </h3>
    </div>
  );
}

export default UserTypeSwitcher;

function ToggleSwitch({ isOn, toggle }: { isOn: boolean; toggle: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`capitalize text-black font-bold cursor-pointer ${
          isOn ? "opacity-60" : "opacity-100"
        }`}
        onClick={() => (isOn ? toggle() : undefined)}
      >
        no available
      </span>
      <div
        className="relative px-0.5 w-28 h-10 rounded-3xl border-2 border-black cursor-pointer"
        onClick={() => toggle()}
      >
        <div
          className="transition-all duration-300 ease-in-out h-8 w-8 bg-black absolute top-1/2 rounded-full"
          style={
            isOn
              ? {
                  transform: "translateX(calc(100% + 40px)) translateY(-50%)",
                }
              : {
                  transform: "translateY(-50%)",
                }
          }
        ></div>
      </div>
      <span
        className={`capitalize text-black font-bold cursor-pointer ${
          isOn ? "opacity-100" : "opacity-60"
        }`}
        onClick={() => (isOn ? undefined : toggle())}
      >
        available
      </span>
    </div>
  );
}

export default ToggleSwitch;

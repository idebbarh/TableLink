import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useWindowWidth from "../../hooks/useWindowWidth";

function Header() {
  const { pathname } = useLocation();
  const windowWidth = useWindowWidth();
  const [
    homeActiveLinkRef,
    exploreActiveLinkRef,
    signinActiveLinkRef,
    signupActiveLinkRef,
  ] = [
    useRef<HTMLLIElement>(null),
    useRef<HTMLLIElement>(null),
    useRef<HTMLLIElement>(null),
    useRef<HTMLLIElement>(null),
  ];

  const [activeLinkInfo, setActiveLinkInfo] = useState<{
    left: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    let info: typeof activeLinkInfo = null;
    switch (pathname) {
      case "/":
        const homeActiveLink = homeActiveLinkRef.current;
        if (homeActiveLink) {
          const left = homeActiveLink.offsetLeft;
          const width = homeActiveLink.offsetWidth;
          info = { left, width };
        }
        break;
      case "/explore":
        const exploreActiveLink = exploreActiveLinkRef.current;
        if (exploreActiveLink) {
          const left = exploreActiveLink.offsetLeft;
          const width = exploreActiveLink.offsetWidth;
          info = { left, width };
        }
        break;
      case "/signin":
        const signinActiveLink = signinActiveLinkRef.current;
        if (signinActiveLink) {
          const left = signinActiveLink.offsetLeft;
          const width = signinActiveLink.offsetWidth;
          info = { left, width };
        }
        break;
      case "/signup":
        const signupActiveLink = signupActiveLinkRef.current;
        if (signupActiveLink) {
          const left = signupActiveLink.offsetLeft;
          const width = signupActiveLink.offsetWidth;
          info = { left, width };
        }
        break;
      default:
        break;
    }
    setActiveLinkInfo(() => info);
  }, [pathname, windowWidth]);

  return (
    <header className="relative h-[80px] px-20 flex items-center justify-between gap-4">
      {activeLinkInfo && (
        <div
          className="h-[3px] bg-mainBlue bottom-0 transition-all duration-300 ease-in-out"
          style={{
            position: "absolute",
            left: activeLinkInfo?.left ?? 0,
            width: activeLinkInfo?.width ?? 0 + "px",
          }}
        />
      )}
      <Link to="/" className="text-3xl font-bold text-[#343434]">
        TableLink
      </Link>
      <nav>
        <ul className="flex items-center gap-8">
          <li ref={homeActiveLinkRef}>
            <Link
              to="/"
              className="text-[#343434] text-lg capitalize font-semibold"
            >
              home
            </Link>
          </li>
          <li ref={exploreActiveLinkRef}>
            <Link
              to="/explore"
              className="text-[#343434] text-lg capitalize font-semibold"
            >
              explore
            </Link>
          </li>

          <li ref={signinActiveLinkRef}>
            <Link
              to="/signin"
              className="text-[#343434] text-lg capitalize font-semibold"
            >
              sign in
            </Link>
          </li>
          <li ref={signupActiveLinkRef}>
            <Link
              to="/signup"
              className="text-[#343434] text-lg capitalize font-semibold"
            >
              sign up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

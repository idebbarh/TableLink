import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { resetError, selectUser } from "./redux/slices/userSlice";
import { useAppDispatch } from "./redux/store/hooks";
import Dashboard from "./screens/auth/dashboard/Dashboard";
import Explore from "./screens/notAuth/explore/Explore";
import Home from "./screens/notAuth/home/Home";
import NotAuth from "./screens/notAuth/NotAuth";
import Signin from "./screens/notAuth/signin/Signin";
import Signup from "./screens/notAuth/signup/Signup";

function App() {
  const user = useSelector(selectUser);
  const path = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetError());
  }, [path.pathname]);

  return (
    <div className="App">
      <Routes>
        <Route element={<NotAuth />}>
          <Route
            path="/"
            element={
              !user.user || user.user.lives_in === "clients" ? (
                <Home />
              ) : (
                <Navigate to="/dashboard" replace={true} />
              )
            }
          />
          <Route
            path="/explore/*"
            element={
              !user.user || user.user.lives_in === "clients" ? (
                <Explore />
              ) : (
                <Navigate to="/dashboard" replace={true} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !user.user ? <Signup /> : <Navigate to={"/"} replace={true} />
            }
          />
          <Route
            path="/signin"
            element={
              !user.user ? <Signin /> : <Navigate to={"/"} replace={true} />
            }
          />
        </Route>
        <Route
          path="/dashboard/*"
          element={
            user.user &&
            (user.user.lives_in === "owners" ||
              user.user.lives_in === "waiters" ||
              user.user.lives_in === "chefs") ? (
              <Dashboard />
            ) : (
              <Navigate to={"/"} replace={true} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;

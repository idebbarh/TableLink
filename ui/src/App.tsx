import { Route, Routes } from "react-router-dom";
import Dashboard from "./screens/auth/Dashboard";
import Explore from "./screens/notAuth/explore/Explore";
import Home from "./screens/notAuth/home/Home";
import NotAuth from "./screens/notAuth/NotAuth";
import Signin from "./screens/notAuth/signin/Signin";
import Signup from "./screens/notAuth/signup/Signup";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<NotAuth/>} >
            <Route path="/" element={<Home />} />
            <Route path="/explore/*" element={<Explore />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
        </Route>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;

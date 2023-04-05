import { Route, Routes } from "react-router-dom";
import Header from "./components/notAuth/Header";
import Home from "./screens/notAuth/home/Hero";
import Signin from "./screens/notAuth/signin/Signin";
import Signup from "./screens/notAuth/signup/Signup";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

      </Routes>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Header from "./components/notAuth/Header";
import Home from "./screens/notAuth/home/Hero";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

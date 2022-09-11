import { Route, Routes } from "react-router-dom"
import Home from "./screens/Home";
import DetailScreen from "./screens/DetailScreen";
import Navbar from "./components/ui/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <div className="container py-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<DetailScreen />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

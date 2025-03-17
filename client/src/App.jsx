import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";

const API_BASE_URL = "http://localhost:5000/api/v1/todos";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Navbar from "./components/Navbar";

const API_BASE_URL = "http://localhost:5000/api/v1/todos";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;

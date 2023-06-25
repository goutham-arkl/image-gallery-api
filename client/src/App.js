import { useContext } from "react";
import "./App.css";
import { AuthContext } from "./Context/UserContext";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={currentUser ? <Home /> : <Login />} />
          <Route path="/login" element={currentUser ? <Home /> : <Login />} />
          <Route
            path="/register"
            element={currentUser ? <Home /> : <Register />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

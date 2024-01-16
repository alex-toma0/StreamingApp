import NavbarComponent from "../components/NavbarComponent";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import "./App.css";
import { Container } from "react-bootstrap";
import Upload from "../pages/Upload";
export const UserContext = createContext();
function App() {
  const [userData, setUserData] = useState();
  return (
    <UserContext.Provider value={userData}>
      <NavbarComponent setUserData={setUserData} />
      <div style={{ height: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUserData={setUserData} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;

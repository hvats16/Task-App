import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import Todos from "./Todos";
import { HiUserPlus } from "react-icons/hi2";
import "../CSS/Home.css";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="navbar">
        <div className="p-4 mt-3 text-center">
          <HiUserPlus className="user-icon" /> <br />
          Username: {user && user.email}
        </div>
        <div className="d-grid gap-2">
          <Button variant="primary" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
      <Todos />
    </>
  );
};

export default Home;

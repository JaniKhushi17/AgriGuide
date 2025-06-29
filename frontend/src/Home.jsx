import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div>
            <h2>Welcome, {user?.name}</h2>
            <p>Your phone number: {user?.phone}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;

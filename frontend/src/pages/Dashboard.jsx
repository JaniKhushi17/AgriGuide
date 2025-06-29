import Layout from "../layout/layout";
import React, { useState } from "react";
import Sidebar from "../components/Slidebar";
import ProfileCard from "../components/Profilecard";
import EditProfile from "../components/Editprofile";
import "./Dashboard.css";
import Profliepic from "../assets/images/profile.jpg"

const Dashboard = () => {
    const [user, setUser] = useState({
        name: "Yadav Rohit K",
        email: "rohitkyadav2312@gmail.com",
        profilePic: {Profliepic},
      });
    
      const [isEditing, setIsEditing] = useState(false);
    
      const handleProfileUpdate = (updatedUser) => {
        setUser(updatedUser);
        setIsEditing(false);
      };
    return (
        <Layout showNavbar={false}>
             <div className="dashboard-container">
      <Sidebar/>
      <div className="dashboard-content">
        {isEditing ? (
          <EditProfile user={user} onUpdate={handleProfileUpdate} />
        ) : (
          <ProfileCard user={user} onEdit={() => setIsEditing(true)} />
        )}
      </div>
    </div>
        </Layout>
    );
};

export default Dashboard;

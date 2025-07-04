import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import PlantDiseasePrediction from './pages/PlantDiseasePrediction';
import Weather from "./pages/Weather";
// import CropPrediction from "./pages/CropPrediction";
import News from "./pages/News";
import Expenses from "./pages/Expenses";
import Dashboard from "./pages/Dashboard";
import Login from './pages/Login';
import Scheme from './pages/Scheme';
import SchemeDetails from './pages/SchemeDetails';
import AgricultureEducation from './pages/AgriculturalEducation';
import LaborRegistrationForm from './pages/LaborRegistrationForm';
import LabourAppointment from './pages/LabourAppointment';
import BookAppointment from './pages/BookAppointment';


function App() {

    return (
        <Router>
        <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/PlantDiseasePrediction" element={<PlantDiseasePrediction />} />
                <Route path="/weather" element={<Weather />} />
                {/* <Route path="/crop-prediction" element={<CropPrediction />} /> */}
                <Route path="/news" element={<News />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/learning" element={<AgricultureEducation />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/home" element={<Home />} />
                <Route path="/scheme" element={<Scheme />} />
                <Route path="/scheme/:id" element={<SchemeDetails />} />
                <Route path="/labourform" element={<LaborRegistrationForm />} />
                <Route path="/appointment" element={<LabourAppointment />} />
                {/* <Route path="/bookappointment" element={<BookAppointment />} /> */}
        </Routes>
        </Router>
    );
}

export default App;

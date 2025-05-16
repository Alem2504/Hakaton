import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./components/Register.tsx";
import Login from "./components/Login.tsx";
import Dashboard from "./components/Dashboard.tsx";
import Hello from "./components/Hello.tsx";
import HealthForm from "./components/HealthForm.tsx";
import HealthData from "./components/HealthData.tsx";
import EditHealthForm from "./components/EditHealthForm.tsx";
import ObesityForm from "./components/ObesityForm.tsx";
import Profile from "./components/Profile.tsx";
import DoctorDashboard from "./components/DoctorDashboard.tsx";
import UserProfile from "./components/UserProfile.tsx";
import UserTherapies from "./components/UserTherapis.tsx";
import Appointments from "./components/Appointments.tsx";
import CreateApp from "./components/CreateApp.tsx";
import AiPredictionPage from "./components/AiPredictionPage.tsx";
import Graph from "./components/Graph.tsx";
import Patients from "./components/Patients.tsx";
import Nalaz from "./components/Nalaz.tsx";
import NalazView from "./components/nalaz-view.tsx";

// For implementing animation on scroll
const observeElements = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }
  );

  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });
};

function App() {
  useEffect(() => {
    // Set page title
    document.title = 'BioTwin | Your Digital Twin for Health';

    // Initialize animations on scroll
    observeElements();
  }, []);

  return (
   <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/profile-view" element={<Profile />} />
        <Route path="/profile-view/:id" element={<UserProfile />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/nalaz/:id" element={<Nalaz />} />
        <Route path="/nalazi" element={<NalazView />} />

        <Route path="/therapis" element={<UserTherapies />} />
        <Route path="/health-form" element={<HealthForm />} />
        <Route path="/appointments" element={<Appointments />} />
         <Route path="/createapp" element={<CreateApp />} />
         <Route path="/prediction" element={<ObesityForm />} />
        <Route path="/ai" element={<AiPredictionPage />} />

        <Route path="/edit-health-form" element={<EditHealthForm />}/>
        <Route path="health-data" element={<HealthData />} />
          <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <Contact />
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
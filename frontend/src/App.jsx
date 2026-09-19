import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import "./App.css";

import { AuthProvider } from "./context/AuthContext";

import AllProjects from "./pages/public/AllProjects";
import ProjectDetails from "./pages/public/ProjectDetails";
import Home from "./pages/public/Home";

import ProtectedRoute from "./routes/ProtectedRoute";

import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/Login";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminExperience from "./pages/admin/AdminExperience";
import AdminEducation from "./pages/admin/AdminEducation";
import AdminServices from "./pages/admin/AdminServices";
import AdminAchievements from "./pages/admin/AdminAchievements";
import AdminSocialProfiles from "./pages/admin/AdminSocialProfiles";
import AdminCertifications from "./pages/admin/AdminCertifications";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminPersonalInfo from "./pages/admin/AdminPersonalInfo";
import AdminMessages from "./pages/admin/AdminMessages";


/* =====================================================
   Fixed Background + Moving Dots
===================================================== */

function FixedBackground() {
  const location = useLocation();
  const [dots, setDots] = useState([]);

  const isAdminPage = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdminPage) {
      setDots([]);
      return;
    }

    const generatedDots = Array.from({ length: 45 }, (_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2.5 + 1}px`,
      delay: `${Math.random() * 8}s`,
      duration: `${Math.random() * 8 + 8}s`,
    }));

    setDots(generatedDots);
  }, [isAdminPage]);

  if (isAdminPage) {
    return null;
  }

  return (
    <div
      className="fixed-background"
      aria-hidden="true"
    >
      {/* Main Background */}
      <div className="fixed-gradient" />

      {/* Moving Dots */}
      <div className="fixed-particles">
        {dots.map((dot) => (
          <span
            key={dot.id}
            className="particle-dot"
            style={{
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              animationDelay: dot.delay,
              animationDuration: dot.duration,
            }}
          />
        ))}
      </div>
    </div>
  );
}


/* =====================================================
   Cursor Following Glow
===================================================== */

function CursorGlow() {
  const location = useLocation();

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const smoothX = useSpring(mouseX, {
    stiffness: 120,
    damping: 25,
    mass: 0.5,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 120,
    damping: 25,
    mass: 0.5,
  });

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      return;
    }

    function handleMouseMove(event) {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [location.pathname, mouseX, mouseY]);

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Main Cursor Glow */}
      <motion.div
        aria-hidden="true"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[9999]
          w-[280px]
          h-[280px]
          rounded-full
          bg-lime-400/[0.06]
          blur-[80px]
        "
      />

      {/* Inner Cursor Glow */}
      <motion.div
        aria-hidden="true"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[9999]
          w-[90px]
          h-[90px]
          rounded-full
          bg-lime-300/[0.05]
          blur-[35px]
        "
      />
    </>
  );
}


/* =====================================================
   App
===================================================== */

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

        <div className="app-root">

          {/* Public Background */}
          <FixedBackground />

          {/* Cursor Effect */}
          <CursorGlow />

          {/* Application Content */}
          <div className="app-content">

            <Routes>

              {/* =========================================
                  Public Routes
              ========================================= */}

              <Route
                path="/"
                element={
                  <div className="public-page">
                    <Home />
                  </div>
                }
              />

              <Route
                path="/projects"
                element={
                  <div className="public-page">
                    <AllProjects />
                  </div>
                }
              />

              <Route
                path="/projects/:id"
                element={
                  <div className="public-page">
                    <ProjectDetails />
                  </div>
                }
              />


              {/* =========================================
                  Admin Routes
              ========================================= */}

              <Route
                path="/admin/login"
                element={<Login />}
              />

              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/skills"
                element={
                  <ProtectedRoute>
                    <AdminSkills />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/experience"
                element={
                  <ProtectedRoute>
                    <AdminExperience />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/education"
                element={
                  <ProtectedRoute>
                    <AdminEducation />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/services"
                element={
                  <ProtectedRoute>
                    <AdminServices />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/achievements"
                element={
                  <ProtectedRoute>
                    <AdminAchievements />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/social-profiles"
                element={
                  <ProtectedRoute>
                    <AdminSocialProfiles />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/certifications"
                element={
                  <ProtectedRoute>
                    <AdminCertifications />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/projects"
                element={
                  <ProtectedRoute>
                    <AdminProjects />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/personal-info"
                element={
                  <ProtectedRoute>
                    <AdminPersonalInfo />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/messages"
                element={
                  <ProtectedRoute>
                    <AdminMessages />
                  </ProtectedRoute>
                }
              />

            </Routes>

          </div>

        </div>

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
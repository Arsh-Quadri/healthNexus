/* eslint-disable react/prop-types */
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Onboard from "./components/Onboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { auth, database } from "./firebase";
import { onValue, ref } from "firebase/database";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        checkOnboardingStatus(user.uid);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const checkOnboardingStatus = async (userId) => {
    try {
      const userRef = ref(database, `users/${userId}/onboardData`);
      onValue(userRef, (snapshot) => {
        try {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setIsOnboardingCompleted(userData?.isOnboardingCompleted);
          } else {
            setIsOnboardingCompleted(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      });
    } catch (error) {
      console.error("Error checking onboarding status:", error);
    }
  };

  return (
    <BrowserRouter>
      <Content
        user={user}
        setIsOnboardingCompleted={setIsOnboardingCompleted}
        isOnboardingCompleted={isOnboardingCompleted}
      />
    </BrowserRouter>
  );
}

const Content = ({ user, setIsOnboardingCompleted, isOnboardingCompleted }) => {
  const location = useLocation();
  const showNavbarFooter = !["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {showNavbarFooter && (
        <Navbar
          user={user}
          setIsOnboardingCompleted={setIsOnboardingCompleted}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            user && isOnboardingCompleted ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Home />
            )
          }
        />
        <Route
          path="/login"
          element={<Login isOnboardingCompleted={isOnboardingCompleted} />}
        />
        <Route
          path="/signup"
          element={<Signup isOnboardingCompleted={isOnboardingCompleted} />}
        />
        <Route
          path="/onboard"
          element={
            user && isOnboardingCompleted ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Onboard user={user} />
            )
          }
        />
        <Route
          path="/dashboard/*"
          element={
            user && isOnboardingCompleted ? (
              <Dashboard user={user} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
      {showNavbarFooter && <Footer />}
    </>
  );
};

export default App;

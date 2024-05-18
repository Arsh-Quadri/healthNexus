import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
      // console.log(user + " user");
      if (user) {
        // console.log(user.uid + " user.uid");
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
            setIsOnboardingCompleted(userData?.isOnboardingCompleted); //
          } else {
            // console.log("No data found for user:", userId);
            setIsOnboardingCompleted(false);
            // Handle the case where data for the user doesn't exist
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Handle error gracefully
        }
      });
    } catch (error) {
      console.error("Error checking onboarding status:", error);
    }
  };

  return (
    <BrowserRouter>
      <Navbar user={user} setIsOnboardingCompleted={setIsOnboardingCompleted} />
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
      <Footer />
    </BrowserRouter>
  );
}

export default App;

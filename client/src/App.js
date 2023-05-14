import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Dashboard from "./Components/Dashboard";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./services/PrivateRoute";

import "react-toastify/dist/ReactToastify.css";

// implement React Router for all pages
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          {/* implement privateroute for the restricted pages */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import StartCourse from "../pages/dashboard/StartCourse";

import AlphabetModule from "../pages/modules/alphabet/AlphabetModule";
import Learning from "../pages/modules/alphabet/Learning";
import TypingTest from "../pages/modules/alphabet/TypingTest";
import SpeechTest from "../pages/modules/alphabet/SpeechTest";
import Feedback from "../pages/modules/alphabet/Feedback";
import FinalTest from "../pages/modules/alphabet/FinalTest";   // 🔥 ADD
import Report from "../pages/modules/alphabet/Report";         // 🔥 ADD

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected */}
      <Route
        path="/start"
        element={<ProtectedRoute><StartCourse /></ProtectedRoute>}
      />

      <Route
        path="/alphabet"
        element={<ProtectedRoute><AlphabetModule /></ProtectedRoute>}
      />

      <Route
        path="/learning"
        element={<ProtectedRoute><Learning /></ProtectedRoute>}
      />

      <Route
        path="/typing"
        element={<ProtectedRoute><TypingTest /></ProtectedRoute>}
      />

      <Route
        path="/speech"
        element={<ProtectedRoute><SpeechTest /></ProtectedRoute>}
      />

      <Route
        path="/feedback"
        element={<ProtectedRoute><Feedback /></ProtectedRoute>}
      />

      {/* 🔥 FINAL TEST FLOW */}
      <Route
        path="/final-test"
        element={<ProtectedRoute><FinalTest /></ProtectedRoute>}
      />

      <Route
        path="/report"
        element={<ProtectedRoute><Report /></ProtectedRoute>}
      />

      {/* 🔥 BETTER FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import StartCourse from "../pages/dashboard/StartCourse";

import AlphabetModule from "../pages/modules/alphabet/AlphabetModule";
import Learning from "../pages/modules/alphabet/Learning";
import TypingTest from "../pages/modules/alphabet/TypingTest";
import SpeechTest from "../pages/modules/alphabet/SpeechTest";
import Feedback from "../pages/modules/alphabet/Feedback";
import FinalTest from "../pages/modules/alphabet/FinalTest";
import Report from "../pages/modules/alphabet/Report";
import MirrorGame from "../pages/games/MirrorGame";
import MuscleMemoryGame from "../pages/games/MuscleMemoryGame";
import BalloonGame from "../pages/games/BalloonGame";

import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Layout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/start" element={<StartCourse />} />
          <Route path="/alphabet" element={<AlphabetModule />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/typing" element={<TypingTest />} />
          <Route path="/speech" element={<SpeechTest />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/final-test" element={<FinalTest />} />
          <Route path="/report" element={<Report />} />
          <Route path="/mirror-game" element={<MirrorGame />} />
          <Route path="/muscle-memory" element={<MuscleMemoryGame />} />
          <Route path="/balloon-game" element={<BalloonGame />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

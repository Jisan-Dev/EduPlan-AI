import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./pages/login/Login";
import LessonPlannerPage from "./pages/LessonPlannerPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/planner" element={<LessonPlannerPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

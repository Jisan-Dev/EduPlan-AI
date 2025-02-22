import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router";
import LessonForm from "./components/lesson/LessonForm";
import { Button } from "./components/ui/button";
import Login from "./pages/login/Login";
import LessonPlannerPage from "./pages/LessonPlannerPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated === "true" ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/planner"
            element={
              // <ProtectedRoute>
              <LessonPlannerPage />
              // </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

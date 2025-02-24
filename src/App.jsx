import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./pages/login/Login";
import LessonPlannerPage from "./pages/LessonPlannerPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuth } from "./context/AuthContext";
import { useLocation } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to={"/login"} state={location.pathname} replace={true} />;
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
              <ProtectedRoute>
                <LessonPlannerPage />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LessonPlannerPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

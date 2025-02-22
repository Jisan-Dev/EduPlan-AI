import LessonForm from "@/components/lesson/LessonForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router";

const LessonPlannerPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  if (isAuthenticated !== "true") {
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">AI Lesson Planner</h1>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <LessonForm />
      </main>
      <footer className="bg-white border-t py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-500">&copy; {new Date().getFullYear()} AI Lesson Planner</div>
      </footer>
    </div>
  );
};

export default LessonPlannerPage;

import LessonForm from "@/components/lesson/LessonForm";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const LessonPlannerPage = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen">
      <header className="shadow bg-accent">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl text-accent-foreground font-bold">EduPlan-AI Lesson Planner</h1>
          <div className="flex items-center justify-center gap-3">
            <Button variant="default" onClick={logout} className="cursor-pointer">
              Logout
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <LessonForm />
      </main>
      <footer className="bg-accent border-t py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-accent-foreground">&copy; {new Date().getFullYear()} AI Lesson Planner</div>
      </footer>
    </div>
  );
};

export default LessonPlannerPage;

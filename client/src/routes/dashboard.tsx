import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/utils/axios";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Quiz = {
  quizTitle: string;
  id: string;
  createdAt: Date;
};
const DashboardPage = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [quizTitle, setQuizTitle] = useState("");
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  async function createQuiz() {
    const token = await getToken();
    try {
      const { data } = await axiosInstance.post(
        "/api/v1/quiz/create",
        {
          quizTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        navigate(`/dashboard/quiz/${data.data.quiz.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllQuizzes() {
    try {
      const token = await getToken();

      const { data } = await axiosInstance.get("/api/v1/quiz", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setQuizzes(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllQuizzes();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-3">
      <div>Dashboard Page</div>
      <Input
        placeholder="Enter quiz title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
      />
      <Button onClick={createQuiz}>Create Quiz</Button>
      <div className="container mx-auto space-y-4 mt-4">
        {quizzes.map((quiz: Quiz) => (
          <div key={quiz.id} className="border-2 border-black p-3">
            <h2>{quiz.quizTitle}</h2>
            <Button onClick={() => navigate(`/dashboard/quiz/${quiz.id}`)}>
              Edit
            </Button>
            <p>{new Date(quiz.createdAt).toDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;

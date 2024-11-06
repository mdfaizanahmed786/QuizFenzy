import { CreateQuestionModal } from "@/components/modal/createQuestion";
import Questions from "@/components/Questions";
import axiosInstance from "@/utils/axios";
import { useAuth } from "@clerk/clerk-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type QuizObj = {
  id: string;
  quizTitle: string;
  questions: Question[];
};

export type Question = {
  id: string;
  questionTitle: string;
  answers: Answer[];
};

export type Answer = {
  id: string;
  text: string;
  isCorrect: boolean;
};

const CreateQuizPage = () => {
  const { quizId } = useParams();
  const { getToken, isLoaded } = useAuth();

  const [quizData, setQuizData] = useState({} as QuizObj);
  const [questionModal, setOpenQuestionModal] = useState(false);

  const getQuiz = useCallback(async () => {
    const token = await getToken();
    try {
      const { data } = await axiosInstance.get(`/api/v1/quiz/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setQuizData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!quizId) {
      return;
    }

    getQuiz();
  }, [quizId]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-3">
      <h1 className="text-4xl text-center">Create Quiz</h1>

      {quizData.quizTitle && (
        <h2 className="text-2xl text-center">{quizData.quizTitle}</h2>
      )}

      <div className="mt-5 space-y-4">
        {quizData.questions &&
          quizData.questions.map((question) => (
            <Questions
              key={question.id}
              question={question}
              getQuiz={getQuiz}
              quizData={quizData}
            />
          ))}

        <button
          onClick={() => setOpenQuestionModal((p) => !p)}
          className="bg-blue-500 text-white px-3 py-1 rounded mt-5"
        >
          Add Question
        </button>
      </div>

      <CreateQuestionModal
        quizId={quizId as string}
        setOpenQuestionModal={setOpenQuestionModal}
        openQuestionModal={questionModal}
        getQuiz={getQuiz}
      />
    </div>
  );
};

export default CreateQuizPage;

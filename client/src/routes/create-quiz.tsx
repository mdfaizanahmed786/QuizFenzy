import { CreateQuestionModal } from "@/components/modal/createQuestion";
import axiosInstance from "@/utils/axios";
import { useAuth } from "@clerk/clerk-react";
import { DeleteIcon, Edit2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type QuizObj = {
  id: string;
  quizTitle: string;
  questions: Question[];
};

type Question = {
  id: string;
  questionTitle: string;
  answers: Answer[];
};

type Answer = {
  id: string;
  text: string;
  isCorrect: boolean;
};

const CreateQuizPage = () => {
  const { quizId } = useParams();
  const { getToken, isLoaded } = useAuth();

  const [quizData, setQuizData] = useState({} as QuizObj);
  const [questionModal, setOpenQuestionModal] = useState(false);  


  async function getQuiz() {
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
  }

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
            <div key={question.id} className="mb-5">
              <div className="border-2 border-black p-3 flex justify-between">
                <h3 className="text-xl">{question.questionTitle}</h3>
                <div className="flex items-center gap-1">
                  <Edit2Icon className="cursor-pointer" />
                  {quizData.questions[0].id != question.id && (
                    <DeleteIcon className="cursor-pointer" />
                  )}
                </div>
              </div>
              <ul className="flex items-center gap-2 mt-2 ">
                {question.answers.map((answer) => (
                  <div key={answer.id} className="border-2 flex items-center justify-between gap-2 border-black p-2">
                    <li>{answer.text}</li>
                    <div className="flex items-center gap-1">
                      <Edit2Icon className="cursor-pointer" />
                      {question.answers[0].id != answer.id && (
                        <DeleteIcon className="cursor-pointer" />
                      )}
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          ))}

        <button onClick={()=>setOpenQuestionModal(p=>!p)}  className="bg-blue-500 text-white px-3 py-1 rounded mt-5">
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

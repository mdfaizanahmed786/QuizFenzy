import { Question, QuizObj } from "@/routes/create-quiz";
import axiosInstance from "@/utils/axios";
import { useAuth } from "@clerk/clerk-react";
import { DeleteIcon, Edit2Icon } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import Answers from "./Answers";
import { Button } from "./ui/button";

function Questions({
  question,
  getQuiz,
  quizData,
}: {
  question: Question;
  getQuiz: () => Promise<void>;
  quizData: QuizObj;
}) {
  const [editQuestion, setEditQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState(question.questionTitle);
  const { getToken, isLoaded, isSignedIn } = useAuth();
  async function handleEditQuestion(id: string) {
    const token = await getToken();
     if(!isSignedIn){
        console.log("User not signed in");
        return;
    }
    try {
      const { data } = await axiosInstance.put(
        `/api/v1/question/edit`,
        {
          id,
          questionTitle: newQuestion,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setEditQuestion(false);
        getQuiz();
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div key={question.id} className="mb-5">
      <div className="border-2 border-black p-3 flex justify-between">
        {!editQuestion && <h3 className="text-xl">{question.questionTitle}</h3>}

        {!editQuestion && isLoaded  ? (
          <div className="flex items-center gap-1">
            <Edit2Icon
              onClick={() => setEditQuestion(true)}
              className="cursor-pointer"
            />
            {quizData.questions[0].id != question.id && (
              <DeleteIcon className="cursor-pointer" />
            )}
          </div>
        ) : (
          isLoaded && <div className="w-full">
            <Input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <div className="flex items-center gap-5">
              <Button
                className="mt-2"
                onClick={() => handleEditQuestion(question.id)}
              >
                Save
              </Button>

              <Button
                variant="destructive"
                className="mt-2"
                onClick={() => setEditQuestion(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      <ul className="flex items-center gap-2 mt-2 ">
        {question.answers.map((answer) => (
          <Answers
            getQuiz={getQuiz}
            key={answer.id}
            answer={answer}
            question={question}
          />
        ))}
      </ul>
    </div>
  );
}

export default Questions;

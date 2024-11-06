import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/utils/axios";
import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";


type CreateQuestionProps = {
 openQuestionModal: boolean;   
 setOpenQuestionModal: React.Dispatch<React.SetStateAction<boolean>>; 
  quizId: string; 
  getQuiz():Promise<void> 
};

export function CreateQuestionModal({
  openQuestionModal,
    setOpenQuestionModal,
    quizId,
    getQuiz
}: CreateQuestionProps) {

    const [questionTitle, setQuestionTitle] = useState("");
    const { getToken, isLoaded } = useAuth();

    async function addQuestion() {  
        const token = await getToken();
        if(!token){
            console.log("Token not found");
            return;
        }
        try {
          const { data } = await axiosInstance.post(
            "/api/v1/question/create",
            {
              questionTitle,
              quizId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (data.success) {

            setOpenQuestionModal(false);
            getQuiz();
          }
        } catch (error) {
          console.log(error);
        }
      }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <Dialog open={openQuestionModal} onOpenChange={setOpenQuestionModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Question</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              type="text"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button onClick={addQuestion}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
